const initialState = {
    data : {},
    list : [],
    homeworkList : [],
    enrollStudent : {},
    enrollStudentList : [],
    enrollStudentError : "",
    error : ""
}

function classes ( state = initialState, action ) {
    switch ( action.type ) {
        case 'CLASSES_LIST' :
            return { ...state, list: action.payload };
        case 'CREATE_CLASS' :
            return { ...state };
        case 'GET_CLASS' :
            return { ...state, data: action.payload };
        case 'CLASSES_ERROR' :
            return { ...state, error: action.payload };

        case 'HOMEWORK_LIST' :
            return { ...state, homeworkList: action.payload };

        case 'ENROLL_STUDENT' :
            return { ...state, enrollStudent: action.payload };
        case 'ENROLL_STUDENT_LIST' :
            return { ...state, enrollStudentList: action.payload };

        case 'ENROLL_STUDENT_ERROR' :
            return { ...state, enrollStudentError: action.payload };
        default :
            return state
    }
}

export default classes