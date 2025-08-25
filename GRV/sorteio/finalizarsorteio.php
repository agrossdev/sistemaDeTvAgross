<?php  
  
// Requires php5  
define('UPLOAD_DIR', '../imagens/seisnumeros/'); 
 
$img = $_POST['imgBase64'];  
$numero = $_POST['numero'];
$img = str_replace('data:image/png;base64,', '', $img);  
$img = str_replace(' ', '+', $img);  
$data = base64_decode($img);  
$file = UPLOAD_DIR . "{$numero}" . '.png';  

$success = file_put_contents($file, $data);  

print $success ? $file : 'Unable to save the file.';  
  
?> 