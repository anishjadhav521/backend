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
const config_1 = __importDefault(require("./configuration/config"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
// app.use(express.urlencoded({extended:false}))
require("reflect-metadata");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const message_1 = require("./entities/message");
const error_1 = require("./middleware/error");
const app = (0, express_1.default)();
const port = 200;
app.use((0, cookie_parser_1.default)());
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ' http://localhost:4200',
    }
});
let userSocketMap = new Map();
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express_1.default.json());
app.use("/", routes_1.default);
app.use(error_1.globalErrorHandler);
config_1.default.initialize().then(() => {
    // app.listen(port,()=>{
    //     console.log(`listening on port ${port}`);
    // }) 
    server.listen(port, () => {
        console.log("listening on port ", port);
    });
}).catch((error) => {
    console.log(error);
});
io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    socket.on("register", (userId) => {
        userSocketMap.set(userId, socket.id);
        console.log(userId, "registered with socketId", socket.id);
    });
    socket.on("private_message", (_a) => __awaiter(void 0, [_a], void 0, function* ({ senderId, receiverId, content }) {
        const receiverSocketId = userSocketMap.get(receiverId);
        console.log(receiverSocketId);
        const messageRepository = config_1.default.getRepository(message_1.Message);
        const message = messageRepository.create({ senderId, receiverId, content });
        yield messageRepository.save(message);
        if (receiverSocketId) {
            console.log(senderId, receiverId, receiverSocketId);
            io.to(receiverSocketId).emit("private_message", { senderId, content });
        }
    }));
    socket.on("disconnect", () => {
        userSocketMap.forEach((socketId, userId) => {
            if (socketId == socket.id) {
                userSocketMap.delete(userId);
            }
        });
        console.log("user disconnected", socket.id);
    });
});
