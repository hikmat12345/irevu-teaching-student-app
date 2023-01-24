import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { BgColor, Color, Fonts } from '../../theme/index';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import queryString from 'query-string';
import Alert from '@material-ui/lab/Alert';

import { getUniversityList } from '../../redux/actions/universityActions';
import { getCourseList } from '../../redux/actions/courseActions';
import { setUserRedirect } from '../../redux/actions/authActions';

import Const from '../../helpers/const';

import QRCode from 'react-qr-code';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import {
  Box,
  TextField,
  Button,
  Card,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
} from '@material-ui/core';
import { profileImg1, logo } from '../../assets/index';
import { set } from 'lodash';
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
    padding: '0 20px',
    '&:hover': {
      color: Color.textBlue,
      border: '1px solid' + Color.textBlue,
    },
  },
  profileImg: {
    width: '100px',
    height: '100px',
    borderRadius: '100px',
    border: 'none',
  },

  bigHeading: {
    fontSize: '1.5rem',
    fontFamily: Fonts.Medium,
    opacity: '.8',
  },
  smallGrayTitle: {
    color: 'rgba(0,0,0,1)',
    fontSize: '12px',
    fontFamily: Fonts.Medium,
    opacity: '0.5',
  },
}));

const TopPortion = ({ label, profileImg }) => {
  const styles = useStyles();
  const { t, i18n } = useTranslation();
  const [qr_code, setQr_code] = useState('null');

  function get_qr_code() {
    // Make a request for a user with a given ID
    axios
      .get(Const.BASE_URL + 'pay')
      .then(function(response) {
        // handle success
        console.log(setQr_code(response.data.output));
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }

  return (
    <Box
      display='flex'
      justifyContent='flex-start'
      alignItems='center'
      p={'30px'}
      flexDirection='column'
    >
      {/* <QRCode value={ qr_code } />

      <Button variant="contained" color="primary" onClick={get_qr_code}>
        Get QR for pay
      </Button>
      <img src={logo} /> */}

      <Box>
        <Typography
          variant='caption'
          color='primary'
          className={styles.smallGrayTitle}
        >
          {t('welcome')}
        </Typography>
        <Typography
          variant='h5'
          component='h5'
          className={styles.bigHeading}
          style={{ marginBottom: '-5px' }}
        >
          {t('register_subheading')}
        </Typography>
      </Box>
    </Box>
  );
};

const StudentAt = ({ studentAt, setStudentAt, position }) => {
  const styles = useStyles();
  const { t, i18n } = useTranslation();
  return (
    <Box style={{ padding: '26px' }}>
      {position == 'teacher' ? (
        <Box className={styles.smallestBlueTitle}>
          {t('you_are_a')} {t('teacher')} {t('at')}:
        </Box>
      ) : (
        <Box className={styles.smallestBlueTitle}>
          {t('you_are_a')} {t('student')} {t('at')}:
        </Box>
      )}
      <FormControl component='fieldset'>
        {/* <FormLabel component="legend">{t('you_are_a')} :</FormLabel> */}
        <RadioGroup
          aria-label='gender'
          name='student_at'
          value={studentAt}
          onChange={setStudentAt}
        >
          <FormControlLabel
            value='university'
            control={<Radio color='primary' />}
            label={t('university')}
          />
          <FormControlLabel
            value='high_school'
            control={<Radio color='primary' />}
            label={t('high_middle_school')}
          />
          <FormControlLabel
            value='primary'
            control={<Radio color='primary' />}
            label={t('primary_school')}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

const Position = ({ position, setPosition, studentAt, setStudentAt }) => {
  const styles = useStyles();
  const { t, i18n } = useTranslation();
  return (
    <>
      <Card
        style={{
          maxWidth: '600px',
          width: '600px',
          borderRadius: '10px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        <Box style={{ padding: '26px' }}>
          <Box className={styles.smallestBlueTitle}>{t('you_are_a')}:</Box>
          <FormControl component='fieldset'>
            {/* <FormLabel component="legend">{t('you_are_a')} :</FormLabel> */}
            <RadioGroup
              aria-label='gender'
              name='gender1'
              value={position}
              onChange={setPosition}
            >
              <FormControlLabel
                value='teacher'
                control={<Radio color='primary' />}
                label='Teacher'
              />
              <FormControlLabel
                value='student'
                control={<Radio color='primary' />}
                label='Student'
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {
          // (position == 'student') ?
          <StudentAt
            studentAt={studentAt}
            setStudentAt={setStudentAt}
            position={position}
          />
          //   :
          // null
        }
      </Card>
    </>
  );
};

const WhiteCard = ({
  label,
  name,
  handle,
  dropdown,
  showList,
  error,
  value,
}) => {
  const styles = useStyles();
  return (
    <>
      <Card
        style={{
          maxWidth: '600px',
          width: '600px',
          borderRadius: '10px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        <Box style={{ padding: '26px' }}>
          {/* <Box className={styles.smallestBlueTitle}>{heading}</Box> */}
          {/* <Box className={styles.smallText}>{textContent}asdf</Box> */}
          {dropdown ? (
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              onClick={showList}
            >
              <Box className={styles.smallestBlueTitle}>{label}</Box>
              <ArrowDropDownIcon style={{ color: Color.textBlue }} />
            </Box>
          ) : name == 'password' ? (
            <TextField
              id='outlined-basic'
              error={error ? true : false}
              helperText={error ? error : ''}
              label={label}
              name={name}
              onChange={handle}
              type='password'
              autoComplete='new-password'
              variant='outlined'
              value={value}
              className={styles.TextFields}
              inputProps={{
                autoComplete: 'off',
              }}
            />
          ) : (
            <TextField
              id='outlined-basic'
              error={error ? true : false}
              helperText={error ? error : ''}
              label={label}
              name={name}
              onChange={handle}
              value={value}
              variant='outlined'
              className={styles.TextFields}
              autoComplete='new-password'
              inputProps={{
                autoComplete: 'off',
              }}
            />
          )}
        </Box>
      </Card>
    </>
  );
};

const MainComponent = ({ label }) => {
  const { t, i18n } = useTranslation();
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [openUniversityList, setOpenUniversityList] = useState(false);

  const UniversityList = useSelector((store) => store.university.list);
  const CourcesList = useSelector((store) => store.course.list);
  const auth = useSelector((store) => store.auth);
  const [searchedUnis, setSearchedUnis] = useState(UniversityList);
  const [searchedCrs, setSearchedCrs] = useState(CourcesList);

  const ShowUniversityList = () => {
    setSearchedUnis(UniversityList);
    setOpenUniversityList(!openUniversityList);
  };

  const [openCourseList, setOpenCourseList] = useState(false);
  const ShowCourseList = () => {
    setSearchedCrs(CourcesList);
    setOpenCourseList(!openCourseList);
  };

  const [studentAt, setStudentAt] = useState('university');
  const [position, setPosition] = useState('teacher');

  const [uniLabel, setUniLabel] = useState(t('select_university'));
  const [crsLabel, setCrsLabel] = useState(t('select_course'));

  const [error, setError] = useState({
    full_name: false,
    username: false,
    email: false,
    password: false,
    referralCode: '',
    term_condition: '',
  });

  const [signupData, setSignupData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    university: '',
    course: '',
    referralCode: '',
    term_condition: '',
  });

  const uniSearchHandler = (event) => {
    let searchTxt = event.target.value.replace(/\s+/g, ' ').toLowerCase();
    let unis = UniversityList.filter((e) =>
      e.value.toLowerCase().includes(searchTxt)
    );
    setSearchedUnis(unis);
  };
  const crsSearchHandler = (event) => {
    let searchTxt = event.target.value.replace(/\s+/g, ' ').toLowerCase();
    let courses = CourcesList.filter((e) =>
      e.value.toLowerCase().includes(searchTxt)
    );
    setSearchedCrs(courses);
  };

  useEffect(() => {
    dispatch(getUniversityList());
    dispatch(getCourseList());

    const value = queryString.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    setSignupData((signupData) => ({
      ...signupData,
      referralCode: value.invite ? value.invite : '',
    }));
  }, [dispatch]);

  const setPositionFun = (event) => {
    event.persist();
    setPosition(event.target.value);
  };

  const setStudentAtFun = (event) => {
    event.persist();
    setStudentAt(event.target.value);
  };

  const handleSignupDataChange = (event) => {
    event.persist();
    if (event.target.type == 'checkbox') {
      if (event.target.checked) {
        event.target.value = 1;
      } else {
        event.target.value = '';
      }
    }
    setSignupData((signupData) => ({
      ...signupData,
      [event.target.name]: event.target.value,
    }));
  };

  const updateDropDownData = (name, value) => {
    setSignupData((signupData) => ({
      ...signupData,
      [name]: value,
    }));
    setOpenUniversityList(false);
    setOpenCourseList(false);
    // console.log("signupData", signupData)
    if (name === 'university') {
      setUniLabel(value);
    }
    if (name === 'course') {
      setCrsLabel(value);
    }
  };

  const checkValidation = () => {
    if (!signupData.term_condition) {
      setError((error) => ({
        ...error,
        term_condition:
          'Please accept terms & condition & fill all the required fields',
      }));
      return false;
    } else {
      setError((error) => ({
        ...error,
        term_condition: '',
      }));
    }
    return true;
  };

  const errorHandle = (err) => {
    setError((error) => ({
      ...error,
      full_name: err.full_name ? err.full_name : false,
      username: err.username ? err.username : false,
      email: err.email ? err.email : false,
      password: err.password ? err.password : false,
      referralCode: err.referralCode ? err.referralCode : false,
    }));
  };

  const handleSignup = (event) => {
    event.persist();
    if (!checkValidation()) {
      return false;
    }
    // console.log("react-redux");
    // setPageIsLoading(true);
    axios
      .post(Const.BASE_URL + 'registration', {
        ...signupData,
        user_at: studentAt,
        user_type: position == 'teacher' ? 1 : 2,
      })
      .then((response) => {
        console.log('response', response);
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.output));
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.output,
        });
        if (signupData.referralCode) {
          let lessonData = {
            id: signupData.referralCode,
            for: 'any',
            message: 'registred with referral successfully',
            receiverMsg: 'Registred with your referral code',
          };
          socket.emit('send_notification', lessonData);
        }
        const redirect = auth.userRedirect;
        dispatch(setUserRedirect('/'));
        history.push(redirect);
      })
      .catch((error) => {
        console.log('error', error.response.data);
        if (error.response.data.validationError == undefined) {
          setServerError('Server error.');
        } else {
          errorHandle(error.response.data.validationError);
        }
      });
  };

  const [serverError, setServerError] = useState(false);

  return (
    <>
      <TopPortion />
      {serverError ? (
        <>
          <Alert
            style={{
              width: '600px',
            }}
            severity='error'
          >
            {serverError}
          </Alert>
        </>
      ) : (
        ''
      )}
      <form>
        <Position
          position={position}
          setPosition={setPositionFun}
          studentAt={studentAt}
          setStudentAt={setStudentAtFun}
        />
        {/* <WhiteCardProfileImg label={"Name"} profileImg={profileImg1} /> */}
        <WhiteCard
          label={t('enter_full_name')}
          name={'full_name'}
          handle={handleSignupDataChange}
          error={error.full_name ? error.full_name : false}
        />
        <WhiteCard
          label={t('enter_username')}
          name={'username'}
          handle={handleSignupDataChange}
          error={error.username ? error.username : false}
        />
        <WhiteCard
          label={t('enter_email_id')}
          name={'email'}
          handle={handleSignupDataChange}
          error={error.email ? error.email : false}
        />
        <WhiteCard
          label={t('password_label')}
          name={'password'}
          handle={handleSignupDataChange}
          error={error.password ? error.password : false}
        />

        {studentAt == 'university' ? (
          <>
            <WhiteCard
              label={uniLabel}
              name={'university'}
              handle={handleSignupDataChange}
              dropdown={true}
              showList={ShowUniversityList}
            />
            <WhiteCard
              label={crsLabel}
              name={'course'}
              handle={handleSignupDataChange}
              dropdown={true}
              showList={ShowCourseList}
            />
          </>
        ) : null}

        <WhiteCard
          label={t('refferral_code_label')}
          value={signupData.referralCode}
          name={'referralCode'}
          handle={handleSignupDataChange}
          error={error.referralCode ? error.referralCode : false}
        />
        <FormControlLabel
          value='1'
          name={'term_condition'}
          control={<Checkbox color='primary' />}
          label={t('by_clicking_register')}
          onChange={handleSignupDataChange}
          className='register-terms'
        />
        <Link
          href='/privacy-policy'
          target='_blank'
          className='register-terms-a'
        >
          {t('terms_data_policy')}
        </Link>
        {error.term_condition ? (
          <Box style={{ color: 'red' }}>{error.term_condition}</Box>
        ) : (
          ''
        )}
        <Box
          style={{
            maxWidth: '600px',
            width: '600px',
            marginTop: '10px',
          }}
        >
          <Button
            style={{
              padding: '20px',
              marginTop: '50px',
            }}
            className={styles.blueButton}
            style={{ width: '100%', height: 'unset' }}
            onClick={handleSignup}
          >
            {t('register')}
          </Button>
        </Box>
      </form>
      {openUniversityList ? (
        <Container maxWidth='xl' className={styles.overlayWrapper}>
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
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Box></Box>
                <Box
                  className={styles.mainHeading2}
                  style={{ textAlign: 'center', paddingBottom: '10px' }}
                >
                  Select University
                </Box>
                <CloseIcon
                  style={{ color: Color.textBlue, cursor: 'pointer' }}
                  onClick={ShowUniversityList}
                />
              </Box>
              <Box
                style={{ overflow: 'scroll', height: '600px', padding: '5px' }}
              >
                <TextField
                  id='outlined-basic'
                  label='Search University'
                  variant='outlined'
                  onChange={uniSearchHandler}
                  style={{ width: '100%' }}
                />
                {searchedUnis
                  ? searchedUnis.map((v, i) => {
                      return (
                        <Button
                          key={v.id}
                          className={styles.whiteOutlinedButton}
                          onClick={() =>
                            updateDropDownData('university', v.value)
                          }
                        >
                          {v.value}
                        </Button>
                      );
                    })
                  : ''}
              </Box>
            </Box>
          </Card>
        </Container>
      ) : (
        ''
      )}
      {openCourseList ? (
        <Container maxWidth='xl' className={styles.overlayWrapper}>
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
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Box></Box>
                <Box
                  className={styles.mainHeading2}
                  style={{ textAlign: 'center', paddingBottom: '10px' }}
                >
                  Select Course
                </Box>
                <CloseIcon
                  style={{ color: Color.textBlue, cursor: 'pointer' }}
                  onClick={ShowCourseList}
                />
              </Box>

              <Box
                style={{ overflow: 'scroll', height: '600px', padding: '5px' }}
              >
                <TextField
                  id='outlined-basic'
                  label='Search Courses'
                  variant='outlined'
                  onChange={crsSearchHandler}
                  style={{ width: '100%' }}
                />
                {searchedCrs
                  ? searchedCrs.map((v, i) => {
                      return (
                        <Button
                          key={v.id}
                          className={styles.whiteOutlinedButton}
                          onClick={() => updateDropDownData('course', v.value)}
                        >
                          {v.value}
                        </Button>
                      );
                    })
                  : ''}
              </Box>
            </Box>
          </Card>
        </Container>
      ) : (
        ''
      )}
      <Box
        style={{
          maxWidth: '600px',
          width: '600px',
          marginTop: '10px',
        }}
      >
        {t('or')}
        <Link href='/login'>
          <Button
            style={{
              padding: '20px',
              marginTop: '50px',
            }}
            className={styles.blueButton}
            style={{
              width: '100%',
              height: 'unset',
              background: '#fff',
              color: '#000',
            }}
          >
            {t('login')}
          </Button>
        </Link>
      </Box>
    </>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  return (
    <>
      <MainComponent />
    </>
  );
});
export default TeamCardDemo;
