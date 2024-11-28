const userDao = require('../dao/userDao');
const messageDao = require('../dao/messageDao');

module.exports = {
  userConnected: async (socket, io, username) => {
    await userDao.addUser(socket.id, username);
    const users = await userDao.getAllUsers();
    io.to('general').emit('userConnected', users);

    const history = await messageDao.getGeneralChatHistory();
    socket.emit('receiveMessageHistory', history);
  },

  disconnect: async (socket, io) => {
    await userDao.removeUser(socket.id);
    const users = await userDao.getAllUsers();
    io.to('general').emit('userConnected', users);
    console.log('Utilisateur déconnecté :', socket.id);
  },

  joinRoom: async (socket, targetUserId) => {
    const roomName = [socket.id, targetUserId].sort().join('_');
    socket.leave('general');
    socket.join(roomName);

    // Récupérer l'historique des messages privés
    const history = await messageDao.getPrivateChatHistory(roomName);
    socket.emit('roomJoined', { roomName, history });
  },

  sendMessage: async (socket, io, { roomName, sender, message, timestamp }) => {
    if (roomName) {
      io.to(roomName).emit('receiveMessage', { sender, message, timestamp });
      await messageDao.savePrivateMessage({ roomName, sender, message, timestamp });
    } else {
      io.to('general').emit('receiveMessage', { sender, message, timestamp });
      await messageDao.saveMessage({ sender, message, timestamp });
    }
  },

  joinGeneral: async (socket) => {
    socket.join('general');
    socket.emit('roomJoined', { roomName: null });

    const history = await messageDao.getGeneralChatHistory();
    socket.emit('receiveMessageHistory', history);
  },
};