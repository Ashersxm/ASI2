const User = require('../models/userModel');

let users = {};

module.exports = {
  addUser: (id, username) => {
    users[id] = new User(id, username);
  },

  removeUser: (id) => {
    delete users[id];
  },

  getAllUsers: () => {
    return Object.values(users);
  },
};