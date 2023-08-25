const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catalogue'
    },
    productSeller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
    }
    ,
    message: {
        required: true,
        type: String
    },
    productBuyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students"

    }
    ,
    productBidAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const bidItems = mongoose.model('bids', bidSchema);
module.exports = bidItems