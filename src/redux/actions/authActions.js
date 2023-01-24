import axios from 'axios';

//
import axiosOptions from '../../helpers/axiosOptions';
import Const from '../../helpers/const';

export function wechatAuth() {
  return async (dispatch) => {
    // try {
    try {
      const response = await axios.get(
        Const.BASE_URL + `wechat_auth`,
        axiosOptions(localStorage.userToken)
      );
      console.log('response', response);
      dispatch({
        type: 'WECHAT_SUCCESS',
        payload: response.data.output,
      });
    } catch (error) {
      dispatch({
        type: 'WECHAT_ERROR',
        payload: error.response.data,
      });
    }
  };
}

export function login(data) {
  return async (dispatch) => {
    // dispatch({type: 'LOGIN_LOADING'});
    // try {
    try {
      const response = await axios.post(Const.BASE_URL + 'login', data);
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.output));
      // console.log("response.data", response.data);
      if (response.data.status == 200) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.output,
        });
        return Promise.resolve({
          type: 'success',
          payload: response.data.output,
        });
      } else {
        dispatch({
          type: 'LOGIN_ERROR',
          payload: response.data,
        });
        return Promise.resolve({
          type: 'error',
          payload: response.data,
        });
      }
    } catch (error) {
      let err = error.response ? error.response.data : error;
      dispatch({
        type: 'LOGIN_ERROR',
        payload: err,
      });
      return Promise.resolve({
        type: 'error',
        payload: err,
      });
    }
  };
}

export function checkAuth() {
  return async (dispatch) => {
    if (localStorage.userToken) {
      // try {
      try {
        const response = await axios.get(
          Const.BASE_URL + 'profile',
          axiosOptions(localStorage.userToken)
        );
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.output,
        });
        return Promise.resolve({
          type: 'success',
          payload: response.data.output,
        });
      } catch (error) {
        localStorage.removeItem('userToken');
        let err = error.response ? error.response.data : error;
        dispatch({
          type: 'LOGIN_ERROR',
          payload: err,
        });
        return Promise.resolve({
          type: 'error',
          payload: err,
        });
      }
    } else {
      dispatch({ type: 'NO_LOGGED_USER' });
      return Promise.resolve({
        type: 'error',
      });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    // try {
    try {
      const response = await axios.get(
        Const.BASE_URL + `logout`,
        axiosOptions(localStorage.userToken)
      );
      localStorage.removeItem('userToken');
      dispatch({
        type: 'LOGOUT',
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.response.data,
      });
    }
  };
}

export function setUserRedirect(slug) {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER_REDIRECT',
      payload: slug,
    });
  };
}
