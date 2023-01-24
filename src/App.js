import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import moment from 'moment';
import './App.css';
import logo from './logo.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/css/main-style.css';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import { Header } from './components';
import { checkAuth } from './redux/actions/authActions';
import openSocket from 'socket.io-client';
import {
	MainPage,
	ForgotPassword,
	Register,
	Login,
	aboutus,
	bbctc,
	englishtutorial,
	PrivacyPolicy,
	homecontact,
	Dashboard,
	Forum,
	YourClasses,
	HomeWork,
	HomeworkFeedback,
	LessonPlan,
	Resources,
	EarnPoints,
	Notifications,
	ReferralLink,
	Wallet,
	ContactUs,
	ViewAccount,
	Results,
	HelpGuide,
	QuestionFeedback,
	PageNotFound,
	AcademicEnglish,
	AcademicFeedback,
	Subscription,
} from './pages';
import { toast } from 'react-toastify';
import MyClass from './pages/class';
import {getNotificationList } from "./redux/actions/userActions";
import Messenger from './pages/Messenger';
const socket = openSocket('https://irevu.asia');

const useStyles = (theme) => ({});

function PublicRoute({ component: Component, ...rest }) {
	// const isAllowed = auth.isLoggedIn();
	// return (localStorage.userToken)
	//     ? (<Redirect to="/dashboard" />)
	//     : (<Route {...props} />)

	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.userToken ? (
					<Redirect to="/dashboard" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
}

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.userToken ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				)
			}
		/>
	);
}

const App = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const authUser = useSelector((store) => store.auth.user);

	const authSocketUser = useSelector((state) => state?.auth?.user);
	console.log(
		'==============================================>',
		authSocketUser
	);
	useEffect(() => {
		dispatch(checkAuth()).then((res) => {
			if (res.type == 'error') {
				if (localStorage.userToken) {
					localStorage.removeItem('userToken');
					history.push('/login');
				}
			}
		});
	}, []);

	useEffect(() => {
		socket.on("recevie_notification", (data) => {
			let message="";
        if (
          (authSocketUser?.user_type === "2" && data.for == "student") ||
          (authSocketUser?.user_type === "1" && data.for == "teacher")
        ) {
          if (authSocketUser.id == data.id || authSocketUser.username == data.id) {
              message=data.receiverMsg;
          }
          else if(data.ids && data.ids.indexOf(authSocketUser.id) > -1){
            message=data.receiverMsg;
          } else if(data.type && data.type=="all"){
            message=data.receiverMsg;
          } 
        }
        else if (data.for == 'any') {
          if(authSocketUser.referral_code == data.id){
          	message=data.receiverMsg;
          }
        }
        if(message){
        	dispatch(getNotificationList())
        }
      });
	});
	const referralRedirect = () => {
		const value = queryString.parse(window.location.search, {
			ignoreQueryPrefix: true,
		});
		// console.log(value)
		// history.push()
		return <Redirect to={'/register?ref_code=' + value.ref_code} />;
		// return (<></>)
	};

	return (
		<div
			style={
				{
					// border: "3px solid green",
					// zIndex: "1300",
					// position: "fixed",
				}
			}
		>
			{/* {
         (authUser.id) ? (
          <Header history={history} authUser={authUser} />
         ) : ('')
      } */}
			<Router>
				<Switch>
					<PublicRoute exact path="/" component={MainPage} />
					<PublicRoute exact path="/register" component={Register} />
					<PublicRoute exact path="/login" component={Login} />
					<PublicRoute
						exact
						path="/forgot-password"
						component={ForgotPassword}
					/>

					<PublicRoute exact path="/referral" component={referralRedirect} />
					{/* <PublicRoute exact path="/privacy-policy" component={PrivacyPolicy} /> */}
					<PublicRoute exact path="/privacy-policy" component={PrivacyPolicy} />
					<PublicRoute exact path="/about-us" component={aboutus} />
					<PublicRoute exact path="/bbctc" component={bbctc} />
					<PublicRoute exact path="/english-tutorial" component={englishtutorial} />
					<PublicRoute exact path="/contact" component={homecontact} />

					<PrivateRoute exact path="/help-guide" component={HelpGuide} />
					<PrivateRoute exact path="/contact-us" component={ContactUs} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<PrivateRoute exact path="/forum" component={Forum} />
					// {authUser && authUser.user_type==1 ? '' : (<PrivateRoute exact path="/forum/:type" component={Forum} />)}
					<PrivateRoute
						exact
						path="/academic-english"
						component={AcademicEnglish}
					/>
					<PrivateRoute
						exact
						path="/academic-feedback/:id"
						component={AcademicFeedback}
					/>
					<PrivateRoute
						exact
						path="/question-feedback"
						component={QuestionFeedback}
					/>
					<PrivateRoute exact path="/notifications" component={Notifications} />
					<PrivateRoute exact path="/class" component={MyClass} />
					<PrivateRoute
						exact
						path="/homework-feedback/:id"
						component={HomeworkFeedback}
					/>
					{authUser && authUser.user_type==1 && authUser.subscription_status != 1 ? '' : (<PrivateRoute exact path="/your-classes" component={YourClasses} />)}
					<PrivateRoute exact path="/home-work" component={HomeWork} />
					<PrivateRoute exact path="/earn-points" component={EarnPoints} />
					<PrivateRoute exact path="/wallet" component={Wallet} />
					<PrivateRoute exact path="/referral-link" component={ReferralLink} />
					<PrivateRoute exact path="/view-account" component={ViewAccount} />
					<PrivateRoute exact path="/results" component={Results} />

					{authUser && authUser.user_type ? (
						authUser.user_type == 1 ? (
							<PrivateRoute exact path="/lesson-plan" component={LessonPlan} />
						) : (
							<PrivateRoute exact path="/resources" component={Resources} />
						)
					) : (
						<>
							<PrivateRoute exact path="/lesson-plan" component={LessonPlan} />
							<PrivateRoute exact path="/resources" component={Resources} />
						</>
					)}
					{authUser && authUser.user_type == 1 && (
						<PrivateRoute exact path="/subscription" component={Subscription} />
					)}
					<PrivateRoute exact path="/messenger" component={Messenger} />

					<Route component={PageNotFound} />
				</Switch>
			</Router>
		</div>
	);
};

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default withStyles(useStyles, { withTheme: true })(App);
