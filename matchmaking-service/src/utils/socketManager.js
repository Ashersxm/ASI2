let waitingQueue = [];

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('register', (userId) => {
            socket.data.userId = userId;
            console.log(`User registered: ${userId}`);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            waitingQueue = waitingQueue.filter((userId) => userId !== socket.data.userId);
        });

        socket.on('find_match', () => {
            waitingQueue.push(socket.id);
            console.log(`User added to matchmaking queue: ${socket.id}`);

            if (waitingQueue.length >= 2) {
                const player1 = waitingQueue.shift();
                const player2 = waitingQueue.shift();

                io.to(player1).emit('match_found', { opponent: player2 });
                io.to(player2).emit('match_found', { opponent: player1 });

                console.log(`Match found: ${player1} vs ${player2}`);
            }
        });
    });
};
