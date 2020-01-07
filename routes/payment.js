var express = require("express");
const bodyParser = require("body-parser");

var router = express.Router();

var paymentController = require("../module/paymentController/paymentController");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/fetchPayment", paymentController.fetchPayment);
router.post("/addPayment", paymentController.addPayment);

module.exports = router;
