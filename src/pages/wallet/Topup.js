import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { BgColor, Color, Fonts } from "../../theme/index";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  Box,
  TextField,
  Button,
  Card,
  Container,
  Typography,
  CardContent,
  FormControl,
} from "@material-ui/core";
import { checkAuth } from "../../redux/actions/authActions"
import { walletPay , getQRcode ,storetopupreq} from "../../redux/actions/paymentActions"
import axios from "axios";
import axiosOptions from "../../helpers/axiosOptions";
import Const from '../../helpers/const'
import QRCode from "react-qr-code";
import openSocket from 'socket.io-client';
import { SOCKET_URL } from './../../config/weChatConfig';


const socket = openSocket(SOCKET_URL);
const useStyles = makeStyles(() => ({
  mainHeading: {
    fontSize: "20px",
    fontFamily: Fonts.Medium,
    opacity: ".8",
  },
  smallestBlueTitle: {
    color: Color.textBlue,
    fontSize: "13px",
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
  },
  smallText: {
    color: BgColor.myBlack,
    fontSize: "16px",
    fontFamily: Fonts.Regular,
  },
  overlayWrapper: {
    position: "fixed",
    top: "0",
    left: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    zIndex: "2000",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mainHeading2: {
    fontSize: "25px",
    fontFamily: Fonts.Medium,
  },
  shareCodeText: {
    color: Color.myBlack,
    fontSize: "18px",
    fontFamily: Fonts.Medium,
    textTransform: "uppercase",
    textAlign: "center",
  },
  whiteOutlinedButton: {
    width: "100%",
    height: "40px",
    color: Color.textBlue,
    fontFamily: Fonts.Medium,
    borderRadius: "5px",
    backgroundColor: "#fff",
    border: "2px solid " + BgColor.myBlue,
    padding: "0 20px",
    margin: "5px 0",
  },
  TextFields: {
    width: "100%",
  },
  blueButton: {
    color: "#fff",
    height: "40px",
    lineHeight: "48px",
    borderRadius: "5px",
    fontFamily: Fonts.Medium,
    cursor: "pointer",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: BgColor.myBlue,
    padding: "0 20px",
    "&:hover": {
      color: Color.textBlue,
      border: "1px solid" + Color.textBlue,
    },
  },
}));

const WhiteCard = ({ label, setAmount }) => {
  const styles = useStyles();

  return (
    <>
      <Card
        style={{
          maxWidth: "600px",
          width: "600px",
          borderRadius: "10px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        <Box style={{ padding: "26px" }}>
          {/* <Box className={styles.smallestBlueTitle}>{heading}</Box> */}
          {/* <Box className={styles.smallText}>{textContent}asdf</Box> */}
          <TextField
            id="outlined-basic"
            label={label}
            type={'number'}
            onChange={(evt) => setAmount(evt)}
            variant="outlined"
            className={styles.TextFields}
          />
        </Box>
      </Card>
    </>
  );
};

const MainComponent = ({ label, closeTopUp }) => {
  const styles = useStyles();

  const authUser = useSelector((store) => store.auth.user);
  const [topUpAmount, setTopUpAmount] = useState(0)

  const dispatch = useDispatch()
  const [isOpenQr, setIsOpenQr] = React.useState(false);
  const paymentQR = useSelector((store) => store.payment.qrCode)
  const handleAmount = (amount) => {
    setTopUpAmount(amount.target.value)
  }
  
  const handleTopUp = () => {

    let data = {
      total_fee : topUpAmount,
      order_type : "Top-up",
      product_id : 77,
      body : "Top-up",
      buyer_id : authUser.id,
      seller_id : null,
      is_wallet : '0',
      out_trade_no : '1625048608',
      data : `<xml> <appid>wx8b25c6e83f785918</appid> <attach>position</attach> <body>function</body> <mch_id>1568603351</mch_id> <nonce_str>xft8rvfj0n</nonce_str> <notify_url>weixin.qq.com</notify_url><out_trade_no>1625048608</out_trade_no><spbill_create_ip>14.23.150.211</spbill_create_ip> <total_fee>${topUpAmount}</total_fee> <trade_type>APP</trade_type> <sign>F1529CC28F4E158FC5CDAE518E39764C</sign> </xml>`
    }

    // dispatch(walletPay(data)).then((res) => {
    //   if (res.type == 'success') {   
    //     dispatch(checkAuth()).then((resp) => {
    //       if (resp.type == 'success') {
    //         if (res.type == 'success') {
    //             dispatch(getQRcode(data));
    //           } else if (res.type == 'error') {
    //             toast.error(res.payload.error);
    //           } else {
    //             toast.error('Internal server error.');
    //         }
    //         toast.success("Top-up successfully")
    //         closeTopUp()
    //       }
    //     })
    //   }else {
    //     toast.success("Top-up failed")
    //   }
    // })
    dispatch(getQRcode(data))
    .then( (res) => {
      console.log('Qr Code Result'+res)
      startCheckPaymentStatus(res.out_trade_no)
      setIsOpenQr(true)
    })
    
  }
  let timeOutId =null
  const startCheckPaymentStatus =(outTradeNo)=>{
    timeOutId = setTimeout(async ()=>{
      try{
        // debugger
        const response = await axios.post(Const.BASE_URL + 'wechat_payment_status_query', {
          out_trade_no:outTradeNo
        }, axiosOptions(localStorage.userToken));
        switch (response.data.trade_state) {
          case 'SUCCESS':
            topuprequest()
            break;
          case 'paid':
            topuprequest()
            break;
          case 'NOTPAY':
            startCheckPaymentStatus(outTradeNo)
            // topuprequest()
            break;
          default :
            stopCheckPaymentStatus()
            setIsOpenQr(false)
            closeTopUp()
            toast.error("Top-up failed")
            break;
        }
      }catch (e) {
        console.error(e)
      }

    },2000)
  }
  const stopCheckPaymentStatus = ()=>{
    clearTimeout(timeOutId)
  }
  const topuprequest=()=>{
    let formdata = {
      total_fee : topUpAmount,
    }
    dispatch(storetopupreq(formdata))
      .then( (res) => {
        if (res.type == 'success') {
          toast.success("Top-up successfully")
          let socketData = {
            type:"all",
            id:authUser.id,
            for : authUser.user_type==1 ? 'teacher' : 'student',
            message : "You have completed Topup Request"
          }
          socket.emit('send_notification',socketData)
          dispatch(checkAuth())
          setTimeout(() => {
            window.location.reload();
          },1000)
        }
        else{
          toast.error("Top-up failed")
          stopCheckPaymentStatus()
          setIsOpenQr(false)
          closeTopUp()
        }
    })
  }
  const {t , i18n} = useTranslation()
  return (
    <>
      {/* <WhiteCard label={"Credit Card Number"} />
      <WhiteCard label={"Name"} />
      <WhiteCard label={"CCV"} />
      <WhiteCard label={"Country"} />
      <WhiteCard label={"Expiry"} /> */}
      <WhiteCard label={t("topup_amount_capital")} setAmount={handleAmount} />
      <Box
        style={{
          maxWidth: "600px",
          width: "600px",
          marginTop: "10px",
        }}
      >
        <Button
          style={{
            padding: "20px",
            marginTop: "50px",
          }}
          className={styles.blueButton}
          style={{ width: "100%", height: "unset" }}
          onClick={()=>handleTopUp()}
        >
          {t("top_up")}
        </Button>
      </Box>
      {
      (isOpenQr) ? (<>
            <Card className={styles.payServiceDiv}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box style={{
                          marginLeft: "140px",
                    }}>
                    <QRCode value={ paymentQR } />
                  </Box>
                </Box>
                <Box>
                  <Box
                    className={styles.smallLightText}
                    style={{ opacity: ".4" }}
                  >
                    Scan QR code
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </>) : null}
    </>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  return (
    <>
      <MainComponent closeTopUp={props.closeTopUp} />
    </>
  );
});
export default TeamCardDemo;
