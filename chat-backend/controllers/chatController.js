const chatService = require('../services/chatService');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Utilisateur connecté :', socket.id);

    socket.join('general');

    socket.on('userConnected', async (username) => {
      await chatService.userConnected(socket, io, username);
    });

    socket.on('joinRoom', async ({ targetUserId }) => {
      await chatService.joinRoom(socket, targetUserId);
    });

    socket.on('sendMessage', async (data) => {
      await chatService.sendMessage(socket, io, data);
    });

    socket.on('joinGeneral', async () => {
      await chatService.joinGeneral(socket);
    });

    socket.on('disconnect', async () => {
      await chatService.disconnect(socket, io);
    });
  });
};