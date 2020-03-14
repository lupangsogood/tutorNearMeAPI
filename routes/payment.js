var express = require("express")
const bodyParser = require("body-parser")

var router = express.Router()

var paymentController = require("../module/paymentController/paymentController")

router.use(bodyParser.urlencoded({ extended: false }))

router.post("/fetchPayment", paymentController.fetchPayment)
router.post("/addPayment", paymentController.addPayment)

router.post("/fetchCourseHave", paymentController.fetchCourseHaveStudent)
router.post("/fetchStudentIn", paymentController.fetchStudentInCourse)

module.exports = router
