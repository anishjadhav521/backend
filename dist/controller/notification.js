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
const notificationService_1 = __importDefault(require("../service/notificationService"));
class NotificationController {
    constructor() {
        this.addNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("notificaiton hitted");
            console.log(req.body);
            const profileId = req.body.profileId;
            const notification = req.body.notification;
            const result = yield notificationService_1.default.addNotification(profileId, notification);
            if (result) {
                res.status(200);
            }
            else {
                res.status(422);
            }
        });
        this.getNotificaion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("hited get noti");
            const profileId = req.params['profileId'];
            console.log(profileId);
            const notifications = yield notificationService_1.default.getNotifications(profileId);
            if (notifications) {
                res.status(200).json({ "notification": notifications });
            }
            else {
                res.status(503);
            }
        });
    }
}
exports.default = new NotificationController();
