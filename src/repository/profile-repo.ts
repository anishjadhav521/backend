import AppDataSource from "../configuration/config";
import { Profile } from "../entities/profile";
import { User } from "../entities/user";
import { id } from "../middleware/authMiddleware";
import { AppError } from "../types/errorHandler";

const profileRepository  = AppDataSource.getRepository(Profile)
const userRepository = AppDataSource.getRepository(User)


class profileRepo{
    async getUserProfile(){

        let user = await userRepository.findBy({
            userId : id
        })

        console.log("hiite profile");
        
        

       const profile =  await profileRepository.findBy({

            user:user
        })
        console.log("profile of user",profile);
        
        return profile;


  }

  async updateUsername( newUsername:any , profileId:any){

    const user = userRepository.findOne({where:{
        userId:id
    }})
    if(!user){

        throw new AppError('user doesnt exist',404)
    }

   const updatedProfile = await profileRepository.update({

        id : profileId
    },{

        userName:newUsername

    })

    console.log(updatedProfile);

    return updatedProfile;
    

  }

  async updateEmail( newEmail:any , profileId:any){
    

    const updatedProfile = await profileRepository.update({
 
         id : profileId
     },{
 
         email:newEmail
 
     })
 
     console.log(updatedProfile);
 
     return updatedProfile;
     
 
   }

   async updatePhoneNumber( newPhoneNumber:any , profileId:any){
    

    const updatedProfile = await profileRepository.update({
 
         id : profileId
     },{
 
         phoneNumber:newPhoneNumber
 
     })
 
     console.log(updatedProfile);
 
     return updatedProfile;
     
 
   }

   async updateBio( newBio:any , profileId:any){
    

    const updatedProfile = await profileRepository.update({
 
         id : profileId
     },{
 
         bio:newBio
 
     })
 
     console.log(updatedProfile);
 
     return updatedProfile;
     
 
   }

   





}

export default new profileRepo()