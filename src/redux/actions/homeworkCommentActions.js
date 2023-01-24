import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function submitComment(data) {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'homework/comment/save', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'COMMENT_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'COMMENT_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function commentList(data) {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'homework/comment/list', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'COMMENT_LIST',
                payload: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'COMMENT_ERROR',
                payload: error,
            });
        }
    }
}