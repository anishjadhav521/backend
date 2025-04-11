"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../configuration/config"));
const profile_1 = require("../entities/profile");
const user_1 = require("../entities/user");
const userRepository = config_1.default.getRepository(user_1.User);
const profileRepository = config_1.default.getRepository(profile_1.Profile);
class userRepo {
    // async getUser(id:number){
    // //    console.log("hi",await userRepository.findOneBy({userId:id}));
    //    return await userRepository.findOne(id, 
    //     {
    //     relations: ["post"],
    //      });
    // }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hiii");
            const user = yield userRepository.findOne({
                relations: {
                    post: {
                        like: {
                            user: true
                        }
                    },
                    // post:true,
                    profile: true,
                }, where: {
                    userId: id
                }
            });
            return user;
            // console.log(user!.post[0].like[0].user);
        });
    }
    getUsers(username) {
        return __awaiter(this, void 0, void 0, function* () {
            //  const users =  await profileRepository.createQueryBuilder('profile').
            //  where("profile.userName LIKE :name",{name: `%${username}%` }).andWhere({
            //  })
            //  .getMany();
            const users = yield profileRepository.createQueryBuilder('profile')
                .where("profile.userName LIKE :name", { name: `%${username}%` })
                .andWhere("profile.status = :status", { status: false })
                .getMany();
            console.log("users", users);
            return users;
        });
    }
}
exports.default = new userRepo();
