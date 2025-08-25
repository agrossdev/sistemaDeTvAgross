const express = require('express')
const { readFile } = require('fs');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors');
app.use(cors());
const path = require('path');
app.use(bodyParser.json());
app.use(express.static(__dirname))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const axios = require('axios');

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)
const directoryPath = path.join(__dirname, 'imagens/fotoswhats/fotos');
const porta = process.env.PORT || 8000

const host = process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : "http://localhost"

http.listen(porta, function () {
    const portaStr = porta === 80 ? '' : ':' + porta

    if (process.env.HEROKU_APP_NAME)
        console.log('Servidor iniciado. Abra o navegador em ' + host)
    else console.log('Servidor iniciado. Abra o navegador em ' + host + portaStr)
})
app.get('/moldura', (req, res) => {
    const caminhoArquivo = './trocartela/logmoldura.txt';
    readFile(caminhoArquivo, (err, data) /* callback */ => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res
            .set({ 'Content-Type': 'text/plain' })
            .send(data);
    });
}); /* Final do GET /moldura */
app.get('/tela', (req, res) => {
    const caminhoArquivo = './trocartela/log.txt';
    readFile(caminhoArquivo, (err, data) /* callback */ => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res
            .set({ 'Content-Type': 'text/plain' })
            .send(data);
    });
}); /* Final do GET /tela */
const multer  = require('multer');
const upload = multer({ dest: 'imagens/' });
app.post('/salvar-imagem', upload.single('image'), (req, res) => {
    // req.file contém informações sobre o arquivo carregado.
    // Você pode mover ou renomear o arquivo se necessário.
    let newDest = path.join(__dirname, 'imagens/fotoswhats/fotos', req.file.originalname);
    fs.rename(req.file.path, newDest, function (err) {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json({message: "Image uploaded successfully"});
        }
    });
});

app.get('/contadorimagenswpp', (req, res) => {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            res.status(500).send('Erro ao ler o diretório');
        } else {
            res.send({ fileCount: files.length });
        }
    });
});


app.get('/', function (req, resp) {
    resp.sendFile(__dirname + '/index.html')

})

app.get('/trocartela', function (req, resp) {

    resp.sendFile(__dirname + '/trocartela/index.html')
    app.use(express.static("trocartela"))
})

app.get('/mostrarimagens1sorteio', (req, res) => {
    fs.readdir('./imagens/1sorteio', (err, files) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(files);
        }
    });
});
app.get('/mostrarimagens2sorteio', (req, res) => {
    fs.readdir('./imagens/2sorteio', (err, files) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(files);
        }
    });
});
app.get('/mostrarimagens3sorteio', (req, res) => {
    fs.readdir('./imagens/3sorteio', (err, files) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(files);
        }
    });
});

app.get('/mostrarimagensroundup', (req, res) => {
    fs.readdir('./imagens/roundup', (err, files) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(files);
        }
    });
});
let primeirosorteio = [];
let segundosorteio = [];
let terceirosorteio = [];

