const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const matchmakingRoutes = require('./src/routes/matchmakingRoutes');
const socketManager = require('./src/utils/socketManager');

// Initialisation de l'application et des dépendances
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());

// Intégration des routes
app.use('/api/v1/matchmaking', matchmakingRoutes);

// Gestion des sockets
socketManager(io);

// Lancer le serveur
const PORT = 9782;
server.listen(PORT, () => {
    console.log(`Matchmaking service running on http://localhost:${PORT}`);
});
