import { addAction } from '@actions';

const initialState = {
  items: [],
};

export const addReducer = (state = initialState, action) => {
  switch (action.type) {
    case addAction.type:
      return { ...state, items: [...state.items, action.item] };
    default:
      return state;
  }
};