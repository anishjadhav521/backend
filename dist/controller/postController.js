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
        this.getPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const posts = yield postService_1.default.getPost();
            // console.log("post form",posts);
            res.json({ 'posts': posts });
        });
        this.addPost = (path, caption) => {
            console.log("adding post");
            return postService_1.default.addPost(path, caption);
        };
        this.addLike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("from controller", req.body);
            const like = yield postService_1.default.addLike(req.body);
            // if(like==="user not found"){
            //     res.json({"msg":"user not found "})
            // }
            // else if(like){
            //     res.json({"msg":like})
            // }
        });
    }
}
exports.default = new postController();
