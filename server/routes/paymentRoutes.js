const express = require('express');
const router = express.Router();
const braintree = require('braintree');
const orderModel = require('../models/orderModel');

const paymentGateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    publicKey: process.env.BRAINTREE_PUB_KEY,
    merchantId: process.env.BRAINTREE_M_ID,


});
router.post('/braintree/payment', async (req, res) => {
    try {
        const { nonce, cartItems } = req.body;
        if (!nonce || !cartItems || !Array.isArray(cartItems)) {
            res.status(400).json({ error: 'Data Invalid' });
            return;
        }

        let total = 0;
        cartItems.forEach((item) => {
            total += parseFloat(item.finalPrice);
        });

        let newTransaction = paymentGateway.transaction.sale(
            {
                amount: total.toFixed(2),
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (error) {
                    console.error(error);
                    res.status(500).json({ paymentStatus: 'failed' });
                } else if (result) {
                    const order = new orderModel({
                        products: cartItems,
                        payment: result,
                    }).save();
                    res.json({ ok: true })


                }
                else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ paymentStatus: 'failed' });
    }
});


router.get('/braintree/token', async (req, res) => {
    try {
        paymentGateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send({ error: 'Client token not generating.' });
            } else {
                res.send(response);
            }
        });
    } catch (error) {

        res.status(500).send({ error: 'Internal server error.' });
    }
});


module.exports = router;
