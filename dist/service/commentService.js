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
const profile_1 = require("../entities/profile");
const comments_1 = require("../entities/comments");
const errorHandler_1 = require("../types/errorHandler");
const commentRepository = config_1.default.getRepository(comments_1.Comment);
const profileRepository = config_1.default.getRepository(profile_1.Profile);
const postRepository = config_1.default.getRepository(post_1.Post);
class CommentService {
    constructor() {
        this.getComment = (postId) => __awaiter(this, void 0, void 0, function* () {
            const post = yield postRepository.findOne({
                where: {
                    PostId: postId
                }
            });
            const allComments = yield commentRepository.find({
                where: {
                    post: post
                },
                relations: {
                    profile: true
                }
            });
            let comments;
            allComments.forEach((com) => {
                let comment = {
                    username: com.profile.userName,
                    comment: com.comment,
                    commentId: com.id
                };
                if (!comments) {
                    comments = [];
                }
                comments.push(comment);
            });
            console.log(comments);
            return comments;
            // console.log(comments);
        });
        this.deleteComment = (commentId) => __awaiter(this, void 0, void 0, function* () {
            console.log(commentId);
            const comment = yield commentRepository.delete({
                id: commentId
            });
            if (!comment) {
                throw new errorHandler_1.AppError('internal server error ', 500);
            }
            return comment;
        });
    }
    addComment(comment, profileId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield profileRepository.findOne({
                where: {
                    id: profileId
                }
            });
            const post = yield postRepository.findOne({
                where: {
                    PostId: postId
                }
            });
            const com = new comments_1.Comment();
            com.post = post;
            com.profile = profile;
            com.comment = comment;
            return yield commentRepository.save(com);
        });
    }
}
exports.default = new CommentService();
