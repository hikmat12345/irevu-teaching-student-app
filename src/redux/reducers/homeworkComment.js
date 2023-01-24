const initialState = {
    data : {},
    list : [],
    error : ""
}

function homeworkComment ( state = initialState, action ) {
    switch ( action.type ) {
        case 'COMMENT_SUCCESS' :
            return { ...state, data: action.payload, error:"" };
        case 'COMMENT_LIST' :
            return { ...state, list: action.payload, error:"" };
        case 'COMMENT_ERROR' :
            return { ...state, error: action.payload };
        default :
            return state
    }
}

export default homeworkComment