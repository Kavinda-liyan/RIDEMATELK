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
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Authentication routes for any users
router.post("/", createUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);

// User Routes
router
  .route("/profile")
  .get(authenticate, getUser)
  .patch(authenticate, upload.single("profilePicture"), updateUser);

// Admin Routes
router.route("/").get(getUsers);
router.route("/:id").delete(authenticate, authAdmin, deleteUser);

export default router;
