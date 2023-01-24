import React from "react";
import { useSelector, useDispatch } from "react-redux";

// import Box from "@material-ui/core/Box";
// import Card from "@material-ui/core/Card";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
// import CardContent from "@material-ui/core/CardContent";
import { Fonts, BgColor, Color } from "../../theme/index";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import QRCode from "react-qr-code";
import Const from '../../helpers/const'
import {
	Grid,
	Box,
	TextField,
	Input,
	Button,
	Card,
	Container,
	CardContent,
	Typography,
	FormControl,
} from '@material-ui/core';
import { checkAuth } from "../../redux/actions/authActions"
import { getQRcode, walletPay, isUseWallet,deductPlatformFee } from "../../redux/actions/paymentActions"
import { DataUsageTwoTone } from "@material-ui/icons";
import axios from "axios";
import axiosOptions from "../../helpers/axiosOptions";
import openSocket from 'socket.io-client';
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

const OpenConfirmationOverlay = ({ accepted, decline, confirmText }) => {
	const styles = useStyles();
	return (
		<>
			<Container maxWidth="xl" className={styles.overlayWrapper}>
				<Card
					style={{
						maxWidth: '600px',
						width: '600px',
						borderRadius: '10px',
						marginTop: '10px',
					}}
				>
					<Box p={'20px'}>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Box></Box>
							<Box
								className={styles.mainHeading2}
								style={{ textAlign: 'center' }}
								pb={'10px'}
							>
								Wallet Balance is low
							</Box>
							<CloseIcon
								style={{
									color: Color.textBlue,
									cursor: 'pointer',
									marginTop: '-10px',
								}}
								onClick={decline}
							/>
						</Box>
						<Button className={styles.whiteOutlinedButton} style={{backgroundColor: Color.textBlue}}onClick={accepted}>
            Pay with QR Code
						</Button>
						{/* <Button className={styles.whiteOutlinedButton} onClick={decline}>
							No
						</Button> */}
					</Box>
				</Card>
			</Container>
		</>
	);
};

