const mongoose = require('mongoose');
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat';
mongoose.connect(DB_URL);

const models = {
  user: {
    'user': {'type': String, require: true},
    'pwd': {'type': String, require: true},
    'type': {'type': String, require: true},
    'avatar': {'type': String},
    'desc': {'type': String},
    'title': {'type': String},
    //如果是BOSS
    'company': {'type': String},
    'money': {'type': String},
  },
  chat: {
    'chatid': {'type': String, require: true},
    'from': {'type': String, require: true},
    'to': {'type': String, require: true},
    'content': {'type': String, require: true, default: ''},
    'create_time': {'type': Number, require: true, default: new Date().getTime()}
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}