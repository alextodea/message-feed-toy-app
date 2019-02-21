const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    threads: [
        {
            type:Schema.Types.ObjectId,
            ref:"Thread"
        }
    ],
    createdDate: { type: Date, default: Date.now }
});

const User = mongoose.model("User",UserSchema);

module.exports = User;