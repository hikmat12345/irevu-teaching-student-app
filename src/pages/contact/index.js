import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import { Header } from '../../components';
import ContactUs from './ContactUs';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Fonts, BgColor, Color } from '../../theme/index';
import { fade, withStyles } from '@material-ui/core/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useTranslation } from 'react-i18next';
const styles = (theme) => ({
  container: {
    alignSelf: 'flex-end',
    // paddingLeft: 250,
    paddingTop: 70,
    marginLeft: '80px',
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
    borderRadius: '5px',
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
});

const Contact = (props) => {
  const authUser = useSelector((store) => store.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const { classes } = props;
  const { t, i18n } = useTranslation();
  return (
    <>
      <Header history={history} />
      <Container maxWidth='xl' className={classes.container}>
        <Box
          flexWrap='wrap'
          p={2}
          m={0}
          bgcolor='background.paper'
          className={classes.center}
        >
          <Typography className={classes.mainHeading}>
            {t('contact_us')}
          </Typography>
          <ContactUs />
        </Box>
      </Container>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Contact);
