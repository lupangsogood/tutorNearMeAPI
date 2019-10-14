const dbConn = require('../../connectDB')
const moment = require('moment-timezone');
const time_gmt7 = moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss")

dbConn.getConnection(function(err){
    if (err) {
        console.log(err.stack)
        throw err
    }
    console.log("connected")
});


const addPost = (req, res)=>{
    console.log(req.body)

    let post_time = time_gmt7
    let subject_id = req.body.subject_id
    let level_id = req.body.level_id
    let place = req.body.place
    let users_id = req.body.users_id

    sqlAddPost = `INSERT INTO post (post_time, subject_id, level_id, place, users_id) VALUES (?, ?, ?, ?,?)`

    dbConn.query(sqlAddPost,[post_time,subject_id,level_id,place,users_id],(err,rows,result)=>{




    })
}




module.exports = {addPost};