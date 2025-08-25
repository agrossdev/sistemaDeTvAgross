const express = require('express')
const fs = require('fs');
const app = express()

app.use(express.static(__dirname))

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)

const porta = process.env.PORT || 8000

const host = process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : "http://localhost"

http.listen(porta, function () {
    const portaStr = porta === 80 ? '' : ':' + porta

    if (process.env.HEROKU_APP_NAME)
        console.log('Servidor iniciado. Abra o navegador em ' + host)
    else console.log('Servidor iniciado. Abra o navegador em ' + host + portaStr)
})

app.get('/', function (req, resp) {
    resp.sendFile(__dirname + '/index.html')

})

app.get('/mostrarimagensseis', function (req, resp) {
    let listadearquivos = fs.readdirSync('./imagens/seisnumeros');
    var imagenstotal = listadearquivos.length;
    var imagenstotal = imagenstotal.toString();
    resp.send(imagenstotal);
})



app.get('/trocartela', function (req, resp) {

    resp.sendFile(__dirname + '/trocartela/index.html')
    app.use(express.static("trocartela"))
})


serverSocket.on('connection', function (socket) {

    socket.on('login', function () {
        console.log('Cliente conectado: ' + socket.id);

    })

    socket.on('chat msg', function (msg) {
        console.log(`Msg recebida do cliente ${socket.nickname}: ${msg}`);
        serverSocket.emit('chat msg', `${socket.nickname} diz: ${msg}`);
    })

    socket.on('status', function (msg) {
        socket.broadcast.emit('status', msg)
    })
    socket.on('statusparado', function (msg) {
        socket.broadcast.emit('statusparado', msg)
    })

    socket.on('gerarimagem', function (premio) {
        console.log('Alguém gerou uma imagem para ' + premio)
        serverSocket.emit('ttgerarimagem', premio)
    })

})