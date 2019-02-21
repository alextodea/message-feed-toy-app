const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User"},
    title: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

const Thread = mongoose.model("Thread",ThreadSchema);

module.exports = Thread;