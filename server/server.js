const express = require('express');
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(express.json());
app.use(cors({ origin: true }));


app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    try {
        console.log(username);
        const r = await axios.put(
            "https://api.chatengine.io/users/",
            { username: username, secret: username, firstname: username },
            { headers: { "Private-Key": process.env.CHAT_ENGINE_PRIVATE_KEY } }
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
    }
})

require('dotenv').config();
const dbConfig = require('./dbconfig');
const imageConfig = require('./cloudStorageConfig');
const port = process.env.PORT || 5000;
const userRoute = require('./routes/userRoutes');
const notificationsRoute = require('./routes/notificationRoutes');
const cartItemsRoute = require('./routes/cartRoutes');
const paymentRoute = require('./routes/paymentRoutes')
const bidRoute = require('./routes/productBidRoutes')
const catalogueRoute = require('./routes/catalogueRoutes');
const adminRoute = require('./routes/adminRoutes')
const imageRoute = require('./routes/imageRoutes');
const path=require('path');

app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/bids', bidRoute);
app.use('/api/catalogue', catalogueRoute);
app.use('/api/catalogue', adminRoute);
app.use('/api/catalogue', imageRoute);
app.use('/api/users', imageRoute);
app.use('/api/notification', notificationsRoute);
app.use('/api/cart', cartItemsRoute);
app.use('/api/catalogue', paymentRoute);



__dirname=path.resolve();
/*Referenced from Render documentation */


if(process.env.NODE_ENV==='production'){
app.use(express.static(path.join(__dirname,"/client/build")));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"client","build","index.html"));
});
}




app.listen(port, () =>
    console.log(`Connected at ${port}`)
);