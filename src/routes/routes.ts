import express, { Router } from "express"
import authController from "../controller/authController"
import multer from "multer"
import postController from "../controller/postController"
import authentication from "../middleware/authMiddleware"
import userController from "../controller/userController"
import profileController from "../controller/profileController"
import notification from "../controller/notification"
import CommnetController from "../controller/commnetController"



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

let path: string
let caption: string
const upload = multer({ storage: storage });

const routes = express.Router()

routes.get('/getUserProfile',authentication,profileController.getUserProfile)

routes.patch('/updateUsername',authentication,profileController.updateUsername)
routes.patch('/updateEmail',authentication,profileController.updateEmail)
routes.patch('/updatePhoneNumber',authentication,profileController.updatePhoneNumber)
routes.patch('/updateBio',authentication,profileController.updateBio)
routes.patch('/updatePassword',authentication,profileController.updatePassword)

routes.post('/signup', authController.signUp)
routes.post('/login', authController.logIn)

routes.get('/getPost', authentication, postController.getPost)
routes.post('/addPost', authentication, upload.single('file'), async (req: any, res: any) => {

    path = req.file.path
    const { caption } = req.body

    const result = await postController.addPost(path, caption)
    
    if (result == "user not found") {

        res.json({ "msg": "failed to post" });
    }
    else {

        res.json({ "msg": "picture posted" })
    }
});

routes.get('/getUser', authentication, userController.getUser)
routes.get('/getUsers/:username',authentication,userController.getUsers)
routes.get('/getUser/:username',authentication,userController.getUserByUsername)

// routes.patch('/updateLike',authentication,postController.updateLike)

routes.post('/addLike',authentication,postController.addLike)


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








export default routes