const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:5173'}})

const PORT = 3001

io.on('connection', socket => {

    //log para verificar id do usuario
    console.log('usuario conectado!', socket.id)

    //log para verificar o id do usuario desconectado
    socket.on('disconnect', reason =>{
        console.log('Usuario desconectado', socket.id)
    })

    socket.on('set_username', username =>{
        socket.data.username = username
    })

    socket.on('message', text =>{
        io.emit('receive_message', {
            text,
            authorId: socket.id,
            author: socket.data.username
        })
    })
})

server.listen(PORT, ()=> console.log(`Server running on port...${PORT}`))