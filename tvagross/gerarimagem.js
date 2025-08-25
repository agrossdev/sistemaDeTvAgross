window.onload = async function () {

    mostrarimagens1sorteio();



    var sorteio = sessionStorage.getItem('sorteio');
    var sempremiomilhar = sessionStorage.getItem('sempremiomilhar');
    var compremiomilhar = sessionStorage.getItem('compremiom');
    if (sempremiomilhar == 's' || compremiomilhar == 's') {
        document.getElementById('btnsemmilhar').setAttribute('disabled', true);
        document.getElementById('btnsemmilhar').classList.remove('sempremio');
        document.getElementById('btnsemmilhar').classList.add('sempremio2');
    }
    var sempremiocentena = sessionStorage.getItem('sempremiocentena');
    var compremiocentena = sessionStorage.getItem('compremioc');
    if (sempremiocentena == 's' || compremiocentena == 's') {
        document.getElementById('btnsemcentena').setAttribute('disabled', true);
        document.getElementById('btnsemcentena').classList.remove('sempremio');
        document.getElementById('btnsemcentena').classList.add('sempremio2');
    }
    if (sorteio == null) {
        sessionStorage.setItem('sorteio', '1sorteio');
        sorteio = '1sorteio';
    }
    var radiobtn = document.getElementsByName('sorteio');
    for (i = 0; i < radiobtn.length; i++) {
        if (radiobtn[i].id != sorteio) {
            radiobtn[i].parentElement.style.opacity = 0.5;
            radiobtn[i].setAttribute('disabled', true);
            radiobtn[i].parentElement.parentElement.children[0].children[0].setAttribute('disabled', true);
            radiobtn[i].parentElement.parentElement.children[0].children[0].classList.remove('btnsorteios');
            radiobtn[i].parentElement.parentElement.children[0].children[0].classList.add('btnsorteios2');
        } else {
            radiobtn[i].style.cursor = 'pointer';
            radiobtn[i].parentElement.children[1].style.cursor = 'pointer';
            radiobtn[i].checked = true;
            liberapreenchimento();
        }

    }

    const socket = io();
    socket.nickname = ''



    var usuariofinal = sessionStorage.getItem('usuario')

    if (usuariofinal == null || usuariofinal == undefined) {
        const { value: usuario } = await Swal.fire({
            title: 'Informe seu nome',
            input: 'text',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Você não informou o seu nome'
                }
            }
        })
        if (usuario) {
            sessionStorage.setItem('usuario', usuario)
            usuariofinal = usuario
            var sorteio = document.getElementsByName('sorteio');
            for (i = 0; i < sorteio.length; i++) {
                if (sorteio[i].checked)
                    var sorteionumero = sorteio[i].value;
            }
            const usuarioesorteio = {
                usuario: usuariofinal,
                sorteio: sorteionumero,
                id: socket.id
            }
            socket.emit('login', usuarioesorteio)
        }
    } else {
        var sorteio = document.getElementsByName('sorteio');
        for (i = 0; i < sorteio.length; i++) {
            if (sorteio[i].checked)
                var sorteionumero = sorteio[i].value;
        }
        const usuarioesorteio = {
            usuario: usuariofinal,
            sorteio: sorteionumero
        }
        socket.emit('contador', usuarioesorteio)
    }



    $('#premio').change(function (evt) {
        var sorteio = document.getElementsByName('sorteio');
        for (i = 0; i < sorteio.length; i++) {
            if (sorteio[i].checked)
                var sorteionumero = sorteio[i].value;
        }
        var mudarpremio = {
            usuario: usuariofinal,
            premio: $('#premio').val(),
            sorteio: sorteionumero
        }

        socket.emit('mudarpremio', mudarpremio)
    })

    $('#btnenviar').click(function (evt) {
        var sorteio = document.getElementsByName('sorteio');
        for (i = 0; i < sorteio.length; i++) {
            if (sorteio[i].checked)
                var sorteionumero = sorteio[i].value;
        }
        var gerarimagem = {
            usuario: usuariofinal,
            premio: $('#premio').val(),
            sorteio: sorteionumero
        }
        socket.emit('gerarimagem', gerarimagem)
    })

    $('.inputnometodos').keyup(function (evt) {
        socket.emit('statusparado', '')
    })
    $('.digitandostatus').keyup(function (evt) {
        socket.emit('statusparado', '')
    })
    $('.inputnometodos').on('keypress paste', function (evt) {
        var premio = $('#premio').val()
        var sorteio = document.getElementsByName('sorteio');
        for (i = 0; i < sorteio.length; i++) {
            if (sorteio[i].checked)
                var sorteionumero = sorteio[i].value;
        }
        var digitando = {
            premio: premio,
            usuario: usuariofinal,
            sorteio: sorteionumero

        }
        socket.emit('status', digitando)
    })
    $('.digitandostatus').on('keypress paste', function (evt) {
        var premio = $('#premio').val()
        socket.emit('status', premio)
    })
    $('.digitandostatus2').on('change', function (evt) {
        var premio = $('#premio').val()
        socket.emit('status', premio)
        setTimeout(function () {
            socket.emit('statusparado', '')
        }, 5000);
    })

}


