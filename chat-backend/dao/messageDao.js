const Message = require('../models/messageModel');

let generalChatHistory = [];
let privateChatHistories = {};

module.exports = {
  // Historique du chat général
  saveMessage: ({ sender, message, timestamp }) => {
    const newMessage = new Message(sender, message, timestamp);
    generalChatHistory.push(newMessage);

    // Limiter l'historique à 100 messages
    if (generalChatHistory.length > 100) {
      generalChatHistory.shift();
    }
  },

  getGeneralChatHistory: () => {
    return generalChatHistory;
  },

  // Historique des chats privés
  savePrivateMessage: ({ roomName, sender, message, timestamp }) => {
    const newMessage = new Message(sender, message, timestamp);

    if (!privateChatHistories[roomName]) {
      privateChatHistories[roomName] = [];
    }

    privateChatHistories[roomName].push(newMessage);

    // Limiter l'historique à 100 messages par chat privé
    if (privateChatHistories[roomName].length > 100) {
      privateChatHistories[roomName].shift();
    }
  },

  getPrivateChatHistory: (roomName) => {
    return privateChatHistories[roomName] || [];
  },
};
