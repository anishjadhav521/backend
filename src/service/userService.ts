import userRepo from "../repository/user-repo"
import { id } from "../middleware/authMiddleware"
import AppDataSource from "../configuration/config"
import { Profile } from "../entities/profile"
import { User } from "../entities/user"
import { Post } from "../entities/post"
import { Likes } from "../entities/like"
import { Role } from "../enums/enum"
import { AppError } from "../types/errorHandler"

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



        const user = await profileRepository.findOne({

            relations:{

                user:{

                    post:{
                        like:{
                            user:true
                        }
                    }
                }
            },
            where:{

                userName : username
            }            
        })
        console.log("usr",username);
        console.log("ansh",user);
        
        

    if(!user){

        throw new AppError('not found',400)
        
    }
    return user

    }

    async getAll(){

       let users = await profileRepository.find({
        where:{
            role:Role.User,
            status:false    
        }
       })


       console.log("romr all users",users);
       

       return users

    }

    async deleteUser(profileId:any){

            const profile = await profileRepository.findOne({
                where: { id: profileId },
            });

            
            if (!profile) {
                throw new AppError('not found',404)
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

            user!.status = true
            user!.profile.status = true

            await userRepository.save(user!)
        }

    }
    export default new userService()

























            // console.log(user);
            
            // postRepository.query('delete from  post5004 where user_id = @0',[user?.userId])

        //    const like = await likeRepository.findOneBy({post:user?.post})

        //    console.log(like);
           

        //    await likeRepository.delete({likeId:like?.likeId})

            // postRepository.delete({user:user!})


            // const result = await userRepository.delete({userId:user?.userId});

            // console.log(result);
        
    

    


