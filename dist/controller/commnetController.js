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
const commentService_1 = __importDefault(require("../service/commentService"));
class CommentController {
    constructor() {
        this.addComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("hited comment");
            const { comment, profileId, postId } = req.body;
            const result = yield commentService_1.default.addComment(comment, profileId, postId);
            if (result) {
                res.status(200);
            }
            else {
                res.status(400);
            }
        });
        this.getComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("get comment");
            const postId = req.params['postId'];
            console.log(postId);
            const comments = yield commentService_1.default.getComment(postId);
            if (comments) {
                res.json({ "comments": comments });
            }
            else {
                res.status(500);
            }
        });
        this.deleteComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = req.params['commentId'];
                const result = yield commentService_1.default.deleteComment(commentId);
                if (result) {
                    res.status(200);
                }
                else {
                    res.status(500);
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new CommentController();
