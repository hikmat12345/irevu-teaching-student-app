import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SchoolIcon from '@material-ui/icons/School';
import { makeStyles } from '@material-ui/core/styles';
import { Fonts, BgColor, Color } from '../../theme/index';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import ListIcon from '@material-ui/icons/List';
import ImageIcon from '@material-ui/icons/Image';
import TheatersIcon from '@material-ui/icons/Theaters';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import InputAdornment from '@material-ui/core/InputAdornment';
import PayCard from './PayCard';
import { isShortQuestion } from '../../redux/actions/paymentActions';
import openSocket from 'socket.io-client';
import { Editor } from 'react-draft-wysiwyg';
import { useTranslation } from 'react-i18next';
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
import clsx from 'clsx';
import { toast } from 'react-toastify';

import JoditEditor from 'jodit-react';

import {
	addForumQuestion,
	deductPlatformFee,
	forumQuestionList,
} from './../../redux/actions/forumActions';
import { updateQRCode,	getQRcode,
	isUseWallet,
	walletPay, } from './../../redux/actions/paymentActions';
import {

	checkAuth
} from '../../redux/actions/authActions';
import Const from '../../helpers/const';
import { SOCKET_URL } from './../../config/weChatConfig';


const socket = openSocket(SOCKET_URL);
const useStyles = makeStyles((theme) => ({
	root: {
		padding: '10px',
		borderRadius: '10px',
		marginTop: '10px',
	},
	mainHeading: {
		fontSize: '20px',
		fontFamily: Fonts.Medium,
		opacity: '.8',
	},
	blueButton: {
		color: '#fff',
		height: '40px',
		borderRadius: '5px',
		backgroundColor: BgColor.myBlue,
		border: '1px solid transparent',
		padding: '0 20px',
		'&:hover': {
			color: Color.textBlue,
			border: '1px solid' + Color.textBlue,
		},
	},
	info: {
		color: '#2B65EC',
		textTransform: 'initial',
		fontFamily: Fonts.Regular,
	},
	LightText: {
		color: BgColor.myBlack,
		fontSize: '14px',
		fontFamily: Fonts.Medium,
		opacity: 0.25,
	},
	regularFont: {
		fontFamily: Fonts.Regular,
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		// justifyContent: "center",
		// alignItems: "center",
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
	smallestBlueTitle: {
		color: Color.textBlue,
		fontSize: '13px',
		fontFamily: Fonts.Regular,
	},
	smallText: {
		color: BgColor.myBlack,
		fontSize: '16px',
		fontFamily: Fonts.Regular,
	},
	LightText: {
		color: BgColor.myBlack,
		fontSize: '14px',
		fontFamily: Fonts.Medium,
		opacity: 0.25,
	},
	blueNumbersText: {
		color: Color.textBlue,
		fontSize: '25px',
		fontFamily: Fonts.Regular,
		transition: 'all .3s ease',
	},
	icons: {
		padding: '10px',
		'&:hover': {
			opacity: '.7',
		},
	},
	toggleTab: {
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: '50%',
		minHeight: '40px',
		backgroundColor: '#F2F8FD',
		padding: '10px 0',
		'&:hover': {
			backgroundColor: '#DBECF8',
		},
	},
	toggleTabText: {
		color: '#7BBEE8',
		fontSize: '14px',
		fontFamily: Fonts.Medium,
		// opacity: 0.4,
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
	smallestGrayTitleLight: {
		color: 'rgba(0,0,0,0.3)',
		fontSize: '12px',
		fontFamily: Fonts.Regular,
	},
	blueButton2: {
		color: '#fff',
		height: '40px',
		lineHeight: '40px',
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
			backgroundColor: '#fff',
		},
	},
	center: {
		display: 'inline-block',
		position: 'relative',
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	textField: {
		width: '25ch',
	},
}));

const MyCard = ({ toggleAskQuestion, authUser, handelFormData, formData }) => {
	const classes = useStyles();
	const [isStudent, setIsStudent] = useState(
		formData.ask_whom == 'student' && true
	);

	const toggleTabButton = (category) => {
		if (category == 'student') {
			setIsStudent(true);
			setIsAcademic(false);
			handelFormData('question_category', 'normal');
			handelFormData('ask_whom', 'student');
			handelFormData('price', '0.5');
		} else {
			setIsStudent(false);
			handelFormData('ask_whom', 'teacher');
			handelFormData('price', '1');
		}
	};

	const [isAcademic, setIsAcademic] = useState(false);
	const toggleTabQuestionType = (type) => {
		if (type == 'normal') {
			setIsAcademic(false);
			handelFormData('question_category', 'normal');
		} else {
			setIsAcademic(true);
			handelFormData('time_limit', '1 hours');
			handelFormData('price', '');
			handelFormData('question_type', '');
			handelFormData('question_category', 'academic_english');
		}
	};

	return (
		<>
			<Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
				<Box display="flex" flexDirection="row" justifyContent="space-between">
					<Typography
						variant="h5"
						component="h5"
						className={classes.mainHeading}
					>
						Category
					</Typography>
					<CloseIcon
						style={{ color: Color.textBlue, cursor: 'pointer' }}
						onClick={toggleAskQuestion}
					/>
				</Box>

				<Card className={classes.root}>
					<CardContent style={{ padding: '5px' }}>
						<Typography
							className={classes.LightText}
							style={{ textAlign: 'center', paddingBottom: '10px' }}
						>
							Ask Who
						</Typography>
						<Box
							display="flex"
							flexDirection="row"
							justifyContent="space-between"
							alignItems="center"
							style={{ borderRadius: '15px', overflow: 'hidden' }}
						>
							<Box
								className={classes.toggleTab}
								style={{
									borderRight: '3px solid rgba(0,0,0,0.05)',
									padding: '30px 0',
									width: '100%',
									backgroundColor: isStudent ? '#DBECF8' : '',
								}}
								// backgroundColor: "#F2F8FD",
								// backgroundColor: "#DBECF8",

								onClick={() => toggleTabButton('student')}
							>
								<SchoolIcon style={{ color: '#7BBEE8', fontSize: '35px' }} />
								<Box className={classes.toggleTabText}>Student</Box>
							</Box>
							<Box
								className={classes.toggleTab}
								style={{
									padding: '30px 0',
									width: '100%',
									backgroundColor: !isStudent ? '#DBECF8' : '',
								}}
								onClick={() => toggleTabButton('teacher')}
							>
								<PermIdentityIcon
									style={{ color: '#7BBEE8', fontSize: '35px' }}
								/>
								<Box className={classes.toggleTabText}>Teacher</Box>
							</Box>
						</Box>
					</CardContent>
				</Card>

				<Card className={classes.root}>
					<CardContent style={{ padding: '5px' }}>
						<Typography
							className={classes.LightText}
							style={{ textAlign: 'center', paddingBottom: '10px' }}
						>
							Type of question
						</Typography>
						<Box
							display="flex"
							flexDirection="row"
							justifyContent="space-between"
							alignItems="center"
							style={{ borderRadius: '15px', overflow: 'hidden' }}
						>
							<Box
								className={classes.toggleTab}
								style={{
									borderRight: '3px solid rgba(0,0,0,0.05)',
									backgroundColor: !isAcademic ? '#DBECF8' : '',
									width: !isStudent ? '50%' : '100%',
								}}
								onClick={() => toggleTabQuestionType('normal')}
							>
								<Box className={classes.toggleTabText}>Normal Question</Box>
							</Box>
							{!isStudent ? (
								<Box
									className={classes.toggleTab}
									style={{
										backgroundColor: isAcademic ? '#DBECF8' : '',
									}}
									onClick={() => toggleTabQuestionType('academic_english')}
								>
									<Box className={classes.toggleTabText}>Academic English</Box>
								</Box>
							) : (
								''
							)}
						</Box>
					</CardContent>
				</Card>
			</Box>
		</>
	);
};

const WhiteCardSelectCategory = ({
	dropdown,
	label,
	textArea,
	formData,
	showQuestionTypeList,
	showFinalQuestionView,
}) => {
	const styles = useStyles();

	const checkValidation = (e) => {
		let pass = true;

		if (!formData.price && formData.question_category == 'normal') {
			pass = false;
			toast.error('Please enter a price!');
		} else if (
			formData.question_category != 'normal' &&
			!formData.question_type
		) {
			pass = false;
			toast.error('Please select a question type!');
		} else if (formData.question_category == 'normal' && formData.price) {
			if (formData.question_length == 'short') {
				if (parseFloat(formData.price) >= 0.5) {
					pass = true;
				} else {
					pass = false;
					toast.error('Price should be greater then 0.5!');
				}
			} else {
				if (parseFloat(formData.price) >= 3) {
					pass = true;
				} else {
					pass = false;
					toast.error('Price should be greater then 3!');
				}
			}
		}

		if (pass) {
			showFinalQuestionView(e);
		}
	};

	return (
		<>
			<Box
				flexWrap="wrap"
				p={2}
				m={0}
				bgcolor="background.paper"
				style={{ marginTop: '-15px' }}
			>
				{formData.question_category == 'academic_english' ? (
					<>
						<Card
							onClick={() => showQuestionTypeList(false)}
							className={styles.root}
							style={{ marginTop: '0' }}
						>
							<Box style={{ padding: '5px' }}>
								{/* <Box className={styles.smallestBlueTitle}>{heading}</Box> */}
								{/* <Box className={styles.smallText} style={{color:Color.textBlue}}>{textContent}asdf</Box> */}
								{dropdown ? (
									<Box
										display="flex"
										justifyContent="space-between"
										alignItems="center"
										// onClick={func}
									>
										<Box className={styles.smallestBlueTitle}>{label}</Box>
										<ArrowDropDownIcon style={{ color: Color.textBlue }} />
									</Box>
								) : (
									<>
										{!textArea ? (
											<TextField
												id="outlined-basic"
												label={label}
												variant="outlined"
												className={styles.TextFields}
											/>
										) : (
											<TextField
												id="outlined-multiline-static"
												label={label}
												multiline
												rows={4}
												// defaultValue="Lesson Plan Text"
												variant="outlined"
												className={styles.TextFields}
											/>
										)}
									</>
								)}
							</Box>
						</Card>
					</>
				) : (
					''
				)}
				<Button
					className={styles.blueButton}
					style={{ marginTop: '20px', width: '100%' }}
					onClick={checkValidation}
				>
					Next
				</Button>
			</Box>
		</>
	);
};

const QuestionTypeListOverlay = ({
	showQuestionTypeList,
	questionTypeList,
}) => {
	const styles = useStyles();
	return (
		<>
			{questionTypeList ? (
				<Container maxWidth="xl" className={styles.overlayWrapper}>
					<Card
						style={{
							maxWidth: '600px',
							width: '600px',
							// padding: "20px",
							borderRadius: '10px',
							marginTop: '10px',
						}}
					>
						<Box
							style={{
								padding: '15px 20px 20px 20px',
							}}
						>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
							>
								<Box></Box>
								<Box
									className={styles.mainHeading2}
									style={{ textAlign: 'center', paddingBottom: '10px' }}
								>
									Question Type
								</Box>
								<CloseIcon
									style={{ color: Color.textBlue, cursor: 'pointer' }}
									onClick={() => showQuestionTypeList(false)}
								/>
							</Box>
							<Button
								className={styles.whiteOutlinedButton}
								onClick={() => showQuestionTypeList('ielts')}
							>
								IELTS
							</Button>
							<Button
								className={styles.whiteOutlinedButton}
								onClick={() => showQuestionTypeList('toefl')}
							>
								TOEFL
							</Button>
							<Button
								className={styles.whiteOutlinedButton}
								onClick={() => showQuestionTypeList('cet4')}
							>
								cet 4
							</Button>

							<Button
								className={styles.whiteOutlinedButton}
								onClick={() => showQuestionTypeList('cet6')}
							>
								cet 6
							</Button>
							<Button
								className={styles.whiteOutlinedButton}
								onClick={() => showQuestionTypeList('tem4')}
							>
								Tem 4
							</Button>
							<Button
								className={styles.whiteOutlinedButton}
								onClick={() => showQuestionTypeList('tem8')}
							>
								Tem 8
							</Button>

							<Button
								className={styles.whiteOutlinedButton}
								onClick={() => showQuestionTypeList('ket')}
							>
								KET
							</Button>
							<Button
								className={styles.whiteOutlinedButton}
								onClick={() => showQuestionTypeList('pet')}
							>
								PET
							</Button>
							{/* <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList("proof_reading")}
              >
                Proof reading
              </Button>
              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList("personal_statements")}
              >
                Personal statements
              </Button>
              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList("editing")}
              >
                Editing
              </Button> */}
						</Box>
					</Card>
				</Container>
			) : (
				''
			)}
		</>
	);
};

const PriceList = ({ showPriceList, priceList, authUser }) => {
	const styles = useStyles();

	return (
		<>
			{priceList ? (
				<Container maxWidth="xl" className={styles.overlayWrapper}>
					<Card
						style={{
							maxWidth: '600px',
							width: '600px',
							// padding: "20px",
							borderRadius: '10px',
							marginTop: '10px',
						}}
					>
						<Box
							style={{
								padding: '15px 20px 20px 20px',
							}}
						>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
							>
								<Box></Box>
								<Box
									className={styles.mainHeading2}
									style={{ textAlign: 'center', paddingBottom: '10px' }}
								>
									Price list
								</Box>
								<CloseIcon
									style={{ color: Color.textBlue, cursor: 'pointer' }}
									onClick={showPriceList}
								/>
							</Box>
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								flexDirection="column"
							>
								<Box
									mb={'15px'}
									display="flex"
									justifyContent="center"
									alignItems="center"
									flexDirection="column"
								>
									<Box
										className={styles.smallText}
										style={{ color: Color.textBlue }}
									>
										For Students Questions:
									</Box>

									<Box className={styles.LightText}>
										Small Question = 0.5 rmb,
									</Box>
									<Box className={styles.LightText}>Long Question = 3 rmb</Box>
								</Box>
								<Box
									mb={'15px'}
									display="flex"
									justifyContent="center"
									alignItems="center"
									flexDirection="column"
								>
									<Box
										className={styles.smallText}
										style={{ color: Color.textBlue }}
									>
										For Teachers Questions:
									</Box>

									<Box className={styles.LightText}>
										Small Question = 1 rmb,
									</Box>
									<Box className={styles.LightText}>Long Question = 5 rmb</Box>
								</Box>
								<Box
									mb={'15px'}
									display="flex"
									justifyContent="center"
									alignItems="center"
									flexDirection="column"
								>
									<Box
										className={styles.smallText}
										style={{ color: Color.textBlue }}
									>
										Academic English:
									</Box>
									<Box className={styles.LightText}>
										CET 4 and TEM 4 = 25 rmb,
									</Box>
									<Box className={styles.LightText}>
										CET 6 and TEM 8 = 35 rmb,
									</Box>
									<Box className={styles.LightText}>
										IELTS and TOEFEL = 55 rmb,
									</Box>
									<Box className={styles.LightText}>
										KET and PET = 17.50 rmb,
									</Box>
									{/* <Box className={styles.LightText}>
                    Proof reading    = 0.25 rmb per word,
                  </Box>
                  <Box className={styles.LightText}>
                    Editing     = 0.4 rmb per word,
                  </Box>
                  <Box className={styles.LightText}>
                    Personal statements = 800 rmb (only if student provides draft),
                  </Box> */}
								</Box>
								<Box className={styles.LightText}>(plus 10% platform fee)</Box>
							</Box>
						</Box>
					</Card>
				</Container>
			) : (
				''
			)}
		</>
	);
};

const MyCardForSelectCategory = ({
	toggleShowLength,
	authUser,
	formData,
	handelFormData,
}) => {
	const classes = useStyles();
	const [isShortQue, setIsShortQue] = useState(true);

	const toggleTabButton = (category) => {
		if (category == 'short') {
			setIsShortQue(true);
			handelFormData('question_length', 'short');
			handelFormData('time_limit', '15 min');
			handelFormData('price', '1');
			if (formData.ask_whom == 'student') {
				handelFormData('price', '0.5');
			}
		} else {
			setIsShortQue(false);
			handelFormData('question_length', 'long');
			handelFormData('time_limit', '1 hour');
			handelFormData('price', '5');
			if (formData.ask_whom == 'student') {
				handelFormData('price', '3');
			}
		}
	};

	return (
		<>
			<Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
				<Box display="flex" flexDirection="row" justifyContent="space-between">
					<Typography
						variant="h5"
						component="h5"
						className={classes.mainHeading}
					>
						Category
					</Typography>
					<CloseIcon
						style={{ color: Color.textBlue, cursor: 'pointer' }}
						onClick={toggleShowLength}
					/>
				</Box>

				{formData.question_category == 'normal' ? (
					<>
						<Card className={classes.root}>
							<CardContent style={{ padding: '5px' }}>
								<Typography
									className={classes.LightText}
									style={{ textAlign: 'center', paddingBottom: '10px' }}
								>
									Question Type
								</Typography>

								<Box
									display="flex"
									flexDirection="row"
									justifyContent="space-between"
									alignItems="center"
									style={{ borderRadius: '15px', overflow: 'hidden' }}
								>
									<Box
										className={classes.toggleTab}
										style={{
											borderRight: '3px solid rgba(0,0,0,0.05)',
											padding: '30px 0',
											cursor: 'pointer',
											backgroundColor: isShortQue ? '#DBECF8' : '',
										}}
										// backgroundColor: "#F2F8FD",
										// backgroundColor: "#DBECF8",

										onClick={() => toggleTabButton('short')}
									>
										<ShortTextIcon
											style={{ color: '#7BBEE8', fontSize: '35px' }}
										/>
										<Box className={classes.toggleTabText}>Short Question</Box>
									</Box>
									<Box
										className={classes.toggleTab}
										style={{
											cursor: 'pointer',
											padding: '30px 0',
											backgroundColor: !isShortQue ? '#DBECF8' : '',
										}}
										onClick={() => toggleTabButton('long')}
									>
										<SubjectIcon
											style={{ color: '#7BBEE8', fontSize: '35px' }}
										/>
										<Box className={classes.toggleTabText}>Long Question</Box>
									</Box>
								</Box>
							</CardContent>
						</Card>
					</>
				) : (
					<></>
				)}
			</Box>
		</>
	);
};

const TimeAndPriceCard = ({
	showPriceList,
	handelFormData,
	formData,
	authUser,
}) => {
	const styles = useStyles();

	return (
		<>
			<Box
				flexWrap="wrap"
				p={2}
				m={0}
				bgcolor="background.paper"
				style={{ marginTop: '-15px' }}
			>
				<Card
					// onClick={() => showQuestionTypeList(false)}
					className={styles.root}
					style={{ marginTop: '0' }}
				>
					<Box display="flex" justifyContent="flex-start" alignItems="center">
						<Box style={{ flex: '1', padding: '5px' }}>
							<Box className={styles.smallestBlueTitle}>Time LIMIT</Box>
							<TextField
								id="standard-size-small"
								// defaultValue="2 hrs"
								placeholder="1 hrs"
								size="small"
								InputProps={{
									readOnly: true,
								}}
								value={formData.time_limit}
							/>
						</Box>

						<Box style={{ flex: '3', padding: '5px' }}>
							<Box className={styles.smallestBlueTitle}>Price</Box>
							{/* <FormControl className={clsx(styles.withoutLabel, styles.textField)}> */}
							<Input
								id="filled-adornment-weight"
								// defaultValue="number"
								name="price"
								placeholder={formData.price}
								size="small"
								value={formData.price}
								disabled={
									formData.question_category == 'academic_english'
										? true
										: false
								}
								onChange={(e) => handelFormData('price', e.target.value)}
								endAdornment={
									<InputAdornment position="end">RMB</InputAdornment>
								}
							/>
							{/* </FormControl> */}
						</Box>
						<Box style={{ flex: '.2', padding: '5px' }}>
							<HelpOutlineIcon
								style={{ color: Color.textBlue }}
								onClick={showPriceList}
							/>
						</Box>
					</Box>
				</Card>
			</Box>
		</>
	);
};

const BottomBar = ({}) => {
	const styles = useStyles();

	return (
		<>
			<Card
				style={{
					maxWidth: '600px',
					// width: "550px",
					padding: '10px',
					borderRadius: '10px',
					marginTop: '30px',
				}}
			>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<FormatBoldIcon style={{ margin: '0 5px' }} />
						<FormatItalicIcon style={{ margin: '0 5px' }} />
						<FormatUnderlinedIcon style={{ margin: '0 5px' }} />
						<ListIcon style={{ margin: '0 5px' }} />
						<ImageIcon style={{ margin: '0 5px' }} />
						<TheatersIcon style={{ margin: '0 5px' }} />
						<StrikethroughSIcon style={{ margin: '0 5px' }} />
					</Box>
					<Box className={styles.blueButton2}>Save</Box>
				</Box>
			</Card>
		</>
	);
};

const SelectCategory = ({
	toggleAskQuestion,
	toggleShowLength,
	authUser,
	handelFormData,
	formData,
}) => {
	const styles = useStyles();

	return (
		<>
			<MyCard
				toggleAskQuestion={toggleAskQuestion}
				authUser={authUser}
				handelFormData={handelFormData}
				formData={formData}
			/>

			<Button
				className={styles.blueButton}
				style={{ marginTop: '20px', width: '100%' }}
				onClick={toggleShowLength}
			>
				Next
			</Button>

			{/* <WhiteCard
        label={"What Do You Need"}
        dropdown={true}
        showQuestionType={showQuestionType}
        toggleShowLength={toggleShowLength}
      /> */}
		</>
	);
};

const FinalQuestionView = ({
	showFinalQuestionView,
	formData,
	editorState,
	onEditorStateChange,
	handelFormData,
	submitForumQuestion,
	authUser
}) => {
	const styles = useStyles();

	const editor = useRef(null);
	const dispatch = useDispatch();

	const [isValid, setIsValid] = useState(false);
	const [closePayCard, setClosePayCard] = useState(false);
	const [kdmeditortext, setkdmeditortext] = useState('');

	const checkValidation = (e) => {

		onEditorStateChange(kdmeditortext.html())
		formData.description=kdmeditortext.html()
		if (!formData.subject) {
			toast.error('Please enter subject!');
		} else if (!formData.title) {
			toast.error('Please enter title!');
		} else if (!formData.description) {
			toast.error('Please enter description!');
		} else {
			console.log('Valid.....');
			setIsValid(true);
			setClosePayCard(true);
			// submitForumQuestion(e)
		}
	};

	const openPayCard = () => {
		dispatch(updateQRCode(''));
		setClosePayCard(false);
	};
const { t, i18n } = useTranslation();


const kdmed=()=>{
	// alert('inner')
	var kdmeditortxt=window.kdmeditor()
	setkdmeditortext(kdmeditortxt)
}
setTimeout(() => {
        kdmed()
    }, 500)
	return (
		<>
			{isValid && closePayCard ? (
				<Container maxWidth="xl" className={styles.overlayWrapper}>
					<PayCard
						plan={formData}
						authUser={authUser}
						submitForumQuestion={submitForumQuestion}
						formData={formData}
						openPayCard={openPayCard}
					/>
				</Container>
			) : (
				''
			)}
			<Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
				<Box>
					<Box
						display="flex"
						flexDirection="row"
						justifyContent="space-between"
					>
						<Typography
							variant="h5"
							component="h5"
							className={styles.mainHeading}
						>
							Question
						</Typography>
						<CloseIcon
							style={{ color: Color.textBlue, cursor: 'pointer' }}
							onClick={showFinalQuestionView}
						/>
					</Box>

					<Card
						style={{
							padding: '10px',
							borderRadius: '10px',
							marginTop: '10px',
						}}
					>
						<CardContent>
							<Box>
								<Box className={styles.smallestBlueTitle}>{t('subject')}</Box>
								<TextField
									style={{ width: '100%' }}
									name="subject"
									onChange={(e) => handelFormData('subject', e.target.value)}
								/>
							</Box>
						</CardContent>
					</Card>
					{/*<Card
						style={{
							padding: '10px',
							borderRadius: '10px',
							marginTop: '10px',
						}}
					>
						<CardContent>
							<Box>
								<Box className={styles.smallestBlueTitle}>{t('subject [chinese]')}</Box>
								<TextField
									style={{ width: '100%' }}
									name="subject"
									onChange={(e) => handelFormData('subject_cn', e.target.value)}
								/>
							</Box>
						</CardContent>
					</Card>*/}

					<Card
						style={{
							padding: '10px',
							borderRadius: '10px',
							marginTop: '10px',
						}}
					>
						<CardContent>
							<Box>
								<Box className={styles.smallestBlueTitle}>{t('title')}</Box>
								<TextField
									style={{ width: '100%' }}
									name="title"
									onChange={(e) => handelFormData('title', e.target.value)}
								/>
							</Box>
						</CardContent>
					</Card>

					{/*<Card
						style={{
							padding: '10px',
							borderRadius: '10px',
							marginTop: '10px',
						}}
					>
						<CardContent>
							<Box>
								<Box className={styles.smallestBlueTitle}>{t('title [chinese]')}</Box>
								<TextField
									style={{ width: '100%' }}
									name="title"
									onChange={(e) => handelFormData('title_cn', e.target.value)}
								/>
							</Box>
						</CardContent>
					</Card>*/}

					{/* <FinalQuestionComponent
            heading={"Title"}
            textContent={"Vivamus eget aliquam dui. Ineger"}
          /> */}
					{/* <FinalQuestionComponent
            heading={t('description')}
            textContent={
              "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lor"
            }
            bottomBar={true}
          /> */}

					<Card
						style={{
							padding: '10px',
							borderRadius: '10px',
							marginTop: '10px',
							marginLeft:'-25%',
							overflow:"visible"
						}}
						className="forum-texteditor"
					>
						<CardContent>
							<Box>
								<Box 
								style={{
							marginLeft:'21%'
						}}
								className={styles.smallestBlueTitle}>{t('description')}</Box>
								{/* <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={ (text) => onEditorStateChange(text) }
                /> */}
                
								 
							
								{/*<JoditEditor
									ref={editor}
									value={editorState}
									config={Const.EDITOR_CONFIG}
									tabIndex={1} // tabIndex of textarea
									onBlur={(newContent) => onEditorStateChange(newContent)} 
									onChange={(text) => {}}
								/>*/}

								<textarea name="content12"></textarea>
								<p>{t('count_word_msg')}< span  class ="word_count2" > 0 </ span > 
								</p>
							</Box>
						</CardContent>
					</Card>
					

					<Button
						className={styles.blueButton}
						style={{ marginTop: '20px', width: '100%' }}
						onClick={checkValidation}
					>
						{t('post_capital')}
					</Button>
				</Box>
			</Box>
		</>
	);
};

const SelectLength = ({
	toggleAskQuestion,
	questionTypeList,
	showQuestionTypeList,
	showFinalQuestionView,
	toggleShowLength,
	authUser,
	formData,
	handelFormData,
}) => {
	const [priceList, setPriceList] = useState(false);
	const showPriceList = () => {
		setPriceList(!priceList);
	};

	const questionTypeText = () => {
		if (!formData.question_type) {
			return 'Question Type';
		} else if (formData.question_type == 'ielts') {
			return 'IELTS';
		} else if (formData.question_type == 'toefl') {
			return 'TOEFL';
		} else if (formData.question_type == 'cet4') {
			return 'CET 4';
		} else if (formData.question_type == 'cet6') {
			return 'CET 6';
		} else if (formData.question_type == 'tem4') {
			return 'TEM 4';
		} else if (formData.question_type == 'tem8') {
			return 'TEM 8';
		} else if (formData.question_type == 'ket') {
			return 'KET';
		} else if (formData.question_type == 'pet') {
			return 'PET';
		} else {
			return 'Question Type';
		}
	};

	return (
		<>
			<MyCardForSelectCategory
				toggleAskQuestion={toggleAskQuestion}
				toggleShowLength={toggleShowLength}
				authUser={authUser}
				formData={formData}
				handelFormData={handelFormData}
			/>
			<TimeAndPriceCard
				showPriceList={showPriceList}
				authUser={authUser}
				formData={formData}
				handelFormData={handelFormData}
				showQuestionTypeList={showQuestionTypeList}
			/>

			<WhiteCardSelectCategory
				label={questionTypeText()}
				dropdown={true}
				showQuestionTypeList={showQuestionTypeList}
				showFinalQuestionView={showFinalQuestionView}
				authUser={authUser}
				formData={formData}
				handelFormData={handelFormData}
			/>
			<QuestionTypeListOverlay
				questionTypeList={questionTypeList}
				showQuestionTypeList={showQuestionTypeList}
				authUser={authUser}
				handelFormData={handelFormData}
				formData={formData}
			/>

			{priceList ? (
				<PriceList
					priceList={priceList}
					showPriceList={showPriceList}
					authUser={authUser}
				/>
			) : (
				''
			)}
		</>
	);
};

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
						<Button className={styles.whiteOutlinedButton} onClick={accepted}>
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

export const TeamCardDemo = React.memo(function TeamCard(props) {
	const classes = useStyles();
	const [questionType, setQuestionType] = useState(false);
	const [payQr,setPayQr] = useState(true);
	const { authUser } = props;
	const dispatch = useDispatch();

	const showQuestionType = () => {
		setQuestionType(!questionType);
	};
	const [length, setLength] = useState(false);
	const toggleShowLength = () => {
		setLength(!length);
	};
	const [questionTypeList, setQuestionTypeList] = useState(false);

	const priceCat = {
		cet4: 25,
		cet6: 35,
		tem4: 25,
		tem8: 35,
		ielts: 55,
		toefl: 55,
		ket: 17.5,
		pet: 17.5,
		// "proof_reading" : "0.25 per word",
		// "personal_statements" : 800,
		// "editing" : "0.4 per word",
	};

	const showQuestionTypeList = (val) => {
		setQuestionTypeList(!questionTypeList);

		if (val) {
			handelFormData('question_type', val);
			handelFormData('price', priceCat[val]);
		}
	};
	const [finalQuestionView, setFinalQuestionView] = useState(false);
	const showFinalQuestionView = () => {
		setFinalQuestionView(!finalQuestionView);
	};

	const [editorState, setEditorState] = useState('');
	const [error, setError] = useState(false);

	const onEditorStateChange = (val) => {
		setEditorState(val);
		// handelFormData("description", draftToHtml(convertToRaw(val.getCurrentContent())))

		handelFormData('description', val);
	};

	const isUsingWallet = useSelector((store) => store.payment.isUsingWallet);

	const [formData, setFormData] = useState({
		title: '',
		title_cn: '',
		ask_whom: 'student',
		description: '',
		question_category: 'normal',
		question_length: 'short',
		time_limit: '15 min',
		price: '0.5',
		question_type: '',
		subject: '',
		subject_cn: '',
		status: 'open',
		is_answered: 0,
		is_locked: 0,
		state_id: 0,
	});

	const handelFormData = (key, val) => {
		setFormData((formData) => ({
			...formData,
			[key]: val,
		}));
	};

	
const total = () => {
    return parseFloat(
    (parseFloat(formData.price) * 10) / 100 + parseFloat(formData.price)
    )
}
const deductTenPercent = () =>{
	let a =  parseFloat(parseFloat (formData.price) - ((parseFloat( formData.price ) * 10) / 100)  );
	return a.toFixed(2)
}
const total1 = () => {
		return parseFloat(
			(parseFloat(formData.price))
		);
	};
const getplatformFee = () => {
	return parseFloat(
    (parseFloat(formData.price) * 10) / 100 )
    
}


	const [requestData, setRequestData] = useState();
	const [showConfirm, setShowConfirm] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [confirmText, setConfirmText] = useState(
		'Your balance is low, use direct wechat app pay or get it top-up. Otherwise balance value will get in negative.'
	);

	const decline = () => {
		setConfirm(false);
		setShowConfirm(false);
	};

	const accepted = () => {
		setConfirm(true);
		if (requestData) {
			dispatch(getQRcode(requestData));
			// dispatch(walletPay(requestData)).then((res) => {
			// 	if (res.type == 'success') {
			// 		let socketData = {
			// 			type:"all",
			// 			id:authUser.id,
			// 			for : formData.ask_whom,
			// 			message : authUser.username+' Your question '+ formData.question_category +' posted successfully',
			// 			receiverMsg : formData.question_category=="academic_english" ? "You have a new Academic English Question" : "You have a new question"
			// 		}
			// 		socket.emit('send_notification',socketData)
			// 		// window.location.reload();
			// 	}
			// });


		}
		setShowConfirm(false);
	};



	const submitForumQuestion = () => {
		formData.question_category === 'academic_english' ? 
		dispatch(addForumQuestion(formData)).then((res) => {
			
			
			let data = {
				total_fee: total1(),
				order_type: 'Forum',
				question_type: 'academic',
				actual_fee: deductTenPercent(),
				product_id: res.payload.id,
				body: res.payload.title,
				buyer_id: authUser.id,
				seller_id: null,
				is_wallet : '0',
				out_trade_no : '1625048608',
				data : `<xml> <appid>wx8b25c6e83f785918</appid> <attach>position</attach> <body>function</body> <mch_id>1568603351</mch_id> <nonce_str>xft8rvfj0n</nonce_str> <notify_url>https://api.irevu.org</notify_url><out_trade_no>1625048608</out_trade_no><spbill_create_ip>14.23.150.211</spbill_create_ip>
				 <total_fee>${total1()}</total_fee> <trade_type>APP</trade_type> <sign>F1529CC28F4E158FC5CDAE518E39764C</sign> </xml>`
			};
			
			if (isUsingWallet === true) {
				data.is_wallet = '1';
				data.out_trade_no = '1625048608';
				// data.total_fee = total();
				console.log("total fee=====>",data.total_fee)

				if (authUser.balance < data.total_fee) {
					if(res.type === 'success'){
						setRequestData(data);
						setShowConfirm(true);
						return;

					}else {
						toast.error(res.payload.error);
					}
				}
			
				// let platformFee = getplatformFee()
				// let d = {
				// 	total_fee: platformFee
				// }
				// dispatch(deductPlatformFee(d)).then((res) => {
				// 	console.log("this is a response =====>",res)
				// 	if (res.type === 'success') {
				dispatch(walletPay(data)).then((res) => {
					
					if (res.type === 'success') {
						let socketData = {
							id:authUser.id,
							type:"all",
							for : formData.ask_whom,
							message : authUser.username+' Your question '+ formData.question_category +' posted successfully',
							receiverMsg : formData.question_category=="academic_english" ? "You have a new Academic English Question" : "You have a new question"
						}
						socket.emit('send_notification',socketData)
						dispatch(checkAuth()).then(() => {
							dispatch(isUseWallet(false));
							window.location.reload();
						})
					}
				});
		
		

				return;
			}
			console.log("checking qr code===========>")
			debugger
			if (res.type == 'success') {
				localStorage.setItem('last-noti-data',JSON.stringify({
					id:authUser.id,
					type:"all",
					for : formData.ask_whom,
					message : authUser.username+' Your question '+ formData.question_category +' posted successfully',
					receiverMsg : formData.question_category=="academic_english" ? "You have a new Academic English Question" : "You have a new question"
				}));
				debugger;
				dispatch(getQRcode(data));
			} else if (res.type == 'error') {
				toast.error(res.payload.error);
			} else {
				toast.error('Internal server error.');
			}
		}) :
		
		
			dispatch(addForumQuestion(formData)).then((res) => {
			
				let price = total();
				let data = {
					total_fee:  total(),
					order_type: 'Forum',
					actual_fee: total1(),
					question_type:"normal",
					product_id: res.payload.id,
					body: res.payload.title,
					buyer_id: authUser.id,
					seller_id: null,
					is_wallet : '0',
					out_trade_no : '1625048608',
					data : `<xml> <appid>wx8b25c6e83f785918</appid> <attach>position</attach> <body>function</body> <mch_id>1568603351</mch_id> <nonce_str>xft8rvfj0n</nonce_str> <notify_url>https://api.irevu.org</notify_url><out_trade_no>1625048608</out_trade_no><spbill_create_ip>14.23.150.211</spbill_create_ip>
					 <total_fee>${price}</total_fee> <trade_type>APP</trade_type> <sign>F1529CC28F4E158FC5CDAE518E39764C</sign> </xml>`
				};
				console.log(data.total_fee);
				if (isUsingWallet === true) {
					data.is_wallet = '1';
					data.out_trade_no = '1625048608';
					// data.total_fee = total1();
	
					if (authUser.balance < data.total_fee) {
						data.total_fee = total();
						if(res.type === 'success'){
							setRequestData(data);
							setShowConfirm(true);
							return;
	
						}else {
							toast.error(res.payload.error);
						}
					}
					let platformFee = getplatformFee()
					let d = {
						total_fee: platformFee
					}
					// dispatch(deductPlatformFee(d)).then((res) => {
					// 	console.log("this is a response =====>",res)
					// 	if (res.type === 'success') {
					dispatch(walletPay(data)).then((res) => {
						
						if (res.type === 'success') {
							let socketData = {
								id:authUser.id,
								type:"all",
								for : formData.ask_whom,
								message : authUser.username+' Your question '+ formData.question_category +' posted successfully',
								receiverMsg : formData.question_category=="academic_english" ? "You have a new Academic English Question" : "You have a new question"
							}
							socket.emit('send_notification',socketData)
							dispatch(checkAuth()).then(() => {
								// dispatch(isUseWallet(false));
								window.location.reload();
							})
						}
					});
				// }
				// })
	
					return;
				}
				if (res.type == 'success') {
					dispatch(getQRcode(data));
				} else if (res.type == 'error') {
					toast.error(res.payload.error);
				} else {
					toast.error('Internal server error.');
				}
			});
		
		

	};

	return (
		<>
			<Grid
				style={{ marginRight: 0, marginTop: 15, width: '50%' }}
				// item
				// xs={12}
				// md={8}
				// lg={5}
				className={classes.center}
			>
				{!length ? (
					<SelectCategory
						showQuestionType={showQuestionType}
						toggleAskQuestion={props.toggleAskQuestion}
						toggleShowLength={toggleShowLength}
						authUser={authUser}
						handelFormData={handelFormData}
						formData={formData}
					/>
				) : (
					<>
						{!finalQuestionView ? (
							<SelectLength
								questionTypeList={questionTypeList}
								showQuestionTypeList={showQuestionTypeList}
								showFinalQuestionView={showFinalQuestionView}
								toggleShowLength={toggleShowLength}
								authUser={authUser}
								handelFormData={handelFormData}
								formData={formData}
							/>
						) : (
							<FinalQuestionView
								showFinalQuestionView={showFinalQuestionView}
								toggleAskQuestion={props.toggleAskQuestion}
								authUser={authUser}
								handelFormData={handelFormData}
								formData={formData}
								editorState={editorState}
								onEditorStateChange={onEditorStateChange}
								submitForumQuestion={submitForumQuestion}
							/>
						)}

						{showConfirm && (
							<OpenConfirmationOverlay
								accepted={accepted}
								decline={decline}
								confirmText={confirmText}

							/>
						)}
					</>
				)}
			</Grid>
			{/* <QuestionTypeOverlay
        questionType={questionType}
        showQuestionType={showQuestionType}
        authUser={authUser}
        handelFormData={handelFormData}
        formData={formData}
      /> */}
		</>
	);
});
export default TeamCardDemo;
