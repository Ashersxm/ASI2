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

  getUsernameBySocketId: (socketId) => {
    return users[socketId] ? users[socketId].username : null;
  },
};