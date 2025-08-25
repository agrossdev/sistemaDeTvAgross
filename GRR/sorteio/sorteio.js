var listaNomes = ["0", "ADMINISTRAÇÃO DO TEMPO", "AUTO CONFIANÇA", "APRENDIZAGEM CONSTANTE", "ASSIDUIDADE", "ATENÇÃO", "AUTO CONTROLE", "AUTORIDADE", "AVALIAÇÃO DE DESEMPENHO", "BOM SENSO", "COERÊNCIA", "COMPETÊNCIA", "COMPETITIVIDADE", "COMPROMETIMENTO", "COMUNICAÇÃO", "PENSAMENTO CRIATIVO", "CRIATIVIDADE", "CURIOSIDADE", "DEDICAÇÃO", "DETERMINAÇÃO", "DISCIPLINA", "DIVERSIDADE CULTURAL", "RESILIÊNCIA", "EDUCAÇÃO", "EMPATIA", "NORMAS DE SEGURANÇA", "ESTILOS DE LIDERANÇA", "ÉTICA", "EXEMPLO", "LIDERANÇA ESTRATÉGICA", "FLEXIBILIDADE", "FOCO NO CLIENTE", "FORÇA", "GENTILEZA", "GRATIDÃO", "PROJETO INCLUIR", "HABILIDADE", "HONESTIDADE", "HUMILDADE", "INFLUÊNCIA", "INOVAÇÃO", "INTEGRIDADE", "INTELIGÊNCIA EMOCIONAL", "APRENDER FAZENDO", "LEALDADE", "LIDERANÇA ORIENTADA", "LIDERANÇA SITUACIONAL", "METODOLOGIA ÁGIL", "MOTIVAÇÃO", "NEGOCIAÇÃO", "ORGANIZAÇÃO", "SENSO DE URGÊNCIA", "PENSAMENTO ESTRATÉGICO", "PERSISTÊNCIA", "PERSUASÃO", "PLANEJAMENTO", "PONTUALIDADE", "PROATIVIDADE", "MÃO NA MASSA", "PROGRAMA CRESCER", "SIGILO", "RESILIÊNCIA", "RESISTÊNCIA", "RESPEITO", "RESPONSABILIDADE", "SIGILO", "SIMPATIA", "TALENTO", "TECNOLOGIA DA INFORMAÇÃO", "PROJETO INCLUIR", "VISÃO DE NEGÓCIO"];
function adicionarbola() {
    var bola = document.getElementById('inputbola').value;
    if (bola == "" || bola < 1 || bola > 60) {
        Swal.fire({
            icon: 'error',
            title: 'Favor adicionar um número válido',
            text: ''
        })
    } else {
        var seisnumeros = document.getElementsByClassName('seisnumeros');
        for (x = 0; x < 6; x++) {
            var testevalor = seisnumeros[x].value;
            if (testevalor == "") {
                seisnumeros[x].value = bola;
                var divimagem = document.getElementById('divnumero' + (x + 1));
                divimagem.children[0].innerHTML = bola + '<br><br>' + listaNomes[bola];
                seisnumeros[x].removeAttribute('readonly');
                sessionStorage.setItem('numero' + (x + 1), bola);
                trocartela(bola);
                if (x == 5) {
                    document.getElementById('divinputbola').style.display = "none";
                    document.getElementById('divenviarseis').style.display = "flex";
                }
                break;
            }
        }

    }
    document.getElementById('inputbola').value = null;
}

function trocarbola(bola) {
    if (bola.value == "" || bola.value < 1 || bola.value > 60) {
        Swal.fire({
            icon: 'error',
            title: 'Favor adicionar um número válido',
            text: ''
        })
        bola.value = '';
        bola.focus();
    } else {
        var divnumero = bola.id.replace('numero', '');
        var divimagem = document.getElementById('divnumero' + (divnumero));
        divimagem.children[0].innerHTML = bola.value + '<br><br>' + listaNomes[bola.value];
        sessionStorage.setItem('numero' + divnumero, bola.value);
        trocartela(bola.value);
    }


}

async function trocartela(bola) {
    await $.ajax({
        method: "POST",
        url: "copiartela.php",
        data: {
            arquivo: bola,

        }
    });
}

