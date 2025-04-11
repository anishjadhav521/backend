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
const user_repo_1 = __importDefault(require("../repository/user-repo"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const config_1 = __importDefault(require("../configuration/config"));
const profile_1 = require("../entities/profile");
const user_1 = require("../entities/user");
const post_1 = require("../entities/post");
const like_1 = require("../entities/like");
const enum_1 = require("../enums/enum");
const errorHandler_1 = require("../types/errorHandler");
const profileRepository = config_1.default.getRepository(profile_1.Profile);
const userRepository = config_1.default.getRepository(user_1.User);
const postRepository = config_1.default.getRepository(post_1.Post);
const likeRepository = config_1.default.getRepository(like_1.Likes);
// const yzRepo = AppDataSource.getMongoRepository(likeuser5003)
// const 
class userService {
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_repo_1.default.getUser(authMiddleware_1.id);
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield profileRepository.findOne({
                relations: {
                    user: {
                        post: {
                            like: {
                                user: true
                            }
                        }
                    }
                },
                where: {
                    userName: username
                }
            });
            console.log("usr", username);
            console.log("ansh", user);
            if (!user) {
                throw new errorHandler_1.AppError('not found', 400);
            }
            return user;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield profileRepository.find({
                where: {
                    role: enum_1.Role.User,
                    status: false
                }
            });
            console.log("romr all users", users);
            return users;
        });
    }
    deleteUser(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield profileRepository.findOne({
                where: { id: profileId },
            });
            if (!profile) {
                throw new errorHandler_1.AppError('not found', 404);
            }
            const user = yield userRepository.findOne({
                where: {
                    profile: profile,
                },
                relations: {
                    profile: true,
                    post: true
                }
            });
            user.status = true;
            user.profile.status = true;
            yield userRepository.save(user);
        });
    }
}
exports.default = new userService();
// console.log(user);
// postRepository.query('delete from  post5004 where user_id = @0',[user?.userId])
//    const like = await likeRepository.findOneBy({post:user?.post})
//    console.log(like);
//    await likeRepository.delete({likeId:like?.likeId})
// postRepository.delete({user:user!})
// const result = await userRepository.delete({userId:user?.userId});
// console.log(result);
