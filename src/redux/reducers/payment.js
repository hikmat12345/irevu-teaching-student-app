const initialState = {
    data : {},
    qrCode : "",
    outTradeNo:"",
    error : "",
    isUsingWallet : false,
    transactionHistory: '',
}

function payment ( state = initialState, action ) {
    switch ( action.type ) {
        case 'WECHAT_QRCODE_SUCCESS' :
            return { ...state, qrCode: action.payload,outTradeNo:action.out_trade_no, error: "" };
        case 'WECHAT_SUCCESS' :
            return { ...state, data: action.payload, error: "" };
        case 'WECHAT_ERROR' :
            return { ...state, qrCode: action.payload, error: "" };
        case 'IS_USER_WALLET' :
            return { ...state, isUsingWallet: action.payload, error: "" };
        case 'TRANSITION_HISTORY_SUCCESS' :
            return { ...state, transactionHistory: action.payload, error: "" };
        default :
            return state
    }
}
export default payment
