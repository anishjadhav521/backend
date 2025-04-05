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
exports.Follow = void 0;
const typeorm_1 = require("typeorm");
const profile_1 = require("./profile");
let Follow = class Follow {
};
exports.Follow = Follow;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Follow.prototype, "followId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profile_1.Profile, (profile) => profile.following),
    (0, typeorm_1.JoinColumn)({ name: 'followingId' }),
    __metadata("design:type", profile_1.Profile)
], Follow.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profile_1.Profile, (profile) => profile.followers, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'followerId' }),
    __metadata("design:type", profile_1.Profile)
], Follow.prototype, "followers", void 0);
exports.Follow = Follow = __decorate([
    (0, typeorm_1.Entity)({ name: "follow5003" })
], Follow);
