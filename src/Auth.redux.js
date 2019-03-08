import axios from 'axios';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USER_DATA = 'USER_DATA'
const defaultState = {
  isAuth: false,
  user: '李云龙',
  age: 20
}

export default (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case LOGIN:
      return {...state, isAuth: true}
    case LOGOUT:
      return {...state, isAuth: false}
    case USER_DATA:
      return {...state, user: action.payload.user, age: action.payload.age}
    default:
      return state;
  }
}

export function login() {
  return {type: LOGIN}

}
export function logout() {
  return {type: LOGOUT}
}

export function userData(data) {
  return {
    type: USER_DATA,
    payload: data
  }
}
export const getUserData = () => {
  return (dispatch) => {
    axios.get('/data').then((res) => {
      console.log(res);
      dispatch(userData(res.data))
    });
  }
}