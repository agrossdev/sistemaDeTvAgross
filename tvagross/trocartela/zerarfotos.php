
<?php

// Função para deletar os arquivos na pasta especificada, exceto telapadrao.png
function deletarArquivosNaPasta($pasta) {
    // Obtém uma lista de todos os arquivos na pasta
    $arquivos = glob($pasta . "*");

    // Itera sobre os arquivos e os deleta, exceto telapadrao.png
    foreach ($arquivos as $arquivo) {
        if (is_file($arquivo) && basename($arquivo) !== 'telapadrao.png') {
            unlink($arquivo);
        }
    }
}

// Deleta os arquivos nas pastas dos sorteios
deletarArquivosNaPasta("../imagens/1sorteio/");
deletarArquivosNaPasta("../imagens/2sorteio/");
deletarArquivosNaPasta("../imagens/3sorteio/");

// Deleta os arquivos na pasta fotoswhats/fotos
deletarArquivosNaPasta("../imagens/fotoswhats/fotos/");



// unlink("../imagens/1sorteio/milhar.png");
// unlink("../imagens/1sorteio/centena.png");
// unlink("../imagens/1sorteio/premioextra.png");
// unlink("../imagens/1sorteio/bolamaiorm.png");
// unlink("../imagens/1sorteio/bolamaiorc.png");
// unlink("../imagens/1sorteio/sorteio.png");

// unlink("../imagens/2sorteio/milhar.png");
// unlink("../imagens/2sorteio/centena.png");
// unlink("../imagens/2sorteio/premioextra.png");
// unlink("../imagens/2sorteio/bolamaiorm.png");
// unlink("../imagens/2sorteio/bolamaiorc.png");
// unlink("../imagens/2sorteio/sorteio.png");

// unlink("../imagens/3sorteio/milhar.png");
// unlink("../imagens/3sorteio/centena.png");
// unlink("../imagens/3sorteio/premioextra.png");
// unlink("../imagens/3sorteio/bolamaiorm.png");
// unlink("../imagens/3sorteio/bolamaiorc.png");
// unlink("../imagens/3sorteio/sorteio.png");




?>