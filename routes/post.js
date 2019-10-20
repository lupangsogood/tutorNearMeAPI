var express = require('express');
const bodyParser = require('body-parser')

var router = express.Router();

var postController = require('../module/postController/postController')

router.use(bodyParser.urlencoded({extended: false}))

router.post('/addPost',postController.addPost)
router.post('/fetchPost',postController.fetchPost)
router.post('/tutor/fetchPost',postController.fetchPostTutor)
router.post('/tutor/fetchDetail',postController.fetchDetailtutor)
module.exports = router;