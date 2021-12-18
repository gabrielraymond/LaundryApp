const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/laundryApp', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connected SUCCESS");
    } catch (error) {
        console.error("MongoDB connected FAIL");
        process.exit(1);
    }
};

module.exports = connectDB;