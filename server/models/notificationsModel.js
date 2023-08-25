const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    onClick: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
    },
    notificationRead: {
        type: Boolean,
        default: false,
    },


}, {
    timestamps: true
})
const notificationItems = mongoose.model('notifications', notificationSchema);
module.exports = notificationItems