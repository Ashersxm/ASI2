const axios = require('axios');

const SPRING_API_URL = 'http://localhost:8083/api/messages';

module.exports = {
  // Sauvegarder un message général
  saveMessage: async ({ sender, message, timestamp }) => {
    try {
      await axios.post(SPRING_API_URL, {
        roomName: 'general',
        sender,
        receiver: null,
        message,
        timestamp,
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du message général:', error);
    }
  },

  // Récupérer l'historique des messages généraux
  getGeneralChatHistory: async () => {
    try {
      const response = await axios.get(`${SPRING_API_URL}/room/general`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique du chat général:', error);
      return [];
    }
  },

  // Sauvegarder un message privé
  savePrivateMessage: async ({ roomName, sender, receiver, message, timestamp }) => {
    try {
      await axios.post(SPRING_API_URL, {
        roomName,
        sender,
        receiver,
        message,
        timestamp,
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du message privé:', error);
    }
  },

  // Récupérer l'historique des messages privés
  getPrivateChatHistory: async (roomName) => {
    try {
      const response = await axios.get(`${SPRING_API_URL}/room/${roomName}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'historique du chat privé (${roomName}):`, error);
      return [];
    }
  },
};