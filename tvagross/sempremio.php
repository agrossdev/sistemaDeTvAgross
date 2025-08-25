<?php
$premio = $_POST['premio'];
$pasta = $_POST['pasta'];

$telafinal = "imagens/sempremio/{$premio}.png";


if(file_exists("imagens/{$pasta}/{$premio}.png"))
{
    echo '<p>Já existe uma imagem para esse prêmio!';
}else
{
    copy($telafinal, "imagens/{$pasta}/{$premio}.png");
}


?>