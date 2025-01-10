import User from "../models/user.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username);
  // console.log(email);
  // console.log(password);

  //creating a user
  // before creating the user, check several validations
  //validatation
  //ensure that all the fields are entered by the user
  if (!username || !email || !password) {
    throw new Error("Please fill all the input fields");
  }
  //check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  //Hash the user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // console.log(email);
  // console.log(password);

  //check if the user already exists or not
  const existingUser = await User.findOne({ email });
  // console.log(existingUser);

  //if the user exists, we need to check if he is prviding the right password
  if (existingUser) {
    //comparing the password entered by the user with the password stored in the database
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    //if the password is valid, create a new token
    if (isPasswordValid) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    } else {
      //if the password is not valid, send an error to the user
      res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    //if !existingUser (means user not present in the db), then show a message to the user
    res.status(401).json({ message: "User not found" });
  }
});

//logout the current user
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    //expires the same second
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//getting all users
const getAllUsers = asyncHandler(async (req, res) => {
  //find all users
  const users = await User.find({});
  res.json(users);
});

//getting current user profile
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // console.log(user);

  //check if we already have a user
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//updating current user profile
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // if we have the user, update the info or keep it as it was before
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    //if user not present
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
};