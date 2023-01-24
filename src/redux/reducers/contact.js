const initialState = {
    data : {},
    list : [],
    error : ""
}

function contact ( state = initialState, action ) {
    switch ( action.type ) {
        case 'CONTACT_SUCCESS' :
            return { ...state, list: action.payload };
        case 'CONTACT_ERROR' :
            return { ...state, error: action.payload };
        default :
            return state
    }
}

export default contact