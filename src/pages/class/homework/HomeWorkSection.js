import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, makeStyles, withStyles } from "@material-ui/core";
import { BgColor, Color, Fonts } from "../../../theme/index";
import ShowMoreText from 'react-show-more-text';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
    transition: "0.3s",
    position: "relative",
    // border: "4px solid green",
    // "&:before": {
    //   transition: "0.2s",
    //   position: "absolute",
    //   width: "100%",
    //   height: "100%",
    //   content: '""',
    //   display: "block",
    //   backgroundColor: "#d9daf1",
    //   borderRadius: "1rem",
    //   zIndex: 0,
    //   bottom: 0,
    // },
    "&:hover": {
      // "&:before": {
      //   bottom: -6,
      // },
      // "& $card": {
      //   boxShadow: "-12px 12px 64px 0 #bcc3d6",
      // },
    },
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
    marginTop: "10px",
    maxWidth: "560px",
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
      marginTop: "10px",
      padding: "12px 20px",
    },
    marginRight: "10px",
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

const CustomCard = (props) => {
  const styles = useStyles();
  const { openHomework, authUser, homeWorkList } = props;
  const {t , i18n} = useTranslation()
  const students = useSelector((store) => store.classes.enrollStudentList);
  return (
    <section>
      <Box display="flex" justifyContent="space-between">
        <Box
          className={styles.mainHeading}
          lineHeight={"15px"}
          p={"30px 0px 20px 0"}
          mt={"20px"}
        >
          {t('homework')}
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
        {
          (Array.isArray(homeWorkList)) ? (homeWorkList.map((work, i) => {
            return (<>
              <Box className={styles.currentHomeWorkDiv} key={i}>
                <Box>
                  <p className={styles.dateTitle}> { work.deadline_date } </p>
                </Box>
                <Box>
                  <Box
                    className="header"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box>
                      <p className={styles.dueDate}>{t('result_capital')}</p>
                    </Box>
                    <Box>
                      <p
                        className={styles.daysLeft}
                        style={{ textTransform: "uppercase", opacity: ".8" }}
                      >
                        {t('result_capital')}
                      </p>
                    </Box>
                  </Box>
                  <Box className="body">
                    <Box style={{marginTop: "40px" }}>
                      <p className={styles.smallerTitle}>{t('title')}</p>
                    </Box>
                    <Box>
                      <p className={styles.normalText}>{ work.title }</p>
                    </Box>
                    <Box>
                      <p className={styles.smallerTitle}>{t('description')}</p>
                    </Box>
                    <Box>
                      <ShowMoreText
                          /* Default options */
                          lines={10}
                          // more={"READ"}
                          // less={"HIDE"}
                          className='content-css'
                          anchorClass={styles.blueLink}
                          // onClick={this.executeOnClick}
                          expanded={false}
                      >
                        <p className={styles.normalText} dangerouslySetInnerHTML={{__html: work.description }}></p>
                      </ShowMoreText>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <p className={styles.submissionText}>
                          <span>{ work.total_submission }</span> / <span>{ students.length }</span> Submissions - Closed
                        </p>
                      </Box>
                      <Box>
                        <p className={styles.bluLink} onClick={() => openHomework(work.id)}>
                          {t('view')}
                        </p>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>)
          })) : 'No homework found.'
        }
      </Box>
    </section>
  );
};

export default (CustomCard)
