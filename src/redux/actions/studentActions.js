import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function getStudentClassList() {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'student/get-class-list', axiosOptions(localStorage.userToken));
            console.log("IN TRY getStudentClassList", response.data.output);
            dispatch({
                type: 'STUDENTS_CLASS_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            console.log("IN catch getStudentClassList", err);
            dispatch({
                type: 'STUDENTS_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
};

export function enrolledClassDetail(classId) {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'student/enrolled-class-detail?class_id=' + classId, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'ENROLLED_CLASS_DETAIL',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'STUDENTS_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function getStudentHomeworkList(classId) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'student/homework-list?class_id=' + classId, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'STUDENTS_HOMEWORK_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'STUDENTS_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function studentSubmitHomeworkDetails(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'student/submit-homework', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'STUDENTS_SUBMIT_HOMEWORK',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'STUDENTS_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function studentsHomeWorkData (data){
    return  (dispatch) => {
            dispatch({
                type: 'STUDENTS_HOMEWORK_DATA',
                payload: data,
            });        
    }
}

export function getTopPerformedStudent() {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'student/top-performed-student', axiosOptions(localStorage.userToken));
            console.log("IN TRY getTopPerformedStudent", response.data.output);
            dispatch({
                type: 'STUDENTS_TOP_RATED_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            console.log("IN catch getTopPerformedStudent", err);
            dispatch({
                type: 'STUDENTS_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}