async function mudarnome(nome, unidade, premio, quantidade, cidade) {
    var sorteio = document.getElementsByName('sorteio');
    var unidades1 = document.getElementById('unidade').value;
    var nomes = document.getElementById('inputnome').value;
    var cidades = document.getElementById('inputcidade').value;


    var unidadeatual = [
        document.getElementById('unidade').value,
        document.getElementById('unidade2').value,
        document.getElementById('unidade3').value,
        document.getElementById('unidade4').value,
        document.getElementById('unidade5').value,
        document.getElementById('unidade6').value
    ];
    var nomeatual = [
        document.getElementById('inputnome').value,
        document.getElementById('inputnome2').value,
        document.getElementById('inputnome3').value,
        document.getElementById('inputnome4').value,
        document.getElementById('inputnome5').value,
        document.getElementById('inputnome6').value
    ];
    var cidadeatual = [
        document.getElementById('inputcidade').value,
        document.getElementById('inputcidade2').value,
        document.getElementById('inputcidade3').value,
        document.getElementById('inputcidade4').value,
        document.getElementById('inputcidade5').value,
        document.getElementById('inputcidade6').value
    ];

    var testeunidade = 'ok';
    var testenome = 'ok';
    var testecidade = 'ok';

    for (x = 0; x < quantidade; x++) {
        if (unidadeatual[x] == 'SEMUNIDADE') {
            testeunidade = 'erro';
        }
        if (nomeatual[x] == '') {
            testenome = 'erro';
        }
        if (testecidade[x] == '') {
            testeunidade = 'erro';
        }

    }


    if (premio.value == 'sempremio' || unidades1 == 'SEMUNIDADE' || nomes == '' || cidades == '') {

        Swal.fire({
            icon: 'error',
            title: 'Preencha os dados corretamente!'
        })
        return;
    } else if ((premio.value == 'bolamaiorm' || premio.value == 'bolamaiorc') && (testeunidade == 'erro' || testenome == 'erro' || testecidade == 'erro')) {

        Swal.fire({
            icon: 'error',
            title: 'Preencha os dados corretamente bm!'
        })
        return;
    }
    for (i = 0; i < sorteio.length; i++) {
        if (sorteio[i].checked)
            var pasta = sorteio[i].value;
    }
    /*var numerosorteio = pasta.replace('sorteio', '');
    numerosorteio = parseInt(numerosorteio) + 1;
    if (numerosorteio > 3) {
        numerosorteio = 1;
    }
    numerosorteio = numerosorteio + 'sorteio';
    sessionStorage.setItem('sorteio', numerosorteio);*/

    if (premio.value == 'bolamaiorm' || premio.value == 'bolamaiorc') {
        document.getElementById('bmnome1').textContent = nome.value;
        document.getElementById('bmnome1').style.textTransform = 'uppercase';
        document.getElementById('bmunidade1').innerHTML = '<label class="cidadebold">CIDADE:&nbsp;</label>' + cidade.value + '<label class="cidadebold">&nbsp;| UNIDADE:&nbsp;</label>' + unidade.value;
        document.getElementById('bmunidade1').style.textTransform = 'uppercase';
        if (premio.value == 'bolamaiorm') {
            sessionStorage.setItem('compremiom', 's');
        } else {
            sessionStorage.setItem('compremioc', 's');
        }
        for (x = 2; x <= quantidade; x++) {

            document.getElementById('bmnome' + x).textContent = document.getElementById('inputnome' + x).value;
            document.getElementById('bmnome' + x).style.textTransform = 'uppercase';


            document.getElementById('bmunidade' + x).innerHTML = '<label class="cidadebold">CIDADE:&nbsp;</label>' + document.getElementById('inputcidade' + x).value + '<label class="cidadebold">&nbsp;| UNIDADE:&nbsp;</label>' + document.getElementById('unidade' + x).value;
            document.getElementById('bmunidade' + x).style.textTransform = 'uppercase';
        }

        var sorteioatual = sessionStorage.getItem('sorteio');
        $.ajax({
            type: "POST",
            url: '/imagemexiste',
            data: {
                premio: premio.value,
                pasta: sorteioatual,
            }
        }).done(function (o) {
            if (o.message == 'sim') {
                console.log('a imagem já existe!');
                Swal.fire({
                    title: 'Já existe uma imagem para esse prêmio, deseja substituir a imagem?',
                    showDenyButton: false,
                    showCancelButton: true,

                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                }).then((result) => {
                    if (result.isConfirmed) {

                        $.ajax({
                            type: "POST",
                            url: '/deleteimg',
                            data: {
                                premio: premio.value,
                                pasta: sorteioatual
                            }
                        });

                        screenshot(premio.value, pasta);
                        document.getElementById('divsorteios').style.display = 'none';
                        document.getElementById('divsempremio').style.display = "none";
                        document.getElementById('divformulario').style.display = "none";
                        document.getElementById('divimagem').style.display = "none";
                        document.getElementById('divformulariobm').style.display = "none";
                        document.getElementById('btnrefazer').style.display = "none";
                    }
                })
            } else {
                screenshot(premio.value, pasta);
                document.getElementById('divsorteios').style.display = 'none';
                document.getElementById('divsempremio').style.display = "none";
                document.getElementById('divformulario').style.display = "none";
                document.getElementById('divimagem').style.display = "none";
                document.getElementById('divformulariobm').style.display = "none";
                document.getElementById('btnrefazer').style.display = "none";
            }
        });






    } else {

        document.getElementById('nomeganhador').textContent = nome.value;
        document.getElementById('nomeganhador').style.textTransform = 'uppercase';
        document.getElementById('nomeunidade').innerHTML = '<label class="cidadebold">CIDADE:&nbsp;</label>' + cidade.value + '<br> <label class="cidadebold">UNIDADE:&nbsp;</label>' + unidade.value;
        document.getElementById('nomeunidade').style.textTransform = 'uppercase';
        var sorteioatual = sessionStorage.getItem('sorteio');
        if (premio.value == 'roundup') {
            $.ajax({
                type: "POST",
                url: '/imagemexiste',
                data: {
                    premio: premio.value,
                    pasta: premio.value,
                }
            }).done(function (o) {
                if (o.message == 'sim') {
                    console.log('a imagem já existe!');
                    Swal.fire({
                        title: 'Já existe uma imagem para esse prêmio, deseja substituir a imagem?',
                        showDenyButton: false,
                        showCancelButton: true,

                        confirmButtonText: 'Sim',
                        cancelButtonText: 'Não',
                    }).then((result) => {
                        if (result.isConfirmed) {

                            $.ajax({
                                type: "POST",
                                url: '/deleteimg',
                                data: {
                                    premio: premio.value,
                                    pasta: premio.value
                                }
                            });

                            screenshot(premio.value, premio.value);
                            document.getElementById('divsorteios').style.display = 'none';
                            document.getElementById('divsempremio').style.display = "none";
                            document.getElementById('divformulario').style.display = "none";
                            document.getElementById('divimagem').style.display = "none";
                            document.getElementById('btnrefazer').style.display = "none";

                            if (premio.value == 'milhar') {
                                sessionStorage.setItem('compremiom', 's');
                            } else if (premio.value == 'centena') {
                                sessionStorage.setItem('compremioc', 's');
                            }
                        }
                    })
                } else {
                    screenshot(premio.value, premio.value);
                    document.getElementById('divsorteios').style.display = 'none';
                    document.getElementById('divsempremio').style.display = "none";
                    document.getElementById('divformulario').style.display = "none";
                    document.getElementById('divimagem').style.display = "none";
                    document.getElementById('btnrefazer').style.display = "none";

                    if (premio.value == 'milhar') {
                        sessionStorage.setItem('compremiom', 's');
                    } else if (premio.value == 'centena') {
                        sessionStorage.setItem('compremioc', 's');
                    }
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: '/imagemexiste',
                data: {
                    premio: premio.value,
                    pasta: sorteioatual,
                }
            }).done(function (o) {
                if (o.message == 'sim') {
                    console.log('a imagem já existe!');
                    Swal.fire({
                        title: 'Já existe uma imagem para esse prêmio, deseja substituir a imagem?',
                        showDenyButton: false,
                        showCancelButton: true,

                        confirmButtonText: 'Sim',
                        cancelButtonText: 'Não',
                    }).then((result) => {
                        if (result.isConfirmed) {

                            $.ajax({
                                type: "POST",
                                url: '/deleteimg',
                                data: {
                                    premio: premio.value,
                                    pasta: sorteioatual
                                }
                            });

                            screenshot(premio.value, pasta);
                            document.getElementById('divsorteios').style.display = 'none';
                            document.getElementById('divsempremio').style.display = "none";
                            document.getElementById('divformulario').style.display = "none";
                            document.getElementById('divimagem').style.display = "none";
                            document.getElementById('btnrefazer').style.display = "none";

                            if (premio.value == 'milhar') {
                                sessionStorage.setItem('compremiom', 's');
                            } else if (premio.value == 'centena') {
                                sessionStorage.setItem('compremioc', 's');
                            }
                        }
                    })
                } else {
                    screenshot(premio.value, pasta);
                    document.getElementById('divsorteios').style.display = 'none';
                    document.getElementById('divsempremio').style.display = "none";
                    document.getElementById('divformulario').style.display = "none";
                    document.getElementById('divimagem').style.display = "none";
                    document.getElementById('btnrefazer').style.display = "none";

                    if (premio.value == 'milhar') {
                        sessionStorage.setItem('compremiom', 's');
                    } else if (premio.value == 'centena') {
                        sessionStorage.setItem('compremioc', 's');
                    }
                }
            });
        }




    }



}

function mudarimagem(premio) {

    if (premio.value == 'bolamaiorm' || premio.value == 'bolamaiorc') {
        document.getElementById('divsbatidas').style.marginTop = "350px";
        document.getElementById('inputnome').maxLength = 50;
        document.getElementById('inputcidade').maxLength = 35;
        document.getElementById('divganhador').style.display = 'none';
        document.getElementById('divbolamaior').style.display = '';
        document.getElementById('divformulariobm').style.display = '';
        document.getElementById('divsbatidas').style.display = '';
        document.getElementById('divbm2').style.display = '';
        document.getElementById('1batida').style.display = '';
        document.getElementById('2batida').style.display = '';
        document.getElementById('divimagem').style.backgroundImage = 'url(imagens/' + premio.value + '.png)';
    } else {
        document.getElementById('divganhador').style.display = '';
        document.getElementById('divbolamaior').style.display = 'none';
        document.getElementById('divformulariobm').style.display = 'none';
        document.getElementById('divsbatidas').style.display = 'none';
        document.getElementById('divimagem').style.backgroundImage = 'url(imagens/' + premio.value + '.png)';
        document.getElementById('inputnome').maxLength = 50;
    }

}

function adicionarbolamaior(quantidade) {
    if (quantidade == '5' || quantidade == '6') {
        document.getElementById('divsbatidas').style.width = "100%";
        const fieldsets = document.querySelectorAll('fieldset');

        fieldsets.forEach(fieldset => {
            fieldset.style.width = '350px';
        });
        const unidadecidade = document.querySelectorAll('.bmunidade');
        unidadecidade.forEach(unidadecidade => {
            unidadecidade.style.fontSize = '0.9rem';
        });
    } else {
        document.getElementById('divsbatidas').style.width = "100%";
        const fieldsets = document.querySelectorAll('fieldset');
        fieldsets.forEach(fieldset => {
            fieldset.style.width = '600px';
        });
        const unidadecidade = document.querySelectorAll('.bmunidade');
        unidadecidade.forEach(unidadecidade => {
            unidadecidade.style.fontSize = '1.1rem';
        });
        
    }
    if (quantidade == '2') {
        document.getElementById('divsbatidas').style.marginTop = "350px";
    } else {
        document.getElementById('divsbatidas').style.marginTop = "280px";
    }
    for (x = 2; x <= 6; x++) {
        document.getElementById('divbm' + x).style.display = 'none';
    }
    for (x = 2; x <= quantidade; x++) {
        document.getElementById('divbm' + x).style.display = '';
    }
    for (x = 1; x <= 6; x++) {
        document.getElementById(x + 'batida').style.display = 'none';
    }
    for (x = 1; x <= quantidade; x++) {
        document.getElementById(x + 'batida').style.display = '';
    }
}

function recarregarimagens() {
    window.location.reload(true);
}



async function sempremios(premio) {


    var sorteio = document.getElementsByName('sorteio');
    for (i = 0; i < sorteio.length; i++) {
        if (sorteio[i].checked)
            var pasta = sorteio[i].value;
    }
    /*var numerosorteio = pasta.replace('sorteio', '');
    numerosorteio = parseInt(numerosorteio) + 1;
    if (numerosorteio > 3) {
        numerosorteio = 1;
    }
    numerosorteio = numerosorteio + 'sorteio';
    sessionStorage.setItem('sorteio', numerosorteio);*/

    Swal.fire({
        title: 'Informar que não teve prêmio para ' + premio.dataset.sempremio + '?',
        showDenyButton: false,
        showCancelButton: true,

        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.setItem('sempremio' + premio.dataset.sempremio, 's');
            $.ajax({
                type: "POST",
                url: '`${ipapi}sempremio.php`',
                data: {
                    premio: premio.dataset.sempremio,
                    pasta: pasta
                }
            }).done(function (o) {
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
                    title: 'Sem premios para ' + premio.dataset.sempremio + ' enviado!'
                })

            });
            premio.setAttribute('disabled', true);
            premio.classList.remove('sempremio');
            premio.classList.add('sempremio2');
        }

    })


}

