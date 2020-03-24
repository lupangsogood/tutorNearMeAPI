var express = require("express")
const bodyParser = require("body-parser")

var router = express.Router()

var userController = require("../module/userController/usersController")

router.use(bodyParser.urlencoded({ extended: false }))

router.post("/login", userController.checkUserLogin)
router.post("/fetchProfileData", userController.fetchProfileDataWithPost)
router.post("/fetchProfile", userController.fetchProfile)
router.post("/addUser", userController.addUser)
router.post("/addProfile", userController.addUserProfile)
router.post("/editProfile", userController.editProfile)

router.post("/addProfileAndImage", userController.addUserProfileAndImage)

router.post("/sendToken", userController.keepToken)
router.post("/sendNotification", userController.sendNotification)

module.exports = router
