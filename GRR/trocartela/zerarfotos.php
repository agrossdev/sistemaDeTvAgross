<?php


copy("../imagens/primeiropremio.png", "../imagens/trocartela/primeiropremio.png");
copy("../imagens/segundopremio.png", "../imagens/trocartela/segundopremio.png");
copy("../imagens/bolamaior.png", "../imagens/trocartela/bolamaior.png");

$pasta = "../imagens/seisnumeros/";

if(is_dir($pasta))
{
$diretorio = dir($pasta);

while($arquivo = $diretorio->read())
{
if(($arquivo != '.') && ($arquivo != '..'))
{
unlink($pasta.$arquivo);
echo 'Arquivo '.$arquivo.' foi apagado com sucesso. <br />';
}
}

$diretorio->close();
}
else
{
echo 'A pasta não existe.';
}
?>