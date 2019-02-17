const express = require("express");
const router = express.Router();
const userController = require("./userController");

// List all users
router.get("/list",userController.listUsers);

// Log in user
router.post("/login",userController.loginUser);

// Register user
router.post("/register",userController.registerUser);

module.exports = router;