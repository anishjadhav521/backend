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
exports.secretKey = void 0;
const auth_repo_1 = __importDefault(require("../repository/auth-repo"));
const profile_1 = require("../entities/profile");
const user_1 = require("../entities/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../configuration/config"));
exports.secretKey = "ansh";
const userRepo = config_1.default.getRepository(user_1.User);
class AuthService {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userName, password, email, fullName, phoneNumber } = req.body;
            const profile = new profile_1.Profile();
            profile.email = email;
            profile.phoneNumber = phoneNumber;
            profile.userName = userName;
            const user = new user_1.User();
            user.fullName = fullName;
            user.phoneNumber = phoneNumber;
            user.password = password;
            user.profile = profile;
            user.post = [];
            return yield auth_repo_1.default.signUp(user);
        });
        this.logIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const profile = yield auth_repo_1.default.findProfile(req.body.email);
            if (!profile) {
                res.status(400).json({ msg: "user not found" });
            }
            else {
                if (req.body.password === (profile === null || profile === void 0 ? void 0 : profile.user.password)) {
                    const token = jsonwebtoken_1.default.sign({ id: profile === null || profile === void 0 ? void 0 : profile.user.userId }, exports.secretKey, { expiresIn: '1h' });
                    const tokenWtBearer = 'bearer ' + token;
                    res.cookie('authToken', tokenWtBearer);
                    res.status(200).json({ msg: "logged in" });
                }
                else {
                    res.status(401).json({ msg: "wrong credential" });
                }
            }
        });
    }
}
exports.default = new AuthService();
