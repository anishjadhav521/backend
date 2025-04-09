import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { Comment } from "./comments";
import { Likes } from "./like";


@Entity({name:"post5004"})
export class Post {

    @PrimaryGeneratedColumn()
    PostId?:number;

    @Column()
    userName:string

    @OneToMany(()=>Comment,(comment)=>comment.post,{eager:true})
    comments:Comment[];

    @Column()
    imgUrl:string

    @Column({default:null})
    caption:string

    @ManyToOne(()=>User,(user)=>user.post,{onDelete:"SET NULL"})
    @JoinColumn({name:"user_id"})
    user?:User

    @OneToMany(()=>Likes,(like)=>like.post)
    like : Likes[]

    @Column({default:0})
    likesCount:number
    
}