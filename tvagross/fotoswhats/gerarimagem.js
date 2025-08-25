var lastClass = ""; // Variável global para armazenar a última classe

function trocarmodelo(modelo) {
    var elem = document.getElementById('fotocliente');

    // Remove a classe anterior, se existir
    if (lastClass) {
        elem.classList.remove(lastClass);
    }

    // Se o modelo selecionado não é 'selmodelo', adiciona a nova classe
    if (modelo !== 'selmodelo') {
        elem.classList.add(modelo);
        lastClass = modelo; // Atualiza a última classe
    } else {
        lastClass = ""; // Limpa a última classe
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('fotocliente').style.backgroundImage = 'url(' + e.target.result + ')';
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}


function montar() {
    const nome = document.getElementById('inputnome').value;
    const revenda = document.getElementById('inputrevenda').value;
    const nomeerevenda = nome + ' - ' + revenda
    document.getElementById('nomeerevendap').textContent = nomeerevenda;
    document.getElementById('nomeerevendap').style.textTransform = 'uppercase';

    fetch('http://localhost:8000/contadorimagenswpp')
        .then(response => response.json())
        .then(data => salvarfotowpp((Number(data.fileCount) + 1)))
        .catch(error => console.error('Erro:', error));
}

window.onload = function () {
    imagenswpp();    
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
                    html += '<img src="../imagens/fotoswhats/fotos/image' + (x + 2) + '.png" alt="" onclick="lightbox(this);">';                    
                    html += '</div>';
                    document.getElementById('divimagenssorteio').innerHTML += html;
                }
            }
        })
        .catch(error => console.error('Erro:', error));

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