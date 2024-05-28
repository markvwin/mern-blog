import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);

export default router; // exports the router so that it can be used in other files.
