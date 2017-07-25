//
// action types

export const TOGGLE_INFO = 'TOGGLE_INFO';

//
// action creators

export const toggleInfo = (elementName, visibleState) => (
  {
    type: TOGGLE_INFO,
    elementName,
    visibleState
  }
);
