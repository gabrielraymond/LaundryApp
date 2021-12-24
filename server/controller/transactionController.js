const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ laundry: req.params.id });
    res.json(transactions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.transaction_id,
    });
    res.json(transaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const addTransaction = async (req, res) => {
  //Create Transaction
  try {
    const transaction = new Transaction({
      laundry: req.params.id,
      customer: req.body.customer,
      user: req.body.user,
      no_order: req.body.no_order,
      name: req.body.name,
      address: req.body.address,
      phone_number: req.body.phone_number,
      order: req.body.order,
      payment: req.body.payment,
      payment_status: req.body.payment_status,
      order_date: req.body.order_date,
      pick_up_date: req.body.pick_up_date,
      status_order: req.body.status_order,
      subtotal: req.body.subtotal,
      admin: req.body.admin,
    });
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(
      req.params.transaction_id
    );
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const editTransaction = async (req, res) => {
  const { payment_status, status_order } = req.body;
  try {
    let transaction = await Transaction.findById(req.params.transaction_id);
    if (transaction) {
      transaction = await Transaction.findByIdAndUpdate(
        { _id: req.params.transaction_id },
        {
          $set: {
            payment_status: payment_status,
            status_order: status_order,
          },
        },
        { new: true }
      );
      return res.json(transaction);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  getTransaction,
  deleteTransaction,
  editTransaction,
};
