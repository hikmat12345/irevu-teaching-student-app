import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function uploadFile(data) {
    return  async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'user/mobile-upload-file',
                data,
                {
                    headers: {
                        Authorization: `${localStorage.userToken}`,
                        'content-type': 'multipart/form-data'
                    }
                });
            dispatch({
                type: 'UPLOAD_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'UPLOAD_ERROR',
                payload: error.response.data,
            });
            return await Promise.resolve({
                type: 'error',
                payload: error.response.data,
            });
        }
    }
}