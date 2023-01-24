const initialState = {
    isLoggedIn : false,
    user : {},
    loginErrors : "",
    userRedirect: "/",

    weData: {},
    weError : "",
}

function auth ( state = initialState, action ) {
    switch ( action.type ) {
        case 'LOGIN_LOADING' :
            return { ...state, loginErrors: "", isLoggedIn: false, isLoading: true };
        case 'LOGIN_SUCCESS' :
            return { ...state, loginErrors: "", isLoggedIn: true, user: action.payload };
        case 'LOGIN_USER_DATA' :
            return { ...state, loginErrors: "", isLoggedIn: true, user: action.payload };
        case 'LOGIN_ERROR' :
            return { loginErrors: action.payload, isLoggedIn: false };
        case 'NO_LOGGED_USER' :
            return { loginErrors: "", isLoggedIn: false, user: {} };
        case 'LOGOUT' :
            return { loginErrors: "", isLoggedIn: false, user: {} };
        case "SET_USER_REDIRECT":
            return { ...state, userRedirect: action.payload, loginErrors: "", isLoggedIn: true };

        case 'WECHAT_SUCCESS' :
            return { ...state, weData: action.payload };
        case 'WECHAT_ERROR' :
            return { ...state, weError: action.payload };
        default :
            return state
    }
}

export default auth