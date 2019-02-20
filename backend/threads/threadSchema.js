const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    author_id: {type: Schema.Types.ObjectId, ref: "User",required: true},
    title: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

const Thread = mongoose.model("Thread",ThreadSchema);

module.exports = Thread;