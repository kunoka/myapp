import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const msgList = (data) => {
  return {
    type: MSG_LIST,
    data
  }
}
const msgRecv = (data) => {
  return {
    type: MSG_RECV,
    data
  }
}
//  获取消息列表
export const getMsgList = () => {
  return dispatch => {
    axios.get('/user/getMsgList').then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        console.log(res);
        dispatch(msgList(res.data.msgs));
      }
    });
  }
}
// 发送消息
export const sendMsg = ({from, to, msg}) => {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg});
  }
}
// 收消息
export const recvMsg = (data) => {
  return dispatch => {
    socket.on('recvmsg', function (data) {
      console.log('==recvmsg==', data);
      dispatch(msgRecv(data));
    })
  }
}
const initState = {
  chatmsg: [],
  unread: 0
}

export default (state = initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.data, read: action.data.filter(v => !v.read).length + 1}
    case MSG_RECV:
      return {...state, chatmsg: [...state.chatmsg, action.msg]}
    default:
      return state;
  }
}