"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const post_1 = require("./post");
const profile_1 = require("./profile");
const like_1 = require("./like");
const enum_1 = require("../enums/enum");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: enum_1.Role
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_1.Profile, (profile) => profile.user, { cascade: true }),
    __metadata("design:type", profile_1.Profile
    // @OneToMany(()=>comment,(comment)=>comment.user)
    // coment:comment[]
    )
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_1.Post, (Post) => Post.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_1.Likes, (Likes) => Likes.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: "user5003" })
], User);
