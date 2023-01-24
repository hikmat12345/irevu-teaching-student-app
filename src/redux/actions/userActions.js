import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function getStudentList(q) {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'student/search/' + q, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'STUDENTS_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'USERS_ERROR',
                payload: error,
            });
        }
    }
}

export function getDashboardData() {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'user/dashboard', axiosOptions(localStorage.userToken));
            dispatch({
                type: 'USERS_TOP',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'USERS_ERROR',
                payload: error,
            });
        }
    }
}

export function getNotificationList() {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'notification/list', {}, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'NOTIFICATIONS_LIST',
                payload: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'NOTIFICATIONS_ERROR',
                payload: error,
            });
        }
    }
}
export function readNotificationList(id="") {
    console.log('===========================', id);
    return  async dispatch => {
        // try {
            try {
                var url=Const.BASE_URL + 'read/notifications'
                if(id!="")
                {
                    url+='?id='+id
                }
            
            const response = await axios.get(url, axiosOptions(localStorage.userToken));
            console.log("response ==> ", response)
            return await Promise.resolve({
                type: 'success',
                data: response.data.message,
            });
        } catch (error) {
            return await Promise.resolve({
                type: 'error',
                data: error,
            });
        }
    }
}

export function updateProfile(data) {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'profile/update', data, axiosOptions(localStorage.userToken));
            console.log("object ==> ", response)
            dispatch({
                type: 'UPDATE_PROFILE',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'UPDATE_PROFILE_ERROR',
                payload: error
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function changePass(data) {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'change-password', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'CHANGE_PASSWORD',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'CHANGE_PASSWORD_ERROR',
                payload: error
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}
