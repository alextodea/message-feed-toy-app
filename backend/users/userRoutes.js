const express = require("express");
const router = express.Router();
const userController = require("./userController");

router.get("/get-single-user",userController.getSingleUser);

// Log in user
router.post("/login",userController.postLogin);
router.get("/login", userController.getLogin)

// Register user
router.post("/register",userController.postRegister);

module.exports = router;