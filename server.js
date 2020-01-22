const express = require("express");
const moment = require("moment");
const momentz = require("moment-timezone");
const bodyParser = require("body-parser");
const dbConn = require("./connectDB");
const multer = require("multer");
const path = require("path");

const storage = require("filestorage").create("./upload");
const app = express();

var upload = multer();
dbConn.getConnection(function(err) {
  if (err) {
    console.log(err.stack);
    throw err;
  }
  console.log("connected");
});

/////////////////////////// Port Listen //////////////

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const PORT = process.env.PORT || 5624;

///////////////////////////// Setting API ////////////////

var blank = require("./blank");

app.use("", blank);

///////////////////////////// Project API /////////////////

var user = require("./routes/user.js");
app.use("/tutorNearMe/api/user", user);

var post = require("./routes/post.js");
app.use("/tutorNearMe/api/post", post);

var payment = require("./routes/payment.js");
app.use("/tutorNearMe/api/payment", payment);

var comment = require("./routes/comment");
app.use("/tutorNearMe/api/comment", comment);

app.post("/uploads", multer({ storage: storage }).single("file"));
app.use(upload.array());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/image", express.static(path.join(__dirname, "upload")));

app.listen(PORT);

//////////////////////////// Function Noti //////////////

//////////////////////////// Function CronJob //////////////

//////////////////////////////////////////////////////////
