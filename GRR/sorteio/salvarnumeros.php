<?php 

$texto = $_POST['numero'];

$arquivo = fopen('ultimosorteio.txt','w'); 
if ($arquivo == false) die('Não foi possível criar o arquivo.'); 

fwrite($arquivo, $texto); 

echo ($texto);
fclose($arquivo);


?>