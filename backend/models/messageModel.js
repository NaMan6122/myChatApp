import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    inRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    }
}, {timestamps: true});

export const Message = mongoose.model("Message", messageModel);