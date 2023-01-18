const express = require('express');
const { SocketAddress } = require('net');
const path = require('path');
const socket = require('socket.io');

const app = express();

const server = app.listen(8000, () => {
	console.log('Server running');
});

const io = socket(server);

const messages = [];
let users = [];

io.on('connection', (socket) => {
	socket.on('message', (message) => {
		messages.push(message);
		socket.broadcast.emit('message', message);
	});
	socket.on('join', (name) => {
		users.push({ name, id: socket.id });
		socket.broadcast.emit('userJoin', name);
	});
	socket.on('disconnect', () => {
		let user = users.find((user) => user.id === socket.id);
		socket.broadcast.emit('userLeft', user.name);
		users = users.filter((user) => user.id !== socket.id);
	});
});

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/index.html'));
});
