// app.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const chatController = require('./controllers/chatController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static('public'));

chatController(io);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});