import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function getUniversityList() {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'university/list');
            dispatch({
                type: 'UNIVERSITY_LIST',
                payload: response.data.output,
            });
            return {
                type: "success",
            };
        } catch (error) {
            dispatch({
                type: 'UNIVERSITY_ERROR',
                payload: error,
            });
        }
    }
};