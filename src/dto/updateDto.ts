import { IsEmail, IsNotEmpty, IsOptional, Length, Matches } from "class-validator"


export class updateDto{


    @IsNotEmpty()
    profileId:number

    @IsOptional()
    @IsEmail()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,{
           message:"Check email"
    })
    email:string

    @IsOptional()
    @Matches(/^[6-9]\d{9}$/,{
        message:"check phone number"
    })
    phoneNumber:string

    @IsOptional()
    @Length(0,50)
    bio:string

    @IsOptional()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,{
        message:"check pass"
    })
    password:string

    @IsOptional()
    @Matches(/^[a-zA-Z0-9_]{3,20}$/,{
        message:"check username"
    })
    username:string

}