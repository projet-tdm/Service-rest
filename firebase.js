var FCM = require('fcm-node');
var MySQLEvents = require('mysql-events');
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
        console.log(newRow.fields.etat);
        var serverKey = 'AAAAHR6T_RI:APA91bEU-E37_tq3l_mPrKIsKFN5tiv9XDw5e5k6P_jCEEflJGNwYjQBhEvJ_eI-06VMaLnKTOIgzyruDgK4-c5iFkP-nY8JCPaS5fmovBj305lWIdhwlOdfeTAA5YQCldWFl7Avz8fx'; //put your server key here
        var fcm = new FCM(serverKey);
        
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: 'dzW5KAQkE5A:APA91bEJZCeEt9bOWDd1htdOCYfSf0izp05EgLao0LxWRCBTXwN3XBD7rwkkXRSMPumOMyvkwuTyyH6PGWqEl9Vzh6VCTTtJA6C9T8VlNa-2GNrC1qnqEAecg5aOAlgndhrg6WG7vtSg'
           ,
            
            notification: {
                title: 'Title of your push notification', 
                body: 'Body of your push notification' 
            }
            
         
        };
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ");
            }
        });    
    }
 
   
  }, 
  
);
 
