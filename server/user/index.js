const express = require('express');
const Router = express.Router();
const model = require('../model');
const User = model.getModel('user');
const Utility = require('utility');

Router.get('/list', function (req, res) {
  //清空所有数据
  // User.remove({}, function (e,d) {});
  User.find({}, function (err, doc) {
    return res.json(doc)
  })
})
Router.post('/login', function (req, res) {
  console.log(req.body);
  const {user, pwd} = req.body;
  User.findOne({user,pwd: md5Pwd(pwd)}, {'pwd': 0}, function (err, doc) {
    if(!doc) {
      return res.json({code: 1, msg: '用户或密码错误'});
    }else{
      return res.json({code: 0, data: doc});
    }
  })
});
Router.post('/register', function(req, res) {
  console.log(req.body);
  const {user, pwd, type} = req.body;
  User.findOne({user}, function (err, doc) {
    if(doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }
    User.create({user, pwd: md5Pwd(pwd), type}, function (e, d) {
      if(e) {
        return res.json({code: 1, msg: '后端出错了'});
      }
      return res.json({code: 0});
    })
  })
})
Router.get('/info', function (req, res) {
  // 用户有没有cookie
  return res.json({code: 1})
})
function md5Pwd(pwd) {
  const salt = 'imooc_react_study!@#T%*';
  return Utility.md5(Utility.md5(pwd+salt));
}
module.exports = Router;