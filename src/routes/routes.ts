import express, { NextFunction, Request, Response, Router } from "express"
// import authController from "../controller/authController"
import authController  from "../controller/authController"
import multer from "multer"
import postController from "../controller/postController"
import authentication from "../middleware/authMiddleware"
import userController from "../controller/userController"
import profileController from "../controller/profileController"
import notification from "../controller/notification"
import CommnetController from "../controller/commnetController"
import path from "path";
// import { log } from "console"


const uploadPath = path.join(__dirname,'..','..','..','final-project-angular','frontend','public','assets')


// C:\Users\AnishJadhavINDev\Documents\final project angular\frontend\public


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

let path1: string

const upload = multer({ storage: storage });

const routes = express.Router()

routes.get('/getUserProfile',authentication,profileController.getUserProfile)

routes.patch('/updateUsername',authentication,profileController.updateUsername)
routes.patch('/updateEmail',authentication,profileController.updateEmail)
routes.patch('/updatePhoneNumber',authentication,profileController.updatePhoneNumber)
routes.patch('/updateBio',authentication,profileController.updateBio)
routes.patch('/updatePassword',authentication,profileController.updatePassword)
routes.patch('/updateProfile',authentication,upload.single('file'),async (req:Request,res:Response,next:NextFunction)=>{

    try{

    console.log("hited update profilepoic");
    

    let path = req.file?.filename

    await profileController.updateProfilePic(path!)

    res.status(200).json({msg:'profile updated successfully'})

    }
    catch(err){

        next(err)

    }
    


} )


routes.post('/signup', authController.signUp)
routes.post('/login', authController.logIn)
routes.get('/logout',authController.logOut)

routes.get('/getPost', authentication, postController.getPost)
routes.post('/addPost', authentication, upload.single('file'), async (req: any, res: any) => {

    path1 = req.file.filename
    console.log(req.file.filename);
    
    const { caption } = req.body

    const result = await postController.addPost(path1, caption)
    
    if (result == "user not found") {

        res.json({ "msg": "failed to post" });
    }
    else {

        res.json({ "msg": "picture posted" })
    }
});

routes.delete('/deletePost/:postId',authentication,postController.deletePost)



routes.get('/getUser', authentication, userController.getUser)
routes.get('/getUsers/:username',authentication,userController.getUsers)
routes.get('/getUser/:username',authentication,userController.getUserByUsername)

// routes.patch('/updateLike',authentication,postController.updateLike)

routes.post('/addLike',authentication,postController.addLike)
routes.delete('/deleteLike/:postId',authentication,postController.deletLike)


routes.post('/follow',authentication,profileController.follow)
routes.get('/isFollow/:followingId/:followerId',authentication,profileController.isFollow)
routes.post('/unFollow',authentication,profileController.unFollow)
routes.get('/getFollowers/:profileId',authentication,profileController.getFollowers)
routes.get('/getFollowing/:profileId',authentication,profileController.getFollowing)

routes.get('/getNotification/:profileId',authentication,notification.getNotificaion)
routes.post('/addNotification/',authentication,notification.addNotification)

routes.post('/addComment',authentication,CommnetController.addComment)
routes.get('/getComments/:postId',authentication,CommnetController.getComment)
routes.delete('/deleteComment/:commentId',authentication,CommnetController.deleteComment)

routes.get('/getAllUsers',authentication,userController.getAll)
routes.delete('/deleteUser/:userId',authentication,userController.deleteUser)

routes.post('/report',authentication,notification.addReport)
routes.get('/getReports',authentication,notification.getReport)


routes.post('/auth/reset-pass',authentication,)











export default routes