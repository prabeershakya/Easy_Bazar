const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const authMiddleware = require("../Middleware/Auth");

// Register a new user
router.post("/register", userController.registerUser);

// Login a user
router.post("/login", authMiddleware, userController.loginUser);

// Get user profile by ID
router.get("/:id", authMiddleware, userController.getUserProfile);

module.exports = router;