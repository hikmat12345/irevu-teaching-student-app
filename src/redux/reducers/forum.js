const initialState = {
    data : {},
    list : [],
    openList : [],
    closeList : [],
    academicOpenList : [],
    academicCloseList : [],
    error : ""
}

function forum ( state = initialState, action ) {
    switch ( action.type ) {
        case 'FORUM_SUCCESS' :
            return { ...state, data: action.payload };
        case 'FORUM_LIST' :
            return { ...state, list: action.payload };
        case 'FORUM_DELETE':
            return { ...state };
        case 'FORUM_QUESTION_OPEN_LIST' :
            return { ...state, openList: action.payload };
        case 'FORUM_QUESTION_CLOSE_LIST' :
            return { ...state, closeList: action.payload };

        
        case 'ACADEMIC_FORUM_QUESTION_OPEN_LIST' :
            return { ...state, academicOpenList: action.payload };
        case 'ACADEMIC_FORUM_QUESTION_CLOSE_LIST' :
            return { ...state, academicCloseList: action.payload };

        case 'FORUM_ERROR' :
            return { ...state, error: action.payload };
        default :
            return state
    }
}

export default forum