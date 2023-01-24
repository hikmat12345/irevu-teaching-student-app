import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "./../../components";
import CloseIcon from "@material-ui/icons/Close";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Fonts, BgColor, Color } from "./../../theme/index";
import { fade, withStyles } from "@material-ui/core/styles";
import queryString from 'query-string';


import CreateHomeWorkPage from "./homework/CreateHomeWorkPage";
import OpenedHomeWork from "./homework/OpenedHomeWork";
import TeacherOpenedClass from "./teacher/TeacherOpenedClass";
import StudentOpenedClass from "./student/StudentOpenedClass";
import SubmitHomework from "./student/SubmitHomework";


import { getClass, enrollStudentsList } from "../../redux/actions/classesActions";
import { enrolledClassDetail, getStudentHomeworkList } from "./../../redux/actions/studentActions";

const styles = (theme) => ({
    container: {
      alignSelf: "flex-end",
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
      fontSize: "20px",
      fontFamily: Fonts.Medium,
    },
    blueButton: {
      color: "#fff",
      height: "40px",
      borderRadius: "5px",
      backgroundColor: BgColor.myBlue,
      border: "1px solid transparent",
      padding: "0 20px",
      "&:hover": {
        color: Color.textBlue,
        border: "1px solid" + Color.textBlue,
      },
    },
});

const MyClass = (props) => {
    const authUser = useSelector((store) => store.auth.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const [openedHomeworkId, setOpenedHomeworkId] = useState(false);

    const { classes } = props;

    useEffect(() => {
      const value=queryString.parse(window.location.search, { ignoreQueryPrefix: true });
      dispatch(getClass(value.id)).then( (res) => {
        console.log("res", res)
        if ( res.type == 'success' ) {
          dispatch(enrollStudentsList({class_id: res.payload.id})).then( (response) => {
            dispatch(getStudentHomeworkList(res.payload.id))
          })
        }
      })
    }, [dispatch]);

    const [homeworkData, setHomeworkData] = useState({
        openedClassPage: true,
        createHomeWorkPage: false,
        openHomework: false,
        submitHomework: false,
        openAssignment: false,
    });

    const openCreateHomeWorkPage = () => {
        setHomeworkData((homeworkData) => ({
          ...homeworkData,
          createHomeWorkPage: !homeworkData.createHomeWorkPage,
          openedClassPage: !homeworkData.openedClassPage,
        }));
    };

    const openHomework = (id) => {
      if (authUser.user_type == 1) {
        setOpenedHomeworkId(id);
        setHomeworkData((homeworkData) => ({
          ...homeworkData,
          openedClassPage: !homeworkData.openedClassPage,
          createHomeWorkPage: false,
          openHomework: !homeworkData.openHomework,
        }));
        
      } else {
        history.push("/homework-feedback/"+id)
      }
    };
    const openSubmitHomework = (id) => {
      setOpenedHomeworkId(id);
      setHomeworkData((homeworkData) => ({
          ...homeworkData,
          createHomeWorkPage: false,
          openedClassPage: !homeworkData.openedClassPage,
          openHomework: false,
          submitHomework: !homeworkData.submitHomework,
      }));
    };
    const setOpenAssignment = () => {
      setHomeworkData((homeworkData) => ({
        ...homeworkData,
        openedClassPage: false,
        createHomeWorkPage: false,
        openHomework: true,
        openAssignment: !homeworkData.openAssignment,
      }));
    };

    return (
        <>
            <Header history={history} />
            <Container maxWidth="xl" className={classes.container + ' opened-classes-main'}>
                <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
                    {
                      (authUser.user_type == 1) ? (
                        <>
                          {homeworkData.openedClassPage ? (
                            <TeacherOpenedClass
                                openCreateHomeWorkPage={openCreateHomeWorkPage}
                                openHomework={openHomework}
                                authUser={authUser}
                            />
                            ) : ("")
                          }
                          {homeworkData.createHomeWorkPage ? (
                              <CreateHomeWorkPage
                                openCreateHomeWorkPage={openCreateHomeWorkPage}
                                authUser={authUser}
                              />
                            ) : ("")
                          }
                        </>
                      ) : (
                        <>
                          {homeworkData.openedClassPage ? (
                              <StudentOpenedClass
                                  openCreateHomeWorkPage={openCreateHomeWorkPage}
                                  openHomework={openHomework}
                                  openSubmitHomework={openSubmitHomework}
                                  authUser={authUser}
                              />
                              ) : ("")
                            }
                        </>
                      )
                    }
                    {homeworkData.openHomework ? (
                        <OpenedHomeWork
                          openHomework={openHomework}
                          setOpenAssignment={setOpenAssignment}
                          openAssignment={homeworkData.openAssignment}
                          openedHomeworkId={openedHomeworkId}
                          authUser={authUser}
                        />
                      ) : ("")
                    }
                    {homeworkData.submitHomework ? (
                        <SubmitHomework
                          openHomework={openHomework}
                          openSubmitHomework={openSubmitHomework}
                          setOpenAssignment={setOpenAssignment}
                          openAssignment={homeworkData.openAssignment}
                          openedHomeworkId={openedHomeworkId}
                          authUser={authUser}
                        />
                      ) : ("")
                    }
                </Box>
            </Container>
        </>
    );
}

export default (withStyles(styles, { withTheme: true })(MyClass))