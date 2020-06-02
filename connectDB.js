const mysql =require('mysql')

var host = 'your-host';
var user = ''
var password = ''
var dbName = ''
var port = '';



var connectionDatabase = mysql.createPool({
        host : host,
        port : port,
        user : user,
        password : password,
        database : dbName
    });
   
    

module.exports = connectionDatabase ;
