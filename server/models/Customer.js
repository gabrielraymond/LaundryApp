const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  laundry: {
    type: Schema.Types.ObjectId,
    ref: "Laundry",
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  gender: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("customer", customerSchema);
