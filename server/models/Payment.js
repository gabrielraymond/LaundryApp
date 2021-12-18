const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
  laundry: {
    type: Schema.Types.ObjectId,
    ref: "Laundry",
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("payment", paymentSchema);
