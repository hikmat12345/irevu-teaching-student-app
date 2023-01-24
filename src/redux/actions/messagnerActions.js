import axios from "axios";
// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function messangerId(userId) {
    return  async ( dispatch ) => {
        // try {
       try {
            const response = await axios.get(Const.BASE_URL + `/messenger/${userId}`, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'ID_MESSAGES',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'ID_MESSAGES_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}
export function sendNewMessage(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'sendNewMessage',
                data,
                {
                    headers: {
                        Authorization: `${localStorage.userToken}`,
                        'content-type': 'application/json'
                    }
                });
            dispatch({
                type: 'SEND_MESSAGE_DATA',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'SEND_MESSAGE_DATA_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}
export function getMessages(messangerid) {
    console.log(messangerid, 'messangerid messagid faskldfj ')
    return  async ( dispatch ) => {
       try {
            const response = await axios.post(Const.BASE_URL + 'getMessages',{mess_id:messangerid}, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'GET_MESSAGES',
                payload: response.data.output,
            }); 
            // return await Promise.resolve({
            //     type: 'success',
            //     data: response.data.output,
            // });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'GET_MESSAGES_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}
export function markAsSeen(userId, messangerid) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'markAsSeen',
            {user_id:userId, mess_id:messangerid},
                {
                    headers: {
                        Authorization: `${localStorage.userToken}`,
                        'content-type': 'application/json'
                    }
                });
            dispatch({
                type: 'MARK_AS_SEEN',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'MARK_AS_SEEN_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}
export function getNewMessageNotifications(messangerid, userId) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'countNewMsg',
                {
                  mess_id:messangerid,
                  user_id:userId
                },
                {
                    headers: {
                        Authorization: `${localStorage.userToken}`,
                        'content-type': 'application/json'
                    }
                });
            dispatch({
                type: 'COUNT_NEW_MSG',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'COUNT_NEW_MSG_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}