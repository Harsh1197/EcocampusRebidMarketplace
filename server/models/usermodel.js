const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        trim: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },

    verified: {
        type: Boolean,
    }
    ,
    role: {
        type: String,
        default: "user"
    }
    ,
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "active"
    }
}, {
    timestamps: true
})
const studentUser = mongoose.model('students', studentSchema);
module.exports = studentUser 