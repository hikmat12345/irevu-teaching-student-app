import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function getHomeworkListFromClass(id) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'homework/get-class-list?classId=' + id, {}, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'HOMEWORK_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            dispatch({
                type: 'HOMEWORK_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error'
            });
        }
    }
}

export function createHomework(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'homework/create', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'HOMEWORK_CREATED',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            dispatch({
                type: 'HOMEWORK_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error'
            });
        }
    }
}

export function getHomework(id) {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'homework/get?id=' + id, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'HOMEWORK_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            dispatch({
                type: 'HOMEWORK_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error'
            });
        }
    }
}