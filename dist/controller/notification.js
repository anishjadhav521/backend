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
        this.addNotification = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const profileId = req.body.profileId;
                const notification = req.body.notification;
                yield notificationService_1.default.addNotification(profileId, notification);
                res.status(200);
            }
            catch (err) {
                next(err);
            }
        });
        this.getNotificaion = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const profileId = Number(req.params['profileId']);
                console.log(profileId);
                const notifications = yield notificationService_1.default.getNotifications(profileId);
                console.log("uu", notifications);
                res.status(200).json({ "notification": notifications });
            }
            catch (err) {
                next(err);
            }
        });
    }
    addReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("report heii");
            const report = req.body;
            console.log(report);
            const result = yield notificationService_1.default.addReport(report);
            if (result) {
                res.json({ msg: "reported" });
            }
            else {
                res.json({ msg: "try after some time" });
            }
        });
    }
    getReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reports = yield notificationService_1.default.getReport();
            if (reports) {
                res.json({ report: reports });
            }
            else {
                res.status(500);
            }
        });
    }
}
exports.default = new NotificationController();
