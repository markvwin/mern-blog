import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// exporting as asynchronous because we need time to get the results
//   from mongoDB before sending the response to the user.
export const signup = async (req, res) => {
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
    return res.status(400).json({ msg: "All fields are required." });
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
    res.status(500).json({ msg: error.message }); // responds with an error message if sign up fails.
  }
};
