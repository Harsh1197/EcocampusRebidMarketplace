const mongoose = require('mongoose');

mongoose.connect(process.env.url)

const con = mongoose.connection;
con.on('connected', () => {
    console.log('MongoDB Database Connected')
})
con.on('error', (err) => {
    console.log('MongoDB Connection Failed')
})
module.exports = con;