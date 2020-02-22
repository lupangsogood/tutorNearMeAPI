const dbConn = require("../../connectDB")
const moment = require("moment-timezone")
const date_gmt7 = moment()
  .tz("Asia/Bangkok")
  .format("YYYY-MM-DD")
const time_gmt7 = moment()
  .tz("Asia/Bangkok")
  .format("HH:mm:ss")

// dbConn.getConnection(function(err){
//     if (err) {
//         console.log(err.stack)
//         throw err
//     }
//     console.log("connected")
// });

//ADD POST
const addPost = (req, res) => {
  console.log(req.body)

  try {
    let post_date = date_gmt7
    let post_time = time_gmt7
    let subject_id = req.body.subject_id
    let level_id = req.body.level_id
    let price = req.body.post_price
    let place = req.body.place
    let sexName = req.body.sex_id
    let users_id = req.body.users_id

    let sexId
    switch (sexName) {
      case "ชาย":
        sexId = 1
        break
      case "หญิง":
        sexId = 2
      default:
        break
    }

    sqlAddPost = `INSERT INTO post (post_date,post_time, subject_id, level_id,post_price, place,sex_id,users_id) 
    VALUES (?,?,?,?, ?, ?, ?,?)`

    dbConn.query(
      sqlAddPost,
      [
        post_date,
        post_time,
        subject_id,
        level_id,
        price,
        place,
        sexId,
        users_id
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
            message: "เพิ่มโพสต์สำเร็จ"
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

//FETCH
const fetchPost = (req, res) => {
  console.log(req.body)
  try {
    let sex_id = req.body.sex_id
    let subject_id = req.body.subject_id
    let level_id = req.body.level_id

    if (sex_id === "" && subject_id === "") {
      sqlFetchPost = `SELECT post_id,post_date,subject_name_th,level_name_th,place,post_price,profile_name,profile_lastname,profile_image,sex_name_th FROM post 
        INNER JOIN level ON  post.level_id = level.level_id 
        INNER JOIN subject ON post.subject_id = subject.subject_id 
        INNER JOIN profile ON post.users_id = profile.users_id 
        INNER JOIN sex ON post.sex_id = sex.sex_id
        WHERE post.level_id ="${level_id}"
        GROUP BY post.post_id
        ORDER BY post.post_date DESC`

      console.log("1")
    } else if (sex_id === "" && level_id === "") {
      sqlFetchPost = `SELECT post_id,post_date,subject_name_th,level_name_th,place,post_price,profile_name,profile_lastname,profile_image,sex_name_th FROM post 
        INNER JOIN level ON  post.level_id = level.level_id 
        INNER JOIN subject ON post.subject_id = subject.subject_id 
        INNER JOIN profile ON post.users_id = profile.users_id 
        INNER JOIN sex ON post.sex_id = sex.sex_id
        WHERE post.subject_id ="${subject_id}"
        GROUP BY post.post_id
        ORDER BY post.post_date DESC`
      console.log("2")
    } else if (subject_id == "" && level_id == "") {
      sqlFetchPost = `SELECT post_id,post_date,subject_name_th,level_name_th,place,post_price,profile_name,profile_lastname,profile_image,sex_name_th FROM post 
        INNER JOIN level ON  post.level_id = level.level_id 
        INNER JOIN subject ON post.subject_id = subject.subject_id 
        INNER JOIN profile ON post.users_id = profile.users_id 
        INNER JOIN sex ON post.sex_id = sex.sex_id
        WHERE post.sex_id ="${sex_id}"
        GROUP BY post.post_id
        ORDER BY post.post_date DESC`
      console.log("3")
    } else if (sex_id === "") {
      sqlFetchPost = `SELECT post_id,post_date,subject_name_th,level_name_th,place,post_price,profile_name,profile_lastname,profile_image,sex_name_th FROM post 
        INNER JOIN level ON  post.level_id = level.level_id 
        INNER JOIN subject ON post.subject_id = subject.subject_id 
        INNER JOIN profile ON post.users_id = profile.users_id 
        INNER JOIN sex ON post.sex_id = sex.sex_id
        WHERE post.level_id ="${level_id}" AND post.subject_id ="${subject_id}"
        GROUP BY post.post_id
        ORDER BY post.post_date DESC`
      console.log("4")
    } else if (subject_id === "") {
      sqlFetchPost = `SELECT post_id,post_date,subject_name_th,level_name_th,place,post_price,profile_name,profile_lastname,profile_image,sex_name_th FROM post 
        INNER JOIN level ON  post.level_id = level.level_id 
        INNER JOIN subject ON post.subject_id = subject.subject_id 
        INNER JOIN profile ON post.users_id = profile.users_id 
        INNER JOIN sex ON post.sex_id = sex.sex_id
        WHERE post.level_id ="${level_id}" AND post.sex_id ="${sex_id}"
        GROUP BY post.post_id
        ORDER BY post.post_date DESC`
      console.log("5")
    } else if (level_id === "") {
      sqlFetchPost = `SELECT post_id,post_date,subject_name_th,level_name_th,place,post_price,profile_name,profile_lastname,profile_image,sex_name_th FROM post 
        INNER JOIN level ON  post.level_id = level.level_id 
        INNER JOIN subject ON post.subject_id = subject.subject_id 
        INNER JOIN profile ON post.users_id = profile.users_id 
        INNER JOIN sex ON post.sex_id = sex.sex_id
        WHERE post.subject_id ="${subject_id}" AND post.sex_id ="${sex_id}"
        GROUP BY post.post_id
        ORDER BY post.post_date DESC`
      console.log("6")
    } else {
      sqlFetchPost = `SELECT post_id,post_date,subject_name_th,level_name_th,place,post_price,profile_name,profile_lastname,profile_image,sex_name_th FROM post 
        INNER JOIN level ON  post.level_id = level.level_id 
        INNER JOIN subject ON post.subject_id = subject.subject_id 
        INNER JOIN profile ON post.users_id = profile.users_id 
        INNER JOIN sex ON post.sex_id = sex.sex_id
        WHERE post.subject_id ="${subject_id}" AND post.level_id ="${level_id}" AND post.sex_id ="${sex_id}"
        GROUP BY post.post_id
        ORDER BY post.post_date DESC`
    }

    dbConn.query(sqlFetchPost, (err, rows, result) => {
      if (err) {
        res.json({
          head: 500,
          body: rows,
          message: err.message
        })
      } else {
        if (rows.length > 0) {
          res.json({
            head: 200,
            body: rows,
            message: "ดึงข้อมูลสำเร็จ"
          })
        } else {
          res.json({
            head: 200,
            body: rows,
            message: "ไม่พบข้อมูล"
          })
        }
      }
    })
  } catch (error) {
    res.json({
      head: 404,
      body: rows,
      message: error.message
    })
  }
}

const fetchPostTutor = (req, res) => {
  console.log(req.body)
  try {
    let usersId = req.body.tutorId

    sqlFetchPostTutor = `SELECT post_id,post_date,subject_name_th,level_name_th,place,profile_name,profile_lastname,sex_name_th FROM post 
        INNER JOIN level ON  post.level_id = level.level_id 
        INNER JOIN subject ON post.subject_id = subject.subject_id 
        INNER JOIN profile ON post.users_id = profile.users_id 
        INNER JOIN sex ON post.sex_id = sex.sex_id
        WHERE post.users_id = "${usersId}"
        GROUP BY post.post_id`

    dbConn.query(sqlFetchPostTutor, (err, rows, result) => {
      if (err) {
        console.log(err.message)
        res.json({
          head: 500,
          body: rows,
          message: err.message
        })
      } else {
        if (rows.length > 0) {
          res.json({
            head: 200,
            body: rows,
            message: "ดึงข้อมูลสำเร็จ"
          })
        } else {
          res.json({
            head: 200,
            body: rows,
            message: "ไม่พบข้อมูล"
          })
        }
      }
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      head: 404,
      body: rows,
      message: error.message
    })
  }
}

const fetchDetailtutor = (req, res) => {
  console.log(req.body)

  try {
    let postId = req.body.post_id

    sqlFetchDetailTutor = `SELECT profile_image,profile_name,profile_lastname,sex_name_th,level_name_th,subject_name_th,post_price,place,profile_phone,profile.level_id,post.users_id,post.subject_id
        FROM post
        INNER JOIN profile ON post.users_id = profile.users_id
        INNER JOIN level ON post.level_id = level.level_id
        INNER JOIN subject ON post.subject_id = subject.subject_id
        INNER JOIN sex ON post.sex_id = sex.sex_id
        WHERE post_id = "${postId}"`

    dbConn.query(sqlFetchDetailTutor, (err, rows, result) => {
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
    console.log(error.message)
    res.json({
      head: 404,
      body: rows,
      message: error.message
    })
  }
}

const editPost = (req, res) => {
  console.log(req.body)

  try {
    let post_id = req.body.post_id
    let post_date = date_gmt7
    let post_time = time_gmt7
    let subject_id = req.body.subject_id
    let level_id = req.body.level_id
    let price = req.body.post_price
    let place = req.body.place

    console.log(post_date)
    sqlEditPost = `UPDATE post 
                 SET post_date = '${post_date}',
                  post_time = '${post_time}',
                  subject_id = ${subject_id},
                  level_id = ${level_id},
                  post_price = ${price},
                  place = '${place}'
                  WHERE post_id = ${post_id} `

    dbConn.query(sqlEditPost, (err, rows, result) => {
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
          message: "แก้ไขโพสต์สำเร็จ"
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

const deletePost = (req, res) => {
  console.log(req.body)

  try {
    let post_id = req.body.post_id
    sqlDeletePost = `DELETE FROM post WHERE post_id = ${post_id}`

    dbConn.query(sqlDeletePost, (err, rows, result) => {
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
          message: "ลบโพสต์สำเร็จ"
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
  addPost,
  fetchPost,
  fetchPostTutor,
  fetchDetailtutor,
  editPost,
  deletePost
}
