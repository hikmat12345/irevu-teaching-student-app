import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { BgColor, Color, Fonts } from '../../theme/index';
import { FormField } from '../../components';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';

import { getUniversityList } from '../../redux/actions/universityActions';
import { getCourseList } from '../../redux/actions/courseActions';
import { updateProfile } from './../../redux/actions/userActions';

const useStyles = makeStyles(() => ({
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
}));

const StudentAt = ({ studentAt, setStudentAt }) => {
  const styles = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <Box style={{ padding: '26px' }}>
      <Box className={styles.smallestBlueTitle}>{t('education')}</Box>
      <FormControl component='fieldset'>
        {/* <FormLabel component="legend">Your are a :</FormLabel> */}
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

const MainComponent = (props) => {
  const { t, i18n } = useTranslation();
  const { authUser, editProfilePage } = props;
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [studentAt, setStudentAt] = useState(authUser.user_at);

  const [formData, setFormDataData] = useState({
    fullName: authUser.fullName,
    username: authUser.username,
    email: authUser.email,
    course: authUser.courseId,
    university: authUser.universityId,
  });

  const setStudentAtFun = (event) => {
    event.persist();
    setStudentAt(event.target.value);
  };

  const [error, setError] = useState({
    full_name: false,
    username: false,
    email: false,
  });

  useEffect(() => {
    dispatch(getUniversityList());
    dispatch(getCourseList());
  }, [dispatch]);

  const UniversityList = useSelector((store) => store.university.list);
  const CourcesList = useSelector((store) => store.course.list);

  const handleFormDataChange = (event) => {
    event.persist();
    setFormDataData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const errorHandle = (err) => {
    setError((error) => ({
      ...error,
      full_name: err.full_name ? err.full_name : false,
    }));
  };

  const update = (event) => {
    event.persist();
    formData.user_at = studentAt;

    dispatch(updateProfile(formData)).then((response) => {
      // console.log("response", response)
      if (response.type == 'error') {
        // setError((error) => ({
        //     ...error,
        //     old_password: response.payload.error,
        // }));
      } else {
        dispatch({
          type: 'LOGIN_USER_DATA',
          payload: response.data,
        });
        editProfilePage();
        // window.location.reload();
      }
    });
  };

  return (
    <>
      <Box
        style={{
          display: 'inline-block',
          position: 'relative',
        }}
      >
        <CloseIcon
          style={{ color: Color.textBlue, cursor: 'pointer' }}
          onClick={editProfilePage}
        />
        <FormField
          label={t('full_name')}
          value={formData.fullName}
          name={'fullName'}
          handle={handleFormDataChange}
          error={error.full_name ? error.full_name : false}
        />
        <FormField
          label={t('email')}
          value={formData.email}
          name={'email'}
          handle={handleFormDataChange}
          error={error.email ? error.email : false}
        />
        <FormField
          label={t('username')}
          value={formData.username}
          name={'username'}
          handle={handleFormDataChange}
          error={error.username ? error.username : false}
        />
        {/* <FormField label={"Email"} name={"email"} handle={handleFormDataChange} error={ (error.email) ? error.email : false } /> */}

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
            <StudentAt studentAt={studentAt} setStudentAt={setStudentAtFun} />
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
            <InputLabel id='university_label'>{t('university')}</InputLabel>
            <Select
              value={formData.university}
              id='university_label'
              name='university'
              onChange={handleFormDataChange}
              style={{ width: '100%' }}
            >
              <MenuItem>Select University</MenuItem>
              {UniversityList.map((v, i) => {
                return (
                  <MenuItem key={v.id} value={v.id}>
                    {v.value}
                  </MenuItem>
                );
              })}
            </Select>
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
            <InputLabel id='course_label'>{t('course')}</InputLabel>
            <Select
              value={formData.course}
              id='course'
              name='course'
              onChange={handleFormDataChange}
              style={{ width: '100%' }}
            >
              <MenuItem>Select Course</MenuItem>
              {CourcesList.map((v, i) => {
                return (
                  <MenuItem key={v.id} value={v.id}>
                    {v.value}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Card>
        <Box
          style={{
            maxWidth: '600px',
            width: '600px',
            marginTop: '10px',
          }}
        >
          <Button
            style={{
              marginTop: '50px',
              width: '100%',
              height: 'unset',
            }}
            className={styles.blueButton}
            onClick={update}
          >
            {t('save_capital')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default MainComponent;
