
import {IsEmail, IsNotEmpty, Matches} from "class-validator"
import { Check } from "typeorm"


export class SignUpDto{

    @IsNotEmpty()
    userName:string

    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,{
        message:"check pass"
    })
    password:string

    @IsNotEmpty()
    @IsEmail()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,{
        message:"Check email"
    })
    email:string

    @IsNotEmpty()
    fullName:string

    @IsNotEmpty()
    @Matches(/^[6-9]\d{9}$/,{
        message:"check phone number"
    })
    phoneNumber:string


}



