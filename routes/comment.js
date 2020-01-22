var express = require("express");
var router = express.Router();

var commentController = require("../module/commentController/commentController");

router.post("/addComment", commentController);

module.exports = { router };
