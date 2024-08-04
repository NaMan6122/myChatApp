import mongoose from "mongoose";

const chatModel = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        }
    ],
}, {timestamps : true});

export const Chat = mongoose.model("Chat", chatModel);