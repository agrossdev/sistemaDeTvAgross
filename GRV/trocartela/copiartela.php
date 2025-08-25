<?php
$arquivo = $_POST['arquivo'];

$telafinal = "../imagens/seisnumeros/{$arquivo}.png";


copy($telafinal, "../imagens/telatv/01.png");


?>