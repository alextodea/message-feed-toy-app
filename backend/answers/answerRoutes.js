const express = require("express");
const router = express.Router();
const {verifyToken} = require("../users/authentication/validation");

const answerController = require("./answerController");

router.post("/add",answerController.addAnswer);

module.exports = router