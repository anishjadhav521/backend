
import { IsEmail, IsNotEmpty, IsOptional, Matches, MATCHES } from "class-validator"

export class loginDto{

    @IsOptional()
    @IsEmail()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,{
        message:"Check email"
    })
    email:string

    @IsOptional()
    @Matches(/^[a-zA-Z0-9_]{3,20}$/,{
        message:"check username"
    })
    username:string

    @IsOptional()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,{
        message:"check pass"
    })
    password:string





}