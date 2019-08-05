import axios from 'axios';
import io from 'socket.io-client';
import Lodash from 'lodash';

const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

function msgList(data) {
  return {
    type: MSG_LIST,
    data
  }
}

function msgRecv(data) {
  return {
    type: MSG_RECV,
    data
  }
}

// 收消息
export function recvMsg() {
  return dispatch => {
    socket.on('recvmsg', function (data) {
      dispatch(msgRecv(data));
    })
  }
}

// 发送消息
export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg});
  }
}

//  获取消息列表
export const getMsgList = () => {
  return dispatch => {
    axios.get('/user/getMsgList').then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs));
      }
    });
  }
}
const initState = {
  chatmsg: [],
  unread: 0
}

export default (state = initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.data, read: action.data.filter(v => !v.read).length}
    case MSG_RECV:
      const finder = exist(state.chatmsg, action.data);
      if (!finder) {
        return {...state, chatmsg: getChatMsg([...state.chatmsg, action.data]), unread: state.unread + 1}
      }

    default:
      return state;
  }
}

function exist(chatmsg, data) {
  if (chatmsg.length) {
    const finder = chatmsg.find(msg => {
      return msg._id === data._id;
    });
    return !!finder;
  }
}

function getChatMsg(data) {
  const result = Lodash.uniqWith(data, Lodash.isEqual)
  return result;
}