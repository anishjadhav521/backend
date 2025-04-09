import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import { User } from "./user";
import { Post } from "./post";


@Entity({name:"likes5004"})
// @Unique(['user','post'])
export class Likes{

    @PrimaryGeneratedColumn()
    likeId:number

    // @Column()
    // count : number

    @ManyToOne(()=>User,(user)=>user.likes)
    user:User

    @ManyToOne(()=>Post,(post)=>post.like,{onDelete:"CASCADE"})
    post:Post

    // @Column()
    // isLiked : boolean

}