const Message = require('../models/messageModel');

let generalChatHistory = [];

module.exports = {
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
};