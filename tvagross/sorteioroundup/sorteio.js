function imagemsorteio(numero1, numero2, numero3, numero4, numero5) {
    var numeros = [numero1.value, numero2.value, numero3.value, numero4.value, numero5.value]
    for (x = 0; x < 5; x++) {
        if (numeros[x] == '') {
            numeros[x] = '.';
        }
    }
    sessionStorage.setItem('numero1', numeros[0]);
    sessionStorage.setItem('numero2', numeros[1]);
    sessionStorage.setItem('numero3', numeros[2]);
    sessionStorage.setItem('numero4', numeros[3]);
    sessionStorage.setItem('numero5', numeros[4]);
    var numerofinal = 0;
    for (y = 1; y < 6; y++) {
        if (y == 5) {
            numerofinal = numerofinal + sessionStorage.getItem('numero5');
        } else if (y == 1) {
            numerofinal = sessionStorage.getItem('numero1') + ' ';
        } else {
            numerofinal = numerofinal + sessionStorage.getItem('numero' + y) + ' ';
        }
    }
    document.getElementById('numerosorteio').innerHTML = numerofinal;
    screenshot('sorteio');


}

window.onload = function () {
    var numerofinal = 0;
    for (x = 1; x < 6; x++) {
        document.getElementById('numero' + x).value = sessionStorage.getItem('numero' + x);
    }
    var testesession = sessionStorage.getItem('numero1');

    if (testesession == null) {
        numerofinal = '. . . . .';
    } else {
        for (y = 1; y < 6; y++) {
            if (y == 5) {
                numerofinal = numerofinal + sessionStorage.getItem('numero5');
            } else if (y == 1) {
                numerofinal = sessionStorage.getItem('numero1') + ' ';
            } else {
                numerofinal = numerofinal + sessionStorage.getItem('numero' + y) + ' ';
            }
        }
    }


    document.getElementById('numerosorteio').innerHTML = numerofinal;
}

function zerarnumeros() {
    sessionStorage.clear();
    location.reload();
}



async function salvarsorteio(pasta) {
    const inputOptions = new Promise((resolve) => {
        resolve({
            '1sorteio': '1º Sorteio',
            '2sorteio': '2º Sorteio',
            '3sorteio': '3º Sorteio',
            'roundup': 'roundup'
          })
      })
      
      const { value: color } = await Swal.fire({
        title: 'Selecione o sorteio para salvar',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'Você precisa escolher um sorteio para salvar!'
          }
        }
      })
      
      if (color) {
        Swal.fire({ html: `Você selecionou: ${color}` })
        html2canvas(document.getElementById('divimagem'), { allowTaint: true, scale: 3, windowWidth: Window.innerWidth * 2, windowHeight: Window.innerHeight * 2 }).then(function (canvas) {
            //var preview = document.getElementById("previewImage");
    
            var dataURL = canvas.toDataURL();
            $.ajax({
                type: "POST",
                url: "salvarsorteio.php",
                data: {
                    imgBase64: dataURL,
                    premio: 'sorteio',
                    pasta: color
                }
            }).done(function (o) {
    
                console.log('saved');
            });
        });
      }
    
}

