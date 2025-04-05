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
const profile_1 = require("../entities/profile");
const user_1 = require("../entities/user");
const authRepo = config_1.default.getRepository(user_1.User);
const profileRepo = config_1.default.getRepository(profile_1.Profile);
class authRepository {
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield authRepo.save(user);
        });
    }
    findProfile(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield profileRepo.findOne({
                relations: {
                    user: true
                },
                where: {
                    email: email
                }
            });
        });
    }
}
exports.default = new authRepository();
