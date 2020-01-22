const dbConn = require("../../connectDB");

const moment = require("moment-timezone");
const date_gmt7 = moment()
  .tz("Asia/Bangkok")
  .format("YYYY-MM-DD");
const time_gmt7 = moment()
  .tz("Asia/Bangkok")
  .format("HH:mm");

const addComment = (req, res) => {
  console.log(req.body);
  console.log(date_gmt7 + time_gmt7);
  try {
    let commentId = req.body.comment_id;
    let postId = req.body.post_id;
    let commentData = req.body.comment_id;
    let usersId = req.body.users_id;

    sqlAddComment = `INSERT INTO comment (comment_id,post_id,comment_id,comment_time,users_id) VALUES (?,?,?,?,?)`;
    dbConn.query(
      sqlAddComment,
      [commentId, postId, commentData, "123", usersId],
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
            message: "เพิ่มคอมเมนต์สำเร็จ"
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
};

const fetchComment = (req, res) => {
  console.log(req.body);

  try {
    let postId = req.body.post_id;

    sqlFethComment = `SELECT profile.profile_name,profile.profile_lastname,profile.profile_image,comment.comment_data,comment.comment_time
        FROM comment 
        INNER JOIN profile ON comment.users_id = profile.users_id`;
    dbConn.query(sqlFethComment, (err, rows, result) => {
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
          message: "เพิ่มคอมเมนต์สำเร็จ"
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({
      head: 404,
      body: rows,
      message: "กรุณาตรวจสอบรูปแบบ Request"
    });
  }
};
module.exports = { addComment };
