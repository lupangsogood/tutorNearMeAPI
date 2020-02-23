const dbConn = require("../../connectDB")
const moment = require("moment-timezone")
var cloudinary = require("cloudinary").v2
const publicIp = require("public-ip")

cloudinary.config({
  cloud_name: "hrzcnxorq",
  api_key: "262465892499323",
  api_secret: "rn-KoWOZbT79mbmIhGIgFq3s6tU"
})

var mv = require("mv")

var formidable = require("formidable")
var fs = require("fs")
const path = require("path")
const uploadPath = "/Users/anusitpoyen/Documents/tutorMeetupAPI/upload/"

const directoryPath = path.join(__dirname, "../../upload/")

const date_gmt7 = moment()
  .tz("Asia/Bangkok")
  .format("YYYY-MM-DD")
const time_gmt7 = moment()
  .tz("Asia/Bangkok")
  .format("HH:mm:ss")

const addPayment = (req, res) => {
  console.log(req.headers.host)
  let url = req.headers.host
  var form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    console.log(fields)

    let payment_date = fields.payment_date
    let payment_time = fields.payment_time
    let payment_course_id = fields.payment_course_id
    let payment_amount = fields.payment_amount
    let payment_name = fields.payment_name
    let payment_student_id = fields.payment_student_id
    let payment_tutor_id = fields.payment_tutor_id
    let payment_image = ""

    var public_image = ""
    try {
      var oldpath = files.payment_image.path
      var newPath = directoryPath + files.payment_image.name
      console.log("OLD PATH = " + oldpath)
      console.log("NEW PATH = " + newPath)
      payment_image = newPath
      console.log(payment_image)

      mv(oldpath, newPath, err => {
        if (err) throw err

        cloudinary.uploader.upload(payment_image, (err, result) => {
          if (err) {
            console.log("Cloudinary " + err.message)
          } else {
            console.log(result)
            public_image = result.url

            try {
              sqlAddPayment = `INSERT INTO payment (payment_date,payment_time,payment_course_id,payment_amount, payment_name, payment_student_id,payment_tutor_id,payment_image) VALUES (?,?,?,?,?,?,?,?)`

              dbConn.query(
                sqlAddPayment,
                [
                  payment_date,
                  payment_time,
                  payment_course_id,
                  payment_amount,
                  payment_name,
                  payment_student_id,
                  payment_tutor_id,
                  public_image
                ],
                (err, rows, result) => {
                  if (err) {
                    res.json({
                      head: 500,
                      body: rows,
                      message: err.message
                    })
                  } else {
                    res.json({
                      head: 200,
                      body: rows,
                      message: "การชำระเงินสำเร็จ"
                    })
                  }
                }
              )
            } catch (error) {
              console.log(error.message)
              res.json({
                head: 404,
                body: rows,
                message: "กรุณาตรวจสอบรูปแบบ Request"
              })
            }
          }
        })
      })
    } catch (error) {
      console.log(error.message)
      console.log("Upload Image is an Interupted")
    }

    if (err) {
      console.log("ERROR ")

      console.log(err.message)
    }
  })
}

const fetchPayment = (req, res) => {
  console.log(req.body)

  try {
    var user_id = req.body.user_id
    var role_id = req.body.role_id
    switch (role_id) {
      case "1":
        sqlFetchPayment = `SELECT payment_id,payment_date,payment_time,subject.subject_name_th,payment_amount,profile.profile_name,profile.profile_lastname,profile.profile_image,payment_image,paymentStatus_id,profile.role_id
                    FROM payment 
                    INNER JOIN subject ON payment.payment_course_id =subject.subject_id
                    INNER JOIN profile ON payment.payment_student_id = profile.profile_id
                    WHERE profile.profile_id = ${user_id}`
        break
      case "2":
        sqlFetchPayment = `SELECT payment_id,payment_date,payment_time,subject.subject_name_th,payment_amount,profile.profile_name,profile.profile_lastname,profile.profile_image,payment_image,paymentStatus_id,profile.role_id
                    FROM payment 
                    INNER JOIN subject ON payment.payment_course_id =subject.subject_id
                    INNER JOIN profile ON payment.payment_tutor_id = profile.profile_id
                    WHERE profile.profile_id = ${user_id}`

        break

      default:
        console.log("ไม่พบค่า")
        break
    }
    try {
      dbConn.query(sqlFetchPayment, (err, rows, result) => {
        if (rows.length === 0) {
          res.json({
            head: 400,
            body: rows,
            message: "ไม่พบข้อมูลการชำระเงิน"
          })
        } else {
          res.json({
            head: 200,
            body: rows,
            message: "ข้อมูลการชำระเงิน"
          })
        }
      })
    } catch (error) {
      console.log("fetchPayment Error =" + error.message)
    }
  } catch (error) {
    console.log("fetchPayment Error =" + error.message)
  }
}

const fetchCourseHaveStudent = (req, res) => {
  try {
    let tutor_id = req.body.tutor_id
    sqlFetchCourse = `SELECT  DISTINCT
		    post_id,post_date,subject_id,level_id,post_price,place
      	FROM payment 
      	INNER JOIN post ON post.post_id = payment.payment_course_id
		    WHERE payment.payment_tutor_id = ${tutor_id}`

    dbConn.query(sqlFetchCourse, (error, rows, result) => {
      if (rows.length === 0) {
        res.json({
          head: 400,
          body: rows,
          message: "ไม่พบข้อมูลคอร์สเรียนที่ชำระเงิน"
        })
      } else {
        res.json({
          head: 200,
          body: rows,
          message: "ข้อมูลคอร์สเรียน"
        })
      }
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      head: 404,
      body: rows,
      message: "กรุณาตรวจสอบรูปแบบ Request"
    })
  }
}

const fetchStudentInCourse = (req, res) => {
  console.log(req.body)

  try {
    let payment_id = req.body.payment_id

    sqlFetchStudent = `SELECT DISTINCT
        profile_name,profile_email,profile_image,profile_phone,sex_id
        FROM payment 
        INNER JOIN profile ON payment.payment_student_id = profile.users_id
        WHERE payment.payment_course_id = ${payment_id}`

    dbConn.query(sqlFetchStudent, (error, rows, result) => {
      if (rows.length === 0) {
        res.json({
          head: 400,
          body: rows,
          message: "ไม่พบข้อมูลนักเรียน"
        })
      } else {
        res.json({
          head: 200,
          body: rows,
          message: "ข้อมูลนักเรียน"
        })
      }
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      head: 404,
      body: rows,
      message: "กรุณาตรวจสอบรูปแบบ Request"
    })
  }
}
module.exports = {
  addPayment,
  fetchPayment,
  fetchStudentInCourse,
  fetchCourseHaveStudent
}
