import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

//file for configuring express app.

const app = express();
const httpServer = createServer(app);

//initializaing and integrating middlewares.
//cors for security.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
});
app.set("io", io); //storing socket.io config created above and can be accessed anywhere using app.get().

app.use(express.json({
    limit: "50mb"
}));

app.use(express.urlencoded({
    limit: "500kb",
    extended: true,
}));

app.use(cookieParser());

//handling routes using express:
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users", userRouter);


export { app };