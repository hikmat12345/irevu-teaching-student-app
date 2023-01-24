import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useApexInfoStyles } from '@mui-treasury/styles/info/apex';
import { useGraphicBtnStyles } from '@mui-treasury/styles/button/graphic';
import { BgColor, Color, Fonts } from '../../theme/index';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
	refundPayment,

	transitionHistory,
} from '../../redux/actions/paymentActions';
import {
	deleteForumQuestion,
} from '../../redux/actions/forumActions';

import {
	Container,
	Box,
	TextField,
	Button,
	Card,
	Typography,
	CardContent,
} from '@material-ui/core';
import openSocket from 'socket.io-client';
import { SOCKET_URL } from './../../config/weChatConfig';


const socket = openSocket(SOCKET_URL);
const useStyles = makeStyles(() => ({
	mainHeading: {
		fontSize: '20px',
		fontFamily: Fonts.Medium,
		opacity: '.8',
	},
	smallestBlueTitle: {
		color: Color.textBlue,
		fontSize: '13px',
		fontFamily: Fonts.Regular,
		textTransform: 'uppercase',
	},
	smallestGrayTitle: {
		color: 'rgba(0,0,0,0.5)',
		fontSize: '13px',
		fontFamily: Fonts.Regular,
		textTransform: 'uppercase',
	},
	smallestGrayTitleLight: {
		color: 'rgba(0,0,0,0.3)',
		fontSize: '12px',
		fontFamily: Fonts.Regular,
	},
	smallText: {
		color: BgColor.myBlack,
		fontSize: '16px',
		fontFamily: Fonts.Regular,
	},
	overlayWrapper: {
		position: 'fixed',
		top: '0',
		left: '0',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100vh',
		zIndex: '2000',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	mainHeading2: {
		fontSize: '25px',
		fontFamily: Fonts.Medium,
	},
	shareCodeText: {
		color: Color.myBlack,
		fontSize: '18px',
		fontFamily: Fonts.Medium,
		textTransform: 'uppercase',
		textAlign: 'center',
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
	TextFields: {
		width: '100%',
	},
	blueButton: {
		color: '#fff',
		height: '40px',
		lineHeight: '48px',
		borderRadius: '5px',
		fontFamily: Fonts.Medium,
		cursor: 'pointer',
		textAlign: 'center',
		textTransform: 'uppercase',
		backgroundColor: BgColor.myBlue,
		border: '1px solid transparent',
		padding: '0 20px',
		'&:hover': {
			color: Color.textBlue,
			border: '1px solid' + Color.textBlue,
		},
	},
	grayLine: {
		width: '45%',
		height: '1px',
		backgroundColor: BgColor.myBlack,
		opacity: '.2',
		margin: '30px auto 0px auto',
	},
	orText: {
		color: Color.myBlack,
		fontSize: '18px',
		fontFamily: Fonts.Medium,
		opacity: '.5',
		justifyContent: 'space-between',
	},
	dateAndTime: {
		color: Color.myBlack,
		fontSize: '14px',
		fontFamily: Fonts.Medium,
		opacity: '.4',
		marginTop: '-5px',
	},
	closeIcon: {
		position: 'absolute',
		top: '0px',
		right: '5px',
		color: Color.textBlue,
		cursor: 'pointer',
		marginBottom: '-6px',
		marginLeft: '10px',
	},
}));

const WhiteCard = ({ amount, heading }) => {
	const styles = useStyles();
	return (
		<>
			<Card
				style={{
					maxWidth: '1000px',
					width: '1000px',
					borderRadius: '10px',
					cursor: 'pointer',
					marginTop: '10px',
					borderStyle: 'solid',
					borderWidth: '1px',
					borderColor: '#d4d4d4',
				}}
			>
				<Box style={{ padding: '16px' }}>
					<Box className={styles.smallestBlueTitle}>{heading}</Box>
					<Box className={styles.smallText}>&#165;{amount}</Box>
				</Box>
			</Card>
		</>
	);
};

const deductplatfromFee = (amount) => {
let a =  parseFloat(parseFloat (amount) - ((parseFloat( amount ) * 10) / 100)  );
return a.toFixed(2)
}

// const addOnePercent = (amount) => {
// 	let a =  parseFloat(parseFloat (amount) + ((parseFloat( amount ) * 1) / 100)  );
// return a.toFixed(2)
// }

const addPlatformFee = (amount) => {
	let	a = parseFloat( ((parseFloat( amount ) * 10) / 100) + parseFloat (amount) );
	return a.toFixed(2)
}

const Transactions = ({ status, date, amount, time, showTransitionDetial, order_type, buyer_id,actual_time,type,actual_amount,question_type }) => {
	const styles = useStyles();
	const {t , i18n} = useTranslation()
	useEffect(() => {
		console.log(actual_time)
	},[actual_time])
	let user = JSON.parse(localStorage.getItem('user'));
	let desc = ''
	if(order_type === "Forum"){
		if(user.id === buyer_id){
			let now = moment(new Date());
			let end = moment(actual_time);
			let duration = moment.duration(now.diff(end));
			let mins= duration.asMinutes()
			desc = t('question_asked_on_forum')
			console.log("this is time=====",mins)
			if(status === "pending" && mins > 1 ){
				status = "failed"
				
			}
			if(type !== 'wechatQRCode' && actual_amount === 0){
				amount = addPlatformFee(amount);
			}
			
		}else{
			if(actual_amount !== 0){
				amount = actual_amount
			}
			desc = t('paid_for_answering_a_question')
		}
	}else if(order_type === "withdraw"){
		desc = t('payment_withdraw')
	}else if(order_type === "Top-up"){
		console.log(time)
		let now = moment(new Date());
    let end = moment(actual_time);
    let duration = moment.duration(now.diff(end));
    let mins= duration.asMinutes()
		desc = t('payment_added')
		console.log("this is time=====",mins)
		if(status === "pending" && mins > 1 ){
			status = "failed"
			desc = t('failed_to_add_payment')
		}
		
	}else if(order_type === "Resources" || order_type === "Lesson-Plan"){
		let now = moment(new Date());
		let end = moment(actual_time);
		let duration = moment.duration(now.diff(end));
		let mins= duration.asMinutes()
		if(status === "pending" && mins > 1 ){
			status = "failed"
			
		}
		
		if(user.id === buyer_id){
		
			order_type === "Resources" ?	desc = t('buying_resource_material'): desc = t("buying_lesson_plan")
			console.log("this is time=====",mins)
		
			if(type !== 'wechatQRCode' ){
				amount = addPlatformFee(amount)
			}
			
		}else{
			order_type === "Resources" ?	desc = t('user_bought_resource'): desc = t("user_bought_lesson_plan")
			amount = actual_amount

		}
		
	}

	return (
		<>
			<Card
				style={{
					maxWidth: '1000px',
					width: '1000px',
					borderRadius: '10px',
					cursor: 'pointer',
					marginTop: '10px',
					borderStyle: 'solid',
					borderWidth: '1px',
					borderColor: '#d4d4d4',
				}}
				onClick={showTransitionDetial}
			>
				<Box style={{ padding: '16px' }}>
					<Box className={styles.smallestGrayTitle}>{status}</Box>
					<Box >{desc}</Box>
					<Box className={styles.smallText}>&#165;{amount}</Box>
					<Box className={styles.smallestGrayTitleLight}>
						{time} - {date}
					</Box>
				</Box>
			</Card>
		</>
	);
};

const TransactionDetails = ({
	openEnrollingStudent,
	amountForRefund,
	actual_amount,
	transition,
	type,
	time,
	date,
	showTransitionDetial,
	order_type,
	actual_time,
	buyer_id,
	status
}) => {
	const styles = useStyles();
	const btnStyles = useGraphicBtnStyles();
	const authUser = useSelector((store) => store.auth.user);
	const dispatch = useDispatch();
	const {t , i18n} = useTranslation()

	const refund = () => {
		let data = {
			total_fee: transition.total_fee,
			order_type: 'Top-up',
			product_id: transition.product_id,
			body: transition.body,
			buyer_id: transition.buyer_id,
			seller_id: transition.seller_id,
			is_wallet : '0',
			out_trade_no : transition.out_trade_no,
			data : `<xml> <appid>wx8b25c6e83f785918</appid> <attach>position</attach> <body>function</body> <mch_id>1568603351</mch_id> <nonce_str>xft8rvfj0n</nonce_str> <notify_url>weixin.qq.com</notify_url><out_trade_no>1625048608</out_trade_no><spbill_create_ip>14.23.150.211</spbill_create_ip> <total_fee>${transition.total_fee}</total_fee> <trade_type>APP</trade_type> <sign>F1529CC28F4E158FC5CDAE518E39764C</sign> </xml>`
		};
		dispatch(refundPayment(data)).then(res => {
			if (res.type == 'success') {
				// dispatch(deleteForumQuestion(transition.product_id)).then(resp => {
				// 	if (resp.type == 'success') {
				// 		toast.success("Refunded Successfully");
				// 	}else{
				// 		toast.warning(res.payload.response.data.error);
				// 	}
				// })
				let socketData = {
		            type:"all",
		            id:authUser.id,
		            for : authUser.user_type==1 ? 'teacher' : 'student',
		            message : "You have sent refund request"
		         }
		        socket.emit('send_notification',socketData)
				toast.success("Refunded Request sent Successfully");
				dispatch(transitionHistory());
				showTransitionDetial()
			}else{
				if (res.payload.response.data.error) {
					toast.warning(res.payload.response.data.error, ' Check again after 30 min');
					return
				}
				toast.warning("Server Error");
			}
		});
	};
	let user = JSON.parse(localStorage.getItem('user'));
	let desc = ''
	if(order_type === "Forum"){
		if(user.id === buyer_id){
			let now = moment(new Date());
			let end = moment(actual_time);
			let duration = moment.duration(now.diff(end));
			let mins= duration.asMinutes()
			desc = t('question_asked_on_forum')
			console.log("this is time=====",mins)
			if(status === "pending" && mins > 1 ){
				status = "failed"
				
			}
			if(type !== 'wechatQRCode' && actual_amount === 0){
				amountForRefund = addPlatformFee(amountForRefund);
			}
			
		}else{
			if(actual_amount !== 0){
				amountForRefund = actual_amount
			}
			desc = t('paid_for_answering_a_question')
		}
	}else if(order_type === "withdraw"){
		desc = t('payment_withdraw')
	}else if(order_type === "Top-up"){
		console.log(time)
		let now = moment(new Date());
    let end = moment(actual_time);
    let duration = moment.duration(now.diff(end));
    let mins= duration.asMinutes()
		desc = t('payment_added')
		console.log("this is time=====",mins)
		if(status === "pending" && mins > 1 ){
			status = "failed"
			desc = t('failed_to_add_payment')
		}
		
	}else if(order_type === "Resources" || order_type === "Lesson-Plan"){
		let now = moment(new Date());
		let end = moment(actual_time);
		let duration = moment.duration(now.diff(end));
		let mins= duration.asMinutes()
		if(status === "pending" && mins > 1 ){
			status = "failed"
			
		}
		
		if(user.id === buyer_id){
		
			order_type === "Resources" ?	desc = t('buying_resource_material'): desc = t("buying_lesson_plan")
			console.log("this is time=====",mins)
		
			if(type !== 'wechatQRCode' ){
				amountForRefund = addPlatformFee(amountForRefund)
			}
			
		}else{
			order_type === "Resources" ?	desc = t('user_bought_resource'): desc = t("user_bought_lesson_plan")
			amountForRefund = actual_amount

		}
	}

	// let startTime = moment(transition.created_at).format('d-m-y HH:mm:ss');
	// let endTime = moment(moment()).format('d-m-y HH:mm:ss');
	// let mints = moment.utc(endTime, 'd-m-y HH:mm:ss')
	// .diff(moment.utc(startTime, 'd-m-y HH:mm:ss'), 'minutes')

	return (
		<Container maxWidth="xl" className={styles.overlayWrapper}>
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
				<Box
					style={{
						padding: '20px',
					}}
				>
					<Box
						style={{
							position: 'relative',
						}}
					>
						<Box
							className={styles.mainHeading2}
							style={{ textAlign: 'center' }}
						>
							{t('transaction')}
						</Box>
						<Box className={styles.dateAndTime} style={{ textAlign: 'center' }}>
							{time} - {date}
						</Box>
						<CloseIcon
							color={Color.primary}
							className={styles.closeIcon}
							onClick={showTransitionDetial}
						/>
					</Box>

					<Card
						style={{
							width: '100%',
							padding: '0px 0px',
							borderRadius: '10px',
							backgroundColor: '#E9EFFD',
							marginTop: '10px',
							borderStyle: 'solid',
							borderWidth: '1px',
							borderColor: '#d4d4d4',
						}}
					>
						<CardContent style={{ padding: '16px' }}>
							<Box
								display="flex"
								flexDirection="column"
							>
								<Box className={styles.smallestBlueTitle}>{t('order_type')}</Box>
								<Box className={styles.smallText}>{transition.order_type}</Box>
							</Box>
						</CardContent>
					</Card>

					<Box className={styles.grayLine}></Box>
					<Box
						display="flex"
						justifyContent="space-around"
						alignItems="center"
						flexDirection="column"
						style={{ padding: '30px 0 20px 0' }}
					>
						<Box className={styles.orText}>{t('Description')}</Box>
								<Box className={styles.smallText}>{desc}</Box>
						<Box className={styles.orText}>{t('balance')}</Box>
						<Box className={styles.shareCodeText}>&#165;{amountForRefund}</Box>
					</Box>
				</Box>
				{transition.order_type == 'Forum' && !transition.is_refund_request ?
				<Button
					className={styles.blueButton}
					style={{ width: '100%', height: 'unset', borderRadius: '0px' }}
					onClick={transition.is_refund_request ? '' : refund}
				>
					{transition.is_refund_request ?  "Requested for refund" :"Request Refund" }
				</Button>
				: ''}
			</Card>
		</Container>
	);
};

const MainComponent = ({ amount, heading, transactionHistory }) => {
	const styles = useStyles();
	const [transitionDetial, setTransitionDetial] = useState();

	const showDetail = (transaction = "") => {
		setTransitionDetial(transaction);
	};
	const closeDetail = () => {
		setTransitionDetial(null);
	};
const {t , i18n} = useTranslation()
	return (
		<>
			<WhiteCard amount={amount} heading={heading} />
			<Box
				className={styles.mainHeading}
				lineHeight={'15px'}
				p={'30px 0px 20px 0'}
				// mt={"20px"}
			>
				{t('transactions')}
			</Box>
			{!transactionHistory ? (
				<Box
					className={styles.mainHeading}
					lineHeight={'15px'}
					p={'30px 0px 20px 0'}
					// mt={"20px"}
				>
					No transactions available
				</Box>
			) : (
				<>
					{transactionHistory.map((trs, i) => {
						return (
							<Transactions
								status={trs.status}
								date={moment(trs.created_at).format('D/MM/Y')}
								time={moment(trs.created_at).format('hh:mm A')}
								order_type = {trs.order_type}
								buyer_id = {trs.buyer_id}
								amount={trs.total_fee}
								question_type={trs.question_type ? trs.question_type: null}
								actual_amount={trs.actual_fee ? trs.actual_fee : 0}
								key={i}
								actual_time= {trs.created_at}
								type = {trs.type}
								showTransitionDetial={() => showDetail(trs)}
							/>
						);
					})}
				</>
			)}

			 {transitionDetial != null && transitionDetial != "" ? (
				<TransactionDetails
					amountForRefund={transitionDetial?.total_fee}
					actual_amount = {transitionDetial ?. actual_fee ? transitionDetial.actual_fee : 0}
					date={moment(transitionDetial?.created_at).format('D/MSM/Y')}
					time={moment(transitionDetial?.created_at).format('hh:mm A')}
					transition={transitionDetial}
					type = {transitionDetial.type}
					order_type = {transitionDetial.order_type}
					showTransitionDetial={closeDetail}
					actual_time= {transitionDetial.created_at}
					buyer_id = {transitionDetial.buyer_id}
					status={transitionDetial.status}
				/>
			) : (
				""
			)} 
		</>
	);
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
	const authUser = useSelector((store) => store.auth.user);
	const transactionHistory = useSelector(
		(store) => store.payment.transactionHistory
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(transitionHistory());
	}, []);
const {t , i18n} = useTranslation()
	return (
		<>
			{/* <WhiteCard heading={"Balance"} amount={"124,754"} /> */}
			<MainComponent
				heading={t('balance')}
				amount={authUser.balance}
				transactionHistory={transactionHistory}
			/>
		</>
	);
});
export default TeamCardDemo;
