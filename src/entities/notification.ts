import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile";
import notification from "../controller/notification";


@Entity({name:'notification5003'})
export class Notification{

    @PrimaryGeneratedColumn()
    notificationId:number

    @Column()
    notification:string;

    @ManyToOne(()=>Profile,(profile)=>profile.notification,{onDelete:"CASCADE"})
    @JoinColumn()
    profile:Profile


}