import {ADD_GUN, ADD_GUN_ASYNC, REMOVE_GUN} from './constants';

export const addGun = () => {
  return {
    type: ADD_GUN
  }
}
export const addGunAsync = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(addGun())
    }, 2000);
  }
}

export const removeGun = () => {
  return {
    type: REMOVE_GUN
  }
}