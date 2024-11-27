const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const gameController = require('./src/controllers/gameController');

// Initialisation d'Express et Socket.IO
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

// Intégration des routes
app.post('/api/v1/select-cards', gameController.selectCards);
app.post('/api/v1/end-turn', gameController.endTurn);
app.post('/api/v1/play-turn', gameController.playTurn);

// Gestion des sockets
io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
    });

    socket.on('attack', gameController.handleAttack);
});

// Lancer le serveur
const PORT = 9783;
server.listen(PORT, () => {
    console.log(`Game service running on http://localhost:${PORT}`);
});
