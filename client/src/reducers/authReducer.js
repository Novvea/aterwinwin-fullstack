import { FETCH_USER } from '../actions/types';

const authReducer = (state = null, action) => {
  //initial state is null
  console.log('action: ', action);
  switch (
    action.type //based on the name of the action, it will do something for us
  ) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
