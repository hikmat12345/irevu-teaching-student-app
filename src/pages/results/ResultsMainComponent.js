import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Box, Typography } from "@material-ui/core";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import { BgColor, Color, Fonts } from "../../theme/index";
import { profileImg1, profileImg2, profileImg3 } from "../../assets/index";

const teacher = false;

const useStyles = makeStyles(() => ({
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
    fontFamily: Fonts.Medium,
    borderRadius: "5px",
    backgroundColor: BgColor.myBlue,
    padding: "0 20px",
    "&:hover": {
      color: Color.textBlue,
      border: "1px solid" + Color.textBlue,
    },
  },
  daysLeft: {
    color: "#fff",
    fontFamily: Fonts.Regular,
    opacity: "1",
    padding: "0",
    margin: "0",
  },
  docImg: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    backgroundColor: "#95B2F5",
    marginRight: "15px",
  },
  gradePercentage: {
    color: Color.textBlue,
    fontSize: "35px",
    fontFamily: Fonts.Regular,
    opacity: 0.5,
    margin: "0 0 -3px 0",
  },
  profileName: {
    fontSize: "17px",
    fontFamily: Fonts.Regular,
    // opacity: ".6",
    // padding: "15px 0",
    margin: "0 0 -3px 0",
  },
  blueLink: {
    color: Color.textBlue,
    fontSize: "14px",
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
    cursor: "pointer",
    // padding: "15px 0",
    margin: "0",
    transition: "all .3s ease",
    "&:hover": {
      opacity: ".7",
    },
  },
  blueButtonSm: {
    color: "#fff",
    fontSize: "12px",
    lineHeight: "17px",
    height: "30px",
    borderRadius: "5px",
    backgroundColor: BgColor.myBlue,
    padding: "0 12px",
    "&:hover": {
      color: Color.textBlue,
      border: "1px solid" + Color.textBlue,
    },
  },
}));

const SubmitStudentDiv = ({
  name,
  id,
  grade,
  fileName,
  setOpenAssignment,
  openResultView,
}) => {
  const styles = useStyles();

  return (
    <>
      <Box>
        <p className={styles.smallerTitle}>Submission</p>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginTop: "10px" }}
      >
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Box className={styles.docImg}></Box>
          <Box>
            <Box className={styles.profileName}>{fileName}</Box>
            <Box className={styles.blueLink}>READ</Box>
          </Box>
        </Box>
        <Button className={styles.blueButtonSm} onClick={openResultView}>
          View
        </Button>
      </Box>
    </>
  );
};

const CustomCard = ({ openResultView, grade, date }) => {
  const styles = useStyles();
  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
        mr={"15px"}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
        >
          <Box>
            <p className={styles.dateTitle}> {date}</p>
          </Box>
          <Box className={styles.currentHomeWorkDiv}>
            <Box
              className="header"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <p className={styles.dueDate}>Class Name</p>
              </Box>

              <p
                className={styles.daysLeft}
                style={{ textTransform: "uppercase", opacity: ".8" }}
              >
                Result
              </p>
            </Box>
            <Box className="body">
              <Box>
                <p className={styles.smallerTitle}>TITLE</p>
              </Box>
              <Box>
                <p className={styles.normalText}>Content Here Content Here</p>
              </Box>
              <SubmitStudentDiv
                name={"Tyler Elliot"}
                id={"15848"}
                fileName={"Physics Assignment.doc"}
                grade={"88% (A+)"}
                openResultView={openResultView}
              />
              <Box>
                <Typography
                  className={styles.profileName}
                  style={{ marginTop: "20px" }}
                >
                  Grade:
                </Typography>
                <Typography className={styles.gradePercentage}>
                  {grade}% (A+1)
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  return (
    <Box flexWrap="wrap" display="flex">
      <CustomCard
        grade={"88"}
        date={"20/11/2020"}
        openResultView={props.openResultView}
      />
      <CustomCard
        grade={"83"}
        date={"03/07/2020"}
        openResultView={props.openResultView}
      />
      <CustomCard
        grade={"78"}
        date={"07/01/2020"}
        openResultView={props.openResultView}
      />
    </Box>
  );
});
export default TeamCardDemo;
