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
const userService_1 = __importDefault(require("../service/userService"));
class userController {
    constructor() {
        this.getUserByUsername = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("get user by username");
                const username = req.params['username'];
                const user = yield userService_1.default.getUserByUsername(username);
                console.log(user);
                res.json({ "user": user });
            }
            catch (err) {
                next(err);
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("hited getuser");
            const user = yield userService_1.default.getUser();
            res.json({ "user": user });
            // console.log(user!.post[0].like);
        });
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let username = req.params['username'];
            const users = yield user_repo_1.default.getUsers(username);
            console.log(users);
            res.status(200).json({ "users": users });
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield userService_1.default.getAll();
            if (users) {
                res.status(200).json({ "users": users });
            }
            else {
                res.status(500);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("delete hitted");
                const profileId = req.params['userId'];
                yield userService_1.default.deleteUser(profileId);
                res.status(200).json({ msg: 'deleted' });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new userController();
