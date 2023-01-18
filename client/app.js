const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const login = (e) => {
	e.preventDefault();
	if (userNameInput.value.trim().length > 0) {
		userName = userNameInput.value;
		loginForm.classList.remove('show');
		messagesSection.classList.add('show');
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
	if (messageContentInput.value.trim().length > 0) {
		addMessage(userName, messageContentInput.value);
		messageContentInput.value = '';
	} else {
		window.alert('Please type Your message!');
	}
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
