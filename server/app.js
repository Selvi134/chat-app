const express = require('express');
const http = require('http');
const Server = require('socket.io').Server
const Connection = require('./db.js');
const mongoose = require('mongoose');
const Chat = require('./models/Chat.js');




const app = express();
Connection();
app.use(express.json());
//creating socket server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
    });

io.on('connection', (socket) => {
    console.log("User connected");

    const loadMessages = async () => {
        try{
        const messages = await Chat.find().sort({timestamp  : 1}).exec();
        socket.emit('chat',messages)
        } catch(err) {
            console.log(err);
        }
    }
    loadMessages();

    socket.on('newMessage', async (msg) => {
        try{
            const newMessage = new Chat(msg);
            await newMessage.save();
            io.emit('message', msg);
        }catch(err){
            console.log(err);
        }
    })

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })

})

server.listen(3001 , () =>{
    console.log("Server is running on port 3001")
})