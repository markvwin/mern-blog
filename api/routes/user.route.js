import express from "express";
import { signout, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test); // test api route.
router.put("/update/:userId", verifyToken, updateUser); // updates user api route.
router.delete("/delete/:userId", verifyToken, deleteUser); // deletes user api route
router.post("/signout", signout); // sign out api route

export default router; // exports the router so that it can be used in other files.
