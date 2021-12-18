const mongoose = require("mongoose");
const { Schema } = mongoose;

const packageSchema = new Schema({
    laundry: {
        type: Schema.Types.ObjectId,
        ref: "Laundry",
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("package", packageSchema);