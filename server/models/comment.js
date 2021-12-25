import mongoose from "mongoose";
import moment from "moment";
import { getDefaultDirectives } from "helmet/dist/middlewares/content-security-policy";

const CommentSchema = new mongoose.Schema({
    contents: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss"),
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    createName: {type: String},
});

const Comment = mongoose.model("comment", CommentSchema);

export default Comment;