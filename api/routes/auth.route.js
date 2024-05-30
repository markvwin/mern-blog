import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signup); // creating signup api route.

export default router; // exports the router so that it can be used in other files.
