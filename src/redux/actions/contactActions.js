import axios from 'axios';

//
import axiosOptions from '../../helpers/axiosOptions';
import Const from '../../helpers/const';

export function submitContact(formData) {
  return async (dispatch) => {
    // try {
    try {
      const response = await axios.post(
        Const.BASE_URL + 'contactus',
        formData,
        axiosOptions(localStorage.userToken)
      );

      dispatch({
        type: 'CONTACT_SUCCESS',
        payload: response.data.output,
      });

      return Promise.resolve({
        type: 'success',
        payload: response.data.output,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'CONTACT_ERROR',
        payload: error,
      });

      return Promise.resolve({
        type: 'error',
        payload: error,
      });
    }
  };
}
