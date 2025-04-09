import { NextFunction, Request, Response } from "express";
import notificationService from "../service/notificationService"


class NotificationController{

    addNotification=async (req:Request,res:Response,next:NextFunction)=>{

     
        try{

            const profileId = req.body.profileId
            const notification = req.body.notification
    
           
            await notificationService.addNotification(profileId,notification)
    
            res.status(200)
    
        }
        catch(err){

            next(err)

        }
       
        



    }
    
    getNotificaion= async(req:Request,res:Response,next:NextFunction)=>{

        
        try{

        const profileId = Number(req.params['profileId'])

        console.log(profileId);
        
        const notifications = await notificationService.getNotifications(profileId)

        console.log("uu",notifications);
        
        res.status(200).json({"notification":notifications})
         
    }
    catch(err){

        next(err)
    }
        

       


    }

    async addReport(req:any,res:any){

        console.log("report heii");
        
        const report = req.body
        console.log(report);
        
        const result = await notificationService.addReport(report)


        if(result){

            res.json({msg:"reported"})
        }
        else{
            res.json({msg:"try after some time"})
        }

    }

    async getReport(req:any,res:any){

        const reports = await notificationService.getReport()

        if(reports){

            res.json({report:reports})
        } else{
            res.status(500)
        }

    }

}

export default new NotificationController()