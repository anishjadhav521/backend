import { log } from "console";
import AppDataSource from "../configuration/config";
import { Follow } from "../entities/follow";
import { Profile } from "../entities/profile";
import { User } from "../entities/user";
import { id } from "../middleware/authMiddleware";
import profileRepo from "../repository/profile-repo"

const userRepository = AppDataSource.getRepository(User)
const profileRepository = AppDataSource.getRepository(Profile)
const followRepository = AppDataSource.getRepository(Follow)

class profileService{


    async getUserProfile(){

        return await profileRepo.getUserProfile()
    }

    async updateUsername(body:any){

        return await profileRepo.updateUsername( body.newUsername,body.profileId)
    }

    async updateEmail(body:any){

        console.log(body);
        
        return await profileRepo.updateEmail( body.newEmail,body.profileId)
    }

    async updatePhoneNumber(body:any){

        console.log(body);
        
        return await profileRepo.updatePhoneNumber( body.newPhoneNumber,body.profileId)
    }

    async updateBio(body:any){

        console.log(body);
        
        return await profileRepo.updateBio( body.newBio,body.profileId)
    }

    async updatePassword(body:any){

        console.log(body);

        const user = await userRepository.findOneBy({

            userId:id
        })

        if(!user){

            return "user not found"
        }

        if(user.password === body.currentPass){

            // return await profileRepo.updatePassword( body.updatedPass,body.profileId)

            user.password = body.updatedPass
            await userRepository.save(user)
            return "password updated successfully"
        }
        else{

            return "current password doesnt match"
        }
        
        
    }

    async follow(followerId:any,followingId:any,res:any){


        if(followerId === followingId){

           return res.status(400).json({"msg": "you cant follow yourself"})
        }

        const follower = await profileRepository.findOneBy({id:Number(followerId)})
        const following = await profileRepository.findOneBy({id:Number(followingId)})

        if(!follower || !following){

            return res.status(404).json({"msg": "user not found"}) 
        }

        const existingFollow = await followRepository.findOne({

            where:{followers:follower!,following:following!}
        
        })

        if(existingFollow){
           return res.status(400).json({"msg": "already following this user"})  
        }

        const follow = new Follow()

        follow.followers = follower!
        follow.following = following!

        await followRepository.save(follow);
        res.status(201).json({"msg":"success"})

    }

    async isFollow(followingId:any,followerId:any){

        const follower = await profileRepository.findOneBy({id:Number(followerId)})
        const following = await profileRepository.findOneBy({id:Number(followingId)})


        const existingFollow = await followRepository.findOne({

            where:{followers:follower!,following:following!}
        
        })

        console.log(existingFollow);
        

        if(existingFollow){

           return true
        }
        else{

            return false
        }
    }

    async unFollow(followingId : any,followerId :any){

       const result = await followRepository.delete({
        followers:{
            id:followerId
        },following:{
            id:followingId
        }})

        return result


    }

    async getFollowers(profileId:any){

        const followers = await followRepository.find({
            where:{
                following:{
                    id:Number(profileId)
                }
            },
            relations:{
                followers:true
            }
        })

        return followers
    }

    async getFollowing(profileId:any){

        const followings = await followRepository.find({
            where:{
                followers:{
                    id:Number(profileId)
                }
            },
            relations:{
                following:true
            }
        })

        return followings
    }
    
}
export default new profileService()