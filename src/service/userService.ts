import userRepo from "../repository/user-repo"
import { id } from "../middleware/authMiddleware"
import AppDataSource from "../configuration/config"
import { Profile } from "../entities/profile"
import { User } from "../entities/user"
import { Post } from "../entities/post"
import { Likes } from "../entities/like"

const profileRepository = AppDataSource.getRepository(Profile)
const userRepository = AppDataSource.getRepository(User)
const postRepository = AppDataSource.getRepository(Post)
const likeRepository = AppDataSource.getRepository(Likes)
// const yzRepo = AppDataSource.getMongoRepository(likeuser5003)
// const 

class userService{

    async getUser(){

        return await userRepo.getUser(id)

    }

    async getUserByUsername(username:string){

        return await profileRepository.findOne({

            relations:{

                user:{

                    post:{
                        like:true
                    }
                }
            },
            where:{

                userName : username
            }            
        })

    }

    async getAll(){

       const users = await profileRepository.find()

       return users

        
    }

    async deleteUser(profileId:any){

        try {
            const profile = await profileRepository.findOne({
                where: { id: profileId },
            });

            
            if (!profile) {
                console.log("Profile not found");
                return;
            }

            const user = await userRepository.findOne({
                where:{
                    profile:profile,
                    
                }
                ,relations:{
                    profile:true,
                    post:true
                }
            })

            console.log(user);
            
            postRepository.query('delete from  post5004 where user_id = @0',[user?.userId])

            


            



        //    const like = await likeRepository.findOneBy({post:user?.post})

        //    console.log(like);
           

        //    await likeRepository.delete({likeId:like?.likeId})

            // postRepository.delete({user:user!})


            const result = await userRepository.delete({userId:user?.userId});

            console.log(result);
        } 
        catch (error) {
            console.error("Error deleting user:", error);
        }
        
       


    }

    


}

export default new userService()