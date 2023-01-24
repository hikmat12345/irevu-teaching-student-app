import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function forumQuestionDetails(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'forum-question/question-detail', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'FORUM_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'FORUM_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function forumQuestionList(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'forum-question/question-list', data, axiosOptions(localStorage.userToken));
            if (data.status == "open") {
                dispatch({
                    type: 'FORUM_QUESTION_OPEN_LIST',
                    payload: response.data.output,
                });
            } else {
                dispatch({
                    type: 'FORUM_QUESTION_CLOSE_LIST',
                    payload: response.data.output,
                });
            }
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'FORUM_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function academicForumQuestionList(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'forum-question/academic-question-list', data, axiosOptions(localStorage.userToken));
            if (data.status == "open") {
                dispatch({
                    type: 'ACADEMIC_FORUM_QUESTION_OPEN_LIST',
                    payload: response.data.output,
                });
            } else {
                dispatch({
                    type: 'ACADEMIC_FORUM_QUESTION_CLOSE_LIST',
                    payload: response.data.output,
                });
            }
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'FORUM_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function deductPlatformFee(data){
    return async dispatch => {
        try {
            let response = await axios.post(Const.BASE_URL + 'wallettendeduct',data,axiosOptions(localStorage.userToken));
            dispatch({
                type:'WALLET_SUCCESS',
                payload: response.data.output
            });
            return await Promise.resolve({
                type:'success',
                payload: response.data.output
            })
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'WALLET_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function addForumQuestion(data) {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'forum-question/add-question', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'FORUM_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'FORUM_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function acceptForumQuestion(data) {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'forum-question/accept-question', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'FORUM_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'FORUM_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function deleteForumQuestion (id) {
    return  async dispatch => {
        try {
            const response = await axios.post(Const.BASE_URL + 'forum-question/delete?id='+id, {}, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'FORUM_DELETE',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            // let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'FORUM_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error',
                payload: error
            });
        }
    }
}

export function editForumQuestion(data) {
    return  async dispatch => {
        try {
            const response = await axios.post(Const.BASE_URL + 'forum-question/edit-question', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'FORUM_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'FORUM_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}