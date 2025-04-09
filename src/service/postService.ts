import AppDataSource from "../configuration/config";
import { Post } from "../entities/post";
import { User } from "../entities/user";
import { id } from "../middleware/authMiddleware";
import postRepo from "../repository/post-repo";
import { Likes } from "../entities/like";
import { Profile } from "../entities/profile";
import { AppError } from "../types/errorHandler";
// import { id } from "../middleware/authMiddleware";

const userRepo = AppDataSource.getRepository(User)
const postRepo1 = AppDataSource.getRepository(Post)
const profileRepo = AppDataSource.getRepository(Profile)
const likeRepo = AppDataSource.getRepository(Likes)

class PostService {

    getPost = async () => {

        return await postRepo.getPost();
    };

    addPost = async (path: string, caption: string) => {

        const user = await userRepo.findOne({
            relations:{
                profile:true
            },where:{

                userId: id

            }
            
        });
        if (!user) {

            return "user not found"
        }

        // const like = new Likes()
        // like.LikedBy = [];
        // like.isLiked = false;
        // like.count = 0;
        

        const post = new Post()

        post.comments = [];
        post.imgUrl = path;
        post.caption = caption;
        post.userName = user.profile.userName;
        post.user = user

        // console.log("post",post);
        

        return await postRepo1.save(post);
          
    };

    async addLike(postId:any){


        const userId = id;
        // const postId = body.post.postId

        console.log("we",id,postId);
        

        const user = await userRepo.findOne({where:{
            userId:userId
        }})

        const post = await postRepo1.findOne({where:{

            PostId:postId

        }})

        // post?.likesCount;

       

        if(!post||!user){

            console.log("user or post not found");
            // return "user or post not found"

            throw new AppError('user or post not found',404)
             

        }

        const existingLike = await likeRepo.findOne({
            where:{
                user:{
                    userId:userId
                },
                post:{
                    PostId:postId
                }
            }
        })

        if(existingLike){

            console.log( "like exists");

            throw new AppError("like exists",503)
            // return  "like exists"
            
        }
        post.likesCount+=1;
        await postRepo1.save(post)
        
        // const res =  await postRepo1.update({ PostId:post?.PostId!},{likesCount : post.likesCount++ })
        // console.log("s",res.affected);
        

        const like = likeRepo.create({user,post});
        const lk=  await likeRepo.save(like)
        console.log("lk",lk);
        

    }

    async deletLike(postId:any){

       const userId = id

       console.log("user",userId,postId);

       const post = await postRepo1.findOne({where:{

        PostId:postId

        }})
       

       const result = await likeRepo.delete({
        user:{
            userId:userId
        },
        post:{

            PostId:postId
        }
       })

       post!.likesCount-=1;
       await postRepo1.save(post!)

       if(result.affected === 0){

        throw new AppError('ineternal server error',503)
       }
       

       return result
    }

    async deletePost(postId:any){

       const d = await postRepo1.delete({PostId:postId});

       if(d.affected === 0){

        throw new AppError('ineternal server error',503)
       } 

       return d
       
    }







    // updateLike = async(body:any)=>{

    //     console.log("bod",body);
        
    //     const postId = body.postId

    //     const post  = await postRepo1.findOneBy({
    //         PostId:postId
    //     })

    //     const user = await userRepo.findOneBy({

    //         userId:id
    //     })

    //     if(!user){

    //         return "user not found"
    //     }

    //     if(!post){

    //         return "post not found"
    //     }

    //     // const like = post.like;
        
    //     // like.count = body.updatedLikes;
    //     // like.LikedBy = []
    //     // like.LikedBy.push(user);
    //     // like.post = post

    //     // console.log(like);
    //     // console.log(user);
    //     // console.log(post);
    //     // console.log("likedbu",post.like.LikedBy);
        
    //     // if(!post.like.LikedBy){

    //         // post.like.LikedBy=[]
    //     // }
    //     // post.like.LikedBy=post.like.LikedBy
       
    //     if(body.updatedLiked == false ){

    //           post.like.LikedBy=post.like.LikedBy.filter((user)=>{

    //                 user.userId!=id

    //             })
    //     }
    //     else{

    //         post.like.LikedBy.push(user)
    //     }
        
    //     post.like.count = body.updatedLikes

    //     console.log(post.like);
        
    //     return await postRepo.updateLike(post.like);

    // }
}

export default new PostService();