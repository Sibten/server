// import koa from "koa";
// import koaBody from "koa-bodyparser";

import env from "dotenv";
import { Server, Socket } from "socket.io";

env.config();

// const app = new koa();
// app.use(koaBody());

// const serverPort = process.env.SERVER ?? 3000;

const websocketPort: number = parseInt(process.env.SOCKET!) ?? 3001;

const io = new Server({
  cors: {
    origin: "*",
  },
});

const Users: { [index: string]: any } = {};

// Main Event
//Socket :  This is the main object for interacting with a client.

io.on("connection", (socket: Socket) => {
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
