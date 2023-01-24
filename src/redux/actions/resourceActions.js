import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function getResourceList() {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'resource/get-list', {}, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'RESOURCE_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'RESOURCE_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function getOtherResourceList() {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'resource/get-other-students-list', axiosOptions(localStorage.userToken));
            dispatch({
                type: 'RESOURCE_BY_OTHERS_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'RESOURCE_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function addResourcePlan(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'resource/add',
                data,
                {
                    headers: {
                        Authorization: `${localStorage.userToken}`,
                        'content-type': 'multipart/form-data'
                    }
                });
            dispatch({
                type: 'RESOURCE_DATA',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'RESOURCE_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function uploadDoc(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'upload/docs',
                data,
                {
                    headers: {
                        Authorization: `${localStorage.userToken}`,
                        'content-type': 'multipart/form-data'
                    }
                });
            dispatch({
                type: 'RESOURCE_DATA',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'RESOURCE_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function getResource(id) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'resource/get-resource?id=' + id, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'RESOURCE_DATA',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'RESOURCE_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function seacrhResourcePlan(seacrh) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'resource/search?search=' + seacrh, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'RESOURCE_BY_OTHERS_LIST',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'RESOURCE_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function newResources() {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'resource/new', axiosOptions(localStorage.userToken));
            dispatch({
                type: 'RESOURCE_NEW',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'RESOURCE_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function deleteResource(id) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'resource/delete?id=' + id, {}, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'RESOURCE_DATA',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'RESOURCE_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}