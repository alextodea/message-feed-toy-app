const express = require("express");
const router = express.Router();
const userController = require("./userController");
const {verifyToken} = require("./authentication/validation");

router.get("/my-profile",userController.getProfile);

// Log in user
router.post("/login",userController.postLogin);
router.get("/login", userController.getLogin)

// Register user
router.post("/register",userController.postRegister);

module.exports = router;