function liberapreenchimento() {

    document.getElementById('divformulario').style.display = "";
    document.getElementById('divimagem').style.display = "";

}

async function finalizarsorteio() {
    var sorteioatual = sessionStorage.getItem('sorteio');
    numerosorteio = sorteioatual.replace('sorteio', '');
    Swal.fire({
        title: 'Você tem certeza que quer finalizar o ' + numerosorteio + 'º Sorteio?',
        showDenyButton: false,
        showCancelButton: true,

        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
    }).then((result) => {
        if (result.isConfirmed) {
            const socket = io()

            socket.emit('quantidadesorteio', numerosorteio);
            socket.on('retornoquantidade', function (quantidade) {
                var quantidadefinal = quantidade;
                if (quantidadefinal < 2) {
                    var compremiom = sessionStorage.getItem('compremiom');
                    var compremioc = sessionStorage.getItem('compremioc');
                    if (compremiom != 's') {
                        $.ajax({
                            type: "POST",
                            url: '/sempremios',
                            data: {
                                premio: 'milhar',
                                pasta: sorteioatual,
                                bolamaior: 'bolamaiorm'
                            }
                        });
                    }
                    if (compremioc != 's') {
                        $.ajax({
                            type: "POST",
                            url: '/sempremios',
                            data: {
                                premio: 'centena',
                                pasta: sorteioatual,
                                bolamaior: 'bolamaiorc'
                            }
                        });
                    }
                } else {
                    console.log('existem mais pessoas no sorteio!');
                }
            })


            numerosorteio = parseInt(numerosorteio) + 1;

            if (numerosorteio > 3) {
                numerosorteio = 1;
            }
            numerosorteio = numerosorteio + 'sorteio';
            sessionStorage.setItem('sorteio', numerosorteio);





            usuario = sessionStorage.getItem('usuario')

            var finalizou = {
                sorteio: sorteioatual,
                usuario: usuario

            }

            socket.emit('finalizarsorteio', finalizou)
            sessionStorage.setItem('compremiom', null);
            sessionStorage.setItem('compremioc', null);
            sessionStorage.setItem('sempremiomilhar', null);
            sessionStorage.setItem('sempremiocentena', null);
            setTimeout(function () {
                window.location.reload(true);
            }, 200);

        }
    })
}

