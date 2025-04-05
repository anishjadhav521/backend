import commentService from "../service/commentService"

class CommentController{

    addComment = async(req:any,res:any)=>{

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

    getComment = async(req:any , res:any)=>{

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

    deleteComment = async(req:any , res:any)=>{

        const commentId =  req.params['commentId']
        

       const result = await commentService.deleteComment(commentId)

       if(result){

        res.status(200)
       }
       else{    

        res.status(500)
       }


    }



}

export default new CommentController()