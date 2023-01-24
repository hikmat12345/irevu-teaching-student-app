const initialState = {
    data : {},
    list : [],
    error : ""
}

function homeworks ( state = initialState, action ) {
    switch ( action.type ) {
        case 'HOMEWORK_SUCCESS' :
            return { ...state, data: action.payload };
        case 'HOMEWORK_LIST' :
            return { ...state, list: action.payload };
        case 'HOMEWORK_CREATED' : 
            return { ...state, data: action.payload };
        case 'HOMEWORK_ERROR' :
            return { ...state, error: action.payload };
        default :
            return state
    }
}

export default homeworks