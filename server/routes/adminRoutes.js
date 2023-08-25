const express = require('express');
const router = express.Router();
const Alert = require('../models/notificationsModel');
const Catalogue = require('../models/catalogue')
const authorizationMiddleware = require('../middleware/authmiddleware');



router.put('/update-item-status/:id', authorizationMiddleware, async (req, res) => {
    try {
        const { productStatus } = req.body;
        const modifiedProduct = await Catalogue.findByIdAndUpdate(req.params.id, { productStatus });


        const alert = new Alert({
            title: "Product Status Updated",
            user: modifiedProduct.productSeller,
            message: `Your product ${modifiedProduct.name} has been ${productStatus}`,
            onClick: "/profile",
            notificationRead: false

        });
        console.log('New Alert:', alert);

        await alert.save();
        res.send({
            success: true,
            message: "Status Updated Successfully"
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;