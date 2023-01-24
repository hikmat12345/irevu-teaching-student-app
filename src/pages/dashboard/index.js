import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';

import 'fontsource-roboto';
import { fade, withStyles } from '@material-ui/core/styles';
import { Header } from '../../components';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TopCard from './topCards';
import GraphCards from './graphCards';
import ClassJoinCard from '../yourClasses/common/ClassJoinCard';
import ResourceCard from './ResourceCard';
import { Fonts, Color } from '../../theme/index';
import Carousel from 'react-multi-carousel';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import 'react-multi-carousel/lib/styles.css';
import Const from '../../helpers/const';
import { getDashboardData } from '../../redux/actions/userActions';
import openSocket from 'socket.io-client';
import { useTranslation } from 'react-i18next';
// import { getClassesList } from "../../redux/actions/classesActions";
// import { getStudentClassList, getTopPerformedStudent } from "../../redux/actions/studentActions";
// import { getTopPerformedTeacher } from "../../redux/actions/teacherActions";

// import { newLessionPlan } from "../../redux/actions/lessionPlanActions";
// import { newResources } from "../../redux/actions/resourceActions";

const styles = (theme) => ({
  container: {
    alignSelf: 'flex-end',
    paddingLeft: 250,
    paddingTop: 70,
    paddingBottom: 20,
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
  bigHeading: {
    fontSize: '1.5rem',
    fontFamily: Fonts.Medium,
    opacity: '.8',
  },
  smallGrayTitle: {
    color: '#333',
    fontSize: '12px',
    fontFamily: Fonts.Medium,
    marginTop: '5px',
    display: 'block',
  },
  smallerTitle: {
    fontSize: '12px',
    fontFamily: Fonts.Regular,
    textTransform: 'uppercase',
    // opacity: ".6",
    padding: '5px 0 0 0',
    margin: '0',
  },
  dateTitle: {
    color: Color.textBlack,
    fontSize: '12px',
    fontFamily: Fonts.Regular,
    textAlign: 'center',
    opacity: '.6',
    padding: '0',
    margin: '0',
    marginBottom: '3px',
  },
  centerFlex: {
    flexDirection: 'row' /* make main axis horizontal (default setting) */,
    justifyContent: 'center' /* center items horizontally, in this case */,
    alignItems: 'center',
    margin: '0 auto',
  },
  teacherBox: {
    maxWidth: '895px',
    margin: '-10px auto 0',
    backgroundColor: 'transparent',
  },
});

const TeacherClassListing = ({ props, openClass, authUser }) => {
  const { dashboardData } = props;
  // const classList = useSelector((store) => store.classes.list);
  // const dispatch = useDispatch();

  // useEffect(() =>  {
  //     getClassesList()
  // }, [])

  return (
    <>
      {console.log('classList dashboardData.classes', dashboardData.classes)}
      {dashboardData &&
      dashboardData.classes &&
      dashboardData.classes.length > 0
        ? dashboardData.classes.map((v, i) => {
            return (
              <div key={i}>
                <ClassJoinCard data={v} openClass={openClass} />
              </div>
            );
          })
        : 'No Class found'}
    </>
  );
};

const StudentClassListing = ({ props, openClass, authUser }) => {
  const { dashboardData } = props;
  // const classList = useSelector((store) => store.students.classList);

  // const dispatch = useDispatch();

  // useEffect(() =>  {
  //     getStudentClassList()
  // }, [])

  return (
    <>
      {console.log(
        'classList dashboardData.studentsClasses',
        dashboardData.studentsClasses
      )}
      {dashboardData &&
      dashboardData.studentsClasses &&
      dashboardData.studentsClasses.length > 0
        ? dashboardData.studentsClasses.map((v, i) => {
            return (
              <Grid
                style={{ marginRight: 0, marginTop: 15 }}
                item
                xs={12}
                md={6}
                lg={4}
                key={i}
              >
                <ClassJoinCard data={v} openClass={openClass} />
              </Grid>
            );
          })
        : 'No Class found'}
    </>
  );
};

const Resource = ({ props, authUser, actionPage }) => {
  const { dashboardData } = props;

  // const newResourcesList = useSelector((store) => store.resource.new);
  // const dispatch = useDispatch();

  // useEffect(() =>  {
  //     newResources()
  // }, [])
  const resourcesimages = [
    Const.BASE_URL + 'public/images/resources/image1.jpg',
    Const.BASE_URL + 'public/images/resources/image2.jpg',
    Const.BASE_URL + 'public/images/resources/image3.jpg',
  ];

  return (
    <>
      {console.log('dashboardData.resources', dashboardData.resources)}
      {dashboardData &&
      dashboardData.resources &&
      dashboardData.resources.length > 0
        ? dashboardData.resources.map((v, i) => {
            return (
              <div key={i}>
                <ResourceCard
                  actionPage={actionPage}
                  data={v}
                  image={
                    resourcesimages[i] ? resourcesimages[i] : resourcesimages[0]
                  }
                />
              </div>
            );
          })
        : 'No Class found'}
    </>
  );
};

const LessonPlans = ({ props, authUser, actionPage }) => {
  const { dashboardData } = props;

  // const newLessionPlanList = useSelector((store) => store.lessionPlan.new);
  // const dispatch = useDispatch();

  // useEffect(() =>  {
  //     newLessionPlan()
  // }, [])
  const lessonplanimages = [
    Const.BASE_URL + 'public/images/lesson-plans/image1.jpg',
    Const.BASE_URL + 'public/images/lesson-plans/image2.jpg',
    Const.BASE_URL + 'public/images/lesson-plans/image3.jpg',
  ];
  return (
    <>
      {console.log('dashboardData.lessonPlans', dashboardData.lessonPlans)}
      {dashboardData &&
      dashboardData.lessonPlans &&
      dashboardData.lessonPlans.length > 0
        ? dashboardData.lessonPlans.map((v, i) => {
            return (
              <div key={i}>
                <ResourceCard
                  actionPage={actionPage}
                  data={v}
                  image={
                    lessonplanimages[i]
                      ? lessonplanimages[i]
                      : lessonplanimages[0]
                  }
                />
              </div>
            );
          })
        : 'No Class found'}
    </>
  );
};

const Dashboard = (props) => {
  const { classes, history, getDashboardData, dashboardData } = props;
  // const dispatch = useDispatch();

  const authUser = useSelector((store) => store.auth.user);
  // const store = useSelector((store) => store)

  // const [topRatedTeachers, setTopRatedTeachers] = useState([]);
  // const [topRatedStudents, setTopRatedStudents] = useState([]);

  // const topRated = useSelector((store) => store.users.top);
  // const topRatedStudents = useSelector((store) => store.students.topRated);

  useEffect(() => {
    getDashboardData();
    // dispatch( getTopRatedList() )
    // dispatch( getTopPerformedStudent() )
  }, []);

  // useEffect(() => {
  //   setTopRatedTeachers(store.teachers.topRated)
  //   setTopRatedStudents(store.students.topRated)
  // }, [store])
  const { t, i18n } = useTranslation();
  const openClass = () => {
    history.push('your-classes');
  };

  const openResourcePage = (id = '') => {
    history.push('resources?id=' + id);
  };

  const openLessionPlanPage = (id = '') => {
    history.push('lesson-plan?id=' + id);
  };

  const generateGreetings = () => {
    var currentHour = moment().format('HH');
    // var currentHour = 22;
    if (currentHour >= 3 && currentHour < 12) {
      return t('good_morning');
    } else if (currentHour >= 12 && currentHour < 15) {
      return t('good_afternoon');
    } else if (currentHour >= 15 && currentHour < 20) {
      return t('good_evening');
    } else {
      return authUser.user_type == 1 ? 'Hello Teacher' : 'Hello Student';
    }
  };

  return (
    <>
      <Header history={history} />
      <Container maxWidth='xl' className={classes.container}>
        <Box flexWrap='wrap' p={2} m={0} bgcolor='background.paper'>
          <Typography
            variant='h5'
            component='h5'
            className={classes.bigHeading}
            style={{ marginBottom: '-5px' }}
            color={'primary'}
          >
            {generateGreetings()},{' '}
            {authUser.first_name ? authUser.first_name : ''}.{' '}
          </Typography>
          <Typography
            variant='caption'
            color='primary'
            className={classes.smallGrayTitle}
          >
            {moment().format('dddd, DD MMMM YYYY')}, {t('good_day_label')}.
          </Typography>

          <Box
            paddingTop={1}
            bgcolor='background.paper'
            className='dashboard-section-1'
          >
            <Typography
              variant='h5'
              component='h5'
              className={classes.mainHeading}
              style={{ marginTop: '15px' }}
              color={'primary'}
            >
              {t('top_performing_teachers')}
            </Typography>
            <Typography
              variant='caption'
              color='primary'
              className={classes.smallGrayTitle}
            >
              {t('top_3performers_each_month_win')} 300, 200, 100 {t('rmb')}
            </Typography>
            <Box
              display='flex'
              flexDirection='row'
              flexWrap='wrap'
              paddingTop={0}
              bgcolor='background.paper'
              className={classes.centerFlex}
            >
              {console.log(
                'topRated.teachers dashboardData.teachers',
                dashboardData.teachers
              )}
              {dashboardData &&
              dashboardData.teachers &&
              dashboardData.teachers.length > 0
                ? dashboardData.teachers.map((value, i) => {
                    return (
                      <div key={i}>
                        <div key={i}>
                          <TopCard authUser={authUser} value={value} />
                        </div>
                      </div>
                    );
                  })
                : ''}
            </Box>
          </Box>

          <Box
            paddingTop={1}
            bgcolor='background.paper'
            className='dashboard-section-2'
          >
            <Typography
              variant='h5'
              component='h5'
              className={classes.mainHeading}
              style={{ marginTop: '15px' }}
              color={'primary'}
            >
              {t('top_performing_students')}
            </Typography>
            <Typography
              variant='caption'
              color='primary'
              className={classes.smallGrayTitle}
            >
              {t('top_3performers_each_month_win')} 300, 200, 100 {t('rmb')}
            </Typography>
            <Box
              display='flex'
              flexDirection='row'
              flexWrap='wrap'
              paddingTop={0}
              bgcolor='background.paper'
              className={classes.centerFlex}
            >
              {console.log(
                'topRated.students dashboardData.students',
                dashboardData.students
              )}
              {dashboardData &&
              dashboardData.students &&
              dashboardData.students.length > 0
                ? dashboardData.students.map((value, i) => {
                    return (
                      <div key={i}>
                        <div key={i}>
                          <TopCard authUser={authUser} value={value} />
                        </div>
                      </div>
                    );
                  })
                : ''}
            </Box>
          </Box>

          {(authUser.user_type == 2 ||
            (authUser.user_type == 1 && authUser.subscription_status == 1)) && (
            <Box
              paddingTop={2}
              bgcolor='background.paper'
              className='dashboard-section-3'
            >
              <Typography
                variant='h5'
                component='h5'
                className={classes.mainHeading}
                style={{ marginTop: '5px' }}
                color={'primary'}
              >
                {t('my_classes')}
              </Typography>
              <Box
                display='flex'
                flexDirection='row'
                flexWrap='wrap'
                paddingTop={0}
                bgcolor='background.paper'
                maxWidth='310'
                className={[classes.centerFlex, classes.teacherBox].join(' ')}
              >
                {authUser.user_type == 1 ? (
                  <>
                    <TeacherClassListing
                      props={props}
                      openClass={openClass}
                      authUser={authUser}
                    />
                  </>
                ) : (
                  <StudentClassListing
                    props={props}
                    openClass={openClass}
                    authUser={authUser}
                  />
                )}
              </Box>
            </Box>
          )}

          <Box
            paddingTop={4}
            bgcolor='background.paper'
            className='dashboard-section-4'
          >
            <Typography
              variant='h5'
              component='h5'
              className={classes.mainHeading}
              style={{ marginBottom: '-5px' }}
              color={'primary'}
            >
              {authUser.user_type == 1 ? (
                <>{t('lesson_plans')}</>
              ) : (
                <>{t('resources')}</>
              )}
            </Typography>
            <Box
              display='flex'
              flexDirection='row'
              flexWrap='wrap'
              paddingTop={0}
              bgcolor='background.paper'
              className={classes.centerFlex}
            >
              {authUser.user_type == 2 ? (
                <>
                  <Resource
                    props={props}
                    authUser={authUser}
                    actionPage={openResourcePage}
                  />
                </>
              ) : (
                <LessonPlans
                  props={props}
                  authUser={authUser}
                  actionPage={openLessionPlanPage}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDashboardData: () => dispatch(getDashboardData()),
    // getClassesList: () => dispatch( getClassesList() ),
    // getStudentClassList: () => dispatch( getStudentClassList() ),
    // newResources: () => dispatch( newResources() ),
    // newLessionPlan: () => dispatch( newLessionPlan() )
  };
};

const mapStateToProps = (state) => {
  return {
    dashboardData: state.users.dashboard,
    // classList: state.classes.list,
    // studentClassList: state.students.classList,
    // newResourcesList: state.resource.new,
    // newLessionPlanList: state.lessionPlan.new,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Dashboard));
// export default withStyles(styles, { withTheme: true })(Dashboard);
