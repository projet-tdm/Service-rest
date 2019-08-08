var express = require("express");
var mysql = require("mysql");
var app = express();

//database connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database:'PharmaDz'
});
connection.connect();


// server creation

var server = app.listen(8083,function(){
    var host = server.address().address
    var port = server.address().port
});

// rest service
app.get('/getpharmacies',function(req,res){  
    var query = "select * from Pharmacie";
   connection.query(query,function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});
app.get('/getcommandes',function(req,res){  
    var query = "select * from Commande";
   connection.query(query,function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});