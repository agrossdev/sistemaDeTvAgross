<?php  
  
// Requires php5  
define('UPLOAD_DIR', '../imagens/seisnumeros/'); 
define('UPLOAD_DIR2', '../imagens/telatv/');  
$img = $_POST['imgBase64'];  
$numero = $_POST['numero'];
$img = str_replace('data:image/png;base64,', '', $img);  
$img = str_replace(' ', '+', $img);  
$data = base64_decode($img);  
$file = UPLOAD_DIR . "{$numero}" . '.png';  
$file2 = UPLOAD_DIR2 . "01" . '.png'; 
$success = file_put_contents($file, $data);  
$success = file_put_contents($file2, $data);
print $success ? $file : 'Unable to save the file.';  
  
?> 