import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const msgList = (data) => {
  return {
    type: 'MSG_LIST',
    data
  }
}
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

const initState = {
  chatmsg: [],
  unread: 0
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'MSG_LIST':
      return {...state, chatmsg: action.data, read: action.data.filter(v => !v.read).length + 1}
    default:
      return state;
  }
}