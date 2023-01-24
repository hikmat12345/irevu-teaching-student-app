import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import AccountDetails from './AccountDetails';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Fonts, BgColor, Color } from '../../theme/index';
import { fade, withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const styles = makeStyles(() => ({
  container: {
    alignSelf: 'flex-end',
    // paddingLeft: 250,
    // paddingTop: 70,
    // paddingBottom: 20,
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
    fontSize: '20px',
    fontFamily: Fonts.Medium,
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
  center: {
    display: 'inline-block',
    position: 'relative',
  },
}));

const Login = () => {
  const classes = styles();
  const history = useHistory();

  const moveToRegister = () => {
    history.push('/register');
  };
  const { t, i18n } = useTranslation();
  return (
    <>
      {/* <Header history={this.props.history} /> */}
      <Container maxWidth='xl' className={classes.container + ' login-main'}>
        <Box
          flexWrap='wrap'
          p={2}
          m={0}
          bgcolor='background.paper'
          className={classes.center}
        >
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
          >
            {/* <Typography className={classes.mainHeading}>Register</Typography> */}

            {/* <Box>
              <Button
                className={classes.blueButton}
                style={{ marginRight: "10px" }}
              >
                Withdraw
              </Button>
              <Button className={classes.blueButton} onClick={this.openTopup}>
                TopUp
              </Button>
            </Box> */}
          </Box>

          <AccountDetails />

          <Box
            style={{
              maxWidth: '600px',
              width: '600px',
              marginTop: '10px',
            }}
          >
            {t('or')}
            <Button
              style={{
                padding: '20px',
                marginTop: '50px',
              }}
              className={styles.blueButton}
              style={{ width: '100%', height: 'unset' }}
              onClick={moveToRegister}
            >
              {t('register')}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

// const mapDispatchToProps = dispatch => {
//   return {
//     // ...other methods,
//     dispatch                // ← Add this
//   }
// }

// const mapStateToProps = state => {
//   return {
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, { withTheme: true })(Login)));
export default Login;
