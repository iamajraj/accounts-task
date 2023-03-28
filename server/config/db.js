const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected 🎉");
    } catch (err) {
        console.log(err);
        throw new Error("Cannot connect to the database ❌");
    }
};

module.exports = connectDB;
