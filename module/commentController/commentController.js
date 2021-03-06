const dbConn = require("../../connectDB")

const moment = require("moment-timezone")
const date_gmt7 = moment()
  .tz("Asia/Bangkok")
  .format("DD-MM-YYYY")
const time_gmt7 = moment()
  .tz("Asia/Bangkok")
  .format("HH:mm")

const fetchComment = (req, res) => {
  console.log(req.body)

  try {
    let postId = req.body.post_id
    sqlFethComment = `SELECT comment_id,profile.profile_name,profile.profile_lastname,profile.profile_image,comment.comment_data,comment.comment_time
        FROM comment 
        INNER JOIN profile ON comment.users_id = profile.users_id
        INNER JOIN post ON comment.post_id = post.post_id
        WHERE post.post_id = ${postId}`
    dbConn.query(sqlFethComment, (err, rows, result) => {
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
          message: "ดึงข้อมูลสำเร็จ"
        })
      }
    })
  } catch (error) {
    console.log(error)
    res.json({
      head: 404,
      body: [],
      message: "กรุณาตรวจสอบรูปแบบ Request"
    })
  }
}

const addComment = (req, res) => {
  console.log(req.body)
  console.log(date_gmt7 + time_gmt7)
  try {
    let postId = req.body.post_id
    let commentData = req.body.comment_data
    let usersId = req.body.users_id
    let commentTime = `${date_gmt7} ${time_gmt7}`
    sqlAddComment = `INSERT INTO comment (post_id,comment_data,comment_time,users_id) VALUES (?,?,?,?)`
    dbConn.query(
      sqlAddComment,
      [postId, commentData, commentTime, usersId],
      (err, rows, result) => {
        if (err) {
          res.json({
            head: 500,
            body: [],
            message: err.message
          })
        } else {
          res.json({
            head: 200,
            body: [],
            message: "เพิ่มคอมเมนต์สำเร็จ"
          })
        }
      }
    )
  } catch (error) {
    console.log(error.message)
    res.json({
      head: 404,
      body: [],
      message: "กรุณาตรวจสอบรูปแบบ Request"
    })
  }
}

const editComment = (req, res) => {
  console.log(req.body)
  console.log(date_gmt7 + time_gmt7)

  try {
    let comment_id = req.body.comment_id
    let commentData = req.body.comment_data
    let usersId = req.body.users_id
    let commentTime = `${date_gmt7} ${time_gmt7}`
    sqlEditComment = `UPDATE comment
      SET comment_data ='${commentData}',
          comment_time ='${commentTime}'

          WHERE comment_id = ${comment_id}  `
    dbConn.query(sqlEditComment, (err, rows, result) => {
      if (err) {
        res.json({
          head: 500,
          body: [],
          message: err.message
        })
      } else {
        res.json({
          head: 200,
          body: [],
          message: "แก้ไขคอมเมนต์สำเร็จ"
        })
      }
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      head: 404,
      body: [],
      message: "กรุณาตรวจสอบรูปแบบ Request"
    })
  }
}

const deleteComment = (req, res) => {
  console.log(req.body)

  try {
    let commentId = req.body.commentId
    sqlDeleteComment = `DELETE FROM comment WHERE comment_id = ${commentId}`

    dbConn.query(sqlDeleteComment, (err, rows, result) => {
      if (err) {
        res.json({
          head: 500,
          body: [],
          message: err.message
        })
      } else {
        res.json({
          head: 200,
          body: [],
          message: "ลบคอมเมนต์สำเร็จ"
        })
      }
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      head: 404,
      body: [],
      message: "กรุณาตรวจสอบรูปแบบ Request"
    })
  }
}

module.exports = { addComment, fetchComment, editComment, deleteComment }
