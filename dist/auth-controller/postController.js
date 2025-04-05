"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postService_1 = __importDefault(require("../auth-service/postService"));
class postController {
    constructor() {
        this.findPost = (req, res) => {
            postService_1.default.findPost(req.id);
        };
    }
}
exports.default = new postController();
