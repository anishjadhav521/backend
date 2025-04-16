"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.id = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authService_1 = require("../service/authService");
const errorHandler_1 = require("../types/errorHandler");
const authentication = (req, res, next) => {
    console.log('middleware');
    const token = req.cookies.authToken;
    if (token && token.startsWith('bearer')) {
        const tokenParts = token.split(' ');
        const tokenWithoutBearer = tokenParts[1];
        jsonwebtoken_1.default.verify(tokenWithoutBearer, authService_1.secretKey, (err, data) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid token',
                });
            }
            else {
                exports.id = data.id;
                next();
            }
        });
    }
    else {
        console.log("anish occured");
        // res.status(401).json({
        //     success: false,
        //     message: 'Token is not provided',
        // });
        throw new errorHandler_1.AppError('token not provided', 401);
    }
};
exports.default = authentication;
