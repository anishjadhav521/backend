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
const authMiddleware_1 = require("../middleware/authMiddleware");
const errorHandler_1 = require("../types/errorHandler");
const profileRepository = config_1.default.getRepository(profile_1.Profile);
const userRepository = config_1.default.getRepository(user_1.User);
class profileRepo {
    getUserProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield userRepository.findBy({
                userId: authMiddleware_1.id
            });
            console.log("hiite profile");
            const profile = yield profileRepository.findBy({
                user: user
            });
            console.log("profile of user", profile);
            return profile;
        });
    }
    updateUsername(newUsername, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = userRepository.findOne({ where: {
                    userId: authMiddleware_1.id
                } });
            if (!user) {
                throw new errorHandler_1.AppError('user doesnt exist', 404);
            }
            const updatedProfile = yield profileRepository.update({
                id: profileId
            }, {
                userName: newUsername
            });
            console.log(updatedProfile);
            return updatedProfile;
        });
    }
    updateEmail(newEmail, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProfile = yield profileRepository.update({
                id: profileId
            }, {
                email: newEmail
            });
            console.log(updatedProfile);
            return updatedProfile;
        });
    }
    updatePhoneNumber(newPhoneNumber, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProfile = yield profileRepository.update({
                id: profileId
            }, {
                phoneNumber: newPhoneNumber
            });
            console.log(updatedProfile);
            return updatedProfile;
        });
    }
    updateBio(newBio, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProfile = yield profileRepository.update({
                id: profileId
            }, {
                bio: newBio
            });
            console.log(updatedProfile);
            return updatedProfile;
        });
    }
}
exports.default = new profileRepo();
