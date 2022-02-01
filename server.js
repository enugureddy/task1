const express = require('express')
const http = require('http')
const port = 4910
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const path = require('path')

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

var name = "";

io.on('connection', (socket) => {

    console.log("new user arrived")

    socket.on('joining msg', (username) =>
    {
        name = username
        //send information to other sockets
        io.emit('chat message', name+" has joined the chat")
    })

    socket.on('chat message', (msg) => {
        //will send the message to all socket expect the sending socket
        socket.broadcast.emit('chat message', msg)
    })

    socket.on('chat location', (msg) => {
        //will send the message to all socket expect the sending socket
        socket.broadcast.emit('chat location', msg)
    })
    socket.on('chat emoji', (msg) => {
        //will send the message to all socket expect the sending socket
        socket.broadcast.emit('chat emoji', msg)
    })

})

server.listen(port, () => {
    console.log("server started at ", port)
})