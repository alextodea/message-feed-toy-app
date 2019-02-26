const express = require("express");
const router = express.Router();
const {verifyToken} = require("../users/authentication/validation");

const threadController = require("./threadController");

router.get("/",verifyToken,threadController.getThreads);
router.get("/get-single-thread",threadController.getSingleThread);
router.post("/add",threadController.addThread);
router.post("/remove-single-thread",threadController.removeSingleThread);

module.exports = router