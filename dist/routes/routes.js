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
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controller/authController"));
const multer_1 = __importDefault(require("multer"));
const postController_1 = __importDefault(require("../controller/postController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const userController_1 = __importDefault(require("../controller/userController"));
const profileController_1 = __importDefault(require("../controller/profileController"));
const notification_1 = __importDefault(require("../controller/notification"));
const commnetController_1 = __importDefault(require("../controller/commnetController"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
let path;
let caption;
const upload = (0, multer_1.default)({ storage: storage });
const routes = express_1.default.Router();
routes.get('/getUserProfile', authMiddleware_1.default, profileController_1.default.getUserProfile);
routes.patch('/updateUsername', authMiddleware_1.default, profileController_1.default.updateUsername);
routes.patch('/updateEmail', authMiddleware_1.default, profileController_1.default.updateEmail);
routes.patch('/updatePhoneNumber', authMiddleware_1.default, profileController_1.default.updatePhoneNumber);
routes.patch('/updateBio', authMiddleware_1.default, profileController_1.default.updateBio);
routes.patch('/updatePassword', authMiddleware_1.default, profileController_1.default.updatePassword);
routes.post('/signup', authController_1.default.signUp);
routes.post('/login', authController_1.default.logIn);
routes.get('/getPost', authMiddleware_1.default, postController_1.default.getPost);
routes.post('/addPost', authMiddleware_1.default, upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    path = req.file.path;
    const { caption } = req.body;
    const result = yield postController_1.default.addPost(path, caption);
    if (result == "user not found") {
        res.json({ "msg": "failed to post" });
    }
    else {
        res.json({ "msg": "picture posted" });
    }
}));
routes.get('/getUser', authMiddleware_1.default, userController_1.default.getUser);
routes.get('/getUsers/:username', authMiddleware_1.default, userController_1.default.getUsers);
routes.get('/getUser/:username', authMiddleware_1.default, userController_1.default.getUserByUsername);
// routes.patch('/updateLike',authentication,postController.updateLike)
routes.post('/addLike', authMiddleware_1.default, postController_1.default.addLike);
routes.post('/follow', authMiddleware_1.default, profileController_1.default.follow);
routes.get('/isFollow/:followingId/:followerId', authMiddleware_1.default, profileController_1.default.isFollow);
routes.post('/unFollow', authMiddleware_1.default, profileController_1.default.unFollow);
routes.get('/getFollowers/:profileId', authMiddleware_1.default, profileController_1.default.getFollowers);
routes.get('/getFollowing/:profileId', authMiddleware_1.default, profileController_1.default.getFollowing);
routes.get('/getNotification/:profileId', authMiddleware_1.default, notification_1.default.getNotificaion);
routes.post('/addNotification/', authMiddleware_1.default, notification_1.default.addNotification);
routes.post('/addComment', authMiddleware_1.default, commnetController_1.default.addComment);
routes.get('/getComments/:postId', authMiddleware_1.default, commnetController_1.default.getComment);
routes.delete('/deleteComment/:commentId', authMiddleware_1.default, commnetController_1.default.deleteComment);
routes.get('/getAllUsers', authMiddleware_1.default, userController_1.default.getAll);
routes.delete('/deleteUser/:userId', authMiddleware_1.default, userController_1.default.deleteUser);
exports.default = routes;