function numeroschamados() {
    var numeroschamados = JSON.parse(sessionStorage.getItem('numeroschamados'));
    var seisnumeros = document.getElementsByClassName('seisnumeros');
    for (x = 0; x < 6; x++) {
        if (seisnumeros[x].value != "") {
            numeroschamados.push(seisnumeros[x].value);
        }

    }
    sessionStorage.setItem('numeroschamados', JSON.stringify(numeroschamados));
}

function verificanumeros() {
    var bola = document.getElementById('inputbola').value;
    var numeroschamados = JSON.parse(sessionStorage.getItem('numeroschamados'));
    var seisnumeros = document.getElementsByClassName('seisnumeros');
    var seisnumerosfinal = [];
    for (x = 0; x < 6; x++) {
        seisnumerosfinal.push(seisnumeros[x].value);
    }
    if (numeroschamados.includes(bola)) {
        Swal.fire({
            icon: 'error',
            title: 'Número já chamado!',
            text: ''
        })
    } else if (seisnumerosfinal.includes(bola)) {
        Swal.fire({
            icon: 'error',
            title: 'Número já chamado!',
            text: ''
        })
    } else {
        adicionarbola();
    }
}

function verificatroca(bolas) {
    var bola = bolas.value;
    var numeroschamados = JSON.parse(sessionStorage.getItem('numeroschamados'));
    var seisnumeros = document.getElementsByClassName('seisnumeros');

    var divnumero = bolas.id.replace('numero', '');
    var seisnumerosfinal = [];
    for (x = 0; x < 6; x++) {
        if (x == (divnumero - 1)) {
            seisnumerosfinal.push('');
        } else {
            seisnumerosfinal.push(seisnumeros[x].value);
        }

    }
    if (numeroschamados.includes(bola)) {
        Swal.fire({
            icon: 'error',
            title: 'Número já chamado!',
            text: ''
        })
    } else if (seisnumerosfinal.includes(bola)) {
        Swal.fire({
            icon: 'error',
            title: 'Número já chamado!',
            text: ''
        })
    } else {
        trocarbola(bolas);
    }
}

async function finalizarsorteio() {
    var numero = sessionStorage.getItem('numero');
    numero = parseInt(numero);
    numero = numero + 1;
    sessionStorage.setItem('numero', numero);
    
    
    Swal.fire({
        title: 'Você tem certeza que quer finalizar a GRR?',
        showDenyButton: false,
        showCancelButton: true,

        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            html2canvas(document.getElementById('divimagem'), { allowTaint: true, scale: 3, windowWidth: Window.innerWidth * 2, windowHeight: Window.innerHeight * 2 }).then(function (canvas) {
                //var preview = document.getElementById("previewImage");
        
                var dataURL = canvas.toDataURL();
                $.ajax({
                    type: "POST",
                    url: "finalizarsorteio.php",
                    data: {
                        imgBase64: dataURL,
                        numero: numero
                    }
                }).done(function (o) {
        
        
                    sessionStorage.removeItem('numero1');
                    sessionStorage.removeItem('numero2');
                    sessionStorage.removeItem('numero3');
                    sessionStorage.removeItem('numero4');
                    sessionStorage.removeItem('numero5');
                    sessionStorage.removeItem('numero6');
                    sessionStorage.removeItem('numero');
                    numeroschamados();
                    resetarsorteio();
                    window.location.reload();
                });
            });
        }
    })
}

async function resetarsorteio() {
    var numeroschamados = JSON.parse(sessionStorage.getItem('numeroschamados'));
    var numeroschamados2 = numeroschamados.toString();




    Swal.fire({
        title: 'Você tem certeza que quer resetar a GRR?',
        showDenyButton: false,
        showCancelButton: true,

        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            $.ajax({
                method: "POST",
                url: "salvarnumeros.php",
                data: {
                    numero: numeroschamados2,

                }
            }).then((data) => {
                sessionStorage.removeItem('numero1');
                sessionStorage.removeItem('numero2');
                sessionStorage.removeItem('numero3');
                sessionStorage.removeItem('numero4');
                sessionStorage.removeItem('numero5');
                sessionStorage.removeItem('numero6');
                sessionStorage.removeItem('numero');
                sessionStorage.removeItem('numeroschamados');
            });
        }
    })
}

const worker = new Worker('../worker.js');
worker.postMessage('hello worker');
