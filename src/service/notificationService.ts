import AppDataSource from "../configuration/config"
import { Notification } from "../entities/notification"
import { Profile } from "../entities/profile"
import { Report } from "../entities/report"
import { AppError } from "../types/errorHandler"



const profileRepository = AppDataSource.getRepository(Profile)
const NotificationRepository = AppDataSource.getRepository(Notification)
const ReportRepository = AppDataSource.getRepository(Report)

class notificationService{

    async addNotification(profileId:number,notification:string){

        console.log("done",profileId,notification);
        

       const profile = await profileRepository.findOne({
            relations:{
                notification:true
            },
            where :{
                id:profileId
            }
        })

        if(!profile){

            throw new AppError('user not found',404)
        }

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

        if(!profile){

            throw new AppError('user not found',404)
        }


        console.log("winoti",profile);
        

        const notificatios = await NotificationRepository.find({
            where:{
                profile:profile!
            }
        })

        return notificatios;
        

    }
    
    async addReport(report:any){

        console.log(report);
        

       const result = await ReportRepository.save(report)

      return result
      
    }

    async getReport(){

        const reports = await ReportRepository.find({
            order:{
                id:"DESC"
            }
        })

        return reports

    }





}

export default new notificationService()