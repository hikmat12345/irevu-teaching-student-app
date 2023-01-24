const initialState = {
    data : {},
    list : [],
    error : ""
}

function course ( state = initialState, action ) {
    switch ( action.type ) {
        case 'COURSE_LIST' :
            return { ...state, list: action.payload };
        case 'COURSE_ERROR' :
            return { ...state, error: action.payload };
        default :
            return state
    }
}

export default course