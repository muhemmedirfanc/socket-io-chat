const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const usersHistoryContainer = document.getElementById('users-list');

const name = prompt('What is your name?');
appendMessage('You joined');
socket.emit('new-user', name);

socket.on('chat-message', (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', (name) => {
  appendMessage(`${name} connected`);
});

socket.on('user-disconnected', (name) => {
  appendMessage(`${name} disconnected`);
});

socket.on('update-users', (users) => {
  updateUsersList(users);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

function updateUsersList(users) {
  const keys = Object.keys(users);
  while (usersHistoryContainer.firstChild) usersHistoryContainer.removeChild(usersHistoryContainer.firstChild);

  const userElement = document.createElement('div');
  userElement.className = 'chat-history';
  userElement.innerText = 'Users log';
  usersHistoryContainer.append(userElement);

  keys.forEach((key) => {
    const userElement = document.createElement('div');

    const username = `${users[key]} joined.`;
    userElement.className = 'chat-history';
    userElement.innerText = username;
    usersHistoryContainer.append(userElement);

    usersHistoryContainer.childNodes;
  });
}
