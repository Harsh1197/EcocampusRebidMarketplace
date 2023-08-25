const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    productDescription: {

        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    productAge: {
        type: Number,
        required: true
    },
    accesoriesAvailability: {
        type: Boolean,
        default: false,
        required: true
    },

    productUniqueRef: {
        type: String,
        required: true
    },
    productImages: {
        default: [],
        type: Array,
        required: true
    },
    billAvailability: {
        type: Boolean,
        default: false,
        required: true
    },

    warranty: {
        type: Boolean,
        default: false,
        required: true
    },
    showBids: {
        type: Boolean,
        default: false
    },

    productStatus: {
        type: String,
        default: "Pending",
        required: true
    },
    productSeller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
        required: true
    },


}, {
    timestamps: true
})
const catalogueItems = mongoose.model('catalogue', itemsSchema);
module.exports = catalogueItems