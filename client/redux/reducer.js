import { TOGGLE_INFO, toggleInfo } from './actions.js';

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_INFO:
      return Object.assign({}, state, {
        //find the element by the name given and flip its boolean for 'visible'
      });
    default:
      return state;
  }
};
