import axios from 'axios';
import {getRedirectPath} from '../utils';
// constants
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERR_MSG = 'ERR_MSG';

//actionCreators
function errorMsg(msg) {
  return {
    type: ERR_MSG,
    msg
  }
}
function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}
function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    data
  }
}
export const login = ({user, pwd}) => {
  if(!user || !pwd) {
    return errorMsg('用户名和密码必须输入')
  }
  return (dispatch) => {
    const data = {user, pwd}
    axios.post('/user/login', data).then((res) => {
      if(res.status===200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data));
      }else{
        dispatch(errorMsg(res.data.msg));
      }
    })
  }
}
export const register = ({user, pwd, rptpwd, type}) => {
  if(!user || !pwd || !type) {
    return errorMsg('用户名和密码必须输入');
  }
  if(pwd !== rptpwd) {
    return errorMsg('两次密码输入不一致');
  }
  return (dispatch) => {
    const data = {user, pwd, rptpwd, type};
    axios.post('/user/register', data).then((res) => {
      if(res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess(data));
      }else{
        dispatch(errorMsg(res.data.msg));
      }
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
  msg: '',
  redirectTo: ''
}
export default function user(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, isAuth: true, redirectTo: getRedirectPath(action.data),  ...action.data}
    case REGISTER_SUCCESS:
      return {...state, isAuth: true, redirectTo: getRedirectPath(action.data),  ...action.data}
    case ERR_MSG:
        return {...state, isAuth: false, msg: action.msg}
    default:
      return state;
  }
}