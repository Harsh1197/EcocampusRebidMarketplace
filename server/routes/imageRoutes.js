const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const Catalogue = require('../models/catalogue')
const authorizationMiddleware = require('../middleware/authmiddleware');
const Profile = require('../models/profileModel');

const imageStorage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, String(Date.now()), + ' - ' + file.originalname)
    },

})

router.post('/upload-product-image', authorizationMiddleware, multer({ storage: imageStorage }).single("file"), async (req, res) => {

    try {
        const response = await cloudinary.uploader.upload(req.file.path, {
            folder: "Student Marketplace"
        });

        const productId = req.body.productId;

        await Catalogue.findByIdAndUpdate(productId, {
            $push: { productImages: response.secure_url }
        });
        res.send({
            success: 'true',
            message: "Image Uploaded Successfully",
            data: response.secure_url
        })
    }
    catch (error) {

        res.send({

            success: 'false',
            message: "",
        }
        )
    }
})


router.post('/upload-profile-image', authorizationMiddleware, multer({ storage: imageStorage }).single("file"), async (req, res) => {
    try {
        const response = await cloudinary.uploader.upload(req.file.path, {
            folder: "Student Marketplace Profiles"
        });

        const userId = req.body.userId;

        await Profile.findOneAndUpdate(
            { userId },
            { $push: { profileImages: response.secure_url } }
        );

        res.send({
            success: true,
            message: "Image Uploaded Successfully",
            data: response.secure_url
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error uploading image",
            error: error.message
        });
    }
});



module.exports = router;