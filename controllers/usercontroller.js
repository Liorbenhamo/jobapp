const bcrypt = require("bcrypt");
const User = require("../models/Users");

exports.register = async (req, res) => {
  console.log(req.body);
  let { username, firstname, lastname, password } = req.body;
  try {
    const isregister = await User.findOne({ username: username });
    if (isregister) {
      return res.status(400).json("user is already registered");
    }
    console.log(password, "this is the password");
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword, "this is the hashed password");
    const newUser = await User.create({
      firstname,
      lastname,
      password: hashPassword,
      username,
    });
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.login = async (req, res) => {
  console.log("lior");
  console.log(req.body);
  try {
    const { username, password } = req.body;
    console.log("hi");
    const existUser = await User.findOne({ username }); //.populate("posts");
    console.log(existUser);
    if (!existUser) {
      return res.status(401).json("couldnt find this user");
    }
    bcrypt.compare(password, existUser.password, (err, isMatch) => {
      if (err || !isMatch) {
        console.log("problem");
        return res.status(402).json("invalid email or password");
      }
      res.status(200).send({
        message: "Logged in successfully",
        user: existUser,
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
