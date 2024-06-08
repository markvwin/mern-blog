import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test); // test api route.
router.put("/update/:userId", verifyToken, updateUser); // updates user api route.

export default router; // exports the router so that it can be used in other files.
