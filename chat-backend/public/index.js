const socket = io();
const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messages');
const sendButton = document.getElementById('sendButton');
const userListContainer = document.getElementById('users');
const generalChatButton = document.getElementById('generalChatButton');

let currentRoom = null;
let users = {};
const username = prompt("Entrez votre nom d'utilisateur");
socket.emit('userConnected', username);

// Fonction pour ajouter un message dans l html
function addMessage(sender, message, timestamp) {
    const segment = document.createElement('div');
    segment.className = 'ui raised segment';

    const ribbon = document.createElement('a');
    ribbon.className = `ui ${sender === 'Moi' ? 'green right' : 'blue'} ribbon label`;
    ribbon.innerText = sender;
    segment.appendChild(ribbon);

    const time = document.createElement('span');
    time.innerText = ` ${timestamp}`;
    segment.appendChild(time);

    const messageText = document.createElement('p');
    messageText.innerText = message;
    segment.appendChild(messageText);

    messagesContainer.appendChild(segment);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Met à jour la liste des utilisateurs connectés
socket.on('userConnected', (updatedUsers) => {
    users = updatedUsers;
    userListContainer.innerHTML = '';
    Object.values(users).forEach((user, index) => {
        if (user !== username) {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerText = user;
            userItem.style.cursor = 'pointer';
            userItem.onclick = () => startPrivateChat(Object.keys(users)[index]);
            userListContainer.appendChild(userItem);
        }
    });
});

// Recevoir l'historique des messages du chat général
socket.on('receiveMessageHistory', (messageHistory) => {
    messageHistory.forEach(({ sender, message, timestamp }) => {
        addMessage(sender, message, timestamp);
    });
});

// Commencer un chat privé avec un autre utilisateur
function startPrivateChat(targetUserId) {
    socket.emit('joinRoom', { targetUserId });
}

// Recevoir la confirmation de rejoindre une room
socket.on('roomJoined', ({ roomName }) => {
    currentRoom = roomName;
    messagesContainer.innerHTML = '';
    addMessage('Système', roomName ? `Vous discutez maintenant en privé avec cet utilisateur` : `Vous êtes de retour dans le chat général`, new Date().toLocaleTimeString());
});

// Revenir au chat général
generalChatButton.addEventListener('click', () => {
    socket.emit('joinGeneral');
});

// Envoi d'un message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        const timestamp = new Date().toLocaleTimeString();
        addMessage('Moi', message, timestamp);
        if (currentRoom) {
            socket.emit('sendMessage', { roomName: currentRoom, sender: username, message, timestamp });
        } else {
            socket.emit('sendMessage', { sender: username, message, timestamp });
        }
        messageInput.value = '';
    }
});

// Réception des messages
socket.on('receiveMessage', ({ sender, message, timestamp }) => {
    if(sender != username)
        addMessage(sender, message, timestamp);
});