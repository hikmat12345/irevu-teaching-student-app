import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Box,
  Typography,
  Grid,
} from "@material-ui/core";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import { BgColor, Color, Fonts } from "../../theme/index";
import { profileImg1, profileImg2, profileImg3 } from "../../assets/index";
import CloseIcon from "@material-ui/icons/Close";

const teacher = true;

const useStyles = makeStyles(() => ({
  card: {
    // width: "550px",
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
    paddingRight: "0",

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
  blueCard: {
    backgroundColor: BgColor.myBlue,
    padding: "12px 20px",
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
  blueCardWrapper: {
    // width: "550px",
    maxWidth: "600px",
    zIndex: 1,
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    backgroundColor: BgColor.myBlue,
    padding: "12px 20px",
    marginTop: "10px",
    transition: "0.3s",
  },
  submissionText: {
    fontSize: "14px",
    fontFamily: Fonts.Medium,
    opacity: ".6",
    padding: "15px 0",
    margin: "0",
  },
  profileImg: {
    width: "40px",
    height: "40px",
    borderRadius: "50px",
    marginRight: "7px",
  },
  docImg: {
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    backgroundColor: "#95B2F5",
    marginRight: "15px",
  },
  profileName: {
    fontSize: "17px",
    fontFamily: Fonts.Regular,
    // opacity: ".6",
    // padding: "15px 0",
    margin: "0 0 -3px 0",
  },
  gradePercentage: {
    color: Color.textBlue,
    fontSize: "35px",
    fontFamily: Fonts.Regular,
    opacity: 0.5,
    margin: "0 0 -3px 0",
  },
  profileId: {
    fontSize: "11px",
    fontFamily: Fonts.Medium,
    // opacity: ".6",
    // padding: "15px 0",
    margin: "0",
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
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "10px",
    textAlign: "center",
    color: "red",
  },
}));

const WhiteCard = ({ heading, textContent }) => {
  const styles = useStyles();

  return (
    <>
      <Card
        style={{
          maxWidth: "600px",
          // width: "550px",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Box>
            <Box className={styles.smallestBlueTitle}>{heading}</Box>
            <Box className={styles.smallText}>{textContent}</Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const MainHeading = ({ heading }) => {
  const styles = useStyles();
  return (
    <>
      <Typography className={styles.mainHeading} style={{ margin: "15px 0" }}>
        {heading}
      </Typography>
    </>
  );
};
export const TeamCardDemo = React.memo(function TeamCard(props) {
  return (
    <Grid container>
      <Grid xs={12} md={6} lg={6}>
        <Box
          style={{ maxWidth: "600px" }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MainHeading heading={"HomeWork"} />
          <CloseIcon
            style={{ color: Color.textBlue, cursor: "pointer" }}
            onClick={props.openResultView}
          />
        </Box>
        {/* <WhiteCard
          heading={"Title"}
          textContent={"Vivamus eget aliquam dui. Ineger"}
        />
        <WhiteCard
          heading={"Description"}
          textContent={
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lor"
          }
        /> */}
        <WhiteCard
          textContent={
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lor              The established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages reader will be distracted by the publishing packages and web page editors now use and web page editors now use readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use and web page editors now use Lor the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages reader will be distracted by the publishing packages and web page editors now use and web page editors now use readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use to do."
          }
        />
      </Grid>
      <Grid xs={12} md={6} lg={6}></Grid>
    </Grid>
  );
});
export default TeamCardDemo;
