import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function getClassesList() {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'class/list', axiosOptions(localStorage.userToken));
            dispatch({
                type: 'CLASSES_LIST',
                payload: response.data.output,
            });
            return {
                type: 'success'
            };
        } catch (error) {
            dispatch({
                type: 'CLASSES_ERROR',
                payload: error,
            });
            return {
                type: 'error'
            };
        }
    }
}

export function createClass(data) {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'class/create', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'CREATE_CLASS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            dispatch({
                type: 'CLASSES_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error'
            });
        }
    }
}

export function getClass(id) {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'class/get?id=' + id, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'GET_CLASS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            dispatch({
                type: 'CLASSES_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error'
            });
        }
    }
}

export function enrollStudent(data) {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'student/enroll', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'ENROLL_STUDENT',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'ENROLL_STUDENT_ERROR',
                payload: error.response,
            });
            return await Promise.resolve({
                type: 'error',
                data: error.response,
            });
        }
    }
}

export function studentEnrollInClass(data) {
    return  async dispatch => {
        // try {
        try {
            const response = await axios.post(Const.BASE_URL + 'student/enrolled-class', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'ENROLL_STUDENT',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'ENROLL_STUDENT_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error',
                payload: error,
            });
        }
    }
}

export function enrollStudentsList(data) {
    return  async dispatch => {
        // try {
        try {
            const response = await axios.post(Const.BASE_URL + 'user/student-enroll-list', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'ENROLL_STUDENT_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'ENROLL_STUDENT_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error',
                data: error,
            });
        }
    }
}

export function getClassHomeworks(classId) {
    return  async dispatch => {
        // try {
        try {
            const response = await axios.post(Const.BASE_URL + 'class/homework?classId=' + classId, {}, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'HOMEWORK_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'CLASSES_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error',
                data: error,
            });
        }
    }
}