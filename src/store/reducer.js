import {REMOVE_GUN, ADD_GUN} from './constants';

const defaultState = {
  login: false,
  count: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_GUN:
      const newState1 = JSON.parse(JSON.stringify(state));
      newState1.count++;
      return newState1;
    case REMOVE_GUN:
      const newState2 = JSON.parse(JSON.stringify(state));
      newState2.count--;
      return newState2;
    default:
      return state;
  }
}