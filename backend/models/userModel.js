import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["expert", "student"],
        default: "student",
        //required: true,
    },
    refreshToken : String,

}, {timestamps : true});

userModel.pre("save", async function (next) {
    if(this.isModified("password")){
        try{
            const salt = await bcryptjs.genSalt(10);
            this.password = await bcryptjs.hash(this.password, salt);
        } catch(error){
            return next(error);
        }
    }
    next()
});

userModel.methods.isPasswordCorrect = async function(password) {
    //console.log(password, this.password)
    const res = await bcryptjs.compare(password, this.password);
    return res;
};

userModel.methods.generateRefreshToken = async function() {
    const token = jwt.sign({
        _id: this._id.toString(),
    },
    process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
    //console.log(`refreshToken: ${token}`);
    return token;
};

userModel.methods.generateAccessToken = async function(){
    const token = jwt.sign({
        _id: this._id.toString(),
        username: this.username,
        email: this.email,
        fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    //console.log(`accessToken: ${token}`);
    return token;
};

export const User = mongoose.model("User", userModel);