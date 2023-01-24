const initialState = {
    data : {},
    classList : [],
    enrolledClassDetail : {},
    homeworkList : [],
    topRated : [],
    error : "",
    studentsHomeWorkData:[]
}

function students ( state = initialState, action ) {
    switch ( action.type ) {
        case 'STUDENTS_CLASS_LIST' :
            return { ...state, classList: action.payload };
        case 'STUDENTS_HOMEWORK_LIST' :
            return { ...state, homeworkList: action.payload };
        case 'STUDENTS_TOP_RATED_LIST' :
            return { ...state, topRated: action.payload };
        case 'ENROLLED_CLASS_DETAIL' :
            return { ...state, enrolledClassDetail: action.payload };
        case 'STUDENTS_SUBMIT_HOMEWORK' :
            return { ...state, data: action.payload };
            case 'STUDENTS_ERROR' :
                return { ...state, error: action.payload };
            case 'STUDENTS_HOMEWORK_DATA' :
                return { ...state, studentsHomeWorkData: action.payload };
            default :
            return state
    }
}

export default students