import express from "express";
import {
  createUser,
  authUser,
  getUser,
  getUsers,
  logOutUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { authAdmin, authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Authentication routes for any users
router.post("/", createUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);

// User Routes
router
  .route("/profile")
  .get(authenticate, getUser)
  .put(authenticate, updateUser);

// Admin Routes
router.route("/").get(getUsers);
router.route("/:id").delete(authenticate, authAdmin, deleteUser);

export default router;
