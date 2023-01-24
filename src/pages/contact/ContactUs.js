import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { BgColor, Color, Fonts } from '../../theme/index';
import {
  Box,
  TextField,
  Button,
  Card,
  Container,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import { submitContact } from './../../redux/actions/contactActions';
import { useTranslation } from 'react-i18next';
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
  LightText: {
    color: BgColor.myBlack,
    fontSize: '14px',
    fontFamily: Fonts.Medium,
    opacity: 0.4,
  },
}));

const WhiteCard = ({ label, textArea, name, value, handleChange, error }) => {
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
          {!textArea ? (
            <TextField
              id='outlined-basic'
              error={error ? true : false}
              helperText={error ? error : ''}
              name={name}
              value={value}
              onChange={handleChange}
              label={label}
              variant='outlined'
              className={styles.TextFields}
            />
          ) : (
            <TextField
              label={label}
              error={error ? true : false}
              helperText={error ? error : ''}
              name={name}
              value={value}
              onChange={handleChange}
              multiline={true}
              rows={5}
              variant='outlined'
              className={styles.TextFields}
            />
          )}
        </Box>
      </Card>
    </>
  );
};

const MainComponent = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    e.persist();
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const checkValidation = () => {
    var isError = false;
    if (!formData.name) {
      setError((formData) => ({
        ...formData,
        name: 'Please enter name.',
      }));
      isError = true;
    }
    if (!formData.email) {
      setError((formData) => ({
        ...formData,
        email: 'Please enter email.',
      }));
      isError = true;
    }
    if (!formData.message) {
      setError((formData) => ({
        ...formData,
        message: 'Please enter message.',
      }));
      isError = true;
    }
    return isError;
  };
  const history = useHistory();
  const handleSubmit = (e) => {
    e.persist();
    if (checkValidation()) {
      return false;
    }

    dispatch(submitContact(formData)).then((res) => {
      if (res.type == 'success') {
        setSuccessMessage('Message sent successfully!');
        toast.success('Message Sent Successfully');
        setTimeout(() => {
          history.push('/dashboard');
        }, 1000);

        // setFormData({
        //   name : "",
        //   email : "",
        //   message : "",
        // })
      }
    });
  };
  const { t, i18n } = useTranslation();
  return (
    <>
      <WhiteCard
        name='name'
        value={formData.name}
        handleChange={handleChange}
        error={error.name}
        label={t('name')}
      />
      <WhiteCard
        name='email'
        value={formData.email}
        handleChange={handleChange}
        error={error.email}
        label={t('email')}
      />
      <WhiteCard
        name='message'
        value={formData.message}
        handleChange={handleChange}
        error={error.message}
        textArea
        label={t('message')}
      />

      <Box
        style={{
          maxWidth: '600px',
          width: '600px',
          marginTop: '10px',
        }}
      >
        <Typography
          className={styles.LightText}
          style={{ textAlign: 'center', padding: '10px 0' }}
        >
          {t('send_us_an_email_message_text')}
        </Typography>
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
          // style={{ width: '100%', height: 'unset' }}
          onClick={handleSubmit}
        >
          {t('send_message')}
        </Button>
      </Box>
    </>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  return (
    <>
      <MainComponent props={props} />
    </>
  );
});
export default TeamCardDemo;
