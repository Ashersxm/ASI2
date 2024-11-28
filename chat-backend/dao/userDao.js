let users = {}; // Structure : { socketId: { id, username } }

module.exports = {
  addUser: (socketId, username) => {
    users[socketId] = { id: socketId, username };
  },

  removeUser: (socketId) => {
    delete users[socketId];
  },

  getAllUsers: () => {
    return Object.values(users);
  },

  getUserBySocketId: (socketId) => {
    return users[socketId] || null;
  },

  getUsernameBySocketId: (socketId) => {
    return users[socketId] ? users[socketId].username : null;
  },
};