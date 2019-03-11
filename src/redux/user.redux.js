import axios from 'axios';

// constants
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERR_MSG = 'ERR_MSG';

//actionCreators
function errorMsg(msg) {
  return {
    type: ERR_MSG,
    msg
  }
}
function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    data
  }
}
export const register = ({user, pwd, rptpwd, type}) => {
  if(!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入');
  }
  if(pwd !== rptpwd) {
    return errorMsg('两次密码输入不一致');
  }
  return (dispatch) => {
    const data = {user, pwd, rptpwd, type};
    axios.post('/user/register', data).then((res) => {
      dispatch(registerSuccess(res.data));
    });
  }
}

// reducer
const defaultState = {
  isAuth: false,
  user: '',
  pwd: '',
  rptpwd: '',
  type: '',
  msg: ''
}
export default function user(state = defaultState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, isAuth: true, ...action.data}
    case ERR_MSG:
        return {...state, isAuth: false, msg: action.msg}
    default:
      return state;
  }
}