const PayCardDiv = ({ plan, authUser, openPayCard }) => {
  const styles = useStyles();
  const btnStyles = useGraphicBtnStyles();
  const [walletChecked, setWalletChecked] = React.useState(false);
  const dispatch = useDispatch();
  const [isOpenQr, setIsOpenQr] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);

  const paymentQR = useSelector((store) => store.payment.qrCode)

  const handleChange = (event) => {
    setWalletChecked(event.target.checked);
  };
  
  const total = () => {
    return parseFloat( ((parseFloat( plan.price ) * 10) / 100) + parseFloat (plan.price) );
  }

  const getplatformFee = () => {
    return parseFloat(((parseFloat( plan.price ) * 10) / 100));
  }

  const deductTenPercent = () =>{
    let a =  parseFloat(parseFloat (plan.price) - ((parseFloat( plan.price ) * 10) / 100)  );
    return a.toFixed(2)
  }

  

  const [requestData, setRequestData] = React.useState();
	const [showConfirm, setShowConfirm] = React.useState(false);
	const [confirm, setConfirm] = React.useState(false);
	const [confirmText, setConfirmText] = React.useState(
		'Your balance is low, use direct wechat app pay or get it top-up. Otherwise balance value will get in negative.'
	);

	const decline = () => {
		setConfirm(false);
    setShowConfirm(false);

	};

	const accepted = () => {
    setConfirm(true);
    if (requestData) {
      dispatch(getQRcode(requestData)).then( (res) => {
        startCheckPaymentStatus(res.out_trade_no)
        setIsOpenQr(true)
      } )
    }
    setShowConfirm(false);
	};

  const openQrCode = () => {
    // alert("sfjdkaksjdfl")
    let data = {
      total_fee : parseFloat(plan.price),
      actual_fee: deductTenPercent(),
      order_type : "Lesson-Plan",
      product_id : plan.id,
      body : "Lesson-Plan",
      buyer_id : authUser.id,
      seller_id : plan.created_by,
      is_wallet : '0',
      out_trade_no : '1625048608',
      data: `<xml> <appid>wx8b25c6e83f785918</appid> <attach>position</attach> <body>function</body> <mch_id>1568603351</mch_id> <nonce_str>xft8rvfj0n</nonce_str> <notify_url>weixin.qq.com</notify_url><out_trade_no>1625048608</out_trade_no><spbill_create_ip>14.23.150.211</spbill_create_ip> <total_fee>${total()}</total_fee> <trade_type>APP</trade_type> <sign>F1529CC28F4E158FC5CDAE518E39764C</sign> </xml>`     
    }
    setIsClicked(true)
    if (walletChecked) {
      data.is_wallet = '1';

      if (authUser.balance < data.total_fee) {
        data.total_fee = total();
        setRequestData(data)
        setShowConfirm(true);
        return
      }
      
      let d = {
        total_fee : getplatformFee()
      }

      dispatch(deductPlatformFee(d)).then((res) => {
        if(res.type === 'success'){

          dispatch(walletPay(data)).then((res) => {
            if (res.type == 'success') {
              dispatch(checkAuth()).then(() => {
                setWalletChecked(false)
                sampledownload()
                // window.location.reload();
              })
              return
            }
          });
        }
      })


      return
    }
    data.total_fee = total();
    dispatch(getQRcode(data)).then( (res) => {
      startCheckPaymentStatus(res.out_trade_no)
      setIsOpenQr(true)
    } )
  }
  let timeOutId =null
  const startCheckPaymentStatus =(outTradeNo)=>{
    timeOutId = setTimeout(async ()=>{
      try{
        // debugger
        const response = await axios.post(Const.BASE_URL + 'wechat_payment_status_query', {
          out_trade_no:outTradeNo
        }, axiosOptions(localStorage.userToken));
        console.log(response.data.trade_state)
        switch (response.data.trade_state) {
          case 'SUCCESS':
            sampledownload()
            break;
          case 'paid':
            sampledownload()
              // window.location.reload()
            //todo Write here the processing logic after the payment is successful
            break;
          case 'NOTPAY':
            startCheckPaymentStatus(outTradeNo)
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
  const sampledownload =() =>{
    let downloadurl=Const.BASE_URL+"resource/sampledownload?filename="+plan.plan+"&page_limit_no=-1"+'&pdftype=full&type=lessonplan&module_id='+plan.id+'&to='+plan.created_by+'&from='+authUser.id
    window.open(downloadurl, "_blank");
    let lessonData = {
      id:plan.created_by,
      for : 'teacher',
      message : authUser.username+' Your Lesson Plan downloaded successfully',
      receiverMsg : "Lesson Plan file downloaded"
    }
    socket.emit('send_notification',lessonData)
    setTimeout(window.location.reload(),2000)
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
            onClick={() => openPayCard()}
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
                    <Box className={styles.smallText}>Lesson Plan - {plan.title}</Box>
                    <Box
                      className={styles.smallLightText}
                      style={{ opacity: ".4" }}
                    >
                      (plus 10% platform fee)
                    </Box>
                  </Box>
                  <Box style={{ textAlign: "right" }}>
                    <Box className={styles.smallestBlueTitle}>Cost</Box>
                    <Box className={styles.smallText}> { plan ? plan.price : 0} RMB</Box>
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
                    <Box className={styles.smallText}>{total()} RMB</Box>
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
                  checked={walletChecked}
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
            onClick={() => isClicked ? {} : openQrCode()}
          >
            {/* Use WeChat Pay */}
            Pay
          </Box>
        </>)
      }

      {showConfirm && (
        <OpenConfirmationOverlay accepted={accepted} decline={decline} confirmText={confirmText} />
      )}

    </Card>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  return (
    <PayCardDiv
      plan={props.plan}
      authUser={props.authUser}
      openPayCard={props.openPayCard}    />
  );
});
export default TeamCardDemo;
