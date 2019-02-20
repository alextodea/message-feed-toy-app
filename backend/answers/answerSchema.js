const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    content: { type: String, required: true },
    thread_id: { type: String, unique: true, required: true },
    author_id: { type: String, unique: true, required: true },
    createdDate: { type: Date, default: Date.now }
});

const Answer = mongoose.model("Answer",AnswerSchema);

module.exports = Answer;