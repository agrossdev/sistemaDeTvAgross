function trocartela(tela) {

        $.ajax({
                method: "POST",
                url: `http://10.19.3.45/tvagross/trocartela/trocartela.php`,
                data: { arquivo: tela }
        });
}

function corbtn(botao) {
        document.getElementById('telapadrao').classList.remove("btnativo");
        document.getElementById('milhar').classList.remove("btnativo");
        document.getElementById('centena').classList.remove("btnativo");
        document.getElementById('premioextra').classList.remove("btnativo");
        document.getElementById('bolamaiorm').classList.remove("btnativo");
        document.getElementById('bolamaiorc').classList.remove("btnativo");
        document.getElementById(botao).classList.add("btnativo");
}

window.onload = function () {

        imagenswpp();

        const socket = io()

        socket.on('ttstatus', function (digitando) {
                var digitandosorteio = sessionStorage.getItem(digitando.usuario);
                if (digitandosorteio == null) {
                        sessionStorage.setItem(digitando.usuario, digitando.sorteio + digitando.premio)
                        $('.' + digitando.sorteio + digitando.premio).html(digitando.usuario + ' está digitando...');
                        $('.' + digitando.sorteio + digitando.premio).show();
                } else {
                        $('.' + digitandosorteio).hide();
                        sessionStorage.setItem(digitando.usuario, digitando.sorteio + digitando.premio)
                        $('.' + digitando.sorteio + digitando.premio).html(digitando.usuario + ' está digitando...');
                        $('.' + digitando.sorteio + digitando.premio).show();
                }
        })
        socket.on('ttlogin', function (usuario) {
                const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                })

                Toast.fire({
                        icon: 'success',
                        title: usuario + " se conectou!"
                })
        })
        socket.on('tteditarsorteio', function (usuario) {
                const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                })

                Toast.fire({
                        icon: 'success',
                        title: usuario + ' vai alterar algum sorteio!'
                })
        })
        socket.on('ttfinalizarsorteio', function (finalizou) {
                switch (finalizou.sorteio) {
                        case '1sorteio':
                                var sorteio = "1º Sorteio";
                                break;
                        case '2sorteio':
                                var sorteio = "2º Sorteio";
                                break;
                        case '3sorteio':
                                var sorteio = "3º Sorteio";
                                break;
                        default:
                                var sorteio = "nenhum sorteio";
                }
                const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                })

                Toast.fire({
                        icon: 'success',
                        title: finalizou.usuario + ' finalizou o ' + sorteio
                })
        })
        socket.on('ttgerarimagem', function (gerarimagem) {

                switch (gerarimagem.sorteio) {
                        case '1sorteio':
                                var sorteio = "1º Sorteio";
                                break;
                        case '2sorteio':
                                var sorteio = "2º Sorteio";
                                break;
                        case '3sorteio':
                                var sorteio = "3º Sorteio";
                                break;
                        default:
                                var sorteio = "nenhum sorteio";
                }
                const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                })

                Toast.fire({
                        icon: 'success',
                        title: gerarimagem.usuario + ' gerou uma imagem para ' + gerarimagem.premio + ' no ' + sorteio
                })
        })


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
                        $.post(`http://10.19.3.45/tvagross/trocartela/zerarfotos.php`, {
                                //parametros da solicitacao
                                param: 'pamametro'
                        });
                        Swal.fire('Imagens resetadas com sucesso!', '', 'success')
                }
        })

}

async function trocartelasorteios(imagem) {
        console.log('entrou na função');

        $.get(`${ipapi}moldura`, {

        }, function (data) {
                document.getElementById(data).style.border = "solid 5px lightgray";

        });
        $.get(`${ipapi}tela`, {

        }, function (data) {
                corbtn(data);
                console.log(data)
        });

        if (imagem.dataset.sorteio == 'roundup') {
                var id = imagem.dataset.sorteio
        } else {

                var id = imagem.dataset.sorteio + imagem.dataset.img;
        }
        document.getElementById(id).style.border = "solid 5px green";

        await $.ajax({
                method: "POST",
                url: `http://10.19.3.45/tvagross/trocartela/trocartelasorteios.php`,
                data: {
                        arquivo: imagem.dataset.img,
                        pasta: imagem.dataset.sorteio,
                        arquivolog: id
                }
        });
        document.location.reload();


}

function recarregarimagens() {
        window.location.reload(true);
}

function imagenswpp() {
        fetch('http://localhost:8000/contadorimagenswpp')
                .then(response => response.json())
                .then(data => {
                        console.log(data.fileCount);
                        if (data < 1) {
                                return
                        } else {
                                var contator = parseInt(data.fileCount);
                                for (x = 0; x < contator; x++) {
                                        console.log(contator);
                                        var html = '<div style="width: 20%">';
                                        html += '<img src="../imagens/fotoswhats/fotos/image' + (x + 2) + '.png" alt="" onclick="trocartelawpp(this);" data-img="image' + (x + 2) + '">';
                                        html += '</div>';
                                        document.getElementById('divimagenswpp').innerHTML += html;
                                }
                        }
                })
                .catch(error => console.error('Erro:', error));

}

async function trocartelawpp(imagem) {
        await $.ajax({
                method: "POST",
                url: `http://10.19.3.45/tvagross/trocartela/trocartelawpp.php`,
                data: {
                        arquivo: imagem.dataset.img,

                }
        });
}