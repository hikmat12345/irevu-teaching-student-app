import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function getLessionPlanList() {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'lesson/get-list', axiosOptions(localStorage.userToken));
            dispatch({
                type: 'LESSION_PLAN_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'LESSION_PLAN_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function getOtherLessionPlanList() {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'lesson/get-other-teacher-lessons', axiosOptions(localStorage.userToken));
            dispatch({
                type: 'LESSION_PLAN_BY_OTHERS_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'LESSION_PLAN_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function addLessionPlan(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'lesson/add',
                data,
                {
                    headers: {
                        Authorization: `${localStorage.userToken}`,
                        'content-type': 'multipart/form-data'
                    }
                });
            dispatch({
                type: 'LESSION_PLAN_DATA',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'LESSION_PLAN_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function getLessionPlan(id) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'lesson/get-lesson?id=' + id, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'LESSION_PLAN_DATA',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'LESSION_PLAN_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function seacrhLessionPlan(seacrh) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'lesson/search?search=' + seacrh, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'LESSION_PLAN_BY_OTHERS_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'LESSION_PLAN_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function newLessionPlan() {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'lesson/new', axiosOptions(localStorage.userToken));
            dispatch({
                type: 'LESSION_PLAN_NEW',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'LESSION_PLAN_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function deleteLessionPlan(id) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'lesson/delete?id=' + id, {}, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'LESSION_PLAN_DATA',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'LESSION_PLAN_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}