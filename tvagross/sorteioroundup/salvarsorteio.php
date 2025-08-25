<?php  
  
// Requires php5  

$pasta = $_POST['pasta'];

define('UPLOAD_DIR', "../imagens/{$pasta}/");  

$img = $_POST['imgBase64'];  
$premio = $_POST['premio'];
$img = str_replace('data:image/png;base64,', '', $img);  
$img = str_replace(' ', '+', $img);  
$data = base64_decode($img);  
$file = UPLOAD_DIR . "{$premio}" . '.png';  

$success = file_put_contents($file, $data);  

print $success ? $file : 'Unable to save the file.';  
  
?> 