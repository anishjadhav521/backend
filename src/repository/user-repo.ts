import AppDataSource from "../configuration/config"
import { Profile } from "../entities/profile"
import { User } from "../entities/user"
import { id } from "../middleware/authMiddleware"

const userRepository = AppDataSource.getRepository(User)
const profileRepository = AppDataSource.getRepository(Profile)

class userRepo{

    // async getUser(id:number){

    // //    console.log("hi",await userRepository.findOneBy({userId:id}));
       
    //    return await userRepository.findOne(id, 
    //     {
    //     relations: ["post"],
    //      });
    
    // }

    async getUser(id: number) {

        console.log("hiii");
        

        return await userRepository.find({
            relations:{
                // post:{
                //   like:true
                // },
                post:true,
                profile:true,

            },where:{

               userId:id
        }}
    )


    
      }

    async   getUsers(username:string){

       const users =  await profileRepository.createQueryBuilder('profile').
       where("profile.userName LIKE :name",{name: `%${username}%` })
       .getMany();

       console.log( users);
       return users
       

    }

    

    

}

export default new userRepo()

