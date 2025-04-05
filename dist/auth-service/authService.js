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
const auth_repo_1 = __importDefault(require("../repository/auth-repo"));
const profile_1 = require("../entities/profile");
const user_1 = require("../entities/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secreteKey = "ansh";
class authService {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password, email } = req.body;
            const profile1 = new profile_1.profile();
            profile1.bio = username;
            const user = new user_1.User();
            user.userName = username;
            user.password = password;
            user.email = email;
            user.profile = profile1;
            user.coment = [];
            user.post = [];
            return yield auth_repo_1.default.signUp(user);
        });
        this.logIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_repo_1.default.findUser(req.body.email);
            if (!user) {
                res.status(400).json({ 'msg': "user not found}" });
            }
            else {
                if (req.body.password === user.password) {
                    const token = jsonwebtoken_1.default.sign({ name: user.id }, secreteKey, { expiresIn: '1h' });
                    // res.setHeader('Authorization',`bearer ${token}`)
                    const tokenWtBearer = 'bearer ' + token;
                    // res.cookie('authToken',tokenWtBearer,{httpOnly:true,maxAge:86400000,sameSite:'lax'})
                    res.cookie('authToken', tokenWtBearer);
                    res.status(200).json({ "msg": "logged in" });
                }
                else {
                    res.status(401).json({ "msg": "wrong credential" });
                }
            }
        });
    }
}
exports.default = new authService();
