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
const enum_1 = require("../enums/enum");
const errorHandler_1 = require("../types/errorHandler");
const class_transformer_1 = require("class-transformer");
const signupDto_1 = require("../dto/signupDto");
const class_validator_1 = require("class-validator");
const loginDto_1 = require("../dto/loginDto");
exports.secretKey = "ansh";
const userRepo = config_1.default.getRepository(user_1.User);
const profileRepo = config_1.default.getRepository(profile_1.Profile);
class AuthService {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userName, password, email, fullName, phoneNumber } = req.body;
            const userExist = yield profileRepo.findOne({
                where: {
                    email: email
                }
            });
            if (userExist) {
                throw new errorHandler_1.AppError('email already exists', 409);
            }
            const userExist1 = yield profileRepo.findOne({
                where: {
                    userName: userName
                }
            });
            if (userExist1) {
                throw new errorHandler_1.AppError('username already exists', 409);
            }
            const userDto = (0, class_transformer_1.plainToInstance)(signupDto_1.SignUpDto, req.body);
            const errors = yield (0, class_validator_1.validate)(userDto);
            if (errors.length > 0) {
                throw new errorHandler_1.AppError('invalid data', 400);
            }
            console.log(userDto);
            const profile = new profile_1.Profile();
            profile.email = userDto.email;
            profile.phoneNumber = userDto.phoneNumber;
            profile.userName = userDto.userName;
            profile.role = enum_1.Role.User;
            profile.status = false;
            const user = new user_1.User();
            user.fullName = userDto.fullName;
            user.phoneNumber = userDto.phoneNumber;
            user.password = userDto.password;
            user.role = enum_1.Role.User;
            user.status = false;
            user.profile = profile;
            user.post = [];
            return yield auth_repo_1.default.signUp(user);
        });
        this.logIn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const credentialDto = (0, class_transformer_1.plainToInstance)(loginDto_1.loginDto, req.body);
            const errors = yield (0, class_validator_1.validate)(credentialDto);
            if (errors.length) {
                throw new errorHandler_1.AppError('invalid data', 400);
            }
            console.log(credentialDto);
            const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(req.body.identifier);
            let profile;
            if (isEmail) {
                console.log(credentialDto.email);
                profile = yield profileRepo.findOne({
                    where: {
                        email: req.body.identifier
                    },
                    relations: {
                        user: true
                    }
                });
            }
            else {
                console.log("else", req.body.identifier);
                profile = yield profileRepo.findOne({
                    where: {
                        userName: req.body.identifier
                        // isEmail?{email:req.body.email}:{username:credentialDto.email}
                    },
                    relations: {
                        user: true
                    }
                });
            }
            console.log(profile);
            if (!profile || profile.status === true) {
                // res.status(400).j    son({ msg: "user not found" });
                console.log("profile err");
                throw new errorHandler_1.AppError('user not found', 404);
            }
            else {
                if (credentialDto.password === (profile === null || profile === void 0 ? void 0 : profile.user.password)) {
                    const token = jsonwebtoken_1.default.sign({ id: profile === null || profile === void 0 ? void 0 : profile.user.userId }, exports.secretKey, { expiresIn: '1h' });
                    const tokenWtBearer = 'bearer ' + token;
                    res.cookie('authToken', tokenWtBearer, {
                        secure: true,
                        httpOnly: true,
                        sameSite: 'lax',
                        maxAge: 60 * 60 * 1000
                    });
                    console.log("success fullu");
                    res.status(200).json({ msg: "logged in" });
                }
                else {
                    console.log("erroroororo");
                    throw new errorHandler_1.AppError('wrong credential', 401);
                }
            }
        });
    }
}
exports.default = new AuthService();
