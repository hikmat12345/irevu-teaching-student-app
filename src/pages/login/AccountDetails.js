import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core';
import { BgColor, Color, Fonts } from '../../theme/index';
// import { FormField } from '../../components';
import { login, setUserRedirect } from '../../redux/actions/authActions';
import { Link } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  Box,
  Button,
  Card,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import { logo, logo_chi } from '../../assets/index';
import { TextFieldsOutlined, TextFieldsSharp } from '@material-ui/icons';

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
    fontSize: '20px',
    fontFamily: Fonts.Medium,
    opacity: '0.5',
  },
  forgotPass: {
    marginTop: '14px',
    textAlign: 'right',
    marginTop: '10px',
  },
  forgotButton: {
    '&:hover': {
      backgroundColor: 'whitesmoke',
      padding: '5px',
      borderRadius: '7px',
    },
  },
}));

const Position = ({ position, handle }) => {
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
          <Box className={styles.smallestBlueTitle}>{t('you_are_a:')}</Box>
          <FormControl component='fieldset'>
            {/* <FormLabel component="legend">Your are a :</FormLabel> */}
            <RadioGroup
              aria-label='gender'
              name='gender1'
              value={position}
              onChange={handle}
            >
              <FormControlLabel
                value='teacher'
                control={<Radio color='success' />}
                label='Teacher'
              />
              <FormControlLabel
                value='student'
                control={<Radio color='success' />}
                label='Student'
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Card>
    </>
  );
};

const TopPortion = ({ label, profileImg }) => {
  const styles = useStyles();
  const { t, i18n } = useTranslation();
  return (
    <Box
      display='flex'
      justifyContent='flex-start'
      alignItems='center'
      p={'30px'}
    >
      <img
        src={t('login') == 'LOGIN' ? logo : logo_chi}
        style={{ height: '110px', width: 'auto' }}
      />
      <Box style={{ textAlign: 'center', width: '65%' }}>
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
          {t('login')}
        </Typography>
      </Box>
    </Box>
  );
};
const MainComponent = ({ props }) => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const [user_type, setUserType] = useState('teacher');
  const [error, setError] = useState(false);
  const { t, i18n } = useTranslation();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const setUserTypeFun = (event) => {
    event.persist();
    setUserType(event.target.value);
  };

  const handleDataChange = (event) => {
    event.persist();
    setLoginData((loginData) => ({
      ...loginData,
      [event.target.name]: event.target.value,
    }));
  };

  const checkValidation = () => {
    return true;
  };

  const handleSubmit = (event) => {
    event.persist();
    if (!checkValidation()) {
      return false;
    }
    // setPageIsLoading(true);
    dispatch(
      login({
        ...loginData,
        user_type: user_type == 'teacher' ? 1 : 2,
      })
    ).then((res) => {
      if (res.type == 'success') {
        const redirect = auth.userRedirect;
        dispatch(setUserRedirect(redirect));
        history.push(redirect);
      } else if (res.type == 'error') {
        setError(res.payload.error);
      } else {
        setError('Server Error.');
      }
    });
  };

  return (
    <>
      <TopPortion />
      {/* <Position 
        position={user_type}
        setPosition= {setUserTypeFun} /> */}
      {error ? (
        <>
          <Alert
            style={{
              width: '600px',
            }}
            severity='error'
          >
            {error}
          </Alert>
        </>
      ) : (
        ''
      )}
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
          <TextField
            label={t('enter_username')}
            variant='outlined'
            name='username'
            onChange={handleDataChange}
            className={styles.TextFields}
          />
        </Box>
      </Card>

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
          <TextField
            label={t('password_label')}
            name='password'
            onChange={handleDataChange}
            type='password'
            variant='outlined'
            className={styles.TextFields}
          />
        </Box>
      </Card>
      <Box className={styles.forgotPass}>
        <Link href='/forgot-password' className={styles.forgotButton}>
          {t('forgot_password')}
        </Link>
      </Box>
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
          onClick={handleSubmit}
        >
          {t('login')}
        </Button>
      </Box>
    </>
  );
};

// export default withStyles(useStyles, { withTheme: true })(MainComponent);

export default MainComponent;
