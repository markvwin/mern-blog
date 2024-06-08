import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

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
app.use(cookieParser()); // allows us to use cookies.

app.listen(3000, () => {
  console.log("Server is running on port 3000..");
});

app.use("/api/user", userRoutes); // routes to user.route.js file.
app.use("/api/auth", authRoutes); // routes to auth.route.js file.

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
