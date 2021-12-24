const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  laundry: {
    type: Schema.Types.ObjectId,
    ref: "Laundry",
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  no_order: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  order: [
    {
      paket: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  payment: {
    type: String,
  },
  payment_status: {
    type: String,
  },
  order_date: {
    type: Date,
  },
  pick_up_date: {
    type: Date,
  },
  status_order: {
    type: String,
  },
  subtotal: {
    type: Number,
  },
  admin: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
