
var listaNomes = ["0", "PRODUTIVIDADE NO LIMPO", "REGISTRO PARA ARROZ", "BROCA-DO-CAFEEIRO", "SELETIVO", "DESSEQUE E PLANTE",
"HERBICIDA MULTICULTURAS", "RÁPIDA DESSECAÇÃO", "SEM RESIDUAL NO SOLO", "CONTROLE DE MANCHAS", "ALTA SELETIVIDADE", "CARÊNCIA 1 DIA",
"EXCELÊNCIA EM TRAÇA", "RÁPIDA PARADA ALIMENTAR", "REGISTRO MULTICULTURAS", "AÇÃO RESIDUAL ", "AÇÃO TRANSLAMINAR", "BAIXA CARÊNCIA",
"MOSCA BRANCA", "NINFAS E ADULTOS", "SISTÊMICO", "BINFENTRINA", "PRODUTO ÚNICO", "EXCELÊNCIA EM TIRIRICA", "MAIOR RESIDUAL",
"PRÉ EMERGENTE", "BARREIRA FÍSICA E QUÍMICA", "DOSE BAIXA", "LARVA ALFINETE ", "MENOR FOTODEGRADAÇÃO", "ANTI-STRESS",
"PLANTAS ATIVAS", "RÁPIDA RECUPERAÇÃO", "EFICIENTE EM PULGÃO", "MOSCA-DAS-FRUTAS", "REGISTRO PARA MAÇÃ", "FUNGICIDA MULTISITIO",
"SISTÊMICO E DE CONTATO", "CLOMAZONA", "HERBICIDA PARA MANDIOCA", "INDISPENSÁVEL PARA FUMO", "SELETIVO", "BAIXA DOSE", "EFEITO DE CHOQUE",
"MANEJO DE PERCEVEJOS", "ALTA MOBILIDADE ", "ALTAMENTE SISTÊMICO", "RÁPIDA ABSORÇÃO ", "MANEJO DE RESISTÊNCIA", "MOSCAS DAS FRUTAS",
"AMPLO ESPECTRO", "BAIXA CARÊNCIA", "FORTE AÇÃO DE CHOQUE", "AÇÃO SISTÊMICA", "AMPLA PROTEÇÃO", "LONGO RESIDUAL", "RÁPIDA PARADA ALIMENTAR",
"STAND ADEQUADO", "BIOFILME", "BIONEMATICIDA", "SEM CARÊNCIA", "BIOFUNGICIDA", "INDUÇÃO DE RESISTÊNCIA", "RESÍDUO \"ZERO\"",
"ROTAÇÃO DE ATIVOS", "SEGURANÇA AMBIENTAL", "SISTÊMICO E CONTATO", "TRATAMENTO DE SEMENTES", "AMPLO ESPECTRO", "ANTI ESPORULANTE",
"CONTROLA PINTA PRETA", "NÃO MANCHA FRUTOS", "NEMATICIDA E INSETICIDA", "ALTA PERFORMANCE ", "ALTO RESIDUAL", "FOLHAS LARGAS E FINAS",
"CONTROLE DE PERCEVEJOS", "EFEITO DE CHOQUE", "NÃO DESEQUILIBRA ÁCAROS ", "EXTRA PROTEÇÃO", "INSETICIDA E ACARICIDA ",
"INSETICIDA EXTRA PROTEÇÃO", "REGISTRO PARA PSILÍDEOS", "SEGURO NA APLICAÇÃO", "AÇÃO SISTÊMICA", "ESPECTRO CRUZADO ",
"PROTEÇÃO AMPLIADA ", "PROTEÇÃO NA FASE INICIAL", "AMPLO ESPECTRO ", "VIA FOLHA E RAIZ", "SARNA DA MACIEIRA"];

  
var listaNomesgrande = ["0", "ALLY", "ALLY", "ALTACOR", "ALTACOR","AURORA","AURORA","AURORA","AURORA","AUTHORITY","AVATAR","AVATAR","AVATAR","AVATAR","AVATAR","BENEVIA","BENEVIA","BENEVIA","BENEVIA","BENEVIA","BENEVIA","BIFLEX","BIFLEX","BORAL","BORAL","BORAL","CAPTURE","CAPTURE","CAPTURE","CAPTURE","CROPEVO","CROPEVO","CROPEVO","DIMEXION","DIMEXION","DIMEXION","GALBEN","GALBEN","GAMIT 360","GAMIT 360","GAMIT 360","GAMIT 360","HERO","HERO","HERO","IMPACT","IMPACT","IMPACT","MALATHION","MALATHION","MUSTANG","MUSTANG","MUSTANG","PREMIO","PREMIO","PREMIO","PREMIO","PREMIO","QUARTZO","QUARTZO","QUARTZO","REGALIA","REGALIA","REGALIA","REGALIA","REGALIA","ROCKS","ROCKS ","ROVRAL","ROVRAL","ROVRAL","ROVRAL","RUGBY 100G","STONE","STONE","STONE","TALISMAN","TALISMAN","TALISMAN","TALSTAR","TALSTAR","TALSTAR","TALSTAR","TALSTAR","VERIMARK","VERIMARK","VERIMARK","VERIMARK","ZIGNAL","ZIGNAL","ZIGNAL"];
function adicionarbola() {
    var bola = document.getElementById('inputbola').value;
    if (bola == "" || bola < 1 || bola > 90) {
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
                divimagem.children[0].innerHTML = bola + '<br><br>' + '<label class="nomegrande">'+listaNomesgrande[bola] +'</label>'+ '<br>' + '<label class="nomepequeno">' +listaNomes[bola]+'</label>';
                console.log(listaNomesgrande[bola]);
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
    if (bola.value == "" || bola.value < 1 || bola.value > 90) {
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
        divimagem.children[0].innerHTML = bola.value + '<br><br>' + '<label class="nomegrande">'+listaNomesgrande[bola.value] +'</label>'+ '<br>' + '<label class="nomepequeno">' +listaNomes[bola.value]+'</label>';
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
                window.location.reload();
            });
        }
    })
}

const worker = new Worker('../worker.js');
worker.postMessage('hello worker');
worker.onmessage = e => {
    if (e.data == 'teste2'){
        chamaralerta();
    }
}
