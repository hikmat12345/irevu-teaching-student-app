import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function homeworkFeedbackDetails(id) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'homework-feedback/homework-detail?id=' + id, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'HOMEWORK_FEEDBACK_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'HOMEWORK_FEEDBACK_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function homeworkFeedbackList(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'homework-feedback/get-feedback-list', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'HOMEWORK_FEEDBACK_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'HOMEWORK_FEEDBACK_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function homeworkFeedbackAnswer(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'homework-feedback/add-feedback', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'HOMEWORK_FEEDBACK_ANSWER',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'HOMEWORK_FEEDBACK_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function homeworkFeedbackLike(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'homework-feedback/like-feedback', data, axiosOptions(localStorage.userToken));
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'HOMEWORK_FEEDBACK_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}