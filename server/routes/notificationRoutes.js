const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationsModel')

const authorizationMiddleware = require('../middleware/authmiddleware');

router.post("/notify-users", authorizationMiddleware, async (req, res) => {
    try {

        const userNotification = new Notification(req.body);
        await userNotification.save();
        res.send({
            success: true,
            message: "Notification Added Successfully"
        });

    } catch (error) {

        res.send({
            success: false,
            message: error.message
        });
    }

})
router.delete('/delete-notification/:id', authorizationMiddleware, async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Notification deleted Successfully"
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})



router.get("/get-notifications", authorizationMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.body.userId
        })
        res.send({
            success: true,
            data: notifications,


        });
    }

    catch (error) {

        res.send({
            success: false,
            message: error.message
        });
    }

})
router.put("/read-notification", authorizationMiddleware, async (req, res) => {
    try {
        await Notification.updateMany(
            { user: req.body.id, notificationRead: false },
            { $set: { notificationRead: true } }
        )
        res.send({
            success: true,
            message: "Notification Read"
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
