const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  laundry: {
    type: Schema.Types.ObjectId,
    ref: "Laundry"
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  address: {
    type: String,
  },
  phone_number: {
    type: Number,
  },
  gender: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
