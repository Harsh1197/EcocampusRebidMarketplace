const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({

    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catalogue'
    }],
    payment: {},
},

    {
        timestamps: true
    });

module.exports = mongoose.model('Order', orderSchema);