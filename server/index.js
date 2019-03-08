const express = require('express');
const mongoose = require('mongoose');
const myapp = express();

// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
	console.log('mongo connect success 123');
})
// 类似于mysql的表 mongo里有文档，字段的概念
const User = mongoose.model('user', new mongoose.Schema({
	user: {type: String, require: true},
	age: {type: Number, require: true}
}));
// 新建
// User.create({
// 	user: 'xiaohua',
// 	age: 12
// }, function(err, doc) {
// 	if(!err){
// 		console.log(doc);
// 	}else{
// 		console.log(err);
// 	}
// })
// 删除
// User.remove({age: 18}, function(err, doc){
// 	console.log(doc);
// })
// 更新
// User.update({'user':'xiaohua'},{age: 29},
// 	function(err, doc){
// 		console.log(doc);
// 	}
// )

myapp.get('/', function(req, res) {
	res.send('<h1>Hello Express 123</h1>' + new Date());
});
myapp.get('/data', function (req, res) {
	User.findOne({'user':'xiaohua'}, function(err, doc) {
		if(!err) {
			res.json(doc);
		}
	})
	// res.json({'name': 'hello putao', 'course': 'react app development'});
})

myapp.listen(9527, function() {
	console.log('server is running on 9527');
})