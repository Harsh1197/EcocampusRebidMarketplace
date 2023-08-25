const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: "students",

    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3700 },
});

module.exports = mongoose.model("token", tokenSchema);