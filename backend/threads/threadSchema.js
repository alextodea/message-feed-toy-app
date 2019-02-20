const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: { type: String, required: true },
    author_id: { type: String, unique: true, required: true },
    createdDate: { type: Date, default: Date.now }
});

const Thread = mongoose.model("Thread",ThreadSchema);

module.exports = Thread;