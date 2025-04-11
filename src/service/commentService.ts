import AppDataSource from "../configuration/config"
import { Post } from "../entities/post"
import { Profile } from "../entities/profile"
import { Comment } from "../entities/comments"
import { CommentDto } from "../dto/commentDto"
import { id } from "../middleware/authMiddleware"
import { AppError } from "../types/errorHandler"

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



        console.log(commentId);
        

        const comment = await commentRepository.delete({
            id:commentId
        })

        if(!comment){

            throw new AppError('internal server error ',500)
        }

        return comment

    }



}

export default new CommentService()