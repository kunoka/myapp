import express from 'express';


import React from 'react';
import csshook from 'css-modules-require-hook/preset' // import hook before routes
import assethook from 'asset-require-hook';

import {renderToString} from 'react-dom/server';

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import reducers from '../src/reducer';
import App from '../src/app';
import staticPath from '../build/asset-manifest';

// const express = require('express');
import bodyParse from 'body-parser';
import cookieParser from 'cookie-parser';
import model from './model';
import path from 'path';

assethook({
  extensions: ['png']
});
const User = model.getModel('user');
const Chat = model.getModel('chat');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('user login');
  socket.on('sendmsg', function (data) {
    console.log(data);
    const {from, to, msg} = data;
    const chatid = [from, to].sort().join('-');
    // 处理收到的数据，存入数据库，全局发送
    Chat.create({from, to, chatid, content: msg}, function (err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc));
    });
  })
});

const userRouter = require('./user');
app.use(cookieParser());
app.use(bodyParse.json());
app.use('/user', userRouter);
app.use(function (req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next();
  }
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ));
  const context = {};
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}>
        <App/>
      </StaticRouter>
    </Provider>);
  const obj = {
    '/msg': 'React聊天消息列表',
    '/boss': 'boss查看牛人列表页面',
  };
  let csshtml = '';
  let jsthml = '';
  const keyArr = Object.keys(staticPath);
  keyArr.forEach(key => {
    const propArr = key.split('.');
    const len = propArr.length;
    const type = propArr[len - 1];
    const value = staticPath[key];
    if (type === 'css') {
      if (!csshtml) {
        csshtml = `<link rel="stylesheet" href="${value}">`;
      } else {
        csshtml += `\r\n<link rel="stylesheet" href="${value}">`;
      }
    } else if (type === 'js') {
      if (!jsthml) {
        jsthml = `<script src="${value}"></script>`;
      } else {
        jsthml += `\r\n<script src="${value}"></script>`;
      }
    }
  });
  console.log('jsthml', jsthml);
  const pagehtml = `
  <!doctype html>
  <html lang="en">
    <head>
        <meta charset="utf-8"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/>
        <meta name="theme-color" content="#000000"/>
        <link rel="manifest" href="/manifest.json"/>
        <title>React App${req.url}</title>
        ${csshtml}
        <meta name="keywords" content="React,Redux, Imooc,聊天,SSR"/>
        <meta name="description" content="${obj[req.url]}"/>
        <meta name="author" content="Imooc" />
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">${markup}</div>
      ${jsthml}
     </body>
    </html>
`;
  // const htmlStr = renderToString(<App></App>);
  res.send(pagehtml);
  // return res.sendFile(path.resolve('build/index.html'));
});
app.use('/', express.static(path.resolve('build')));
server.listen(9093, function () {
  console.log('Node app is running on port 9093');
})
