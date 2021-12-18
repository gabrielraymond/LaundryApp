const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../config/validation");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

//Register
const addUser = async (req, res) => {
  //Lets validate the data before we a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking user is already in the database
  const userNameExist = await User.findOne({ username: req.body.username });
  if (userNameExist) return res.status(400).send("Username already exists");

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new User
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    status: req.body.status,
    laundry: req.params.id
  });

  try {
    const savedUser = await user.save();

    //Create and assign a token
    const token = jwt.sign(
      { user: { id: user._id } },
      process.env.TOKEN_SECRET,
      { expiresIn: 360000 }
    );

    res.header("auth-token", token).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const editUser = async (req, res) => {
  const { name, username, password, address, phone_number, gender, status } =
    req.body;
  const userFields = {};

  if (password) {
    //Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (hashedPassword) userFields.password = hashedPassword;
  }

  if (name) userFields.name = name;
  if (username) userFields.username = username;
  if (address) userFields.address = address;
  if (phone_number) userFields.phone_number = phone_number;
  if (gender) userFields.gender = gender;
  if (status) userFields.name = name;

  try {
    let user = await User.findById(req.params.id);

    if (user) {
      user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: userFields },
        { new: true }
      ).select("-password");
      return res.json(user);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

//Login
const login = async (req, res) => {
  //Lets validate the data before login
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Username is not found");

  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  try {
    //Create and assign a token
    const token = jwt.sign(
        { user: { id: user._id } },
        process.env.TOKEN_SECRET,
        { expiresIn: 360000 }
    )
    res.header("auth-token", token).json({ token })
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getUser,
  addUser,
  editUser,
  login,
};
