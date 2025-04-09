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
const post_1 = require("../entities/post");
const authMiddleware_1 = require("../middleware/authMiddleware");
const like_1 = require("../entities/like");
const user_1 = require("../entities/user");
const errorHandler_1 = require("../types/errorHandler");
const postRepo = config_1.default.getRepository(post_1.Post);
const likeRepo = config_1.default.getRepository(like_1.Likes);
const userRepo3 = config_1.default.getRepository(user_1.User);
class postRepository {
    getPost() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(await postRepo.query(`SELECT * FROM post5004 WHERE user_id = ${id})));
            // console.log("dj",await postRepo.query(`SELECT * FROM post5004 WHERE user_id = ${id}`));
            const user = yield userRepo3.findBy({
                userId: authMiddleware_1.id
            });
            if (!user) {
                throw new errorHandler_1.AppError('user not found', 404);
            }
            const posts = yield postRepo.find({
                where: {
                    user: user
                },
                order: {
                    PostId: "DESC"
                }
            });
            return posts;
            //  return await postRepo.query(`SELECT * FROM post5004 WHERE user_id = ${id}`);
        });
    }
    updateLike(like) {
        return __awaiter(this, void 0, void 0, function* () {
            //  return await likeRepo.update(like.likeId, {count : updatedLikes});
            return yield likeRepo.save(like);
        });
    }
}
exports.default = new postRepository();
