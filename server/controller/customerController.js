const Customer = require("../models/Customer");

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ laundry: req.params.id });
    res.json(customers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.customer_id });
    res.json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const addCustomer = async (req, res) => {
  try {
    //Create Customer
    const customer = new Customer({
      laundry: req.params.id,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
    });
    await customer.save();
    res.json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.customer_id);
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const editCustomer = async (req, res) => {
  const { name, email, address, phone_number, gender } = req.body;
  try {
    let customer = await Customer.findById(req.params.customer_id);
    if (customer) {
      customer = await Customer.findOneAndUpdate(
        { _id: req.params.customer_id },
        {
          $set: {
            name: name,
            email: email,
            address: address,
            phone_number: phone_number,
            gender: gender,
          },
        },
        { new: true }
      );
      return res.json(customer);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getCustomers, getCustomer, addCustomer, deleteCustomer, editCustomer };
