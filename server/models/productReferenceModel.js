const mongoose = require('mongoose');

const productCartSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catalogue'
    },

    finalPrice: {
        type: Number,
        required: true
    },

    productKey: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('cartform', productCartSchema);

