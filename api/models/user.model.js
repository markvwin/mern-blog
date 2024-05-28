import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      // username is a string, required, and unique.
      type: String,
      required: true,
      unique: true,
    },
    email: {
      // email is a string, required, and unique.
      type: String,
      required: true,
      unique: true,
    },
    password: {
      // password is a string, required, and NOT unique.
      type: String,
      required: true,
    },
  },
  { timestamps: true } // timestamps
);

const User = mongoose.model("User", Model); // creates a model called User.

export default User; // exports the model so that it can be used in other files.
