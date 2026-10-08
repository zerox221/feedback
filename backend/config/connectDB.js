const mongoose = require('mongoose');
const connectDB = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("DB CONNECTED");
    })
    .catch(()=>{
        console.log("DB NOT CONNECTED");
        process.exit(1);
    })
}

module.exports = connectDB;