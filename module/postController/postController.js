const dbConn = require('../../connectDB')
const moment = require('moment-timezone');
const date_gmt7 = moment().tz('Asia/Bangkok').format("YYYY-MM-DD")
const time_gmt7 = moment().tz('Asia/Bangkok').format("HH:mm:ss")

// dbConn.getConnection(function(err){
//     if (err) {
//         console.log(err.stack)
//         throw err
//     }
//     console.log("connected")
// });

//ADD POST
const addPost = (req, res)=>{
    console.log(req.body)

    try {
        let post_date = date_gmt7
        let post_time = time_gmt7
        let subject_id = req.body.subject_id
        let level_id = req.body.level_id
        let place = req.body.place
        let users_id = req.body.users_id
    
        sqlAddPost = `INSERT INTO post (post_date,post_time, subject_id, level_id, place, users_id) VALUES (?,?, ?, ?, ?,?)`
    
        dbConn.query(sqlAddPost,[post_date,post_time,subject_id,level_id,place,users_id],(err,rows,result)=>{
            if (err) {
                res.json({
                    "head":500,
                    "body":rows,
                    "message":err.message
                })
            }else{
                res.json({
                    "head":200,
                    "body":rows,
                    "message":"เพิ่มโพสต์สำเร็จ"
                })
            }
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            "head":404,
            "body":rows,
            "message":"กรุณาตรวจสอบรูปแบบ Request"
        })
    }

}

//FETCH

const fetchPost =(req, res)=>{
    console.log(req.body)
    try {
        let subject_id = req.body.subject_id
        let level_id = req.body.level_id
        
        sqlFetchPost = `SELECT post_id,post_date,subject_name_th,level_name_th,profile_name,profile_lastname FROM post INNER JOIN level ON  post.level_id = level.level_id INNER JOIN subject ON post.subject_id = subject.subject_id JOIN profile ON post.users_id = profile.users_id WHERE post.subject_id ="${subject_id}" AND post.level_id ="${level_id}"` 
        
        dbConn.query(sqlFetchPost,(err,rows,result)=>{
            if (err) {
                res.json({
                    "head":500,
                    "body":rows,
                    "message":err.message
                })
            }else{
                res.json({
                    "head":200,
                    "body":rows,
                    "message":"ดึงข้อมูลสำเร็จ"
                })
            }
        })
    } catch (error) {
        
    }
}



module.exports = {addPost,fetchPost};