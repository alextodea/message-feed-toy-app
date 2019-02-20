const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author_id: {type: Schema.Types.ObjectId, ref: "User",required:true},
    thread_id: {type: Schema.Types.ObjectId, ref: "Thread",required:true},
    body: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment",CommentSchema);

module.exports = Comment;