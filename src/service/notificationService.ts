import AppDataSource from "../configuration/config"
import { Notification } from "../entities/notification"
import { Profile } from "../entities/profile"



const profileRepository = AppDataSource.getRepository(Profile)
const NotificationRepository = AppDataSource.getRepository(Notification)

class notificationService{

    async addNotification(profileId:number,notification:string){

       const profile = await profileRepository.findOne({
            relations:{
                notification:true
            },
            where :{
                id:profileId
            }
        })

        console.log(profile);
        
        const noti = new Notification()

        noti.notification = notification
        noti.profile = profile!

        return await NotificationRepository.save(noti)


    }
    
    async getNotifications(profileId:number){

        console.log(profileId);
        
        
       const profile = await profileRepository.findOne({
            relations:{
                notification:true
            },
            where:{

                id:profileId

            }
        })

        const notificatios = await NotificationRepository.find({
            where:{
                profile:profile!
            }
        })

        return notificatios;
        

    }



}

export default new notificationService()