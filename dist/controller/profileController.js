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
const profileService_1 = __importDefault(require("../service/profileService"));
class profileController {
    constructor() {
        this.follow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("hited follow");
            const { followingId, followerId } = req.body;
            // const followerId = id
            console.log(req.body);
            console.log(followerId, followingId);
            profileService_1.default.follow(followerId, followingId, res);
        });
        this.isFollow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const followingId = req.params['followingId'];
            const followerId = req.params['followerId'];
            const result = yield profileService_1.default.isFollow(followingId, followerId);
            console.log("rs", result);
            res.status(200).json({ "isFollowing": result });
        });
        this.unFollow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("hitted unfollow");
            const followingId = req.body['followingId'];
            const followerId = req.body['followerId'];
            const result = yield profileService_1.default.unFollow(followingId, followerId);
            res.json({ "msg": result });
        });
        this.getFollowers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const profileId = req.params['profileId'];
            console.log(profileId);
            const followers = yield profileService_1.default.getFollowers(profileId);
            console.log(followers);
            res.status(200).json({ "followers": followers });
        });
        this.getFollowing = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const profileId = req.params['profileId'];
            const followings = yield profileService_1.default.getFollowing(profileId);
            res.status(200).json({ "followings": followings });
        });
    }
    getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("profile hitee");
            const profile = yield profileService_1.default.getUserProfile();
            if (profile) {
                res.status(200).json({ "profile": profile });
            }
            else {
                res.status(400).json({ "err": "cant fetch profile" });
            }
        });
    }
    updateUsername(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const updatedProfile = yield profileService_1.default.updateUsername(req.body);
                res.status(200).json({ "updatedProfile": updatedProfile });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.newEmail);
            const updatedProfile = yield profileService_1.default.updateEmail(req.body);
            res.status(200).json({ "updatedProfile": updatedProfile });
        });
    }
    updatePhoneNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body.newEmail);
            const updatedProfile = yield profileService_1.default.updatePhoneNumber(req.body);
            res.status(200).json({ "updatedProfile": updatedProfile });
        });
    }
    updateBio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body.newEmail);
            const updatedProfile = yield profileService_1.default.updateBio(req.body);
            res.status(200).json({ "updatedProfile": updatedProfile });
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body.newEmail);
            const updatedProfile = yield profileService_1.default.updatePassword(req.body);
            res.status(200).json({ "updatedProfile": updatedProfile });
        });
    }
    updateProfilePic(path) {
        return __awaiter(this, void 0, void 0, function* () {
            profileService_1.default.updateProfilePic(path);
        });
    }
}
exports.default = new profileController();
