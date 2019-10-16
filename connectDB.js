const mysql =require('mysql')

// var host = 'us-cdbr-iron-east-05.cleardb.net';
// var user = 'b2995b4f6dc3b6'
// var password = '6c76c5d7'
// var dbName = 'heroku_ece53a02cb7485f'
// var port = '3306';


var host = 'erxv1bzckceve5lh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
var user = 'jxni9mdvkc9n6ata'
var password = 'htetxggfiaa655hu'
var dbName = 'naxr8w21i6j7tqab'
var port = '3306';



var connectionDatabase = mysql.createPool({
        host : host,
        port : port,
        user : user,
        password : password,
        database : dbName
    });
   
    

module.exports = connectionDatabase ;