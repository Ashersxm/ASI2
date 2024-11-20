import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const Chat = ({ username }) => {
  const [socket, setSocket] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Connectez-vous au serveur Socket.IO
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Notifiez le serveur que l'utilisateur est connecté
    newSocket.emit('userConnected', username);

    // Recevoir l'historique des messages
    newSocket.on('receiveMessageHistory', (history) => {
      setMessageHistory(history);
    });

    // Recevoir les nouveaux messages
    newSocket.on('receiveMessage', (data) => {
      setMessageHistory((prev) => [...prev, data]);
    });

    // Nettoyez la connexion lors du démontage du composant
    return () => newSocket.close();
  }, [username]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const data = {
        sender: username,
        message,
        timestamp: new Date().toISOString(),
      };
      socket.emit('sendMessage', data);
      setMessage('');
    }
  };

  return (
    <div>
      <Typography variant="h6">Chat Général</Typography>
      <List>
        {messageHistory.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${msg.sender}: ${msg.message}`}
              secondary={new Date(msg.timestamp).toLocaleTimeString()}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Votre message"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      <Button variant="contained" color="primary" onClick={sendMessage} style={{ marginTop: '10px' }}>
        Envoyer
      </Button>
    </div>
  );
};

export default Chat;