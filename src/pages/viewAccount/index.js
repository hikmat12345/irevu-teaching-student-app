import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import { Header } from "../../components";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Fonts, BgColor, Color } from "../../theme/index";
import { fade, withStyles } from "@material-ui/core/styles";

import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";
import ChangePassword from "./ChangePassword";
import { useTranslation } from 'react-i18next';

const styles = (theme) => ({
  container: {
    alignSelf: "flex-end",
    paddingLeft: 250,
    paddingTop: 70,
    paddingBottom: 20,
    textAlign: "center",
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
    padding: "0 20px",
    "&:hover": {
      color: Color.textBlue,
      border: "1px solid" + Color.textBlue,
    },
  },
  center : {
    display:"inline-block",
    position:"relative"
  }
});

const ViewAccount = (props) => {
  const {t , i18n} = useTranslation()
  const { classes } = props;
  const authUser = useSelector((store) => store.auth.user);

  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);

  const editProfilePage = () => {
    setIsProfileEdit(!isProfileEdit)
  }

  const changePassword = () => {
    setIsChangePass(!isChangePass)
  }

  return (
    <>
      <Header history={props.history} authUser={authUser} />
      <Container maxWidth="xl" className={classes.container}>
        <Box width="100%" bgcolor="background.paper" className={classes.center}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
          >
            <Typography className={classes.mainHeading}
               style={{ fontSize: "20px", fontFamily: "PoppinsMedium" }}
            >
              {t('view_account')}
            </Typography>
          </Box>
          {
            ( isChangePass ) ? (
              <ChangePassword authUser={authUser} changePassword={changePassword} />
            ) : ('')
          }
          {
            ( isProfileEdit ) ? (
              <EditProfile authUser={authUser} editProfilePage={editProfilePage} />
            ) : ('')
          }
          {
            ( !isProfileEdit && !isChangePass ) ? (
              <ViewProfile authUser={authUser} changePassword={changePassword} editProfilePage={editProfilePage} />
            ) : ('')
          }
        </Box>
      </Container>
    </>
  )
}

export default withStyles(styles, { withTheme: true })(ViewAccount);
