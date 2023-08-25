const router = require("express").Router();
const studentUser = require('../models/usermodel');
const Profile = require('../models/profileModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const authorizationMiddleware = require('../middleware/authmiddleware');

router.get("/get-users", authorizationMiddleware, async (req, res) => {
    try {
        const logedUser = await studentUser.find();
        res.send({
            success: true,
            data: logedUser,
            message: "Users Fetched Successfully",

        });
    }

    catch (error) {

        res.send({
            success: false,
            message: error.message
        });
    }

})


router.put("/update-user-status/:id", authorizationMiddleware, async (req, res) => {
    try {
        await studentUser.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "Status Updated Successfully",

        });
    }

    catch (error) {

        res.send({
            success: false,
            message: error.message
        });
    }

})

router.post("/register", async (req, res) => {
    try {
        const user = await studentUser.findOne({ email: req.body.email })

        if (user) {
            throw new Error("User Already Exists")
        }
        const { name, email, password, id } = req.body;

        const userData = new studentUser({
            name, email, password, id, emailToken: crypto.randomBytes(64).toString('hex'),
            verified: false
        })


        const saltedHash = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, saltedHash);
        userData.password = hashedPassword;

        const newUser = await userData.save()



        res.send({
            success: true,
            message: "User Registered Successfully"
        });
    }
    catch (error) {

        res.send({
            success: false,
            message: error.message
        });
    }
})

router.post("/login", async (req, res) => {
    try {

        const user = await studentUser.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("Oops! You must register an account before proceeding")
        }

        if (user.status === "blocked") {
            throw new Error("Account Blocked-Please Contact Admin")
        }
        const passwordValidation = await bcrypt.compare(req.body.password, user.password);
        if (!passwordValidation) {
            throw new Error("Enter a valid password");
        }

        const jwttoken = jwt.sign({ userId: user._id }, process.env.jwt_secret);
        res.send({
            success: true,
            message: "Successful Login",
            data: jwttoken
        });

    } catch (error) {

        res.send({
            success: false,
            message: error.message
        });
    }



})


router.get("/logged-in-user", authorizationMiddleware, async (req, res) => {
    try {
        const logedUser = await studentUser.findById(req.body.userId);
        res.send({
            success: true,
            message: "Successful Login",
            data: logedUser
        });
    }

    catch (error) {

        res.send({
            success: false,
            message: error.message
        });
    }

})


router.post('/createProfile', authorizationMiddleware, async (req, res) => {
    try {
        const { courseTitle, chatUsername, address, contact, profileImages } = req.body;

        const newProfile = new Profile({
            userId: req.body.userId,
            courseTitle,
            chatUsername,
            address,
            contact,
            profileImages
        });

        await newProfile.save();

        res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile', error: error.message });
    }
});


router.put('/updateProfile/:userId', authorizationMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { courseTitle, chatUsername, address, contact, profileImages } = req.body;

        const existingProfile = await Profile.findOne({ userId: userId });

        if (!existingProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        existingProfile.courseTitle = courseTitle;
        existingProfile.chatUsername = chatUsername;
        existingProfile.address = address;
        existingProfile.contact = contact;
        existingProfile.profileImages = profileImages;
        await existingProfile.save();

        res.status(200).json({ message: 'Profile updated successfully', profile: existingProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});


router.get('/getProfile/:userId', authorizationMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;

        const userProfile = await Profile.findOne({ userId: userId });

        if (userProfile) {
            res.status(200).json(userProfile);

        }
        else {
            return res.status(404).json({ error: 'Profile not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;




