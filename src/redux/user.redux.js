import axios from 'axios';
import {getRedirectPath} from '../utils';
// constants
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const ERR_MSG = 'ERR_MSG';

//actionCreators
function errorMsg(msg) {
  return {
    type: ERR_MSG,
    msg
  }
}
function authSuccess(obj) {
  const {pwd, ...data} = obj;
  return {
    type: AUTH_SUCCESS,
    data
  }
}
export function loadData(data) {
  return {
    type: LOAD_DATA,
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
        dispatch(authSuccess(res.data.data));
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
        console.log('data');
        console.log(data);
        dispatch(authSuccess(data));
      }else{
        dispatch(errorMsg(res.data.msg));
      }
    });
  }
}
export const update = (data) => {
  return (dispatch) => {
    axios.post('/user/update', data).then((res) => {
      if(res.status === 200 && res.data.code === 0) {
        console.log('res.data.data');
        console.log(res.data.data);
        dispatch(authSuccess(res.data.data));
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
  type: '',
  msg: '',
  redirectTo: ''
}
export default function user(state = defaultState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return {...state, ...action.data}
    case AUTH_SUCCESS:
      console.log('action');
      console.log(action);
      const result = {...state, isAuth: true, redirectTo: getRedirectPath(action.data),  ...action.data};
      console.log(result)
      return result;
    case ERR_MSG:
        return {...state, isAuth: false, msg: action.msg}
    default:
      return state;
  }
}