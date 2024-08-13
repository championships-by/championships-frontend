  import { combineReducers } from "redux";
  import * as reducers from '../reducers';

  export const rootReducer = combineReducers(
    Object.values(reducers));