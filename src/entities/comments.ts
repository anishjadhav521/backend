import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Post } from "./post";
import { Profile } from "./profile";


@Entity({name:"comment5003"})
export class Comment {

    @PrimaryGeneratedColumn()
    id?:number;

    @Column()
    comment : string

    @ManyToOne(()=>Profile,(profile)=>profile.comments,{onDelete:"CASCADE"})
    profile:Profile
    
    @ManyToOne(()=>Post,(post)=>post.comments,{onDelete:"CASCADE"})
    @JoinColumn()
    post:Post


}