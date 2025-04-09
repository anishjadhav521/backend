import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"report5003"})
export class Report{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    report:string

}