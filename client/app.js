const socket = io();

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('userJoin', (user) => addMessage('Chat Bot', `<i>${user} has joined the conversation!</i>`));
socket.on('userLeft', (user) => addMessage('Chat Bot', `<i>${user} has left the conversation... :(</i>`));

let userName = '';

const login = (e) => {
	e.preventDefault();
	if (userNameInput.value.trim().length > 0) {
		userName = userNameInput.value;
		loginForm.classList.remove('show');
		messagesSection.classList.add('show');
		socket.emit('join', userName);
	} else {
		window.alert('Please type username!');
	}
};

const addMessage = (author, content) => {
	let message = document.createElement('li');
	message.classList.add('message', 'message--received', author === userName && 'message--self');
	message.innerHTML = `<h3 class="message__author">${author === userName ? 'You' : author}</h3>
    <div class="message__content">
        ${content}
    </div>`;
	messagesList.appendChild(message);
};

const sendMessage = (e) => {
	e.preventDefault();
	let messageContent = messageContentInput.value;
	if (messageContent.trim().length > 0) {
		addMessage(userName, messageContent);
		socket.emit('message', { author: userName, content: messageContent });
		messageContent = '';
	} else {
		window.alert('Please type Your message!');
	}
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
