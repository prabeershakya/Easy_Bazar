const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const authMiddleware = require("../Middleware/Auth");
const authRoles = require("../Middleware/AuthorizedRoles");

//user Routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", authMiddleware, userController.getUserProfile);
router.delete('/delete/:id', authMiddleware, userController.removeUser);
router.get('/list', authMiddleware, userController.ListUsers);


//admin Routes
// router.get("/admin", authMiddleware, authRoles("admin"), userController.adminDashboard);

module.exports = router;