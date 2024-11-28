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

  joinRoom: async (socket, targetUserId) => {
    const roomName = [socket.id, targetUserId].sort().join('_');
    socket.leave('general');
    socket.join(roomName);

    const history = await messageDao.getPrivateChatHistory(roomName);
    socket.emit('roomJoined', { roomName, history });
  },

  sendMessage: async (socket, io, { roomName, sender, message, timestamp }) => {
    if (roomName) {
      //chat prive
      io.to(roomName).emit('receiveMessage', { sender, message, timestamp });
      const participantIds = roomName.split('_');
      const receiverSocketId = participantIds.find(id => id !== socket.id);
      const receiver = await userDao.getUsernameBySocketId(receiverSocketId);
      
      await messageDao.savePrivateMessage({
        roomName,
        sender,
        receiver,
        message,
        timestamp,
      });
    } else {
      // Chat général
      io.to('general').emit('receiveMessage', { sender, message, timestamp });
      await messageDao.saveMessage({
        sender,
        message,
        timestamp,
      });
    }
  },

  joinGeneral: async (socket) => {
    socket.join('general');
    socket.emit('roomJoined', { roomName: null });

    const history = await messageDao.getGeneralChatHistory();
    socket.emit('receiveMessageHistory', history);
  },

  disconnect: async (socket, io) => {
    await userDao.removeUser(socket.id);
    const users = await userDao.getAllUsers();
    io.to('general').emit('userConnected', users);
    console.log('Utilisateur déconnecté :', socket.id);
  },
};