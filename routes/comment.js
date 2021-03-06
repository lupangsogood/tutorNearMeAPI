var express = require("express")
var router = express.Router()

var commentController = require("../module/commentController/commentController")

router.post("/addComment", commentController.addComment)

router.post("/fetchComment", commentController.fetchComment)

router.post("/editComment", commentController.editComment)

router.post("/deleteComment", commentController.deleteComment)
module.exports = router
