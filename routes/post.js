var express = require('express');
const bodyParser = require('body-parser')

var router = express.Router();

var postController = require('../module/postController/postController')

router.use(bodyParser.urlencoded({extended: false}))

router.post('/addPost',postController.addPost)
router.post('/fetchPost',postController.fetchPost)

module.exports = router;