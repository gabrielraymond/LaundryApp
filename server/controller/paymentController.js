const Laundry = require("../models/Laundry");
const Payment = require("../models/Payment");

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ laundry: req.params.id });
    // console.log(payment);
    res.json(payments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findOne({ _id: req.params.payment_id });
    // console.log(payment);
    res.json(payment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const addPaymentType = async (req, res) => {
  try {
    //Create Payment
    const payment = new Payment({
      name: req.body.name,
      laundry: req.params.id,
    });
    await payment.save();
    res.json(payment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.payment_id);
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const editPayment = async (req, res) => {
  const { name } = req.body;
  try {
    let payment = await Payment.findById(req.params.payment_id);
    if (payment) {
      payment = await Payment.findOneAndUpdate(
        { _id: req.params.payment_id },
        { $set: { name: name } },
        { new: true }
      );
      return res.json(payment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getPayments,
  getPayment,
  addPaymentType,
  deletePayment,
  editPayment,
};
