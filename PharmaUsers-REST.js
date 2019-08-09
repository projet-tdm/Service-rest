var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//database connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database:'pharma'
});
connection.connect();


// server creation

var server = app.listen(8082,function(){
    var host = server.address().address
    var port = server.address().port
});

//rest service
app.post('/alterUserPass',function(req,res){  
    var user=req.body
    var query = "UPDATE `users` SET `mdp` = ?,`new` = ? WHERE `users`.`nss` = ?";
   connection.query(query,[user.mdp,user.new,user.nss ],function(error,results){
    if (error) { res.send(JSON.stringify("FAILUREkaka"));}
    else{res.send(JSON.stringify("SUCCESS"));}
})
});

app.post('/addUser',function(req,res){  
    var user=req.body
    var query = "insert into users values(?,?,?,?,?,?,1)";
   connection.query(query,[user.nss, user.nom, user.prenom, user.adresse, user.tel, user.mdp],function(error,results){
    if (error) { res.send(JSON.stringify("FAILURE"));}
    else{res.send(JSON.stringify("SUCCESS"));}
})
});


app.get('/getUserByTel/:tel',function(req,res){  
    var query = "select users.nss , users.nom , users.prenom , users.adresse , users.tel , users.mdp, users.new from  users where users.tel=?";
   connection.query(query,[req.params.tel],function(error,results){
    if (error) { res.send(JSON.stringify("FAILURE"));}
    res.send(JSON.stringify(results));
})
});


