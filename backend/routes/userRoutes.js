import express from "express";
import {
  createUser,
  authUser,
  getUser,
  getUsers,
  logOutUser,
  deleteUser,
  updateUser,
  addTrustedBatch,
  removeTrustedBatch,
} from "../controllers/userController.js";
import { authAdmin, authenticate } from "../middlewares/authMiddleware.js";
import multer from "multer";
import {
  registerValidationRules,
  loginValidationRules,
  validateRequest,
} from "../middlewares/authValidation.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Authentication routes for any users
router.post("/", registerValidationRules, validateRequest, createUser);
router.post("/auth", loginValidationRules, validateRequest, authUser);
router.post("/logout", logOutUser);

// User Routes
router
  .route("/profile")
  .get(authenticate, getUser)
  .patch(authenticate, upload.single("profilePicture"), updateUser);

// Admin Routes
router.route("/").get(getUsers);
router.route("/:id").delete(authenticate, authAdmin, deleteUser);
router.route("/trusted/:id").patch(authenticate, authAdmin, addTrustedBatch);
router
  .route("/untrusted/:id")
  .patch(authenticate, authAdmin, removeTrustedBatch);

export default router;
