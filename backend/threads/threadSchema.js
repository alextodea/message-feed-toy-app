const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User"},
    title: { type: String, required: true },
    comments: [
        {
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    createdDate: { type: Date, default: Date.now }
});

ThreadSchema.pre('remove', function() { console.log('Removing!'); });

const Thread = mongoose.model("Thread",ThreadSchema);

module.exports = Thread;