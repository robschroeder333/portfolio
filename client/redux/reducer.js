import { toggleInfo } from './actions.js';

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_INFO:
      return Object.assign({}, state, {
        //find the element by the name given and flip its boolean for 'visible'
        action.type.elementName: visible = !action.elementName.visible
      });
    default:
      return state;
  }
};
