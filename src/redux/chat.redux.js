import axios from 'axios';
import io from 'socket.io-client';
import Lodash from 'lodash';

const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

function msgList(data, userid) {
  return {
    type: MSG_LIST,
    data,
    userid
  }
}

function msgRecv(data, userid) {
  return {
    type: MSG_RECV,
    data,
    userid
  }
}

function msgRead({from, userid, num}) {
  return {
    type: MSG_READ,
    from,
    userid,
    num
  }
}

// 标记消息为已读
export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readMsg', {from}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const {num} = res.data;
        console.log('res', res);
        const userid = getState().user._id;
        dispatch(msgRead({from, userid, num}))
      }
    })
  }
}

// 收消息
export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function (data) {
      // console.log('收到的群发消息',data);
      const userid = getState().user._id;
      dispatch(msgRecv(data, userid));
    })
  }
}

// 发送消息
export function sendMsg({from, to, msg}) {
  return dispatch => {
    // console.log('发出的消息', {from, to, msg});
    socket.emit('sendmsg', {from, to, msg});
  }
}

//  获取消息列表
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getMsgList').then((res) => {
      const userid = getState().user._id;
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data, userid));
      }
    });
  }
}

const initState = {
  chatmsg: [],
  users: null,
  unread: 0
}

export default (state = initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.data.msgs,
        users: action.data.users,
        unread: action.data.msgs.filter(v => !v.read && v.to === action.userid).length
      }
    case MSG_RECV:
      const finder = exist(state.chatmsg, action.data);
      if (!finder) {
        const n = action.userid === action.data.to ? 1 : 0;
        return {
          ...state,
          chatmsg: [...state.chatmsg, action.data],
          unread: state.unread + n
        }
      }
      return state;
    case MSG_READ:
      const {from, num} = action;
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => ({...v, read: v.from === from ? true : v.read})),
        unread: state.unread - num
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
  return false;
}

function getChatMsg(data) {
  const result = Lodash.uniqWith(data, Lodash.isEqual)
  return result;
}