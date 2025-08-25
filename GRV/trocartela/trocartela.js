

function trocartela(tela) {

        $.ajax({
                method: "POST",
                url: `${ipapi}trocartela/trocartela.php`,
                data: { arquivo: tela }
        });
}

function mostrarimagensseis() {
        $.get('../mostrarimagensseis', {

        }, function (data) {
                if (data < 1) {
                        console.log('data');
                } else {
                        var contator = parseInt(data);
                        for (x = 0; x < contator; x++) {
                                var html = '<div style="display: flex; flex-direction: column;">';
                                html += '<img src="../imagens/seisnumeros/' + (x + 1) + '.png" alt="" id="seisnumeros' + 
                                (x + 1) + '" onclick="trocartelasorteios(this);" data-numero="'+(x+1)+'">';
                                html += '</div>';
                                document.getElementById('divimagenssorteio').innerHTML += html;
                        }
                }
        });
}

window.onload = function () {
        mostrarimagensseis();
        

}

async function trocartelasorteios(imagem){
        
        await $.ajax({
                method: "POST",
                url: `${ipapi}trocartela/copiartela.php`,
                data: {
                    arquivo: imagem.dataset.numero,
                    
                }
            });
        
}

function zerarfotos() {
        Swal.fire({
                title: 'Você tem certeza que quer resetar as imagens?',
                showDenyButton: false,
                showCancelButton: true,

                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
        }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                        $.post(`${ipapi}trocartela/zerarfotos.php`, {
                                //parametros da solicitacao
                                param: 'pamametro'
                        }).then((data)=>{
                                console.log(data);
                        });
                        Swal.fire('Imagens resetadas com sucesso!', '', 'success')
                }
        })

}