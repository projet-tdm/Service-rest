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
app.get('/getpharmacies/:ville',function(req,res){  
    var query = "select * from Pharmacie where id_ville=?";
   connection.query(query,[req.params.ville],function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});
app.get('/getcommandes/:nss',function(req,res){  
    var query = "select * from Commande where user=?";
   connection.query(query,[req.params.nss],function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});
app.get('/getvilles',function(req,res){  
    var query = "select * from Ville";
   connection.query(query,function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});
app.put('/annuler/:id', function (req, res) {
    var query="UPDATE Commande SET etat='A' where numero=?";
    connection.query(query,[req.params.id],function(error,results){
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
 });
 app.get('/getpharmaciesGarde/',function(req,res){  
    var query = "select * from Pharmacie where garde=1";
   connection.query(query,function(error,results){
    if (error) throw error;
    res.send(JSON.stringify(results));
})
});
 