import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { Fonts, BgColor, Color } from "../../theme/index";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import QRCode from "react-qr-code";

import { isUseWallet,getQRcode } from "../../redux/actions/paymentActions"
import Const from "../../helpers/const";
import axios from "axios";
import axiosOptions from "../../helpers/axiosOptions";
import openSocket from 'socket.io-client';
import { useHistory } from "react-router-dom";
import { SOCKET_URL } from './../../config/weChatConfig';

const socket = openSocket(SOCKET_URL);

const useStyles = makeStyles({
  card: {
    width: "100%",
    zIndex: 1,
    position: "relative",
    borderRadius: "10px",
    // boxShadow: "0 6px 20px 0 #dbdbe8",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    backgroundColor: "#fff",
    transition: "0.3s",
    // height: "100%",
    padding: "16px",
    paddingRight: "0",

    "&:hover": {
      // boxShadow: "none !important",
      // border: "0 !important",
    },
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: "0.75rem",
  },
  avatar: {
    fontSize: "0.875rem",
    backgroundColor: "#6d7efc",
  },
  join: {
    color: "#fff",
    borderRadius: "50px",
    // backgroundColor: "#a4c4f9",
    backgroundColor: BgColor.myBlue,
    // background: "linear-gradient(to top, #638ef0, #82e7fe)",
    "& > *": {
      textTransform: "none !important",
    },
    "&:hover": {
      backgroundColor: "#689CF2",
    },
  },
  danger: {
    color: "#fff",
    fontSize: "14px",
    fontFamily: Fonts.Regular,
    borderRadius: "50px",
    backgroundColor: "#F48FB1",
    "& > *": {
      textTransform: "none !important",
    },
    "&:hover": {
      backgroundColor: "#ff266f",
    },
  },
  profileImg: {
    width: "50px",
    height: "50px",
    borderRadius: "50px",
  },
  table: {
    maxWidth: "600px",
    fontFamily: Fonts.Regular,
    "& tr th": {
      fontSize: "18px",
      padding: "20px 0",
    },
    "& tr td": {
      fontSize: "14px",
      opacity: ".8",
    },
    marginTop: "20px",
    textAlign: "left",
  },
  LightText: {
    color: BgColor.myBlack,
    fontSize: "14px",
    fontFamily: Fonts.Medium,
    opacity: 0.25,
  },
  mainHeading2: {
    fontSize: "25px",
    fontFamily: Fonts.Medium,
  },
  blueButton: {
    color: "#fff",
    height: "40px",
    lineHeight: "40px",
    borderRadius: "5px",
    fontFamily: Fonts.Medium,
    cursor: "pointer",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: BgColor.myBlue,
    padding: "0 20px",
    "&:hover": {
      opacity: 0.5,
    },
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
  cross: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  grayLine: {
    width: "100%",
    height: "1px",
    backgroundColor: BgColor.myBlack,
    opacity: ".2",
    margin: "0 10px",
  },
  orText: {
    color: Color.myBlack,
    fontSize: "18px",
    fontFamily: Fonts.Medium,
    opacity: ".5",
    justifyContent: "space-between",
  },
  shareCodeText: {
    color: Color.myBlack,
    fontSize: "18px",
    fontFamily: Fonts.Medium,
    textTransform: "uppercase",
    textAlign: "center",
  },
  root: {
    padding: "10px",
    borderRadius: "10px",
    marginRight: "15px",
  },
  media: {
    height: 140,
  },
  info: {
    color: "#2B65EC",
    textTransform: "initial",
    fontFamily: Fonts.Regular,
  },
  smallLightText: {
    color: BgColor.myBlack,
    fontSize: "14px",
    fontFamily: Fonts.Regular,
    opacity: 0.2,
  },
  regularFont: {
    fontFamily: Fonts.Regular,
  },
  form: {
    display: "flex",

    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: "0px",
    right: "15px",
    color: Color.textMyBlack,
    cursor: "pointer",
    marginBottom: "-6px",
    marginLeft: "10px",
  },
  payCard: {
    maxWidth: "600px",
    width: "600px",
    padding: "20px 0",
    borderRadius: "10px",
    marginTop: "10px",
  },
  payServiceDiv: {
    width: "100%",
    padding: "0px 0px",
    borderRadius: "0",
    backgroundColor: "#ECF2FF",
    boxShadow: "none",
    marginTop: "10px",
  },
  totalPriceDiv: {
    width: "100%",
    padding: "0px 0px",
    borderRadius: "0",
    backgroundColor: "#DBE6FF",
    boxShadow: "none",
  },
});

const PayCardDiv = ({ plan, authUser, openPayCard, submitForumQuestion, formData }) => {
  
  const styles = useStyles();
  const [useWallet, setUseWallet] = React.useState(false);
  const dispatch = useDispatch();
  const [isOpenQr, setIsOpenQr] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  const [cost,setCost] = React.useState('');
  const [p, setP] = React.useState('')
  let user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const {paymentQR,outTradeNo} = useSelector((store) => {
    return {
      paymentQR:store.payment.qrCode,
      outTradeNo:store.payment.outTradeNo
    }
  })
  const isUsingWallet = useSelector((store) => store.payment.isUsingWallet)
  const handleChange = (event) => {
    setUseWallet(event.target.checked);
    console.log("event.target.checked ===> ", event.target.checked)
    dispatch(isUseWallet(event.target.checked));
  };

  useEffect(() => {
    console.log("wallet========>", isUsingWallet)
    plan.question_category!=='academic_english' ? total(): total1();
    platformFee();
  }, [isUsingWallet])

  const total = () => {
    console.log("testing")
    const t = parseFloat(((parseFloat( plan.price ) * 10) / 100) + parseFloat( plan.price ));
    setCost(t.toFixed(2));
    return t.toFixed(2)

  }
 const total1 = () => {
    const q =parseFloat(parseFloat( plan.price ));
    setCost(q)
  }
  const platformFee = () => {
    const r = parseFloat(((parseFloat( plan.price ) * 10) / 100));
     setP(r.toFixed(2));
  }
 
  const clickOpenQrCode = () => {
    console.log(authUser);
    
    setIsClicked(true)
    submitForumQuestion((res) => {
    })

    if (paymentQR) {
      setIsOpenQr(true)
    }
  }



  useEffect(() => {
    console.log("again & again")
    if (paymentQR != "" && paymentQR != null && paymentQR.length > 1) {
      setIsOpenQr(true)
      startCheckPaymentStatus()
    }else{
      setIsOpenQr(false)
      stopCheckPaymentStatus()
    }
  }, [paymentQR])

  let timeOutId =null
  const startCheckPaymentStatus =()=>{
    timeOutId = setTimeout(async ()=>{
      try{
        
        const response = await axios.post(Const.BASE_URL + 'wechat_payment_status_query', {
          out_trade_no:outTradeNo
        }, axiosOptions(localStorage.userToken));
        if(response.data.trade_state == 'SUCCESS') {
            socket.emit('send_notification',{
              id: authUser.id,
              type:"all",
              for : plan.ask_whom,
              message : authUser.username+' Your question '+ plan.question_category +' posted successfully',
              receiverMsg : plan.question_category=="academic_english" ? "You have a new Academic English Question" : "You have a new question"
            })
        }
        switch (response.data.trade_state) {
          case 'SUCCESS':
            history.push("/forum",{
              step:1
            });
            //todo Write here the processing logic after the payment is successful
            break;
          case 'NOTPAY':
            startCheckPaymentStatus()
            break;
        }
      }catch (e) {
        console.error(e)
      }

    },1000)
  }

  const stopCheckPaymentStatus = ()=>{
    clearTimeout(timeOutId)
  }

  return (
    <Card className={styles.payCard}>
      <Box p={"0px"}>
        <Box
          style={{
            position: "relative",
          }}
        >
          <Box className={styles.mainHeading2} style={{ textAlign: "center" }}>
            Pay
          </Box>

          <CloseIcon
            style={{ color: Color.textBlue, cursor: "pointer" }}
            className={styles.closeIcon}
            onClick={openPayCard}
          />
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
          </>) : (<>
            <Card className={styles.payServiceDiv}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Box className={styles.smallestBlueTitle}>Service</Box>
                    <Box className={styles.smallText}>Forum Questions - {plan.title}</Box>
                    {plan.question_category!='academic_english' ? (
                    <Box className={styles.smallText} style={{ marginTop: "20px"}}>10% platform fee</Box>) : ''}
                 
                  </Box>
                  <Box style={{ textAlign: "right" }}>
                    <Box className={styles.smallestBlueTitle}>Cost</Box>
                    <Box className={styles.smallText}> { plan ? plan.price : 0} RMB</Box>
                      {plan.question_category!='academic_english' ? (
                    <Box className={styles.smallText} style={{ marginTop: "20px"}}>{ plan ? p : 0} RMB 
                     </Box>)
                     : ''}
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card className={styles.totalPriceDiv}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Box className={styles.smallestBlueTitle}>Total</Box>
                  </Box>
                  <Box>
                  {plan.question_category!='academic_english' ? (
                    <Box className={styles.smallText}>{cost} RMB</Box>):

                     <Box className={styles.smallText}>{cost} RMB</Box>}
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ padding: "20px 0" }}
            >
              <Box className={styles.orText}>Use my wallet balance</Box>
              <Box>
                <Checkbox
                  style={{ color: "#5281EF" }}
                  checked={useWallet}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Box>
            </Box>
          </>)
        }
      </Box>

      {
        (isOpenQr) ? ('') : (<>
          <Box
            className={styles.blueButton}
            style={{
              width: "80%",
              margin: "0 auto",
              backgroundColor: isClicked ? "#616161": "#5281EF",
            }}
            disabled={ isClicked ? true : false }
            onClick={() => isClicked ? {} : clickOpenQrCode()}
          >
            {/* Use WeChat Pay */}
            Pay
          </Box>
        </>)
      }

    </Card>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  return (
    <PayCardDiv
      plan={props.plan}
      authUser={props.authUser}
      openPayCard={props.openPayCard}
      submitForumQuestion={props.submitForumQuestion}    />
  );
});
export default TeamCardDemo;
