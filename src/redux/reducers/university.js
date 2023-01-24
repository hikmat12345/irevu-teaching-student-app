const initialState = {
    data : {},
    list : [],
    error : ""
}

function university ( state = initialState, action ) {
    switch ( action.type ) {
        case 'UNIVERSITY_LIST' :
            return { ...state, list: action.payload };
        case 'UNIVERSITY_ERROR' :
            return { ...state, error: action.payload };
        default :
            return state
    }
}

export default university