import dotenv from "dotenv";
import connectDB from "./dbConfig/dbConfig.js";
import { app } from "./app.js";

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
        console.log(`Server is Running on Port ${process.env.PORT}!`);
    });
})
.catch((error) => console.log(`Server Connection Error!! ${error}`));