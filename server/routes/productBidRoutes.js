const express = require('express');
const router = express.Router();
const BidValue = require('../models/bidModel');
const authorizationMiddleware = require('../middleware/authmiddleware');

router.post('/create-bid', authorizationMiddleware, async (req, res) => {

    try {

        const bidValue = new BidValue(req.body);
        await bidValue.save();
        res.send({ success: true, message: "Bid place successfully" })
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        })

    }

})

router.post('/get-products-bid', authorizationMiddleware, async (req, res) => {

    try {
        const { product, productSeller, productBuyer } = req.body;
        let filters = {};
        if (productSeller) {
            filters.productSeller = productSeller;
        }
        if (product) {
            filters.product = product;
        }

        if (productBuyer) {
            filters.productBuyer = productBuyer;
        }

        const bidPlaced = await BidValue.find(filters).populate("product").populate("productBuyer").populate("productSeller");

        res.send({ success: true, data: bidPlaced })
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        })

    }
})



module.exports = router;