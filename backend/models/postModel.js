import mongoose from "mongoose";

const postScheme = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: String,
    },
    image: {
        url: String,
        filename: String
    },
    tags: [String],
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

export default mongoose.model("post", postScheme);