const Laundry = require("../models/Laundry");
const User = require("../models/User");

const getLaundry = async (req, res) => {
  try {
    const laundry = await Laundry.findById(req.params.id);
    res.json(laundry);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

const addLaundry = async (req, res) => {
  const { name, address, email, phone_number, paymentName } = req.body;

  const laundryFields = {};

  if (name) laundryFields.name = name;
  if (address) laundryFields.address = address;
  if (email) laundryFields.email = email;
  if (phone_number) laundryFields.phone_number = phone_number;

  try {
    const laundry = new Laundry(laundryFields);
    await laundry.save();
    res.json(laundry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};



const editLaundry = async (req, res) => {
  const { name, address, email, phone_number } = req.body;

  const laundryFields = {};

  if (name) laundryFields.name = name;
  if (address) laundryFields.address = address;
  if (email) laundryFields.email = email;
  if (phone_number) laundryFields.phone_number = phone_number;

  try {
    let laundry = await Laundry.findById(req.params.id);

    if (laundry) {
      laundry = await Laundry.findOneAndUpdate(
        { _id: req.params.id },
        { $set: laundryFields },
        { new: true }
      );
      return res.json(laundry);
    } else {
      return res.status(400).send("Laundry is not found");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteLaundry = async (req, res) => {
  try {
    const laundry = await Laundry.findByIdAndDelete(req.params.id);
    res.json(laundry);
  } catch (error) {
    res.status(400).send("Todo is not found");
  }
};

module.exports = { getLaundry, addLaundry, editLaundry, deleteLaundry };
