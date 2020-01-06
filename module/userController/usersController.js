const dbConn = require("../../connectDB");
var cloudinary = require("cloudinary").v2;
var mv = require("mv");
var formidable = require("formidable");
var fs = require("fs");
const path = require("path");

const uploadPath = "/Users/anusitpoyen/Documents/tutorMeetupAPI/upload/";
const directoryPath = path.join(__dirname, "../../upload/");
// dbConn.getConnection(function(err){
//     if (err) {
//         console.log(err.stack)
//         throw err
//     }
//     console.log("connected")
// });

cloudinary.config({
  cloud_name: "hrzcnxorq",
  api_key: "262465892499323",
  api_secret: "rn-KoWOZbT79mbmIhGIgFq3s6tU"
});
const checkUserLogin = (req, res) => {
  // console.log(req.query)
  console.log(req.body);

  try {
    let username = req.body.username;
    let password = req.body.password;
    sqlCheckuserName = `Select * from users where users_name = "${username}" AND users_password = "${password}"`;
    dbConn.query(sqlCheckuserName, (err, rows, result) => {
      if (err) {
        console.log(err);
        res.json({
          head: 500,
          body: rows,
          message: err.message
        });
      } else {
        console.log(rows.length);
        if (rows.length === 0) {
          res.json({
            head: 500,
            body: rows,
            message: "ไม่พบรายชื่อ"
          });
        } else {
          res.json({
            head: 200,
            body: rows,
            message: "รายชื่อ"
          });
        }
      }
    });
  } catch (error) {
    res.json({
      head: 404,
      body: [],
      message: "กรุณาตรวจสอบรูปแบบ Request"
    });
  }
};
const fetchProfile = (req, res) => {
  console.log(req.body);

  try {
    let users_username = req.body.users_username;
    let users_password = req.body.users_password;
    sqlFetchProfile = `SELECT profile_name,profile_lastname,profile_email,profile_image,sex_name_th,role_id,profile.users_id

        FROM profile INNER JOIN users ON profile.users_id = users.users_id 
        INNER JOIN sex ON profile.sex_id = sex.sex_id
        WHERE users.users_name = "${users_username}" AND users.users_password = "${users_password}"`;
    dbConn.query(sqlFetchProfile, (err, rows, result) => {
      if (err) {
        console.log(err);
        res.json({
          head: 500,
          body: rows,
          message: err.message
        });
      } else {
        console.log(rows.length);
        if (rows.length === 0) {
          res.json({
            head: 500,
            body: rows,
            message: "ไม่พบข้อมูลส่วนตัว"
          });
        } else {
          res.json({
            head: 200,
            body: rows,
            message: "ข้อมูลส่วนตัว"
          });
        }
      }
    });
  } catch (error) {
    res.json({
      head: 404,
      body: [],
      message: "กรุณาตรวจสอบรูปแบบ Request"
    });
  }
};

// ADD
const addUser = (req, res) => {
  console.log(req.body);

  try {
    let users_name = req.body.username;
    let users_password = req.body.password;

    sqlAddUser = `INSERT INTO users (users_name, users_password) VALUES (?, ?)`;

    dbConn.query(
      sqlAddUser,
      [users_name, users_password],
      (err, rows, result) => {
        if (err) {
          console.log(err);
          res.json({
            head: 500,
            body: [],
            message: err.message
          });
        } else {
          console.log(result);
          console.log("///////////////////");
          console.log(rows);
          if (rows.length === 0) {
            res.json({
              head: 500,
              body: [rows],
              message: "เพิ่มข้อมูลส่วนตัวไม่สำเร็จ"
            });
          } else {
            req.body["users_id"] = rows.insertId;
            res.json({
              head: 200,
              body: [req.body],
              message: "เพิ่มข้อมูลส่วนตัวสำเร็จ"
            });
          }
        }
      }
    );
  } catch (error) {
    res.json({
      head: 404,
      body: [],
      message: error.message
    });
  }
};
const addUserProfile = (req, res) => {
  // console.log(req.query)
  console.log(req.body);
  try {
    let profile_name = req.body.profile_name;
    let profile_lastname = req.body.profile_lastname;
    let profile_email = req.body.profile_email;
    let profile_image = req.body.profile_image;
    let profile_phone = req.body.profile_phone;
    let level_id = req.body.level_id;
    let sex_id = req.body.sex_id;
    let role_id = req.body.role_id;
    let users_id = req.body.users_id;

    console.log(req.body);

    sqlAddProfile = `INSERT INTO profile (profile_name,profile_lastname,profile_email,profile_image,profile_phone,level_id,sex_id,role_id,users_id)  VALUES (?,?,?,?,?,?,?,?,?)`;
    // sqlAddProfile = `INSERT INTO profile VALUES (?,?,?,?,?,?,?)`

    dbConn.query(
      sqlAddProfile,
      [
        profile_name,
        profile_lastname,
        profile_email,
        profile_image,
        profile_phone,
        level_id,
        sex_id,
        role_id,
        users_id
      ],
      (err, rows, result) => {
        if (err) {
          console.log(err);
          res.json({
            head: 500,
            body: [],
            message: err.message
          });
        } else {
          // console.log(rows)
          sqlFetchProfile = `Select profile_id,
                            profile_name,profile_lastname,profile_email,profile_image,profile_phone,sex_name_th,role_name_th,users_id from profile INNER JOIN sex ON profile.sex_id = sex.sex_id INNER JOIN role ON profile.role_id = role.role_id where users_id = "${users_id}" ORDER BY profile_id DESC LIMIT 1 `;
          dbConn.query(sqlFetchProfile, (err, rows, result) => {
            if (rows.length === 0) {
              res.json({
                head: 200,
                body: rows,
                message: "เพิ่มข้อมูลไม่สำเร็จ"
              });
            } else {
              res.json({
                head: 200,
                body: rows,
                message: "เพิ่มข้อมูลส่วนตัวสำเร็จ"
              });
            }
          });
        }
      }
    );
  } catch (error) {
    res.json({
      head: 404,
      body: [],
      message: error.message
    });
  }
};

