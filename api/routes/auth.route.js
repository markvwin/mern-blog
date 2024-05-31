import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signup); // creating signup api route.
router.post("/sign-in", signin); // creating signup api route.

export default router; // exports the router so that it can be used in other files.
