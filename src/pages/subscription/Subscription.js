import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components';
import moment from 'moment';
import WalletComponents from '../wallet/WalletComponents';
import Topup from '../wallet/Topup';
import CloseIcon from '@material-ui/icons/Close';
import { Fonts, BgColor, Color } from '../../theme/index';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import QRCode from 'react-qr-code';
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { object } from 'underscore';
import { Obj } from 'prelude-ls';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
// import { Subscription } from "..";
import Const from "../../helpers/const";
import axios from "axios";
import axiosOptions from "../../helpers/axiosOptions";

import {
	Grid,
	Box,
	TextField,
	Input,
	Checkbox,
	Button,
	Card,
	Container,
	CardContent,
	Typography,
	FormControl,
} from '@material-ui/core';
import {
	getQRcode,
	walletPay,
	isUseWallet,
	cancelsubscriptioncall,
} from '../../redux/actions/paymentActions';
import { checkAuth } from '../../redux/actions/authActions';

import DefaultDateFormat from '../../helpers/DefaultDateFormat'
var timeOutId =null

const styles = makeStyles(() => ({
	container: {
		alignSelf: 'flex-end',
		paddingLeft: 250,
		paddingTop: 70,
		paddingBottom: 20,
		textAlign: 'center',
	},
	root: {
		maxWidth: 345,
		marginTop: 10,
		marginRight: 10,
	},
	media: {
		height: 140,
	},
	mainHeading: {
		fontSize: '30px',
		fontFamily: Fonts.Medium,
	},
	blueButton: {
		color: '#fff',
		height: '40px',
		borderRadius: '5px',
		backgroundColor: BgColor.myBlue,
		padding: '0 20px',
		'&:hover': {
			color: Color.textBlue,
			border: '1px solid' + Color.textBlue,
		},
	},
	orText: {
		color: Color.myBlack,
		fontSize: '18px',
		fontFamily: Fonts.Medium,
		opacity: '.5',
		justifyContent: 'space-between',
	},
	payServiceDiv: {
		width: '100%',
		padding: '0px 0px',
		borderRadius: '0',
		backgroundColor: '#ECF2FF',
		boxShadow: 'none',
		marginTop: '10px',
	},
	center: {
		display: 'inline-block',
		position: 'relative',
	},
	smallLightText: {
		color: BgColor.myBlack,
		fontSize: '14px',
		fontFamily: Fonts.Regular,
		opacity: 0.2,
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
	  whiteOutlinedButton: {
		width: '100%',
		height: '40px',
		color: Color.textBlue,
		fontFamily: Fonts.Medium,
		borderRadius: '5px',
		backgroundColor: '#fff',
		border: '2px solid ' + BgColor.myBlue,
		padding: '0 20px',
		margin: '5px 0',
	},
}));

const OpenConfirmationOverlay = ({ accepted, decline, confirmText }) => {
	const classes = styles();
	return (
		<>
			<Container maxWidth="xl" className={classes.overlayWrapper}>
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
								className={classes.mainHeading2}
								style={{ textAlign: 'center' }}
								pb={'10px'}
							>
								{confirmText}
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
						<Button className={classes.whiteOutlinedButton} onClick={accepted}>
							Yes
						</Button>
						<Button className={classes.whiteOutlinedButton} onClick={decline}>
							No
						</Button>
					</Box>
				</Card>
			</Container>
		</>
	);
};

const Subscription = () => {
	const {t , i18n} = useTranslation()
	const classes = styles();
	const history = useHistory();
	const authUser = useSelector((state) => state?.auth?.user);
	const [isOpenQr, setIsOpenQr] = React.useState(false);
	const [topup, setTopup] = useState(false);
	const [value, setValue] = useState('oneMonth');
	const [selectedSub, setSelectedSub] = useState('15');
	const [timePlan, setTimePlan] = useState(1);
	const dispatch = useDispatch();

	const [walletChecked, setWalletChecked] = React.useState(false);
	const [isClicked, setIsClicked] = React.useState(false);
	const [requestData, setRequestData] = React.useState();
	const [showConfirm, setShowConfirm] = React.useState(false);
	const [showCancelConfirm, setShowCancelConfirm] = React.useState(false);
	const [confirm, setConfirm] = React.useState(false);
	const [cancelconfirm, setcancelConfirm] = React.useState(false);
	const [tradeNumber, setTradeNumber] = React.useState(null);


	const [confirmText, setConfirmText] = React.useState(
		'Your balance is low, use direct wechat app pay or get it top-up. Otherwise balance value will get in negative.'
	);
	const [CancelconfirmText, setConfirmCancelText] = React.useState(
		t('')
	);
	const Subs = {
		1: '15',
		6: '75',
		12: '120',
	};

	const openPayCard = () => {
		if(isOpenQr == true){
			clearTimeout(timeOutId)
			setIsOpenQr(!isOpenQr);
		}
		if(isOpenQr == false){
			setIsOpenQr(!isOpenQr);
		}

	};

	const paymentQR = useSelector((store) => store.payment.qrCode);

	const handleIsWallet = (event) => {
		setWalletChecked(event.target.checked);
	};

	const decline = () => {
		setConfirm(false);
		setShowConfirm(false);
	};
	const canceldecline = () => {
		setcancelConfirm(false);
		setShowCancelConfirm(false);
	};
	const cancelaccepted = () => {
		setShowCancelConfirm(false)
		setcancelConfirm(true);
		dispatch(cancelsubscriptioncall(requestData)).then((res) => {
			if (res.type == 'success') {
				toast.success('You have successfully cancelled subscription')
				setTimeout(window.location.reload(), 3000);

			}
		});
		setShowCancelConfirm(false);
	};
	const accepted = () => {
		setShowConfirm(false)
		setConfirm(true);
		if (parseInt(authUser.balance) < parseInt(requestData.total_fee)) {
			toast.warning('YOUR WALLET IS LESS THEN YOUR DESIRE SUBSCRIPTION')
			return;
		}else{					
			if (requestData) {
				dispatch(walletPay(requestData)).then((res) => {
					if (res.type == 'success') {
						window.location.reload();
					}
				});
			}
		}
		setShowConfirm(false);
	};

	const handleChange = (event) => {
		let value = event.target.value;
		setValue(value);
		let price = 0;
		Object.keys(Subs).forEach((e, i) => {
			if (e == value) {
				price = Object.values(Subs)[i];
				setTimePlan(e);
			}
		});
		setSelectedSub(price);
	};

	const openQrCode = () => {

		if(authUser?.subscription_status == 1){
			toast.warning(t('subscription_already_active'))
			return
		}

		let data = {
			total_fee: selectedSub,
			order_type: 'Subscription-Plan',
			plan_time: timePlan,
			product_id: timePlan,
			body: 'Subscription-Plan',
			subscription_status: '1',
			buyer_id: authUser.id,
			seller_id: 0,
			is_wallet: '0',
			out_trade_no: '1625048608',
			data: `<xml> <appid>wx8b25c6e83f785918</appid> <attach>position</attach> <body>function</body> <mch_id>1568603351</mch_id> <nonce_str>xft8rvfj0n</nonce_str> <notify_url>weixin.qq.com</notify_url><out_trade_no>1625048608</out_trade_no><spbill_create_ip>14.23.150.211</spbill_create_ip> <total_fee>${selectedSub}</total_fee> <trade_type>APP</trade_type> <sign>F1529CC28F4E158FC5CDAE518E39764C</sign> </xml>`,
		};
		setIsClicked(true);
		if (walletChecked) {
			data.is_wallet = '1';
			setShowConfirm(true);
			setRequestData(data);
			return;
		}

		// dispatch(walletPay(data)).then((res) => {
		// 	if (res.type == 'success') {
		// 		dispatch(checkAuth()).then(() => {
		// 			setWalletChecked(false);
		// 			window.location.reload();
		// 		});
		// 		return;
		// 	}
		// });

		dispatch(getQRcode(data)).then((response) => {
			setIsOpenQr(true);
			if(response.type == "success"){
				startCheckPaymentStatus(response.out_trade_no)
			}	
			
		});
	};
	
	const startCheckPaymentStatus =(out_trade_no)=>{
		timeOutId = setTimeout(async ()=>{
		  try{
			const response = await axios.post(Const.BASE_URL + 'wechat_payment_status_query', {
			  out_trade_no: out_trade_no
			}, axiosOptions(localStorage.userToken));
			switch (response.data.trade_state) {
			  case 'SUCCESS':
				window.location.reload()
				//todo Write here the processing logic after the payment is successful
				break;
			  case 'NOTPAY':
				startCheckPaymentStatus(out_trade_no)
				break;
			}
		  }catch (e) {
			console.error(e)
		  }
	
		},1000)
	  }

	const cancelsubscription = () => {
		if(authUser?.subscription_status != 1){
			toast.warning('You have no subscription active')
			return
		}
		setShowCancelConfirm(true);

	}
	return (
		<>
			<Header history={history} />
			<Container maxWidth="xl" className={classes.container}>
				{isOpenQr ? (
					<>
						<Card className={styles.payCard}>
							<Box p={'0px'}>
								<Box
									style={{
										position: 'relative',
									}}
								>
									<Box
										className={styles.mainHeading2}
										style={{ textAlign: 'center' }}
									>
										Pay
									</Box>

									<CloseIcon
										style={{ color: Color.textBlue, cursor: 'pointer' }}
										className={styles.closeIcon}
										onClick={() => openPayCard()}
									/>
								</Box>
								<Card className={classes.payServiceDiv}>
									<CardContent>
										<Box
											display="flex"
											justifyContent="center"
											alignItems="center"
										>
											<Box>
												<QRCode value={paymentQR} />
											</Box>
										</Box>
										<Box>
											<Box
												className={classes.smallLightText}
												style={{ opacity: '.4' }}
											>
												Scan QR code
											</Box>
										</Box>
									</CardContent>
								</Card>
							</Box>
						</Card>
					</>
				) : (
					<>
						<Box
							flexWrap="wrap"
							p={2}
							m={0}
							bgcolor="background.paper"
							className={classes.center}
						>
							<Box
								display="flex"
								flexDirection="column"
								justifyContent="space-between"
							>
								<Typography className={classes.mainHeading} color={"primary"}>
									
									{t('subscription')}
								</Typography>
								<Card
									style={{
										maxWidth: '1000px',
										width: '1000px',
										borderRadius: '10px',
										marginTop: '10px',
										borderStyle: 'solid',
										borderWidth: '1px',
										borderColor: '#d4d4d4',
									}}
								>
									<Typography className={classes.mainHeading}>
											{authUser.subscription_status == 1
												? t('active')
												: (authUser.subscription_status == 3 ? t('cancelled'):t('inactive'))}
										</Typography>
								</Card>
								<Box style={{ marginTop: '15px' }}>
									<Typography className={classes.mainHeading}>
										{t('subscription_started')}
										{/*moment(authUser.subscription_start_date).format(
											'DD-MM-YYYY'
										)*/}
										{DefaultDateFormat(authUser.subscription_start_date)}
									</Typography>
									<Typography className={classes.mainHeading}>
										{t('next_renewal_on')}
										{/*moment(authUser.subscription_end_date).format(
											'DD-MM-YYYY'
										)*/}
										{DefaultDateFormat(authUser.subscription_end_date)}
									</Typography>
								</Box>
							</Box>

							<RadioGroup
								style={{
									maxWidth: '1000px',
									width: '1000px',
									borderRadius: '10px',
									marginTop: '10px',
									paddingTop: '10px',
									borderStyle: 'solid',
									borderWidth: '1px',
									borderColor: '#d4d4d4',
									flexDirection: 'row',
									display: 'flex',
									justifyContent: 'space-evenly',
									alignContent: 'center',
								}}
								aria-label="subs"
								name="subs"
								value={value}
								onChange={handleChange}
							>
								<FormControlLabel
									value="1"
									control={<Radio />}
									label={t('one_month')}
								/>
								<FormControlLabel
									value="6"
									control={<Radio />}
									label={t('six_month')}
								/>
								<FormControlLabel
									value="12"
									control={<Radio />}
									label={t('twelve_month')}
								/>
							</RadioGroup>
							<>
								<Box>
									<Checkbox
										style={{ color: '#5281EF' }}
										checked={walletChecked}
										onChange={handleIsWallet}
										inputProps={{ 'aria-label': 'primary checkbox' }}
									/>
									<Box className={classes.orText}>{t('use_my_wallet_balance')}</Box>
								</Box>
							</>
							<Button
								style={{ marginTop: '20px', width: '100%' }}
								variant="outlined"
								color="secondary"
								size="large"
								onClick={openQrCode}
							>
								{t('pay_rmb')} {selectedSub}
							</Button>
							{authUser.subscription_status == 1 ?
							(<Button
								style={{ marginTop: '20px', width: '100%' }}
								variant="outlined"
								color="secondary"
								size="large"
								onClick={cancelsubscription}
							>
							{t('cancel_subscription')}
							
							</Button>) : ""}
						</Box>
					</>
				)}
				{showConfirm && (
					<OpenConfirmationOverlay
						accepted={accepted}
						decline={decline}
						confirmText={confirmText}
					/>
				)}
				{showCancelConfirm && (
					<OpenConfirmationOverlay
						accepted={cancelaccepted}
						decline={canceldecline}
						confirmText={CancelconfirmText}
					/>
				)}
			</Container>
		</>
	);
};

export default Subscription;
