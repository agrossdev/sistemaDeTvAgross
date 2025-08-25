<?php
$arquivo = $_POST['arquivo'];
$telafinal = "../imagens/trocartela/{$arquivo}.png";

copy($telafinal, "../imagens/telatv/01.png");

?>