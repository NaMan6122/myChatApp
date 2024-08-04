import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

//cors for security.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: "50mb"
}));

app.use(urlencoded({
    extended: true,
}));

app.use(cookieParser());

//handling routes using express:
import userRouter from "./routes/user.route.js"
app.use("/api/users", userRouter);
app.use()

export { app };