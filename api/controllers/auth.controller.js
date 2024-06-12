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

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc; // removes the password from the response.

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error); // responds with an error message if sign in fails. next() is a middleware function used for passing messages.
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoURL } = req.body;

  try {
    const user = await User.findOne({ email }); // checks if the user exists in the database.
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc; // removes the password from the response.,...rest } = user._doc; // removes the password from the response.
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10); // hashes user passwords
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoURL,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc; // removes the password from the response.
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error); // responds with an error message if sign in fails. next() is a middleware function
  }

  if (!email || email === "") {
    next(errorHandler(400, "All fields are required"));
  }
};
