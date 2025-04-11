import { log } from "console";
import { id } from "../middleware/authMiddleware";
import profileService from "../service/profileService";
import { resourceLimits } from "worker_threads";
import { NextFunction, Response,Request } from "express";


class profileController{

    async getUserProfile(req:any,res:any){

        console.log("profile hitee");
        
       const profile = await profileService.getUserProfile()
    
       if(profile){
    
        res.status(200).json({"profile":profile})
       }
       else{
    
        res.status(400).json({"err":"cant fetch profile"})
       }
    }
    
    async updateUsername(req:Request,res:Response,next:NextFunction){

    try{

        console.log(req.body);

        const updatedProfile = await profileService.updateUsername(req.body)

        res.status(200).json({"updatedProfile":updatedProfile})


    }
    catch(err){

        next(err)
    }
        
    
    }

    async updateEmail(req:any,res:any){

        console.log(req.body.newEmail);

        const updatedProfile = await profileService.updateEmail(req.body)

        res.status(200).json({"updatedProfile":updatedProfile})

    }
    
    async updatePhoneNumber(req:any,res:any){

        // console.log(req.body.newEmail);

        const updatedProfile = await profileService.updatePhoneNumber(req.body)

        res.status(200).json({"updatedProfile":updatedProfile})


    }

    async updateBio(req:any,res:any){

        // console.log(req.body.newEmail);

        const updatedProfile = await profileService.updateBio(req.body)
        
        res.status(200).json({"updatedProfile":updatedProfile})

    }
    async updatePassword(req:any,res:any){

        // console.log(req.body.newEmail);

        const updatedProfile = await profileService.updatePassword(req.body)

        res.status(200).json({"updatedProfile":updatedProfile})


    }

    follow = async (req : any,res:any)=>{

        console.log("hited follow");
        
        const {followingId,followerId} = req.body
        // const followerId = id

        console.log(req.body);
        
        console.log(followerId,followingId);
        
        profileService.follow(followerId,followingId,res);

    }

    isFollow = async(req : any,res:any)=>{

        const followingId=req.params['followingId']
        const followerId=req.params['followerId']

        const result = await profileService.isFollow(followingId,followerId)
        
        console.log("rs",result);
        
        res.status(200).json({"isFollowing": result})  


    }

    unFollow = async(req:any,res:any)=>{

        console.log("hitted unfollow");
        
        const followingId=req.body['followingId']
        const followerId=req.body['followerId']

        const result = await profileService.unFollow(followingId,followerId)
        res.json({"msg":result})
    }

    getFollowers= async (req:any,res:any)=>{

        const profileId=req.params['profileId']

        console.log(profileId);
        
        const followers = await profileService.getFollowers(profileId)

        console.log(followers);
        
        res.status(200).json({"followers":followers})




    }

    getFollowing = async (req:Request,res:Response)=>{

        const profileId=req.params['profileId']

        const followings = await profileService.getFollowing(profileId)

        res.status(200).json({"followings":followings})
    }
    
    async updateProfilePic(path:string){

        
        profileService.updateProfilePic(path)


    }
}

export default new profileController()

