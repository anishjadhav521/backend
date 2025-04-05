import { Post } from "../entities/post";
import postService from "../service/postService"


class postController {

    getPost = async (req: any, res: any) => {

        const posts:Post[] = await postService.getPost()

        // console.log("post form",posts);
        
        res.json({ 'posts': posts })


    }

    addPost = (path: string, caption: string) => {

        console.log("adding post");
        
        return postService.addPost(path, caption)

    }

    addLike = async(req:any,res:any)=>{

        console.log("from controller",req.body);
        

        const like = await postService.addLike(req.body);

        
        
        // if(like==="user not found"){

        //     res.json({"msg":"user not found "})
        // }
        // else if(like){

        //     res.json({"msg":like})
        // }

    }



}

export default new postController()