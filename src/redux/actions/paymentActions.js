import axios from "axios";

//
import axiosOptions from '../../helpers/axiosOptions'
import Const from '../../helpers/const'

export function updateQRCode(data){

    return {
        type: 'WECHAT_QRCODE_SUCCESS',
        payload: data,
      };
}

export function isUseWallet(data){
    return {
        type: 'IS_USER_WALLET',
        payload: data,
      };
}

export function getQRcode(data) {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'wechat_qrcode', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'WECHAT_QRCODE_SUCCESS',
                payload: response.data.output,
                out_trade_no:response.data.out_trade_no
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output,
                out_trade_no:response.data.out_trade_no
            });

        } catch (error) {
            dispatch({
                type: 'WECHAT_ERROR',
                payload: error,
            });

        }
    }
}

export function deductPlatformFee(data){
    return async dispatch => {
        try {
            let response = await axios.post(Const.BASE_URL + 'wallettendeduct',data,axiosOptions(localStorage.userToken));
            dispatch({
                type:'WALLET_SUCCESS',
                payload: response.data.output
            });
            return await Promise.resolve({
                type:'success',
                payload: response.data.output
            })
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'WALLET_ERROR',
                payload: err,
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}

export function walletPay(data) {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'wechat_payment', data, axiosOptions(localStorage.userToken));

            console.log("response", response)
            dispatch({
                type: 'WECHAT_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'WECHAT_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error',
                payload: error,
            });
        }
    }
}
export function cancelsubscriptioncall(data=[]) {
    
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'subscription_cancel', data, axiosOptions(localStorage.userToken));

            // console.log("response", response)
            dispatch({
                type: 'WECHAT_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'WECHAT_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error',
                payload: error,
            });
        }
    }
}

export function refundPayment(data) {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'payment/refund', data, axiosOptions(localStorage.userToken));

            // console.log("response", response)
            dispatch({
                type: 'WECHAT_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'WECHAT_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error',
                payload: error,
            });
        }
    }
}

export function withdrawalreq(data) {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'payment/withdraw', data, axiosOptions(localStorage.userToken));

            // console.log("response", response)
            dispatch({
                type: 'WECHAT_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'WECHAT_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error',
                payload: error,
            });
        }
    }
}
export function checkopenidexists(data) {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'payment/checkopenidexists', data, axiosOptions(localStorage.userToken));

            // console.log("response", response)
            dispatch({
                type: 'WECHAT_SUCCESS',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                payload: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'WECHAT_ERROR',
                payload: error,
            });
            return await Promise.resolve({
                type: 'error',
                payload: error,
            });
        }
    }
}
export function transitionHistory() {
    return async ( dispatch ) => {
        // try {
            try {
            const response = await axios.get(Const.BASE_URL + 'transationHistory', axiosOptions(localStorage.userToken));

            // console.log("response", response)
            dispatch({
                type: 'TRANSITION_HISTORY_SUCCESS',
                payload: response.data.output,
            });
        } catch (error) {
            dispatch({
                type: 'TRANSITION_HISTORY_ERROR',
                payload: error,
            });
        }
    }
}
export function storetopupreq(data) {
    return  async dispatch => {
        // try {
            try {
            const response = await axios.post(Const.BASE_URL + 'payment_topup', data, axiosOptions(localStorage.userToken));
            dispatch({
                type: 'Top_Up',
                payload: response.data.output,
            });
            return await Promise.resolve({
                type: 'success',
                data: response.data.output,
            });
        } catch (error) {
            let err = (error.response) ? error.response.data : error;
            dispatch({
                type: 'Top_Up',
                payload: error
            });
            return await Promise.resolve({
                type: 'error',
                payload: err,
            });
        }
    }
}