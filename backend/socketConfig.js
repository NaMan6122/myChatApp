import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const httpServer = createServer(app); //creating a http server.
const io = new Server( httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials : true,
    }
});

//Handle user connection:
io.on("connection", (socket) => {
    console.log(`${socket.id} has just connected!`);
});

