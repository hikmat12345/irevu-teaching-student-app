const initialState = {
    data : {
        userDetail : {},
        questionDetail : {}
    },
    academicData : {
        userDetail : {},
        questionDetail : {},
        submmitedDetail : {}
    },
    list : [],
    answer : {},
    error : ""
}

function forumFeedback ( state = initialState, action ) {
    switch ( action.type ) {
        case 'FORUM_FEEDBACK_SUCCESS' :
            return { ...state, data: action.payload };
        case 'FORUM_FEEDBACK_LIST' :
            return { ...state, list: action.payload };
        case 'FORUM_FEEDBACK_ANSWER' :
            return { ...state, answer: action.payload };

        case 'ACADEMIC_FORUM_QUESTION_DETAILS' :
                return { ...state, academicData: action.payload };
        
        case 'FORUM_FEEDBACK_ERROR' :
            return { ...state, error: action.payload };
        default :
            return state
    }
}

export default forumFeedback