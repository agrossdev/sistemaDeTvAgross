<?php
// Abre o Arquvio no Modo r (para leitura)
$arquivo = fopen ('logmoldura.txt', 'r');

// Lê o conteúdo do arquivo
while(!feof($arquivo))
{
//Mostra uma linha do arquivo
$linha = fgets($arquivo, 1024);
echo $linha;
}

// Fecha arquivo aberto
fclose($arquivo);
?>