import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO) // connects to database. NOTE: by using env variable, we don't upload the key to github.
  .then(() => {
    console.log("Connected to MongoDB"); // prints success message to console
  })
  .catch((err) => {
    console.log(err); // prints error message to console
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000..");
});