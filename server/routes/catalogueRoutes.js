
const express = require('express');
const router = express.Router();
const studentUser = require('../models/usermodel');
const Catalogue = require('../models/catalogue')
const authorizationMiddleware = require('../middleware/authmiddleware');
const Alert = require('../models/notificationsModel');

const dotenv = require('dotenv');
dotenv.config();

router.put('/update-item/:id', authorizationMiddleware, async (req, res) => {
    try {
        await Catalogue.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "Product Updated Successfully"
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.delete('/delete-item/:id', authorizationMiddleware, async (req, res) => {
    try {
        await Catalogue.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Product Deleted Successfully"
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


router.post('/get-item', authorizationMiddleware, async (req, res) => {
    try {

        const { productStatus, price = [], age = [], productSeller, category = [] } = req.body;
        let itemFilters = {};

        if (productSeller) {

            itemFilters.productSeller = productSeller;
        }

        if (productStatus) {
            itemFilters.productStatus = productStatus
        }
        if (!category.length <= 0) {

            itemFilters.productCategory = { $in: category };
        }
        if (!age.length <= 0) {
            age.forEach((element) => {

                itemFilters.productAge = { $lte: element.split('-')[1], $gte: element.split('-')[0] }
            }
            );
        }
        if (!price.length <= 0) {
            price.forEach((element) => {

                itemFilters.price = { $lte: element.split('-')[1], $gte: element.split('-')[0] }
            }
            );
        }
        const items = await Catalogue.find(itemFilters);
        res.send({
            success: true,
            data: items
        });
    }

    catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})




router.get('/get-item-by-id/:id', async (req, res) => {
    try {

        const product = await Catalogue.findById(req.params.id).populate('productSeller');
        res.send({
            success: true,
            data: product
        });
    }

    catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.post('/add-item', async (req, res) => {
    try {
        const items = new Catalogue(req.body)
        await items.save();
        const adminUser = await studentUser.find({ role: "admin" })
        adminUser.forEach(async (admin) => {
            const alert = new Alert({
                title: "Attention !!",
                user: admin._id,
                message: `Products for review from a user`,
                onClick: "/admin",
                notificationRead: false

            });
            await alert.save();
        });
        res.send({
            success: true,
            message: "Product Listed Successfully"
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get("/search/:keyword", async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await Catalogue
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { productDescription: { $regex: keyword, $options: "i" } },
                ],
            })

        res.json(results);
    } catch (error) {

        res.status(400).send({
            success: false,
            message: "Search error",
            error,
        });
    }
});



router.post('/removeItems', async (req, res) => {
    try {
        const { productUniqueRefs } = req.body;
        const deletedProduct = await Catalogue.deleteMany({ productUniqueRef: { $in: productUniqueRefs } });

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete product.' });
    }
});

module.exports = router;


