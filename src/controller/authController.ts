import { NextFunction, Response,Request } from "express";
import authService from "../service/authService"
import { AppError } from "../types/errorHandler";
import { log } from "console";


class authController {

    signUp = async (req: Request, res: Response,next: NextFunction) => {

        try{

            const result = await authService.signUp(req, res)

            res.status(200).json({ 'msg': 'signup complete !!' });
        
        }
        catch(err){
            
            next(err);

        }
    }

    logIn = async (req: Request, res: Response,next:NextFunction) => {

        try{

            console.log("login hitted");
            

            await authService.logIn(req, res, next);
            // res.status(200).json({msg:"logged in"})

        }
        catch(err){

            // console.log(err);
            

            next(err)

        }

       
    }

    logOut = async(req: any, res: any)=>{

        res.clearCookie('authToken',{

            httpOnly:true,
            secure:true,
            sameSite:'lax'
        })
        res.status(200).json({msg:"logged out"})


    }


}

export default new authController()