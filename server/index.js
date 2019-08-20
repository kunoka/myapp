import express from 'express';
import React from 'react';
// const express = require('express');
import bodyParse from 'body-parser';
import cookieParser from 'cookie-parser';
import model from './model';
import path from 'path';
const User = model.getModel('user');
const Chat = model.getModel('chat');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

function App() {
  return <h2>Server Render</h2>
}
console.log(App());

io.on('connection', function (socket) {
  console.log('user login');
  socket.on('sendmsg', function (data) {
    console.log(data);
    const {from, to, msg} = data;
    const chatid = [from, to].sort().join('-');
    // 处理收到的数据，存入数据库，全局发送
    Chat.create({from, to, chatid, content: msg}, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc));
    });
  })
})

const userRouter = require('./user');
app.use(cookieParser());
app.use(bodyParse.json());
app.use('/user', userRouter);
app.use(function(req, res, next) {
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
    return next();
  }
  return res.sendFile(path.resolve('build/index.html'));
});
app.use('/', express.static(path.resolve('build')));
server.listen(9093, function () {
  console.log('Node app is running on port 9093');
})
