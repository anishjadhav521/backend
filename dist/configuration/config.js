"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "dev.c5owyuw64shd.ap-south-1.rds.amazonaws.com",
    port: 1982,
    username: "j2",
    password: "123456",
    database: "JIBE_Main_Training",
    synchronize: true,
    logging: false,
    entities: ["dist/entities/*.js"],
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
});
exports.default = AppDataSource;
