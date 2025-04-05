import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'message5003'})
export class Message{

    @PrimaryGeneratedColumn()
    messageId:number;

    @Column()
    senderId:number;

    @Column()
    receiverId:number

    @Column("text")
    content:string

}