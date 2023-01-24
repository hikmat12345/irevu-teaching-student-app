const initialState = {
    data : {},
    grade : {},
    academicGrade : {},
    topRated : [],
    submittedHomeworkList : [],
    error : ""
}

function teachers ( state = initialState, action ) {
    switch ( action.type ) {
        case 'TEACHERS_TOP_RATED_LIST' :
            return { ...state, topRated: action.payload };
        case 'SUBMITTED_HOMEWORK_GRADE' :
            return { ...state, grade: action.payload };
        case 'SUBMITTED_ACADEMIC_GRADE' :
            return { ...state, academicGrade: action.payload };
        case 'SUBMITTED_HOMEWORK_LIST' :
            return { ...state, submittedHomeworkList: action.payload };
        case 'TEACHERS_ERROR' :
            return { ...state, error: action.payload };
        default :
            return state
    }
}

export default teachers