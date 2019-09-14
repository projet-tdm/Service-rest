var FCM = require('fcm-push');
var MySQLEvents = require('mysql-events');
var express = require("express");
var mysql = require("mysql");
var app = express();
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database:'PharmaDz'
});
connection.connect();
var dsn = {
    host:    'localhost',
    user:     'root',
    password: ''
  };
  var mysqlEventWatcher = MySQLEvents(dsn);
  //console.log(mysqlEventWatcher);    
  
var watcher =mysqlEventWatcher.add(
  'PharmaDz.Commande',
  function (oldRow, newRow, event) {
  
 
     //row updated
    if (oldRow !== null && newRow !== null && newRow.fields.etat=='T') {
        var serverKey = 'AAAAHR6T_RI:APA91bEU-E37_tq3l_mPrKIsKFN5tiv9XDw5e5k6P_jCEEflJGNwYjQBhEvJ_eI-06VMaLnKTOIgzyruDgK4-c5iFkP-nY8JCPaS5fmovBj305lWIdhwlOdfeTAA5YQCldWFl7Avz8fx'; //put your server key here
        var fcm = new FCM(serverKey);
        var query = "select id from Device where user=?";
            var tockens=[];
            var ar;
            connection.query(query,[newRow.fields.user],function(error,results){
                if (error) { console.log("no");}
                else{
                    ar=JSON.parse(JSON.stringify(results));
                    
              ar.forEach(element => {
                tockens.push(element.id.toString());
                //console.log(tockens);

              });
              // tockens[0]="fd2_4qRZYqI:APA91bGunTsoTnbisxbYxHYGm9SKWHzm0Qc-x5ouuggYOkOyzBg0gsPDRg2NCwSTqkYQnnTSfS7iaaq2sm0V45RqdUcOzrim1M9hLdbWJRorXlzl_xd4FdzGXmXlMXC8SZL8-UBybqjq" 	
              //console.log(tockens);
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
              /*to: 'cjXOpBchpxU:APA91bG4y6Gg2rHIaqycbjiPXksqwedne1Ic9_81iW4DFiMyTwZ2JmS6EE7qviudyw47edbmNFlhS-EpoZdZkzf27-G41YnyMMKRzJYK3pmk4TtKBaoiwfW-74k54n43SCLMcj4cyhRi'
             ,*/
             registration_ids:tockens,
              notification: {
                  title: 'De la pharmacie: '+newRow.fields.pharma, 
                  body: 'La commande '+newRow.fields.numero+' est traitée' 
              }
          
          };
          
          fcm.send(message,function(err, response){
             var nb=0;
              if (err) 
              {
                  console.log("Something has gone wrong!",response);
              } 
              else 
              {   nb=nb+1;
                  if (nb==1){
                  console.log("Successfully sent with response: ");
                 var query = "insert into Notification (commande,user,date,vue,pharmacie,dateL) values(?,?,?,?,?,?)";
                 var d=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                  connection.query(query,[newRow.fields.numero, newRow.fields.user,d,1,newRow.fields.pharma,newRow.fields.date],function(error,results){
                   if (error) { console.log("no");}
                   else{console.log("yes"+results.insertId);}
               })
              }
            }
          }); 
                
            
                }
            })
            
    }
 
   
  }
  
);
 
