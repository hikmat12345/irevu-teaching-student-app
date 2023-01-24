const initialState = {
    messangerData_ERROR : false,
    messangerData : [],

    send_message_data_Error:false,
    send_message_data:[],

    get_messages_Error:false,
    get_messages:[],

    mark_as_seen_Error:false,
    mark_as_seen:[],

    count_new_msg_Error:false,
    count_new_msg:""
}

function MessangerReducer ( state = initialState, action ) {
    switch ( action.type ) {
        case 'ID_MESSAGES' :
            return { ...state, messangerData:action.payload, messangerData_ERROR: false };
        case 'ID_MESSAGES_ERROR' :
            return { ...state, messangerData:action.payload, messangerData_ERROR: true };

        case 'SEND_MESSAGE_DATA' :
            return { ...state, send_message_data:action.payload, send_message_data_Error: false };
        case 'SEND_MESSAGE_DATA_ERROR' :
            return { ...state, send_message_data:action.payload, send_message_data_Error: true };

        case 'GET_MESSAGES' :
            return { ...state, get_messages:action.payload, get_messages_Error: false };
        case 'GET_MESSAGES_ERROR' :
            return { ...state, get_messages:action.payload, get_messages_Error: true };

        case "MARK_AS_SEEN":
            return { ...state, mark_as_seen:action.payload, mark_as_seen_Error: false };
        case 'MARK_AS_SEEN_ERROR':
            return { ...state, mark_as_seen:action.payload, mark_as_seen_Error: true };

        case 'COUNT_NEW_MSG' :
            return { ...state, count_new_msg:action.payload, count_new_msg_Error: false };
        case 'COUNT_NEW_MSG_ERROR' :
            return { ...state, count_new_msg:action.payload, count_new_msg_Error: true };

        default :
            return state
    }
}

export default MessangerReducer