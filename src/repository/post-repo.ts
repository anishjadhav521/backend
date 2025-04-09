import { Like } from "typeorm";
import AppDataSource from "../configuration/config";
import { Post } from "../entities/post";
import { id } from "../middleware/authMiddleware";
import { Likes } from "../entities/like";
import userRepo from "./user-repo";
import { User } from "../entities/user";
import { AppError } from "../types/errorHandler";

const postRepo = AppDataSource.getRepository(Post);
const likeRepo = AppDataSource.getRepository(Likes);
const userRepo3 = AppDataSource.getRepository(User)

class postRepository{

    async getPost(){

      // console.log(await postRepo.query(`SELECT * FROM post5004 WHERE user_id = ${id})));

      // console.log("dj",await postRepo.query(`SELECT * FROM post5004 WHERE user_id = ${id}`));

      const user = await userRepo3.findBy({

         userId:id
      })

      if(!user){

        throw new AppError('user not found',404)
      }

      const posts = await postRepo.find({
        where:{
          user:user
       },
       order:{

        PostId:"DESC"

       }
      }
        
        
       
     )

      return posts;
      
      //  return await postRepo.query(`SELECT * FROM post5004 WHERE user_id = ${id}`);

       
         
    }

    async updateLike(like:Likes){

      //  return await likeRepo.update(like.likeId, {count : updatedLikes});
      return await likeRepo.save(like)
    }
}

export default new postRepository()