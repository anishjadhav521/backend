import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post";
import { Comment } from "./comments";
import { Profile } from "./profile";
import { Likes } from "./like";
import { Role } from "../enums/enum";

                                 

@Entity({name:"user5003"})
export class User{

    @PrimaryGeneratedColumn()
    userId?:number;

    @Column({
        enum:Role
    })
    role:Role

    @Column()
    fullName:string;

    @Column()
    phoneNumber:string

    // @Column({unique:true})
    // userName:string;

    @Column()
    password:string;

    // @Column({unique:true})
    // email:string;

    @OneToOne(()=>Profile,(profile)=>profile.user,{cascade:true})
    profile:Profile

    // @OneToMany(()=>comment,(comment)=>comment.user)
    // coment:comment[]

    @OneToMany(()=>Post,(Post)=>Post.user,{cascade:true})
    post:Post[]

    @OneToMany(()=>Likes,(Likes)=>Likes.user)
    likes:Likes[]

    @Column({nullable:true})
    status:boolean

    

}