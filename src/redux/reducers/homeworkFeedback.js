const initialState = {
    data : {
        submmitedHomework : {},
        homework : {},
        student : {},
        teacher : {}
    },
    list : [],
    answer : {},
    error : ""
}

function homeworkFeedback ( state = initialState, action ) {
    switch ( action.type ) {
        case 'HOMEWORK_FEEDBACK_SUCCESS' :
            return { ...state, data: action.payload };
        case 'HOMEWORK_FEEDBACK_LIST' :
            return { ...state, list: action.payload };
        case 'HOMEWORK_FEEDBACK_ANSWER' :
            return { ...state, answer: action.payload };
        case 'HOMEWORK_FEEDBACK_ERROR' :
            return { ...state, error: action.payload };
        default :
            return state
    }
}

export default homeworkFeedback