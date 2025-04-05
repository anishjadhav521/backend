import { Request, Response } from "express";
import userRepo from "../repository/user-repo";
import userService from "../service/userService"
import { Any } from "typeorm";


class userController {
    getUserByUsername = async(req: Request, res: Response)=> {

        console.log("get user by username");
        
        const username = req.params['username']

        const user =  await userService.getUserByUsername(username);
        console.log(user);
        
        res.json({"user":user})
    }

     getUser = async (req: any, res: any) =>{

        console.log("hited getuser");

        const user = await userService.getUser()
        
        res.json({"user":user})

        // console.log(user!.post[0].like);
        
    }

     getUsers = async(req:any,res:any)=>{

        let username = req.params['username'];

        const users = await userRepo.getUsers(username)

        res.status(200).json({"users":users})



    }

    getAll =async(req:any,res:any)=>{

      const users = await userService.getAll();

      if(users){

        res.status(200).json({"users":users})
      }
      else{

        res.status(500)
      }

    }

    deleteUser=async(req:any,res:any)=>{

        console.log("delete hitted");
        

       const profileId = req.params['userId']

       const result = await userService.deleteUser(profileId)



        


    }

    
}

export default new userController()