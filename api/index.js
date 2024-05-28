import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

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

app.use(express.json()); // allows us to use json in the body of the request.

app.listen(3000, () => {
  console.log("Server is running on port 3000..");
});

app.use("/api/user", userRoutes); // routes to user.route.js file.
app.use("/api/auth", authRoutes); // routes to auth.route.js file.
