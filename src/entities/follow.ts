import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Profile } from "./profile";
import profileController from "../controller/profileController";


@Entity({name:"follow5003"})
export class Follow{


    @PrimaryGeneratedColumn()
    followId:number;

    @ManyToOne(()=>Profile,(profile)=>profile.following)
    @JoinColumn({name:'followingId'})
    following : Profile

    @ManyToOne(()=>Profile,(profile)=>profile.followers,{onDelete:"CASCADE"})
    @JoinColumn({name:'followerId'})
    followers : Profile



}