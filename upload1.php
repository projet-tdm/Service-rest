<?php
 //Constants for database connection
        define('DB_HOST','localhost');
        define('DB_USER','root');
        define('DB_PASS','');
        define('DB_NAME','PharmaDz');

        //We will upload files to this folder
        //So one thing don't forget, also create a folder named uploads inside your project folder i.e. MyApi folder
        define('UPLOAD_PATH', 'upload/');
        
        //connecting to database 
        $conn = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME) or die('Unable to connect');


$etat=$_POST['etat'];
$photo=$_POST['photo'];

$pharma=$_POST['pharma'];
$date=$_POST['date'];
$user=$_POST['user'];
$name=$_POST['name'];
$upload_path="upload/$name.jpg";
$sql="insert into Commande(photo,etat,pharma,date,user) values ('$name.jpg','$etat','$pharma','$date','$user');";
if(mysqli_query($conn,$sql))
{

file_put_contents($upload_path,base64_decode($photo));
echo json_encode(array('response'=>"image ok"));

}
else
{
echo json_encode(array('response'=>"image not  ok"));

}
mysqli_close($conn);

?>
