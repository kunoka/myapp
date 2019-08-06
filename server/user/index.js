const express = require('express');
const Router = express.Router();
const model = require('../model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const Utility = require('utility');
const _filter = {'pwd': 0, '__v': 0}
Chat.remove({}, function(err, doc){
})
Router.get('/list', function (req, res) {
  //清空所有数据
  // User.remove({}, function (e,d) {});
  const {type} = req.query;
  console.log('user list');
  User.find({type}, function (err, doc) {
    return res.json(doc);
  })
});
Router.get('/getMsgList', function (req, res) {
  const user = req.cookies.userid;
  console.log('user', user);
  User.find({}, function(err, userdoc){
    if(!err) {
      let users = {};
      userdoc.forEach(v=> {
         users[v._id] = {name: v.user, avatar: v.avatar}
      });
      Chat.find({}, function (err, doc) {
        if (!err) {
          console.log('msgs', doc);
          console.log('users', users);
          return res.json({code: 0, msgs: doc, users});
        }
      });
    }
  })

});
Router.post('/login', function (req, res) {
  console.log(req.body);
  const {user, pwd} = req.body;
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户或密码错误'});
    } else {
      console.log('=找到用户=');
      console.log(doc);
      res.cookie('userid', doc._id);
      return res.json({code: 0, data: doc});
    }
  })
});
Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body;
  User.findOne({user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }
    const userModel = new User({user, type, pwd: md5Pwd(pwd)});
    userModel.save(function (e, d) {
      if (e) {
        return res.json({code: 1, msg: '后端出错了'});
      }
      console.log('==d==');
      console.log(d);
      const {user, type, _id} = d;
      res.cookie('userid', _id);
      return res.json({code: 0, data: {user, type, _id}});
    })
  })
});
Router.post('/update', function (req, res) {
  const userid = req.cookies.userid;
  console.log('cookies中的userid', userid)
  if (!userid) {
    return res.json({code: 1, msg: 'userid没有找到'});
  }
  const body = req.body;
  console.log('前台传递过来的update body', body);
  User.findOneAndUpdate({_id: userid}, body, function (err, doc) {
    console.log('doc', doc)
    const data = Object.assign({}, {user: doc.user, type: doc.type}, body);
    return res.json({code: 0, data})
  })
})
Router.get('/info', function (req, res) {
  const {userid} = req.cookies;
  console.log(userid)
  if (!userid) {
    return res.json({code: 1});
  }
  User.findOne({_id: userid}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '后端出错了'});
    }
    if (doc) {
      return res.json({code: 0, data: doc});
    }
  });
  // 用户有没有cookie
})

function md5Pwd(pwd) {
  const salt = 'imooc_react_study!@#T%*';
  return Utility.md5(Utility.md5(pwd + salt));
}

module.exports = Router;