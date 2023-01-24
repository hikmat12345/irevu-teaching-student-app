import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "fontsource-roboto";
import { Fonts, BgColor, Color } from "../../theme/index";
import { withStyles } from "@material-ui/core/styles";
import "react-multi-carousel/lib/styles.css";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@material-ui/core/styles";
import { WhiteCardProfileImg } from '../../components';
import { userDefaultImage } from "../../assets/index";
import {
    Box,
    Button,
    Card
} from "@material-ui/core";
import { useTranslation } from 'react-i18next';

import axios from "axios";
import Const from '../../helpers/const'

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
    transition: "0.3s",
    position: "relative",
    border: "4px solid green"
  },
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "10px",
    // boxShadow: "0 6px 20px 0 #dbdbe8",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    backgroundColor: "#fff",
    transition: "0.3s",
    // height: "100%",
    padding: "16px",

    "&:hover": {
      // boxShadow: "none !important",
      // border: "0 !important",
    },
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: "0.75rem",
  },
  avatar: {
    fontSize: "0.875rem",
    backgroundColor: "#6d7efc",
  },
  join: {
    color: "#fff",
    borderRadius: "50px",
    // backgroundColor: "#a4c4f9",
    backgroundColor: BgColor.myBlue,
    // background: "linear-gradient(to top, #638ef0, #82e7fe)",
    "& > *": {
      textTransform: "none !important",
    },
    "&:hover": {
      backgroundColor: "#689CF2",
    },
  },
  danger: {
    color: "#fff",
    fontSize: "14px",
    fontFamily: Fonts.Regular,
    borderRadius: "50px",
    backgroundColor: "#F48FB1",
    "& > *": {
      textTransform: "none !important",
    },
    "&:hover": {
      backgroundColor: "#ff266f",
    },
  },
  profileImg: {
    width: "50px",
    height: "50px",
    borderRadius: "50px",
  },
  table: {
    maxWidth: "600px",
    fontFamily: Fonts.Regular,
    "& tr th": {
      fontSize: "18px",
      padding: "20px 0",
    },
    "& tr td": {
      fontSize: "14px",
      opacity: ".8",
    },
    marginTop: "20px",
    textAlign: "left",
  },
  LightText: {
    color: BgColor.myBlack,
    fontSize: "14px",
    fontFamily: Fonts.Medium,
    opacity: 0.25,
  },
  mainHeading: {
    fontSize: "20px",
    fontFamily: Fonts.Medium,
    opacity: ".8",
  },
  currentHomeWorkDiv: {
    width: "100%",
    maxWidth: "600px",
    zIndex: 1,
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    backgroundColor: "#fff",
    transition: "0.3s",
    "& .header": {
      backgroundColor: BgColor.myBlue,
      padding: "12px 20px",
    },
    "& .body": {
      padding: "12px 20px",
    },
  },
  dateTitle: {
    color: Color.textBlack,
    fontSize: "12px",
    fontFamily: Fonts.Regular,
    textAlign: "center",
    opacity: ".6",
    padding: "0",
    margin: "0",
    marginBottom: "3px",
  },
  dueDate: {
    color: "#fff",
    fontFamily: Fonts.Regular,
    opacity: ".8",
    padding: "0",
    margin: "0",
    marginBottom: "-5px",
  },
  daysLeft: {
    color: "#fff",
    fontFamily: Fonts.Regular,
    opacity: "1",
    padding: "0",
    margin: "0",
  },
  smallerTitle: {
    fontSize: "12px",
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
    opacity: ".6",
    padding: "5px 0 0 0",
    margin: "0",
  },
  normalText: {
    fontSize: "14px",
    fontFamily: Fonts.Regular,
    padding: "0 0 5px 0",
    margin: "0",
  },
  submissionText: {
    fontSize: "14px",
    fontFamily: Fonts.Medium,
    opacity: ".6",
    padding: "15px 0",
    margin: "0",
  },
  bluLink: {
    color: Color.textBlue,
    fontSize: "14px",
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
    cursor: "pointer",
    padding: "15px 0",
    margin: "0",
    transition: "all .3s ease",
    "&:hover": {
      opacity: ".7",
    },
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
}));

const ViewProfile = (props) => {
    const {t , i18n} = useTranslation()
    const { authUser, editProfilePage, changePassword } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const styles = useStyles();
    console.log("authUser ===>>>> ", authUser)
    const [error, setError] = useState(false);
    const [file, setFile] = useState(null);
  
    const handleFormDataChange = (event) => {
      event.persist();
      setFile(event.target.files[0]);
      submitFormData(event)
    }
  
    const errorHandle = (err) => {
      setError((err.file) ? err.file : false)
    }
  
    const submitFormData = (event) => {
      event.persist();
      const formData = new FormData();
    
      // Update the formData object
      formData.append('file', event.target.files[0])

      axios.post(
        Const.BASE_URL+'user/upload-file', 
        formData, 
        {
          headers : {
            'Authorization' : `${localStorage.userToken}`,
            'content-type': 'multipart/form-data'
          }
        })
        .then(response => {
            // dispatch({
            //     type: 'UPLOAD_FILE',
            //     payload: response.data.output,
            // })
            dispatch({
              type: 'LOGIN_USER_DATA',
              payload: response.data.output,
            })
        })
        .catch(error => {
            dispatch({
                type: 'UPLOAD_FILE_ERROR',
                payload: error.response.data
            })
        })
    }

    return (
        <>
        <div
          style={{
            width: "70%",
            transition: "0.3s",
            position: "relative",
            padding: "10px  0",
            marginTop: "10px",
            display: "inline-block",
          }}
        >
            
            <Card
                style={{
                  // maxWidth: "600px",
                  // width: "600px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
            >
                <Box style={{ padding: "26px" }}>
                    <Box style={{ textAlign: "right" }}>
                        <Button style={{ marginRight: "10px" }} className={styles.blueButton} onClick={changePassword} > {t('change_password')} </Button>
                        <Button className={styles.blueButton} onClick={editProfilePage} >{t('edit_capital')}</Button>
                    </Box>
                    <WhiteCardProfileImg label={ authUser.username } profileImg={ (authUser.profileImage) ? authUser.profileImage : userDefaultImage} handleFormDataChange={handleFormDataChange} submitFormData={submitFormData} />
                    <Box>
                        {t('full_name')} : { authUser.first_name }
                    </Box>
                    <Box>
                        {t('email')} : { authUser.email }
                    </Box>
                    <Box>
                        {t('username')} : { authUser.username }
                    </Box>
                    <Box>
                        {t('education')} : {
                          (authUser.education == "high_school") ? (
                            <>High/Middle School</>
                          ) : (<>
                            {
                              (authUser.education == "primary") ? (
                                <>Primary School</>
                              ) : (
                                <>University</>
                              )
                            }
                          </>)
                        }
                    </Box>
                    <Box>
                        {t('university')} : { authUser.university }
                    </Box>
                    <Box>
                        {t('course')} : { authUser.course }
                    </Box>
                </Box>
            </Card>
            
        </div>
        </>
    );
}

export default (ViewProfile);