function includesValue(arr, value) {
    return arr.includes(value);
}
function removeValue(arr, value) {
    const index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    return;
}
app.post('/sempremios', (req, res) => {

    const premio = req.body.premio;
    const pasta = req.body.pasta;
    const bolamaior = req.body.bolamaior;
    const sempremio = `imagens/sempremio/${premio}.png`;
    const imagempremio = `imagens/${pasta}/${premio}.png`;

    if (fs.existsSync(`imagens/${pasta}/${premio}.png`)) {
        res.send({ message: 'o prêmio já existe' });

    } else if (fs.existsSync(`imagens/${pasta}/${bolamaior}.png`)) {
        res.send({ message: 'o arquivo bola maior já existe' });

    } else {
        fs.copyFile(sempremio, imagempremio, (err) => {
            if (err) throw err;

        });
        res.send({ message: 'Imagem copiada com sucesso!' });
    }

})
app.post('/imagemexiste', (req, res) => {
    const premio = req.body.premio;
    const pasta = req.body.pasta;

    if (premio == 'milhar') {
        let bolamaior = 'bolamaiorm';
        if (fs.existsSync(`imagens/${pasta}/${premio}.png`)) {
            res.send({ message: 'sim' });

        } else if (fs.existsSync(`imagens/${pasta}/${bolamaior}.png`)) {
            res.send({ message: 'sim' });

        } else {
            res.send({ message: 'n' });
        }
    } else if (premio == 'centena') {
        let bolamaior = 'bolamaiorc';
        if (fs.existsSync(`imagens/${pasta}/${premio}.png`)) {
            res.send({ message: 'sim' });

        } else if (fs.existsSync(`imagens/${pasta}/${bolamaior}.png`)) {
            res.send({ message: 'sim' });

        } else {
            res.send({ message: 'n' });
        }
    } else if (premio == 'bolamaiorm') {
        if (fs.existsSync(`imagens/${pasta}/${premio}.png`)) {
            res.send({ message: 'sim' });

        } else if (fs.existsSync(`imagens/${pasta}/milhar.png`)) {
            res.send({ message: 'sim' });

        } else {
            res.send({ message: 'n' });
        }
    } else if (premio == 'bolamaiorc') {
        if (fs.existsSync(`imagens/${pasta}/${premio}.png`)) {
            res.send({ message: 'sim' });

        } else if (fs.existsSync(`imagens/${pasta}/centena.png`)) {
            res.send({ message: 'sim' });

        } else {
            res.send({ message: 'n' });
        }
    } else {
        if (fs.existsSync(`imagens/${pasta}/${premio}.png`)) {
            res.send({ message: 'sim' });

        } else {
            res.send({ message: 'n' });
        }
    }

})

app.post('/deleteimg', (req, res) => {
    const premio = req.body.premio;
    const pasta = req.body.pasta;
    if (premio == 'milhar' || premio == 'bolamaiorm') {
        if (fs.existsSync(`imagens/${pasta}/milhar.png`)) {
            fs.unlink(`imagens/${pasta}/milhar.png`, function (err) {
                if (err) throw err;
                res.send('Arquivo Deletado');
            })
        }
        if (fs.existsSync(`imagens/${pasta}/bolamaiorm.png`)) {
            fs.unlink(`imagens/${pasta}/bolamaiorm.png`, function (err) {
                if (err) throw err;
                res.send('Arquivo Deletado');
            })
        }
    } else if (premio == 'centena' || premio == 'bolamaiorc') {
        if (fs.existsSync(`imagens/${pasta}/centena.png`)) {
            fs.unlink(`imagens/${pasta}/centena.png`, function (err) {
                if (err) throw err;
                res.send('Arquivo Deletado');
            })
        }
        if (fs.existsSync(`imagens/${pasta}/bolamaiorc.png`)) {
            fs.unlink(`imagens/${pasta}/bolamaiorc.png`, function (err) {
                if (err) throw err;
                res.send('Arquivo Deletado');
            })
        }
    } else {
        if (fs.existsSync(`imagens/${pasta}/${premio}.png`)) {
            fs.unlink(`imagens/${pasta}/${premio}.png`, function (err) {
                if (err) throw err;
                res.send('Arquivo Deletado');
            })
        }
    }

})

