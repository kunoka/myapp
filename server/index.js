const express = require('express');
const userRouter = require('./user')

const app = express();

app.use('/user', userRouter)
app.listen(9093, function() {
	console.log('Node app is running on port 9093');
})