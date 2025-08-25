<?php
$arquivo = $_POST['arquivo'];


$telafinal = "../imagens/fotoswhats/fotos/{$arquivo}.png";


copy($telafinal, "../imagens/telatv/01.png");


?>