serverSocket.on('connection', function (socket) {
    socket.on('quantidadesorteio', function (sorteio) {
        if (sorteio == 1) {
            socket.emit('retornoquantidade', primeirosorteio.length);
        } else if (sorteio == 2) {
            socket.emit('retornoquantidade', segundosorteio.length);
        } else if (sorteio == 3) {
            socket.emit('retornoquantidade', terceirosorteio.length);
        }
    })

    socket.on("disconnect", () => {
        removeValue(primeirosorteio, socket.id);
        removeValue(segundosorteio, socket.id);
        removeValue(terceirosorteio, socket.id);
    });
    socket.on('login', function (usuario) {
        console.log('Usuário conectado: ' + usuario.usuario + ' com o id: ' + socket.id);

        socket.broadcast.emit('ttlogin', usuario.usuario);
        if (usuario.sorteio == '1sorteio') {
            if (includesValue(primeirosorteio, socket.id) == false) {
                primeirosorteio.push(socket.id);
                removeValue(segundosorteio, socket.id);
                removeValue(terceirosorteio, socket.id);
            } else {
                removeValue(segundosorteio, socket.id);
                removeValue(terceirosorteio, socket.id);
            }
        } else if (usuario.sorteio == '2sorteio') {
            if (includesValue(segundosorteio, socket.id) == false) {
                segundosorteio.push(socket.id);
                removeValue(primeirosorteio, socket.id);
                removeValue(terceirosorteio, socket.id);
            } else {
                removeValue(primeirosorteio, socket.id);
                removeValue(terceirosorteio, socket.id);
            }
        } else if (usuario.sorteio == '3sorteio') {
            if (includesValue(terceirosorteio, socket.id) == false) {
                terceirosorteio.push(socket.id);
                removeValue(primeirosorteio, socket.id);
                removeValue(segundosorteio, socket.id);
            } else {
                removeValue(primeirosorteio, socket.id);
                removeValue(segundosorteio, socket.id);
            }

        }
        console.log("Primeiro Sorteio: ", primeirosorteio);
        console.log("Segundo Sorteio: ", segundosorteio);
        console.log("Terceiro Sorteio: ", terceirosorteio);

    })
    socket.on('contador', function (usuario) {
        if (usuario.sorteio == '1sorteio') {
            if (includesValue(primeirosorteio, socket.id) == false) {
                primeirosorteio.push(socket.id);
                removeValue(segundosorteio, socket.id);
                removeValue(terceirosorteio, socket.id);
            } else {
                emoveValue(segundosorteio, socket.id);
                removeValue(terceirosorteio, socket.id);
            }
        } else if (usuario.sorteio == '2sorteio') {
            if (includesValue(segundosorteio, socket.id) == false) {
                segundosorteio.push(socket.id);
                removeValue(primeirosorteio, socket.id);
                removeValue(terceirosorteio, socket.id);
            } else {
                removeValue(primeirosorteio, socket.id);
                removeValue(terceirosorteio, socket.id);
            }
        } else if (usuario.sorteio == '3sorteio') {
            if (includesValue(terceirosorteio, socket.id) == false) {
                terceirosorteio.push(socket.id);
                removeValue(primeirosorteio, socket.id);
                removeValue(segundosorteio, socket.id);
            } else {
                removeValue(primeirosorteio, socket.id);
                removeValue(segundosorteio, socket.id);
            }


        }
        console.log("Primeiro Sorteio: ", primeirosorteio);
        console.log("Segundo Sorteio: ", segundosorteio);
        console.log("Terceiro Sorteio: ", terceirosorteio);
    })

    socket.on('desconectato', function (desconectado) {
        console.log(desconectado);
    })

    socket.on('mudarpremio', function (mudarpremio) {
        socket.to("http://localhost:8000/trocartela").emit('ttstatus', mudarpremio)
        console.log(mudarpremio.usuario + ' está digitando ' + mudarpremio.premio + ' do ' + mudarpremio.sorteio);

    })

    socket.on('finalizarsorteio', function (finalizou) {
        console.log(finalizou.usuario + ' finalizou o ' + finalizou.sorteio);
        socket.broadcast.emit('ttfinalizarsorteio', finalizou)

    })
    socket.on('editarsorteio', function (usuario) {
        console.log(usuario + ' vai alterar algum sorteio!');
        socket.broadcast.emit('tteditarsorteio', usuario)

    })
    socket.on('gerarimagem', function (gerarimagem) {
        console.log(gerarimagem.usuario + ' gerou uma imagem para ' + gerarimagem.premio + ' no ' + gerarimagem.sorteio);
        socket.broadcast.emit('ttgerarimagem', gerarimagem)

    })


    socket.on('chat msg', function (msg) {
        console.log(`Msg recebida do cliente ${socket.nickname}: ${msg}`);
        serverSocket.emit('chat msg', `${socket.nickname} diz: ${msg}`);
    })

    socket.on('status', function (digitando) {
        socket.broadcast.emit('ttstatus', digitando)
        console.log(digitando.usuario + ' Está digitando ' + digitando.premio + ' do ' + digitando.sorteio);
    })
    socket.on('statusparado', function (msg) {
        socket.broadcast.emit('statusparado', msg)
    })

})