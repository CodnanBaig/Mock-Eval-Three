const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

exports.signUp = async (req, res) => {
  const body = req.body;
  try {
    const existing_user = await User.findOne({ email: body.email });
    if (!existing_user) {
      const hash = await bcrypt.hash(body.password, 5);
      const new_user = await User.create({
        email: body.email,
        password: hash,
        confirmPassword: hash,
      });
      const token = jwt.sign({ id: new_user._id }, process.env.SECRET);
      return res.status(201).json({ token });
    }
    return res.status(400).json({ message: "User exists" });
  } catch (error) {
    return res.status(404).json(error);
  }
};

exports.login = async (req, res) => {
  const body = req.body;
  try {
    const existing_user = await User.findOne({ email: body.email });
    if (!existing_user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const compare_hash = await bcrypt.compare(
      body.password,
      existing_user.password
    );
    if (!compare_hash) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: existing_user._id }, process.env.SECRET);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(404).json(error);
  }
};
