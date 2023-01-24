const initialState = {
    data: {},
    list : [],
    new : [],
    listByOthers : [],
    error : ""
}

function lessionPlan ( state = initialState, action ) {
    switch ( action.type ) {
        case 'LESSION_PLAN_DATA' :
            return { ...state, data: action.payload };
        case 'LESSION_PLAN_LIST' :
            return { ...state, list: action.payload };
        case 'LESSION_PLAN_BY_OTHERS_LIST' :
            return { ...state, listByOthers: action.payload };
        case 'LESSION_PLAN_NEW' :
            return { ...state, new: action.payload };
        case 'LESSION_PLAN_ERROR' :
            return { error: action.payload };
        default :
            return state
    }
}

export default lessionPlan