<?php
$arquivo = $_POST['arquivo'];
$pasta = $_POST['pasta'];
$arquivolog = $_POST['arquivolog'];
$telafinal = "../imagens/{$pasta}/{$arquivo}.png";
$log = "../imagens/trocartela/logs/{$arquivo}.txt";
$logmoldura = "../imagens/trocartela/logsmoldura/{$arquivolog}.txt";

copy($telafinal, "../imagens/telatv/01.png");
copy($log, "../trocartela/log.txt");
copy($logmoldura, "../trocartela/logmoldura.txt");

?>