const express = require('express');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);
io.on('connection', function(socket) {
	console.log('user login');
})
const userRouter = require('./user');

app.use(cookieParser());
app.use(bodyParse.json());
app.use('/user', userRouter)
server.listen(9093, function() {
	console.log('Node app is running on port 9093');
})