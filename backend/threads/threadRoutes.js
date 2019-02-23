const express = require("express");
const router = express.Router();
const {verifyToken} = require("../users/authentication/validation");

const threadController = require("./threadController");

router.get("/",verifyToken,threadController.getThreads);
router.post("/add",threadController.addThread);

module.exports = router