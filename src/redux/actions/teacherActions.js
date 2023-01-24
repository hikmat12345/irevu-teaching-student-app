import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function getTopPerformedTeacher() {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'teacher/top-performed-teacher', axiosOptions(localStorage.userToken));
            console.log("IN TRY getTopPerformedTeacher", response.data.output);
            dispatch({
                type: 'TEACHERS_TOP_RATED_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            console.log("IN catch getTopPerformedTeacher", err);
            dispatch({
                type: 'TEACHERS_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function getSubmittedHomeworkList(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'teacher/submitted-homework-list', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'SUBMITTED_HOMEWORK_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'TEACHERS_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function addGradeHomework(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'teacher/add-grade-homework', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'SUBMITTED_HOMEWORK_GRADE',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'TEACHERS_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function addGradeAcademic(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'teacher/add-grade-academic', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'SUBMITTED_ACADEMIC_GRADE',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'TEACHERS_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}