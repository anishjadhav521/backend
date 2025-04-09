import jwt from "jsonwebtoken"
import { secretKey } from "../service/authService";
import { Request } from "express";
import { Response } from "express";

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
        res.status(401).json({
            success: false,
            message: 'Token is not provided',
        });
    }
}

export default authentication 