import mongoose from "mongoose";
import {DB_NAME} from "../constants"

const connectDB = async function() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log("MongoDB Connected Successfully!!", connectionInstance.connection.host);
    } catch (error) {
        console.error("Error: ", error.message);
        process.exit(1);
    }
}

export default connectDB;