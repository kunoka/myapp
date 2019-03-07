const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const defaultState = {
  isAuth: false,
  user: '李云龙'
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, isAuth: true}
    case LOGOUT:
      return {...state, isAuth: false}
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