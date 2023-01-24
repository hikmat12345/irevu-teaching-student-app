const initialState = {
    data: {},
    docData: {},
    list : [],
    new : [],
    listByOthers : [],
    error : ""
}

function resource ( state = initialState, action ) {
    switch ( action.type ) {
        case 'RESOURCE_DATA' :
            return { ...state, data: action.payload };
        case 'RESOURCE_DOC_DATA' :
            return { ...state, docData: action.payload };
        case 'RESOURCE_LIST' :
            return { ...state, list: action.payload };
        case 'RESOURCE_NEW' :
            return { ...state, new: action.payload };
        case 'RESOURCE_BY_OTHERS_LIST' :
            return { ...state, listByOthers: action.payload };
        case 'RESOURCE_ERROR' :
            return { error: action.payload };
        default :
            return state
    }
}

export default resource