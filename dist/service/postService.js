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
const user_1 = require("../entities/user");
const authMiddleware_1 = require("../middleware/authMiddleware");
const post_repo_1 = __importDefault(require("../repository/post-repo"));
const like_1 = require("../entities/like");
const profile_1 = require("../entities/profile");
const errorHandler_1 = require("../types/errorHandler");
// import { id } from "../middleware/authMiddleware";
const userRepo = config_1.default.getRepository(user_1.User);
const postRepo1 = config_1.default.getRepository(post_1.Post);
const profileRepo = config_1.default.getRepository(profile_1.Profile);
const likeRepo = config_1.default.getRepository(like_1.Likes);
class PostService {
    constructor() {
        this.getPost = () => __awaiter(this, void 0, void 0, function* () {
            return yield post_repo_1.default.getPost();
        });
        this.addPost = (path, caption) => __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepo.findOne({
                relations: {
                    profile: true
                }, where: {
                    userId: authMiddleware_1.id
                }
            });
            if (!user) {
                return "user not found";
            }
            // const like = new Likes()
            // like.LikedBy = [];
            // like.isLiked = false;
            // like.count = 0;
            const post = new post_1.Post();
            post.comments = [];
            post.imgUrl = path;
            post.caption = caption;
            post.userName = user.profile.userName;
            post.user = user;
            // console.log("post",post);
            return yield postRepo1.save(post);
        });
        // updateLike = async(body:any)=>{
        //     console.log("bod",body);
        //     const postId = body.postId
        //     const post  = await postRepo1.findOneBy({
        //         PostId:postId
        //     })
        //     const user = await userRepo.findOneBy({
        //         userId:id
        //     })
        //     if(!user){
        //         return "user not found"
        //     }
        //     if(!post){
        //         return "post not found"
        //     }
        //     // const like = post.like;
        //     // like.count = body.updatedLikes;
        //     // like.LikedBy = []
        //     // like.LikedBy.push(user);
        //     // like.post = post
        //     // console.log(like);
        //     // console.log(user);
        //     // console.log(post);
        //     // console.log("likedbu",post.like.LikedBy);
        //     // if(!post.like.LikedBy){
        //         // post.like.LikedBy=[]
        //     // }
        //     // post.like.LikedBy=post.like.LikedBy
        //     if(body.updatedLiked == false ){
        //           post.like.LikedBy=post.like.LikedBy.filter((user)=>{
        //                 user.userId!=id
        //             })
        //     }
        //     else{
        //         post.like.LikedBy.push(user)
        //     }
        //     post.like.count = body.updatedLikes
        //     console.log(post.like);
        //     return await postRepo.updateLike(post.like);
        // }
    }
    addLike(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authMiddleware_1.id;
            // const postId = body.post.postId
            console.log("we", authMiddleware_1.id, postId);
            const user = yield userRepo.findOne({ where: {
                    userId: userId
                } });
            const post = yield postRepo1.findOne({ where: {
                    PostId: postId
                } });
            // post?.likesCount;
            if (!post || !user) {
                console.log("user or post not found");
                // return "user or post not found"
                throw new errorHandler_1.AppError('user or post not found', 404);
            }
            const existingLike = yield likeRepo.findOne({
                where: {
                    user: {
                        userId: userId
                    },
                    post: {
                        PostId: postId
                    }
                }
            });
            if (existingLike) {
                console.log("like exists");
                throw new errorHandler_1.AppError("like exists", 503);
                // return  "like exists"
            }
            post.likesCount += 1;
            yield postRepo1.save(post);
            // const res =  await postRepo1.update({ PostId:post?.PostId!},{likesCount : post.likesCount++ })
            // console.log("s",res.affected);
            const like = likeRepo.create({ user, post });
            const lk = yield likeRepo.save(like);
            console.log("lk", lk);
        });
    }
    deletLike(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = authMiddleware_1.id;
            console.log("user", userId, postId);
            const post = yield postRepo1.findOne({ where: {
                    PostId: postId
                } });
            const result = yield likeRepo.delete({
                user: {
                    userId: userId
                },
                post: {
                    PostId: postId
                }
            });
            post.likesCount -= 1;
            yield postRepo1.save(post);
            if (result.affected === 0) {
                throw new errorHandler_1.AppError('ineternal server error', 503);
            }
            return result;
        });
    }
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const d = yield postRepo1.delete({ PostId: postId });
            if (d.affected === 0) {
                throw new errorHandler_1.AppError('ineternal server error', 503);
            }
            return d;
        });
    }
}
exports.default = new PostService();