function refazersorteio() {
    Swal.fire({
        title: 'Deseja refazer algum prêmio?',
        showDenyButton: false,
        showCancelButton: true,

        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
    }).then((result) => {
        if (result.isConfirmed) {
            var sorteio = sessionStorage.getItem('sorteio');
            var radiobtn = document.getElementsByName('sorteio');
            const socket = io()
            usuario = sessionStorage.getItem('usuario')

            socket.emit('editarsorteio', usuario)
            for (i = 0; i < radiobtn.length; i++) {
                if (radiobtn[i].id != sorteio) {
                    radiobtn[i].parentElement.style.opacity = 1;
                    radiobtn[i].removeAttribute('disabled', true);

                }
            }
        }

    })
}





function mostrarimagens1sorteio() {
    const imageContainer = document.getElementById('divimagens1sorteio');
    const imageContainer2 = document.getElementById('divimagens2sorteio');
    const imageContainer3 = document.getElementById('divimagens3sorteio');
    const imageContainer4 = document.getElementById('divimagensroundup');

    fetch('./mostrarimagens1sorteio')
        .then(response => response.json())
        .then(images => {
            // Para cada imagem, cria um elemento <img> e o adiciona à div
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = `./imagens/1sorteio/${image}`;
                img.setAttribute('onclick', 'lightbox(this);');
                if (image === "telapadrao.png") {
                    imageContainer.prepend(img);
                } else {
                    imageContainer.appendChild(img);
                }

            });
        })
        .catch(err => console.log(err));

    fetch('./mostrarimagens2sorteio')
        .then(response => response.json())
        .then(images => {
            // Para cada imagem, cria um elemento <img> e o adiciona à div
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = `./imagens/2sorteio/${image}`;
                img.setAttribute('onclick', 'lightbox(this);');
                if (image === "telapadrao.png") {
                    imageContainer2.prepend(img);
                } else {
                    imageContainer2.appendChild(img);
                }

            });
        })
        .catch(err => console.log(err));

    fetch('./mostrarimagens3sorteio')
        .then(response => response.json())
        .then(images => {
            // Para cada imagem, cria um elemento <img> e o adiciona à div
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = `./imagens/3sorteio/${image}`;
                img.setAttribute('onclick', 'lightbox(this);');
                if (image === "telapadrao.png") {
                    imageContainer3.prepend(img);
                } else {
                    imageContainer3.appendChild(img);
                }

            });
        })
        .catch(err => console.log(err));

        fetch('./mostrarimagensroundup')
        .then(response => response.json())
        .then(images => {
            // Para cada imagem, cria um elemento <img> e o adiciona à div
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = `./imagens/roundup/${image}`;
                img.setAttribute('onclick', 'lightbox(this);');
                if (image === "telapadrao.png") {
                    imageContainer4.prepend(img);
                } else {
                    imageContainer4.appendChild(img);
                }

            });
        })
        .catch(err => console.log(err));

}

function lightbox(img) {
    const lightbox = document.getElementById('lightboximg');
    const imgdestino = lightbox.children[0];

    let imagem = img.src;
    imgdestino.src = imagem;
    lightbox.style.visibility = "visible";
}

function lightboxclose() {
    const lightbox = document.getElementById('lightboximg');
    lightbox.style.visibility = "hidden";
}

