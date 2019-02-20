const express = require("express");
const router = express.Router();
const {verifyToken} = require("../users/authentication/validation");

const commentController = require("./commentController");

router.post("/add",commentController.addComment);

module.exports = router