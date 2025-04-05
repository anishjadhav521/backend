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
const notification_1 = require("../entities/notification");
const profile_1 = require("../entities/profile");
const profileRepository = config_1.default.getRepository(profile_1.Profile);
const NotificationRepository = config_1.default.getRepository(notification_1.Notification);
class notificationService {
    addNotification(profileId, notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield profileRepository.findOne({
                relations: {
                    notification: true
                },
                where: {
                    id: profileId
                }
            });
            console.log(profile);
            const noti = new notification_1.Notification();
            noti.notification = notification;
            noti.profile = profile;
            return yield NotificationRepository.save(noti);
        });
    }
    getNotifications(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(profileId);
            const profile = yield profileRepository.findOne({
                relations: {
                    notification: true
                },
                where: {
                    id: profileId
                }
            });
            const notificatios = yield NotificationRepository.find({
                where: {
                    profile: profile
                }
            });
            return notificatios;
        });
    }
}
exports.default = new notificationService();
