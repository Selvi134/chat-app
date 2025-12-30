require('dotenv').config();
const mongoose = require('mongoose');
function Connection() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
}

module.exports = Connection;