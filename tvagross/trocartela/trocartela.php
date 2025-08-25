<?php
$arquivo = $_POST['arquivo'];
$telafinal = "../imagens/trocartela/{$arquivo}.png";
$log = "../imagens/trocartela/logs/{$arquivo}.txt";

copy($telafinal, "../imagens/telatv/01.png");
copy($log, "../trocartela/log.txt");

?>