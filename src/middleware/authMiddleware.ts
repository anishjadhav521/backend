import jwt from "jsonwebtoken"
import { secretKey } from "../service/authService";
import { Request } from "express";
import { Response } from "express";
import { log } from "console";
import { AppError } from "../types/errorHandler";

export let id: number

const authentication = (req: Request, res: Response, next: () => void) => {
    console.log('middleware');
    
    const token = req.cookies.authToken

    if (token && token.startsWith('bearer')) {

        const tokenParts = token.split(' ');
        const tokenWithoutBearer = tokenParts[1];

        jwt.verify(tokenWithoutBearer, secretKey, (err: any, data: any) => {

            if (err) {

                return res.status(403).json({
                    success: false,
                    message: 'Invalid token',
                });
            }
            else {

                id = data.id
                next()
            }
        })
    }
    else {

        console.log("anish occured");
        
        // res.status(401).json({

        //     success: false,
        //     message: 'Token is not provided',
        // });

        throw new AppError('token not provided',401)
    }
}

export default authentication 