const initialState = {
    data : {},
    dashboard : {
        teachers: [],
        students: [],
        classes: [],
        studentsClasses: [],
        lessonPlans: [],
        resources: [],
    },
    list : [],
    studentList : [],
    notificationList : [],
    error : "",
    updateProfileError : "",
    notificationError : ""
}

function users ( state = initialState, action ) {
    switch ( action.type ) {
        case 'STUDENTS_LIST' :
            return { ...state, studentList: action.payload };
        case 'USERS_TOP' :
            return { ...state, dashboard: action.payload };
        case 'USERS_ERROR' :
            return { ...state, error: action.payload };
        case 'UPDATE_PROFILE' :
            return { ...state, data: action.payload };
        case 'UPDATE_PROFILE_ERROR' :
            return { ...state, error: action.payload };
        case 'CHANGE_PASSWORD' :
            return { ...state, data: action.payload };
        case 'CHANGE_PASSWORD_ERROR' :
            return { ...state, error: action.payload };
        case 'UPLOAD_FILE' :
            return { ...state, data: action.payload };
        case 'UPLOAD_FILE_ERROR' :
            return { ...state, error: action.payload };
        case 'NOTIFICATIONS_LIST' :
            return { ...state, notificationList: action.payload };
        case 'NOTIFICATIONS_ERROR' :
            return { ...state, notificationError: action.payload };
        default :
            return state
    }
}

export default users