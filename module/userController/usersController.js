const dbConn = require('../../connectDB')

// dbConn.getConnection(function(err){
//     if (err) {
//         console.log(err.stack)
//         throw err
//     }
//     console.log("connected")
// });


// CHECK AND FETCH 
const checkUserLogin = (req,res) =>{
    // console.log(req.query)
        console.log(req.body)

    try {
        let username =req.body.username
        let password =req.body.password
        sqlCheckuserName = `Select * from users where users_name = "${username}" AND users_password = "${password}"`
 
        dbConn.query(sqlCheckuserName,(err,rows,result)=>{
            if (err) {
                console.log(err)
                res.json({
                    "head":500,
                    "body":rows,
                    "message":err.message
                });
            }else{
                console.log(rows.length)
                if (rows.length === 0) {
                    res.json({
                        "head":200,
                        "body":rows,
                        "message":"ไม่พบรายชื่อ"
                    });
                }else{
                res.json({
                    "head":200,
                    "body":rows,
                    "message":"รายชื่อ"
                });
            }
        }
        });
    } catch (error) {
        res.json({
            "head":404,
            "body":[],
            "message":"กรุณาตรวจสอบรูปแบบ Request"
        });
    }
};
const fetchProfile = (req, res) =>{
    console.log(req.body)

    try {
        let users_id =req.body.users_id
        sqlFetchProfile = `Select profile_id,
                            profile_name,profile_lastname,profile_email,profile_image,sex_name_th,role_name_th,users_id from profile INNER JOIN sex ON profile.sex_id = sex.sex_id INNER JOIN role ON profile.role_id = role.role_id where users_id = "${users_id}" ORDER BY profile_id DESC LIMIT 1 `
 
        dbConn.query(sqlFetchProfile,(err,rows,result)=>{
            if (err) {
                console.log(err)
                res.json({
                    "head":500,
                    "body":rows,
                    "message":err.message
                });
            }else{
                console.log(rows.length)
                if (rows.length === 0) {
                    res.json({
                        "head":200,
                        "body":rows,
                        "message":"ไม่พบข้อมูลส่วนตัว"
                    });
                }else{
                res.json({
                    "head":200,
                    "body":rows,
                    "message":"ข้อมูลส่วนตัว"
                });
            }
        }
        });
    } catch (error) {
        res.json({
            "head":404,
            "body":[],
            "message":"กรุณาตรวจสอบรูปแบบ Request"
        });
    }

};

// ADD 
const addUser = (req,res) =>{
    console.log(req.body)

    try {
        let users_name = req.body.username
        let users_password = req.body.password

        sqlAddUser = `INSERT INTO users (users_name, users_password) VALUES (?, ?)`
        
        dbConn.query(sqlAddUser,[users_name, users_password],(err,rows,result)=>{
            if (err) {
                console.log(err)
                res.json({
                    "head":500,
                    "body":[],
                    "message":err.message
                });
            }else{
                console.log(result)
                console.log("///////////////////")
                console.log(rows)
                if (rows.length === 0) {
                    res.json({
                        "head":200,
                        "body":rows,
                        "message":"เพิ่มข้อมูลไม่สำเร็จ"
                    });
                }else{
                    req.body["users_id"] = rows.insertId
                    res.json({
                        "head":200,
                        "body":req.body,
                        "message":"เพิ่มข้อมูลส่วนตัวสำเร็จ"
                    });
            }
            }
        })
    } catch (error) {
        res.json({
            "head":404,
            "body":[],
            "message":error.message
        });
    }
};
const addUserProfile = (req,res) =>{
    // console.log(req.query)
        console.log(req.body)
    try {
        let profile_name = req.body.profile_name  
        let profile_lastname =req.body.profile_lastname
        let profile_email = req.body.profile_email
        let profile_image = req.body.profile_image
        let sex_id = req.body.sex_id
        let role_id = req.body.role_id
        let users_id = req.body.users_id


        sqlAddProfile = `INSERT INTO profile (profile_name,profile_lastname,profile_email,profile_image,sex_id,role_id,users_id)  VALUES (?,?,?,?,?,?,?)`
        // sqlAddProfile = `INSERT INTO profile VALUES (?,?,?,?,?,?,?)`

        dbConn.query(sqlAddProfile,[profile_name,profile_lastname,profile_email,profile_image,sex_id,role_id,users_id],(err,rows,result)=>{
            if (err) {
                console.log(err)
                res.json({
                    "head":500,
                    "body":[],
                    "message":err.message
                });
            }else{
                // console.log(rows)
        sqlFetchProfile = `Select profile_id,
                            profile_name,profile_lastname,profile_email,profile_image,sex_name_th,role_name_th,users_id from profile INNER JOIN sex ON profile.sex_id = sex.sex_id INNER JOIN role ON profile.role_id = role.role_id where users_id = "${users_id}" ORDER BY profile_id DESC LIMIT 1 `                
        dbConn.query(sqlFetchProfile,(err,rows,result)=>{
                    if (rows.length === 0) {
                        res.json({
                            "head":200,
                            "body":rows,
                            "message":"เพิ่มข้อมูลไม่สำเร็จ"
                        });
                    }else{    
                    res.json({
                        "head":200,
                        "body":rows,
                        "message":"เพิ่มข้อมูลส่วนตัวสำเร็จ"
                    });
                    }
                });
            }
        });
    } catch (error) {
        res.json({
            "head":404,
            "body":[],
            "message":error.message
        });
    }
};

//EDIT PROFILES
const editProfile = (req, res)=>{
    console.log(req.body)

    try {
        let profile_name = req.body.profile_name  
        let profile_lastname =req.body.profile_lastname
        let profile_email = req.body.profile_email
        let profile_image = req.body.profile_image
        let sex_id = req.body.sex_id
        let role_id = req.body.role_id
        let users_id = req.body.users_id


        sqlUpdateProfile = `UPDATE profile
                        SET profile_name ="${profile_name}",
                            profile_lastname = "${profile_lastname}",
                            profile_email = "${profile_email}",
                            profile_image = "${profile_image}"
                            WHERE users_id = ${users_id}`
        // sqlAddProfile = `INSERT INTO profile VALUES (?,?,?,?,?,?,?)`

        dbConn.query(sqlUpdateProfile,(err,rows,result)=>{
            if (err) {
                console.log(err)
                res.json({
                    "head":500,
                    "body":[],
                    "message":err.message
                });
            }else{
                // console.log(rows)
                sqlFetchProfile = `Select profile_id,
                            profile_name,profile_lastname,profile_email,profile_image,sex_name_th,role_name_th,users_id from profile INNER JOIN sex ON profile.sex_id = sex.sex_id INNER JOIN role ON profile.role_id = role.role_id where users_id = "${users_id}" ORDER BY profile_id DESC LIMIT 1 `                
        dbConn.query(sqlFetchProfile,(err,rows,result)=>{
                    if (rows.length === 0) {
                        res.json({
                            "head":200,
                            "body":rows,
                            "message":"เพิ่มข้อมูลไม่สำเร็จ"
                        });
                    }else{    
                    res.json({
                        "head":200,
                        "body":rows,
                        "message":"เพิ่มข้อมูลส่วนตัวสำเร็จ"
                    });
                    }
                });    
            }
        });
    } catch (error) {
        res.json({
            "head":404,
            "body":[],
            "message":error.message
        });
    }
};

module.exports = {checkUserLogin,fetchProfile,addUser,addUserProfile,editProfile};