import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Follow } from "./follow";
import { Notification } from "./notification";
import { Comment } from "./comments";

@Entity({ name: "profile5003" })
export class Profile {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({default:null})
    bio: string;

    @Column({unique:true})
    userName: string;

    @Column()
    phoneNumber: string;

    @Column({default:null})
    profilePic:string

    @Column({unique:true})
    email: string

    @OneToOne(() => User, (user)=>user.profile, {onDelete: "CASCADE",onUpdate:"CASCADE"})
    @JoinColumn()
    user: User

    @OneToMany(()=>Follow,(follow)=>follow.following)
    following:Follow[]

    @OneToMany(()=>Follow,(follow)=>follow.followers)
    followers : Follow[]

    @OneToMany(()=>Notification,(notificatio)=>notificatio.profile)
    notification:Notification

    @OneToMany(()=>Comment,(comment)=>comment.profile)
    comments:Comment[]

}