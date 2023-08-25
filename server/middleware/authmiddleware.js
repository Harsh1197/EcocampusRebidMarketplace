const JWT = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {

        const authHeader = req.header("authorization");
        if (!authHeader) {
            throw new Error("Authorization header not found.");
        }
        const token = authHeader.split(" ")[1];
        const decode = JWT.verify(token, process.env.jwt_secret);
        req.body.userId = decode.userId;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized: " + error.message
        });
    }
};