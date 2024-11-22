const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static('public'));

let users = {};
let generalChatHistory = [];

io.on('connection', (socket) => {
    console.log('Utilisateur connecté :', socket.id);

    socket.join('general');

    socket.on('userConnected', (username) => {
        users[socket.id] = username;
        io.to('general').emit('userConnected', users);
        socket.emit('receiveMessageHistory', generalChatHistory);
    });

    // Rejoindre une room pour un chat privé
    socket.on('joinRoom', ({ targetUserId }) => {
        const roomName = [socket.id, targetUserId].sort().join('_');
        
        socket.leave('general');
        socket.join(roomName);
        socket.emit('roomJoined', { roomName });
    });

    // Envoi d'un message (général ou privé)
    socket.on('sendMessage', ({ roomName, sender, message, timestamp }) => {
        if (roomName) {
            io.to(roomName).emit('receiveMessage', { sender, message, timestamp });
        } else {
            io.to('general').emit('receiveMessage', { sender, message, timestamp });
            generalChatHistory.push({ sender, message, timestamp });
            if (generalChatHistory.length > 100) {
                generalChatHistory.shift();
            }
        }
    });

    // Revenir au chat général
    socket.on('joinGeneral', () => {
        socket.join('general');
        socket.emit('roomJoined', { roomName: null });
        socket.emit('receiveMessageHistory', generalChatHistory);
    });

    // Gérer la déconnexion
    socket.on('disconnect', () => {
        delete users[socket.id];
        io.to('general').emit('userConnected', users);
        console.log('Utilisateur déconnecté :', socket.id);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
