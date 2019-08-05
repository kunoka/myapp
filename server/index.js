const express = require('express');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('user login');
  socket.on('sendmsg', function (data) {
    console.log(data);
    const {from, to, msg} = data;
    const chatid = [from, to].sort().join('-');
    // 处理收到的数据，存入数据库，全局发送
    Chat.create({from, to, chatid, content: msg}, function(err) {
      io.emit('recvmsg', data);
    });
  })
})

const userRouter = require('./user');
app.use(cookieParser());
app.use(bodyParse.json());
app.use('/user', userRouter);
server.listen(9093, function () {
  console.log('Node app is running on port 9093');
})