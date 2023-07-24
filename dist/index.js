"use strict";
// import koa from "koa";
// import koaBody from "koa-bodyparser";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
// const app = new koa();
// app.use(koaBody());
// const serverPort = process.env.SERVER ?? 3000;
const websocketPort = (_a = parseInt(process.env.SOCKET)) !== null && _a !== void 0 ? _a : 3001;
const io = new socket_io_1.Server({
    cors: {
        origin: "*",
    },
});
const Users = {};
// Main Event
//Socket :  This is the main object for interacting with a client.
io.on("connection", (socket) => {
    socket.on("new-user-joined", (name) => {
        console.log("new user joined : ", name);
        Users[socket.id] = name;
        socket.broadcast.emit("user-joined", {
            message: `${Users[socket.id]} joined`,
            name: Users[socket.id],
        });
    });
    socket.on("send", (message) => {
        socket.broadcast.emit("message", {
            message: message,
            name: Users[socket.id],
        });
    });
});
io.listen(websocketPort);
console.log("socket is listening at", websocketPort);
// app.listen(serverPort, () => {
//   console.log("server is listening at", serverPort);
// });
