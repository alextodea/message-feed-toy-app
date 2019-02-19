const express = require("express");
const router = express.Router();
const {verifyToken} = require("../users/authentication/validation");

const threadController = require("./threadController");

router.get("/",threadController.getThreads);

module.exports = router