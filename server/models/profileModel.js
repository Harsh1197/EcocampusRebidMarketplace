const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
    },
    courseTitle: {
        type: String,

    },
    chatUsername: {
        type: String,

    },
    address: {
        type: String,

    }
    , contact: {
        type: String,
    }
    , profileImages: {
        default: [],
        type: Array,
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('profile', profileSchema);
