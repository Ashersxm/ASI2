// Chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { TextField, Button, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

const Chat = ({ username }) => {
  const [socket, setSocket] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState({});
  const [roomName, setRoomName] = useState(null); // `null` pour la salle générale

  useEffect(() => {
    // Connectez-vous au serveur Socket.IO
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Notifiez le serveur que l'utilisateur est connecté
    newSocket.emit('userConnected', username);

    // Recevez les utilisateurs connectés
    newSocket.on('userConnected', (connectedUsers) => {
      setUsers(connectedUsers);
    });

    // Recevez l'historique des messages
    newSocket.on('receiveMessageHistory', (history) => {
      setMessageHistory(history);
    });

    // Recevez les nouveaux messages
    newSocket.on('receiveMessage', (data) => {
      setMessageHistory((prev) => [...prev, data]);
    });

    // Recevez la confirmation d'avoir rejoint une salle
    newSocket.on('roomJoined', ({ roomName }) => {
      setRoomName(roomName);
      setMessageHistory([]);
    });

    return () => newSocket.close();
  }, [username]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const data = {
        roomName,
        sender: username,
        message,
        timestamp: new Date().toISOString(),
      };
      socket.emit('sendMessage', data);
      setMessage('');
    }
  };

  const joinRoom = (targetUserId) => {
    socket.emit('joinRoom', { targetUserId });
  };

  const returnToGeneral = () => {
    socket.emit('joinGeneral');
  };

  return (
    <div>
      <Typography variant="h6">Chat</Typography>
      <Divider />
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <Typography variant="subtitle1">Utilisateurs connectés</Typography>
          <List>
            {Object.entries(users).map(([id, user]) => (
              <ListItem
                key={id}
                button
                disabled={id === socket.id} // Désactive le bouton pour soi-même
                onClick={() => joinRoom(id)}
              >
                <ListItemText primary={user} />
              </ListItem>
            ))}
          </List>
        </div>
        <div style={{ flex: 3 }}>
          <Typography variant="subtitle1">
            {roomName ? 'Chat Privé' : 'Chat Général'}
          </Typography>
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
          {roomName && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={returnToGeneral}
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Retour au Chat Général
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;