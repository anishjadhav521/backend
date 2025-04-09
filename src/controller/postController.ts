import { NextFunction, Request,Response } from "express";
import { Post } from "../entities/post";
import postService from "../service/postService"


class postController {

    getPost = async (req: Request, res: Response,next:NextFunction) => {

        try{

            const posts:Post[] = await postService.getPost()
            res.json({ 'posts': posts })

        }
        catch(err){

            next(err)

        }

    }

    addPost = (path: string, caption: string) => {

        console.log("adding post");
        
        return postService.addPost(path, caption)

    }

    addLike = async(req:any,res:any,next:NextFunction)=>{

        try{

            console.log("now");
        
        console.log(req.body);

        
         await postService.addLike(req.body.postId);



        }
        catch(err){

            next(err)
        }
        

        // if(like){

        //     res.status(200).json({msg:like})
        // }
        // else{

        //     res.status(500)
        // }
        
        // if(like==="user not found"){

        //     res.json({"msg":"user not found "})
        // }
        // else if(like){

        //     res.json({"msg":like})
        // }

    }


    async deletLike(req:Request , res:Response,next:NextFunction){

        try{

            const postId = req.params['postId']

            console.log(postId);
            
    
            await postService.deletLike(postId);
            res.status(200).json({msg:'disliked'})
        }
        catch(err){

            next(err)

            
        }
       

        // if(result.affected === 0) return res.status(404).json({msg:"like not found"})


       

    }

    async deletePost(req:Request,res:Response,next:NextFunction){

        try{    
        // console.log("delet post hited");
        
        const postId  = req.params['postId'];
 
        // console.log(postId);
        
        await postService.deletePost(postId);
        res.status(200)

        }
        catch(err){

            next(err)
        }


    //    if(result.affected === 0) return res.status(404).json({msg:"post not found"})
    //     res.json({msg:'post deleted'})

    }



}

export default new postController()