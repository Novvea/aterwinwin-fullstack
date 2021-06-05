// An action describes what we want to do, returns an object

import axios from 'axios';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './types';

export const fetchUser = () => async (dispatch) => {
  const pathname = window?.location.pathname || '';
  dispatch({
    type: FETCH_USER_REQUEST,
    request: {
      status: 'LOADING',
      statusCode: null,
    },
    pathname,
  });

  try {
    const response = await axios.get('/api/current_user');
    dispatch({
      type: FETCH_USER_SUCCESS,
      data: response.data,
      request: {
        status: 'SUCCESS',
        statusCode: response.status,
      },
      pathname,
    });
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: FETCH_USER_FAILURE,
      request: {
        status: 'FAILURE',
        statusCode: error.response.status,
      },
      pathname,
    });
  }
};
