import AppDataSource from "../configuration/config";
import { Profile } from "../entities/profile";
import { User } from "../entities/user";
import { id } from "../middleware/authMiddleware";

const authRepo = AppDataSource.getRepository(User)
const profileRepo = AppDataSource.getRepository(Profile)

class authRepository{

    async signUp(user:User){

        return await authRepo.save(user);  
        
    }

    async findProfile(email:string){

        return await profileRepo.findOne({
            relations:{

                user:true

            },
            where:{
                email:email
            }

        })

    }



}

export default new authRepository()
