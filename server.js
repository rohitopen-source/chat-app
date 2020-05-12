const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')



const app = express();
const server = http.createServer(app)
const io = socketio(server)

let usersockets = {}
app.use('/',express.static(path.join(__dirname, 'frontend')))

io.on('connection',(socket) => {
    console.log("new connection " + socket.id) 
    socket.emit('connected')
    socket.on('login',(data)=>{
        usersockets[data.user] = socket.id
        console.log(usersockets)
    })


    socket.on('send_msg',(data)=>{

        if(data.message.startsWith('@')){
            let recipient = data.message.split(':')[0].substr(1)
            let recpsocket = usersockets[recipient]
            io.to(recpsocket).emit('rec_msg',data)
        }
        else{
            socket.broadcast.emit('rec_msg',data)
        }
       
    })
})






server.listen(9876,()=> console.log('server started listening at http://localhost/9876/'))