import asyncHandler from "express-async-handler";
import generateToken from './../config/generateToken.js';
import User from './../model/User.js';
const signup = asyncHandler(async (req, res) => {
  const { username, email, password, pic } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send({ message: "Please fill out all fields!" });
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).send({ message: "User Already Exist" });
  }
  const user = await User.create({
    username,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      success: true,
      data: user,
      message: "Signup SuccessFully",
      token: generateToken(user._id),
    });
  } else {
    res.status(404).send({ message: "Fail to Create a user" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select(
      "username email password pic"
    );

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        data: user,
        message: "Login Successfully",
        token: generateToken(user._id),
      });
    } else {
      res.status(404).send({ message: "Invalid Email and Password" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export { signup, login };
