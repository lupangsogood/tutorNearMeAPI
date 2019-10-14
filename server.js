const express = require('express');
const moment = require('moment');
const momentz = require('moment-timezone');

const app = express(); 

/////////////////////////// Port Listen //////////////

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', "*");    
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
    

const PORT = process.env.PORT || 5624

app.listen(PORT);

///////////////////////////// Setting API ////////////////

var blank = require('./blank');

app.use('', blank);

///////////////////////////// Project API /////////////////


//////////////////////////// Function Noti //////////////


//////////////////////////// Function CronJob //////////////





//////////////////////////////////////////////////////////