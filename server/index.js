const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./userRouter');

const myapp = express();
myapp.use('/user', userRouter);
myapp.get('/', function(req, res) {
	res.send('<h1>Hello Express 123</h1>' + new Date());
});

myapp.listen(9093, function() {
	console.log('Node app is running on port 9093');
})