const dbConn = require("../../connectDB");
const moment = require("moment-timezone");
const publicIp = require("public-ip");
var mv = require("mv");

var formidable = require("formidable");
var fs = require("fs");
const path = require("path");
const uploadPath = "/Users/anusitpoyen/Documents/tutorMeetupAPI/upload/";

const directoryPath = path.join(__dirname, "../../upload/");

const date_gmt7 = moment()
  .tz("Asia/Bangkok")
  .format("YYYY-MM-DD");
const time_gmt7 = moment()
  .tz("Asia/Bangkok")
  .format("HH:mm:ss");

const addPayment = (req, res) => {
  console.log(req.headers.host);
  let url = req.headers.host;
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    console.log(fields);

    let payment_date = fields.payment_date;
    let payment_time = fields.payment_time;
    let payment_course_id = fields.payment_course_id;
    let payment_amount = fields.payment_amount;
    let payment_name = fields.payment_name;
    let payment_student_id = fields.payment_student_id;
    let payment_tutor_id = fields.payment_tutor_id;
    let payment_image = "";

    var date = new Date(payment_date);
    var dateFormatted = moment(date).format("MM/DD/YYYY");
    try {
      var oldpath = files.payment_image.path;
      var newPath = directoryPath + files.payment_image.name;
      //   console.log(oldpath);
      //   console.log(newPath);
      payment_image = url + "/image/" + files.payment_image.name;
      mv(oldpath, newPath, err => {
        if (err) throw err;
        try {
          sqlAddPayment = `INSERT INTO payment (payment_date,payment_time,payment_course_id,payment_amount, payment_name, payment_student_id,payment_tutor_id,payment_image) VALUES (?,?,?,?,?,?,?,?)`;

          dbConn.query(
            sqlAddPayment,
            [
              dateFormatted,
              payment_time,
              payment_course_id,
              payment_amount,
              payment_name,
              payment_student_id,
              payment_tutor_id,
              payment_image
            ],
            (err, rows, result) => {
              if (err) {
                res.json({
                  head: 500,
                  body: rows,
                  message: err.message
                });
              } else {
                res.json({
                  head: 200,
                  body: rows,
                  message: "การชำระเงินสำเร็จ"
                });
              }
            }
          );
        } catch (error) {
          console.log(error.message);
          res.json({
            head: 404,
            body: rows,
            message: "กรุณาตรวจสอบรูปแบบ Request"
          });
        }
      });
    } catch (error) {
      console.log(error.message);
      console.log("Upload Image is an Interupted");
    }
  });
};

module.exports = { addPayment };
