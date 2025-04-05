import { DataSource } from "typeorm";
import { Post } from "../entities/post";
import { Likes } from "../entities/like";
import { Profile } from "../entities/profile";
import { User } from "../entities/user";
import { Comment } from "../entities/comments";
import { Follow } from "../entities/follow";
import { Message } from "../entities/message";

const AppDataSource = new DataSource({

    type:"mssql",
    host:"dev.c5owyuw64shd.ap-south-1.rds.amazonaws.com",
    port:1982,
    username:"j2",
    password:"123456",
    database:"JIBE_Main_Training",
    synchronize: true,
    logging: false,
    entities: ["dist/entities/*.js"],
    options:{
        encrypt:true,
        trustServerCertificate:true
    }
})

export default AppDataSource