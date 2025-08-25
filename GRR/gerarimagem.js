function mudarnome(nome, unidade, premio, quantidade) {
    if (premio.value == 'bolamaior'){
        document.getElementById('bmnome1').textContent = nome.value;
        
        document.getElementById('bmnome1').style.textTransform = 'uppercase';
        document.getElementById('bmunidade1').textContent = 'UNIDADE: ' + unidade.value;
        for (x=2; x<=quantidade; x++){
            
            document.getElementById('bmnome'+x).textContent = document.getElementById('inputnome'+x).value;
        document.getElementById('bmnome'+x).style.textTransform = 'uppercase';
        document.getElementById('bmunidade'+x).textContent = 'UNIDADE: ' + document.getElementById('unidade'+x).value;
        }
        screenshot(premio.value);
        document.getElementById('divformulario').style.display = "none";
        document.getElementById('divimagem').style.display = "none";
        document.getElementById('divformulariobm').style.display = "none";
        
    }else {
        
        document.getElementById('nomeganhador').textContent = nome.value;
        document.getElementById('nomeganhador').style.textTransform = 'uppercase';
        document.getElementById('nomeunidade').textContent = 'UNIDADE: ' + unidade.value;  
        screenshot(premio.value);
        document.getElementById('divformulario').style.display = "none";
        document.getElementById('divimagem').style.display = "none";
        document.getElementById('divformulariobm').style.display = "none";
        
    }

    

}

function mudarimagem(premio) {
    if (premio.value == 'bolamaior') {
        
        document.getElementById('inputnome').maxLength = 50;
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
        document.getElementById('divsbatidas').style.display = 'none';
        document.getElementById('divimagem').style.backgroundImage = 'url(imagens/' + premio.value + '.png)';
        document.getElementById('inputnome').maxLength = 50;
    }

}

function adicionarbolamaior(quantidade) {
    for (x=2; x<=6; x++){
        document.getElementById('divbm'+x).style.display = 'none';
    }
    for (x=2; x<=quantidade; x++){
        document.getElementById('divbm'+x).style.display = '';
    }
    for (x=1; x<=6; x++){
        document.getElementById(x+'batida').style.display = 'none';
    }
    for (x=1; x<=quantidade; x++){
        document.getElementById(x+'batida').style.display = '';
    }
}

function doCapture() {
    
 
    html2canvas(document.getElementById("divimagem")).then(function (canvas) {
 
        // Create an AJAX object
        var ajax = new XMLHttpRequest();
 
        // Setting method, server file name, and asynchronous
        ajax.open("POST", "save-capture.php", true);
 
        // Setting headers for POST method
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 
        // Sending image data to server
        ajax.send("image=" + canvas.toDataURL("image/png", 0.9));
 
        // Receiving response from server
        // This function will be called multiple times
        ajax.onreadystatechange = function () {
 
            // Check when the requested is completed
            if (this.readyState == 4 && this.status == 200) {
 
                // Displaying response from server
                console.log(this.responseText);
            }
        };
    });
}

function recarregarimagens() {
    window.location.reload(true);
}

const worker = new Worker('worker.js');
worker.postMessage('hello worker');
worker.onmessage = e => {
    if (e.data == 'teste'){
        chamaralerta();
    }
}

function chamaralerta(){
    alert('teste');
}