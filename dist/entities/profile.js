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
exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const follow_1 = require("./follow");
const notification_1 = require("./notification");
const comments_1 = require("./comments");
const enum_1 = require("../enums/enum");
let Profile = class Profile {
};
exports.Profile = Profile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: enum_1.Role }),
    __metadata("design:type", String)
], Profile.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Profile.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Profile.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Profile.prototype, "profilePic", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_1.User, (user) => user.profile, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_1.User)
], Profile.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => follow_1.Follow, (follow) => follow.following),
    __metadata("design:type", Array)
], Profile.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => follow_1.Follow, (follow) => follow.followers),
    __metadata("design:type", Array)
], Profile.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_1.Notification, (notificatio) => notificatio.profile),
    __metadata("design:type", notification_1.Notification)
], Profile.prototype, "notification", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_1.Comment, (comment) => comment.profile),
    __metadata("design:type", Array)
], Profile.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Profile.prototype, "status", void 0);
exports.Profile = Profile = __decorate([
    (0, typeorm_1.Entity)({ name: "profile5003" })
], Profile);
