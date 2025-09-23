"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dbconnection_1 = require("../infrastructure/config/dbconnection");
const dotenv_1 = __importDefault(require("dotenv"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const socket_1 = require("../infrastructure/socket/socket");
dotenv_1.default.config();
const appInstances = new app_1.App();
const server = (0, node_http_1.createServer)(appInstances.app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'https://www.medi-mate.safeedha.site',
        credentials: true
    }
});
(0, socket_1.registerSocketEvents)(io);
const port = process.env.SERVERPORT;
console.log(port);
(0, dbconnection_1.connectToDatabase)();
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});
