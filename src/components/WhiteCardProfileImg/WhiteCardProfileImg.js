import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BgColor, Color, Fonts } from "../../theme/index";
import {
    Box,
} from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import { fade, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(() => ({
    mainHeading: {
      fontSize: "20px",
      fontFamily: Fonts.Medium,
      opacity: ".8",
    },
    smallestBlueTitle: {
      color: Color.textBlue,
      fontSize: "13px",
      fontFamily: Fonts.Regular,
      textTransform: "uppercase",
    },
    smallText: {
      color: BgColor.myBlack,
      fontSize: "16px",
      fontFamily: Fonts.Regular,
    },
    overlayWrapper: {
      position: "fixed",
      top: "0",
      left: "0",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
      zIndex: "2000",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    mainHeading2: {
      fontSize: "25px",
      fontFamily: Fonts.Medium,
    },
    shareCodeText: {
      color: Color.myBlack,
      fontSize: "18px",
      fontFamily: Fonts.Medium,
      textTransform: "uppercase",
      textAlign: "center",
    },
    whiteOutlinedButton: {
      width: "100%",
      height: "40px",
      color: Color.textBlue,
      fontFamily: Fonts.Medium,
      borderRadius: "5px",
      backgroundColor: "#fff",
      border: "2px solid " + BgColor.myBlue,
      padding: "0 20px",
      margin: "5px 0",
    },
    TextFields: {
      width: "100%",
    },
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
    profileImg: {
      width: "100px",
      height: "100px",
      borderRadius: "100px",
      border: "none",
    },
}));

const WhiteCardProfileImg = ({ label, profileImg, handleFormDataChange, submitFormData }) => {
    const styles = useStyles();
    const {t , i18n} = useTranslation()
    return (
      <>
        <Box
          style={{ padding: "26px" }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            style={{ padding: "0px" }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={profileImg} className={styles.profileImg} />
            <Box className={styles.smallText} ml="15px">
              {label}
            </Box>
          </Box>
          <Box style={{ marginTop: "20px" }}>

            <input accept="image/*" hidden className={styles.input} onChange={handleFormDataChange} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" className={styles.button} component="span">
                <ImageOutlinedIcon
                  className={styles.textBoxIcons}
                  style={{
                    color: Color.textBlue,
                    fontSize: "35px",
                    margin: "10px",
                  }}
                />
                {t('upload_profile')}
              </IconButton>
            </label>
          </Box>
        </Box>
      </>
    );
};

export default (WhiteCardProfileImg);