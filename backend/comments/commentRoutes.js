const express = require("express");
const router = express.Router();
const {verifyToken} = require("../users/authentication/validation");

const commentController = require("./commentController");

router.post("/add",commentController.addComment);
router.post("/remove-single-comment",commentController.removeSingleComment);

module.exports = router