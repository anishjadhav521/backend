import AppDataSource from "../configuration/config"
import { Post } from "../entities/post"
import { Profile } from "../entities/profile"
import { Comment } from "../entities/comments"
import { CommentDto } from "../dto/comment"
import { id } from "../middleware/authMiddleware"

const commentRepository = AppDataSource.getRepository(Comment)
const profileRepository = AppDataSource.getRepository(Profile)
const postRepository = AppDataSource.getRepository(Post)


class CommentService{

    async addComment(comment:string,profileId:number,postId:number){


        const profile = await profileRepository.findOne({
            where:{
                id:profileId
            }
        })

        const post = await postRepository.findOne({

            where:{
                PostId:postId
            }
        })

        const com = new Comment()

        com.post = post!
        com.profile = profile!
        com.comment = comment

        return await commentRepository.save(com);


    }

    getComment = async(postId:any)=>{

        const post = await postRepository.findOne({

            where:{
                PostId:postId
            }
        })

        const allComments = await commentRepository.find({
            where:{
                post:post!
            },
            relations:{
                profile:true
            }
        })

        let comments:CommentDto[]

        allComments.forEach((com)=>{

            let comment:CommentDto={

                username:com.profile.userName,
                comment : com.comment,
                commentId : com.id
            
            }
            if(!comments){

                comments=[]
            }
            
            comments.push(comment);
        })

        console.log(comments!);
        return comments!;
        
        


        // console.log(comments);
        

    }

    deleteComment = async(commentId:any)=>{

        const comment = await commentRepository.delete({
            id:commentId
        })

        return comment

    }



}

export default new CommentService()