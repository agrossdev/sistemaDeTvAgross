<?php
$arquivo = $_POST['arquivo'];

$telafinal = "../imagens/telagrr/{$arquivo}.jpg";


copy($telafinal, "../imagens/telatv/01.png");


?>