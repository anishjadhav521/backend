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
        

        const user = await userRepository.findOne({
            relations:{
                post:{
                  like:{
                    user:true
                  }
                },
                // post:true,
                profile:true,

            },where:{

               userId:id
        }}

        

        
    )

    return user;
    // console.log(user!.post[0].like[0].user);
  }

    async   getUsers(username:string){

      //  const users =  await profileRepository.createQueryBuilder('profile').
      //  where("profile.userName LIKE :name",{name: `%${username}%` }).andWhere({
      
      //  })
      //  .getMany();

      
const users = await profileRepository.createQueryBuilder('profile')
    .where("profile.userName LIKE :name", { name: `%${username}%` })
    .andWhere("profile.status = :status", { status: false })
    .getMany();



       console.log("users", users);
       return users
       

    }

    

    

}

export default new userRepo()

