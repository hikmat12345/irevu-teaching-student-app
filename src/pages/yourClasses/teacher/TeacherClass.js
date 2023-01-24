import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../../../components";
import "react-multi-carousel/lib/styles.css";
import "react-multi-carousel/lib/styles.css";
import { withRouter } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { Fonts, BgColor, Color } from "./../../../theme/index";
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button,
    Typography,
    withStyles,
    Container,
    makeStyles,
    Grid,
} from "@material-ui/core";

import AddClass from "./AddClass";
import ClassJoinCard from "../common/ClassJoinCard";
// import OpenedHomeWork from "./OpenedHomeWork";
// import SubmitHomework from "./../SubmitHomework";
import UnCheckedGradedHomeWork from "./../UnCheckedGradedHomeWork";
// import CreateHomeWorkPage from "./CreateHomeWorkPage";
// import OpenedClassPage from "../class/OpenedClassPage";

import { getClassesList, createClass, getClass } from "./../../../redux/actions/classesActions";

const mystyles = (theme) => ({
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
const useStyles = makeStyles(() => ({
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
}));

const TeacherClass = (props) => {
  const {t , i18n} = useTranslation()
    const { classes, authUser } = props;
    const styles = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        myClasses: [],
        openedClassPage: false,
        createHomeWorkPage: false,
        openHomework: false,
        submitHomework: false,
        unCheckedGradedHomeWork: false,
        openAssignment: false,
        addClass: false,
    });
    const classList = useSelector((store) => store.classes.list);

    useEffect(() => {
        dispatch(getClassesList());
    }, [dispatch]);

//   constructor(props) {
//     // super(props);
//     // props.dispatch( getClassesList() )
//     state = {
//       myClasses: [],
//       openedClassPage: false,
//       createHomeWorkPage: false,
//       openHomework: false,
//       submitHomework: false,
//       unCheckedGradedHomeWork: false,
//       openAssignment: false,
//       addClass: false,
//     };
//     // openClass = openClass.bind(this);
//   }
  const addingClass = () => {
    setState({ addClass: !state.addClass });
  }
  const openClass = (id, class_id) => {
    history.push("/class?id="+class_id);
    // setState({ openedClassPage: !state.openedClassPage });
  };

  const openCreateHomeWorkPage = () => {
    setState({
      createHomeWorkPage: !state.createHomeWorkPage,
      openedClassPage: !state.openedClassPage,
    });
  };
  const openHomework = () => {
    setState({
      createHomeWorkPage: false,
      openedClassPage: false,
      openHomework: !state.openHomework,
    });
  };
  const openSubmitHomework = () => {
    setState({
      createHomeWorkPage: false,
      openedClassPage: false,
      openHomework: false,
      submitHomework: !state.submitHomework,
    });
  };
  const openUnCheckedGradedHomeWork = () => {
    setState({
      // createHomeWorkPage: false,
      // openedClassPage: false,
      // openHomework: !state.openHomework,
      unCheckedGradedHomeWork: !state.unCheckedGradedHomeWork,
    });
  };
  // const setOpenAssignment = () => {
  //   // console.log("ghon");
  //   setState({
  //     openAssignment: !openAssignment,
  //   });
  // };

    return (
      <>
        <Box flexWrap="wrap" m={0} p={0} bgcolor="background.paper">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              {!state.createHomeWorkPage ? (
                <>
                  {!state.openHomework && !state.submitHomework ? (
                    <>
                      {!state.unCheckedGradedHomeWork ? (
                        <Typography className={classes.mainHeading}
                        style={{ fontSize: "20px", fontFamily: "PoppinsMedium" }}
                        >
                          {t('my_classes')}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              {state.openedClassPage && !state.createHomeWorkPage ? (
                <CloseIcon
                  style={{ color: Color.textBlue, cursor: "pointer" }}
                  onClick={openClass}
                />
              ) : (
                ""
              )}
              <Button
                className={styles.blueButton}
                onClick={addingClass}
              >
                {t('add_class_capital')}
              </Button>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              paddingTop={0}
              bgcolor="background.paper"
              className="my-classess-main"
            >
              {
                (classList) ? (classList.map((v, i) => {
                  return (
                    <Grid
                      style={{
                        marginRight: 0,
                        marginTop: 15,
                      }}
                      item
                      xs={12}
                      md={6}
                      lg={3}
                      key={i}
                    >
                      <ClassJoinCard
                          authUser={authUser}
                          data={v}
                          openClass={openClass}
                      />
                    </Grid>
                  );
                })) : ( "" )
              }
            </Box>
            {
            // state.openedClassPage ? (
            //   <OpenedClassPage
            //     openCreateHomeWorkPage={openCreateHomeWorkPage}
            //     openHomework={openHomework}
            //     openSubmitHomework={openSubmitHomework}
            //   />
            // ) : (
            //   ""
            // )
            }
            {/* {state.openHomework ? (
              <OpenedHomeWork
                openHomework={openHomework}
                setOpenAssignment={setOpenAssignment}
                openAssignment={state.openAssignment}
              />
            ) : (
              ""
            )} */}
            {/* {state.submitHomework ? (
              <SubmitHomework openSubmitHomework={openSubmitHomework} />
            ) : (
              ""
            )} */}

            {state.unCheckedGradedHomeWork ? (
              <UnCheckedGradedHomeWork
              // openUnCheckedGradedHomeWork={openUnCheckedGradedHomeWork}
              />
            ) : (
              ""
            )}
            {/* <GradedHomeWork /> */}
            {/* {state.createHomeWorkPage ? (
              <>
                <CreateHomeWorkPage
                  openCreateHomeWorkPage={openCreateHomeWorkPage}
                />
              </>
            ) : (
              ""
            )} */}
          </Box>
          {state.addClass ? <AddClass addingClass={addingClass} /> : ""}
      </>
    );
}

export default withStyles(mystyles, { withTheme: true })(TeacherClass);
