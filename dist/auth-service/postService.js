"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_repo_1 = __importDefault(require("../repository/post-repo"));
class postService {
    constructor() {
        this.findPost = (id) => {
            post_repo_1.default.findPost();
        };
    }
}
exports.default = new postService();
