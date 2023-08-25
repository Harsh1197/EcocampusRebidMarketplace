const express = require('express');
const router = express.Router();
const cartForm = require('../models/productReferenceModel');
const authorizationMiddleware = require('../middleware/authmiddleware');


router.post('/item-details', authorizationMiddleware, async function (req, res) {
    try {
        const form = new cartForm(req.body);
        await form.save();

        res.send({
            success: true,
            message: "Great! You're all set "
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
})









module.exports = router;