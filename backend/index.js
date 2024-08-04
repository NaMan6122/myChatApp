import dotenv from "dotenv";
import { Server } from "socket.io";
import connectDB from "./dbConfig/dbConfig";
import { app } from "./app";

dotenv.config({
    path: "./.env",
});

connectDB()
.then(() => {
    app.on(process.env.PORT, (error) => {
        if(error){
            console.log(error, "Something Went Wrong!!")
        }
    });
    app.listen(process.env.PORT, () => {
        console.log(`Server is Running on Port ${process.env.PORT}`);
    })
})
.catch((error) => console.log(`Server Connection Error!! ${error}`));