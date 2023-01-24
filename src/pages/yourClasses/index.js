import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  Box,
  Button
} from "@material-ui/core";
import { BgColor, Color, Fonts } from "../../theme/index";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { Header } from "../../components";

import TeacherClass from "./teacher/TeacherClass";
import StudentClass from "./student/StudentClass";

const useStyles = (theme) => ({
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

const YourClasses = (props) => {
  const authUser = useSelector((store) => store.auth.user);
  const { classes } = props;

  return (
    <>
      <Header history={props.history} />
      <Container maxWidth="xl" className={classes.container + ' classes-main'}>
          <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
            {(authUser.subscription_status == 2 && authUser.user_type == 1) ? 
              (<h1>Please Subscribe your subscription is expired</h1>)
              :
              (
                (authUser.user_type == 1) ? (
                  <TeacherClass authUser={authUser} />
                ) : (
                  <StudentClass authUser={authUser} />
                )
              )
            }
          </Box>
      </Container>
    </>
  );
};

export default withStyles(useStyles, { withTheme: true })(YourClasses);
