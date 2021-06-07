import { combineReducers } from 'redux';

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '../actions/types';

const dataReducer = (state = null, action) => {
  //initial state is null
  switch (
    action.type //based on the name of the action, it will do something for us
  ) {
    case FETCH_USER_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

const requestReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
    case FETCH_USER_SUCCESS:
    case FETCH_USER_FAILURE:
      return action.request;
    default:
      return state;
  }
};

export default combineReducers({ data: dataReducer, request: requestReducer });
