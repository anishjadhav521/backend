import notificationService from "../service/notificationService"


class NotificationController{

    addNotification=async (req:any,res:any)=>{

        console.log("notificaiton hitted");
        
        console.log(req.body);
        

        const profileId = req.body.profileId
        const notification = req.body.notification

        const result = await notificationService.addNotification(profileId,notification)

        if(result){

            res.status(200)

        }
        else{

            res.status(422)
        }
        



    }
    
    getNotificaion= async(req:any,res:any)=>{

        console.log("hited get noti");
        

       const profileId = req.params['profileId']

        console.log(profileId);
        
        const notifications = await notificationService.getNotifications(profileId)

        

        if(notifications){

            res.status(200).json({"notification":notifications})
        }
        else{

            res.status(503)
        }




    }

}

export default new NotificationController()