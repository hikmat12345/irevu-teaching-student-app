const initialState = {
    data: {},
    error : ""
}

function upload ( state = initialState, action ) {
    switch ( action.type ) {
        case 'UPLOAD_SUCCESS' :
            return { ...state, data: action.payload };
        case 'UPLOAD_ERROR' :
            return { error: action.payload };
        default :
            return state
    }
}

export default upload