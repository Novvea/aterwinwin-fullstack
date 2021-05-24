import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  //combine all reducers so that we can add the to one store
  auth: authReducer,
});
