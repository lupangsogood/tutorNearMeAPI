var express = require("express")
const bodyParser = require("body-parser")

var router = express.Router()

var postController = require("../module/postController/postController")

router.use(bodyParser.urlencoded({ extended: false }))

try {
  router.post("/addPost", postController.addPost)
  router.post("/fetchPost", postController.fetchPost)
  router.post("/tutor/fetchPost", postController.fetchPostTutor)
  router.post("/tutor/fetchDetail", postController.fetchDetailtutor)
  router.post("/editPost", postController.editPost)
  router.post("/deletePost", postController.deletePost)
} catch (error) {
  console.log(error)
}

module.exports = router
