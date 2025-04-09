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
const postService_1 = __importDefault(require("../service/postService"));
class postController {
    constructor() {
        this.getPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield postService_1.default.getPost();
                res.json({ 'posts': posts });
            }
            catch (err) {
                next(err);
            }
        });
        this.addPost = (path, caption) => {
            console.log("adding post");
            return postService_1.default.addPost(path, caption);
        };
        this.addLike = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("now");
                console.log(req.body);
                yield postService_1.default.addLike(req.body.postId);
            }
            catch (err) {
                next(err);
            }
            // if(like){
            //     res.status(200).json({msg:like})
            // }
            // else{
            //     res.status(500)
            // }
            // if(like==="user not found"){
            //     res.json({"msg":"user not found "})
            // }
            // else if(like){
            //     res.json({"msg":like})
            // }
        });
    }
    deletLike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params['postId'];
                console.log(postId);
                yield postService_1.default.deletLike(postId);
                res.status(200).json({ msg: 'disliked' });
            }
            catch (err) {
                next(err);
            }
            // if(result.affected === 0) return res.status(404).json({msg:"like not found"})
        });
    }
    deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("delet post hited");
                const postId = req.params['postId'];
                // console.log(postId);
                yield postService_1.default.deletePost(postId);
                res.status(200);
            }
            catch (err) {
                next(err);
            }
            //    if(result.affected === 0) return res.status(404).json({msg:"post not found"})
            //     res.json({msg:'post deleted'})
        });
    }
}
exports.default = new postController();
