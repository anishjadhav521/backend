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
const report_1 = require("../entities/report");
const errorHandler_1 = require("../types/errorHandler");
const profileRepository = config_1.default.getRepository(profile_1.Profile);
const NotificationRepository = config_1.default.getRepository(notification_1.Notification);
const ReportRepository = config_1.default.getRepository(report_1.Report);
class notificationService {
    addNotification(profileId, notification) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("done", profileId, notification);
            const profile = yield profileRepository.findOne({
                relations: {
                    notification: true
                },
                where: {
                    id: profileId
                }
            });
            if (!profile) {
                throw new errorHandler_1.AppError('user not found', 404);
            }
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
            if (!profile) {
                throw new errorHandler_1.AppError('user not found', 404);
            }
            console.log("winoti", profile);
            const notificatios = yield NotificationRepository.find({
                where: {
                    profile: profile
                }
            });
            return notificatios;
        });
    }
    addReport(report) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(report);
            const result = yield ReportRepository.save(report);
            return result;
        });
    }
    getReport() {
        return __awaiter(this, void 0, void 0, function* () {
            const reports = yield ReportRepository.find({
                order: {
                    id: "DESC"
                }
            });
            return reports;
        });
    }
}
exports.default = new notificationService();