const addUserProfileAndImage = (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    console.log(fields);

    let profileNameReqBody = fields.profile_name;
    let profileLastNameReqBody = fields.profile_lastname;
    let profileEmailReqBody = fields.profile_email;
    let profileImageReqBody = "";
    let profilePhoneReqBody = fields.profile_phone;
    let profileLevelIdReqBody = fields.level_id;
    let profileSexIdReqBody = fields.sex_id;
    let profileRoleIdReqBody = fields.role_id;
    let profileUserIdReqBody = fields.users_id;

    let profileImage = "";
    let public_image = "";
    try {
      var oldpath = files.profile_image.path;
      var newPath = directoryPath + files.profile_image.name;

      profileImage = newPath;
      mv(oldpath, newPath, err => {
        if (err) throw err;

        cloudinary.uploader.upload(profileImage, (err, result) => {
          if (err) {
            console.log("Cloudinary " + err.message);
          } else {
            console.log(result);
            public_image = result.url;

            try {
              sqlAddProfile = `INSERT INTO profile (profile_name,profile_lastname,profile_email,profile_image,profile_phone,level_id,sex_id,role_id,users_id)  VALUES (?,?,?,?,?,?,?,?,?)`;
              // sqlAddProfile = `INSERT INTO profile VALUES (?,?,?,?,?,?,?)`

              dbConn.query(
                sqlAddProfile,
                [
                  profileNameReqBody,
                  profileLastNameReqBody,
                  profileEmailReqBody,
                  public_image,
                  profilePhoneReqBody,
                  profileLevelIdReqBody,
                  profileSexIdReqBody,
                  profileRoleIdReqBody,
                  profileUserIdReqBody
                ],
                (err, rows, result) => {
                  if (err) {
                    console.log(err);
                    res.json({
                      head: 500,
                      body: [],
                      message: err.message
                    });
                  } else {
                    // console.log(rows)
                    sqlFetchProfile = `Select profile_id,
                            profile_name,profile_lastname,profile_email,profile_image,profile_phone,sex_name_th,role_name_th,users_id from profile INNER JOIN sex ON profile.sex_id = sex.sex_id INNER JOIN role ON profile.role_id = role.role_id where users_id = "${profileUserIdReqBody}" ORDER BY profile_id DESC LIMIT 1 `;
                    dbConn.query(sqlFetchProfile, (err, rows, result) => {
                      if (rows.length === 0) {
                        res.json({
                          head: 200,
                          body: rows,
                          message: "เพิ่มข้อมูลไม่สำเร็จ"
                        });
                      } else {
                        res.json({
                          head: 200,
                          body: rows,
                          message: "เพิ่มข้อมูลส่วนตัวสำเร็จ"
                        });
                      }
                    });
                  }
                }
              );
            } catch (error) {
              res.json({
                head: 404,
                body: [],
                message: error.message
              });
            }
          }
        });
      });
    } catch (error) {
      console.log(error.message);
      console.log("Upload Image is an Interupted");
    }
  });
};
//EDIT PROFILES
const editProfile = (req, res) => {
  console.log(req.body);

  try {
    let profile_name = req.body.profile_name;
    let profile_lastname = req.body.profile_lastname;
    let profile_email = req.body.profile_email;
    let profile_image = req.body.profile_image;
    let profile_phone = req.body.profile_phone;
    let level_id = req.body.level_id;
    let sex_id = req.body.sex_id;
    let role_id = req.body.role_id;
    let users_id = req.body.users_id;

    sqlUpdateProfile = `UPDATE profile
                        SET profile_name ="${profile_name}",
                            profile_lastname = "${profile_lastname}",
                            profile_email = "${profile_email}",
                            profile_image = "${profile_image}",
                            profile_phone = "${profile_phone}"
                            WHERE users_id = ${users_id}`;
    // sqlAddProfile = `INSERT INTO profile VALUES (?,?,?,?,?,?,?)`

    dbConn.query(sqlUpdateProfile, (err, rows, result) => {
      if (err) {
        console.log(err);
        res.json({
          head: 500,
          body: [],
          message: err.message
        });
      } else {
        // console.log(rows)
        sqlFetchProfile = `Select profile_id,
                            profile_name,profile_lastname,profile_email,profile_image,profile_phone,sex_name_th,role_name_th,users_id from profile INNER JOIN sex ON profile.sex_id = sex.sex_id INNER JOIN role ON profile.role_id = role.role_id where users_id = "${users_id}" ORDER BY profile_id DESC LIMIT 1 `;
        dbConn.query(sqlFetchProfile, (err, rows, result) => {
          if (rows.length === 0) {
            res.json({
              head: 200,
              body: rows,
              message: "เพิ่มข้อมูลไม่สำเร็จ"
            });
          } else {
            res.json({
              head: 200,
              body: rows,
              message: "แก้ไขข้อมูลส่วนตัวสำเร็จ"
            });
          }
        });
      }
    });
  } catch (error) {
    res.json({
      head: 404,
      body: [],
      message: error.message
    });
  }
};

module.exports = {
  checkUserLogin,
  fetchProfile,
  addUser,
  addUserProfile,
  editProfile,
  addUserProfileAndImage
};
