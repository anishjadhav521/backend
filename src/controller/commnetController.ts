import { Response ,Request, NextFunction} from "express";
import commentService from "../service/commentService"

class CommentController{

    addComment = async(req:Request,res:Response)=>{

        console.log("hited comment");
        

        const{ comment,profileId,postId } = req.body

        const result = await commentService.addComment(comment,profileId,postId)

        if( result){

            res.status(200)   
        }
        else{

            res.status(400)
        }
        

    }

    getComment = async(req:Request , res:Response)=>{

        console.log("get comment");
        

        const postId = req.params['postId']

        console.log(postId);
        

        const comments = await commentService.getComment(postId)

        if(comments){

            res.json({"comments":comments})
        }
        else{

            res.status(500)
        }
    }

    deleteComment = async(req:Request , res:Response,next:NextFunction)=>{

    try{

        const commentId =  req.params['commentId']
        const result = await commentService.deleteComment(commentId)
            if(result){
            res.status(200)
        }
        else{
            res.status(500)
        }
    }
    catch(err){

        next(err)
    }
    }
}

export default new CommentController()