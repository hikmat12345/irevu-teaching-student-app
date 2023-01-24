import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button
} from "@material-ui/core";
import { BgColor, Color, Fonts } from "../../theme/index";
import { FormField } from '../../components';
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";

import { updateProfile, changePass } from "./../../redux/actions/userActions";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  blueButton: {
    color: "#fff",
    height: "40px",
    lineHeight: "48px",
    borderRadius: "5px",
    fontFamily: Fonts.Medium,
    cursor: "pointer",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: BgColor.myBlue,
    padding: "0 20px",
    "&:hover": {
      color: Color.textBlue,
      border: "1px solid" + Color.textBlue,
    },
  },
}));

const ChangePassword = (props) => {
  const {t , i18n} = useTranslation()
  const { authUser, changePassword } = props;
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [error, setError] = useState({
    old_password : false,
    new_password : false
  });

  const [formData, setFormDataData] = useState({
    old_password : "",
    new_password : ""
  });

  const handleFormDataChange = (event) => {
    event.persist();
    setFormDataData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  }

  const errorHandle = (err) => {
    setError((error) => ({
      ...error,
      old_password : (err.full_name) ? err.full_name : false,
      new_password : (err.email) ? err.email : false
    }))
  }

  const submitHandle = (event) => {
    event.persist();
    dispatch(changePass(formData)).then((response) => {
        if ( response.type == 'error' ) {
            setError((error) => ({
                ...error,
                old_password: response.payload.error,
            }));
        } else {
            window.location.reload();
        }
    });
  }

  return (
    <>
      <Box style={{
        display: "inline-block",
        position: "relative"
      }}>
        <CloseIcon
          style={{ color: Color.textBlue, cursor: "pointer" }}
          onClick={ changePassword }
        />
        <FormField label={t('old_password')} type="password" name={"old_password"} handle={handleFormDataChange} error={ (error.old_password) ? error.old_password : false } />
        <FormField label={t('new_password')} type="password" name={"new_password"} handle={handleFormDataChange} error={ (error.new_password) ? error.new_password : false } />
        <Box
          style={{
            maxWidth: "600px",
            width: "600px",
            marginTop: "10px",
          }}
        >
          <Button
            style={{
              padding: "20px",
              marginTop: "50px",
            }}
            className={styles.blueButton}
            style={{ width: "100%", height: "unset" }}
            onClick = { submitHandle }
          >
            {t('change_password')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default (ChangePassword);
