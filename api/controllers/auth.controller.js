import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Sign-up page controller

// exporting as asynchronous because we need time to get the results
//   from mongoDB before sending the response to the user.
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    // if any of the fields are empty, return an error.
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required!")); // utilized errorHandler() from utils to display errors.
  }

  const hashedPassword = bcryptjs.hashSync(password, 10); // hashes user passwords to prevent leaks within the database.

  const newUser = new User({
    // creates a new user with inputted data.
    username,
    email,
    password: hashedPassword, // replaces password with hashed password.
  });

  try {
    await newUser.save(); // sends the new user to the database.
    res.json("Sign up successful!");
  } catch (error) {
    next(error); // responds with an error message if sign up fails. next() is a middleware function used for passing messages.
  }
};

//  Sign-in page controller

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email }); // finds the user in the database.
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password); // compares the user's password with the hashed password in the database.

    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc; // removes the password from the response.

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error); // responds with an error message if sign in fails. next() is a middleware function used for passing messages.
  }
};
