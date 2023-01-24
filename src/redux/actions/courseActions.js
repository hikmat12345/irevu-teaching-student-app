import axios from "axios";

// 
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function getCourseList() {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'course/list');
            dispatch({
                type: 'COURSE_LIST',
                payload: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'COURSE_ERROR',
                payload: error,
            });
        }
    }
};