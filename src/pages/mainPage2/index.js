import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { BgColor, Color, Fonts } from "../../theme/index";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TheatersOutlinedIcon from "@material-ui/icons/TheatersOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Logo,
  SliderImg1,
  SliderImg2,
  SliderImg3,
} from "../../assets/images/index";
import {
  Container,
  Button,
  TextField,
  Box,
  Grid,
  Card,
  Typography,
  Input,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  profileImg1,
  profileImg2,
  profileImg3,
  image1,
} from "../../assets/index";

import ReactDOM from "react-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const addCourseID = true;

const useStyles = makeStyles(() => ({
  fontRegular: {
    fontFamily: Fonts.Regular,
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    height: "60px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0px 0px 5px 5px rgba(0,0,0,.3)",
    padding: "10px 5%",
    // border: "4px solid orange",
  },
  logo: {
    height: "60px",
  },
  navigationButton: {
    color: Color.textBlue,
    fontFamily: Fonts.Regular,
    lineHeight: "16px",
    borderRadius: "50px",
    backgroundColor: "transparent",
    boxShadow: "none",
    // background: "linear-gradient(to top, #638ef0, #82e7fe)",
    margin: "0 3px",
    transition: "all .3s ease",
    "& > *": {
      textTransform: "none !important",
    },
    "&:hover": {
      color: "#fff",
      borderRadius: "50px",
      boxShadow: "none",
      backgroundColor: "#689CF2",
      // backgroundColor: "#a4c4f9",
    },
  },
  buttonGroups: {
    display: "flex",
    alignItems: "center",
    "@media (max-width: 800px)": {
      display: "none",
    },
  },
  menuForMob: {
    position: "relative",
    zIndex: "1000",
    backgroundColor: "#fff",
    marginRight: "20px",
  },
  ulForMobileMenu: {
    position: "relative",
    zIndex: "500",
    listStyleType: "none",
    backgroundColor: "#f5f5f5",
    padding: "20px 10px",
    margin: "0",
    "& li": {
      margin: "5px 0",
    },
  },
  menuIcon: {
    display: "none",
    position: "absolute",
    top: "30px",
    right: "30px",
    zIndex: "1000",
    "@media (max-width: 800px)": {
      display: "block",
    },
  },
  langBtn: {
    marginLeft: "20px",
  },
  contentWrapper: {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: "80px",
  },
  content: {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: "30px",
  },
  smallLine: {
    width: "100px",
    height: "0px",
    borderBottom: "3px solid" + BgColor.myBlue,
    margin: "20px 0",
  },
  threeHeadingsWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  smallLine2: {
    width: "60px",
    height: "0px",
    borderBottom: "3px solid" + BgColor.myBlue,
    margin: "10px 0",
  },
  boldParagraph: {
    maxWidth: "780px",
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: Fonts.Regular,
    lineHeight: "22px",
    textAlign: "center",
    padding: "10px 0",
    "@media (max-width: 576px)": {
      fontSize: "14px",
      lineHeight: "18px",
      padding: "0 10px",
    },
  },
  threePartText: {
    maxWidth: "980px",
    display: "flex",
    justifyContent: "center",
    "@media (max-width: 576px)": {
      flexDirection: "column",
    },
  },
  contentParagraph: {
    // maxWidth: "760px",
    fontSize: "14px",
    fontFamily: Fonts.Regular,
    lineHeight: "20px",
    // textAlign: "center",
    padding: "0 15px",
    marginTop: "10px",
    "@media (max-width: 576px)": {
      fontSize: "11px",
      lineHeight: "16px",
    },
  },
  bottomUl: {
    "@media (max-width: 576px)": {
      fontSize: "11px",
      lineHeight: "16px",
      padding: "0 10px",
    },
  },
  verticalLine: {
    width: "1px",
    // height: "auto",
    borderRight: "1px solid #E0E0E0",
  },
  verticalLine2: {
    width: "1px",
    borderRight: "1px solid rgba(225,225,225,0.5)",
  },
  footerLinks: {
    paddingLeft: "0",
    "& > li": {
      fontSize: "13px",
      fontFamily: Fonts.Regular,
      listStyleType: "none",
    },
    "& > li a": {
      color: "rgba(225,225,225,0.5)",
      textDecoration: "none",

      "&:hover": {
        color: "rgba(225,225,225,0.8)",
      },
    },
  },
  footerPargraph: {
    fontSize: "13px",
    fontFamily: Fonts.Regular,
  },
  mainPageFooter: {
    width: "100%",
    color: "rgba(225,225,225,0.5)",
    fontFamily: Fonts.Regular,
  },
  footerTopWrapper: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#3C3D41",
    padding: "40px",
  },
  footerTop: {
    maxWidth: "980px",
    display: "flex",
    justifyContent: "center",
    "@media (max-width: 576px)": {
      flexDirection: "column",
    },
  },
  footerBottomWrapper: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#1F1D1D",
  },
  footerBottom: {
    maxWidth: "980px",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },

  mainHeading2: {
    fontSize: "25px",
    fontFamily: Fonts.Medium,
    marginBottom: "-10px",
    "@media (max-width: 576px)": {
      fontSize: "18px",
      padding: "0 20px",
    },
  },
  mainHeading3: {
    color: Color.textBlue,
    fontSize: "20px",
    fontFamily: Fonts.Medium,
    marginBottom: "-10px",
  },
  mainHeading4: {
    color: "rgba(225,225,225,0.5)",
    fontSize: "20px",
    fontFamily: Fonts.Medium,
    marginBottom: "-10px",
  },
  subTitleLight: {
    color: "rgba(25, 25, 25,.4)",
    fontSize: "11px",
    fontFamily: Fonts.Medium,
    textTransform: "uppercase",
    margin: "0",
  },
  hoursText: {
    color: Color.textMyBlack,
    fontSize: "16px",
    fontFamily: Fonts.Medium,
    margin: "0",
  },
  timeAndDateLight: {
    color: "rgba(25, 25, 25,.4)",
    fontSize: "11px",
    fontFamily: Fonts.Medium,
    textTransform: "uppercase",
    margin: "0",
  },
}));

const Navigation = ({ heading }) => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [menuForMob, setMenuForMob] = useState(false);
  const toggleMenuForMob = () => {
    setMenuForMob(!menuForMob);
  };
  return (
    <>
      <Box className={styles.navigation}>
        <Box>
          <img src={Logo} className={styles.logo} />
        </Box>
        <Box className={styles.buttonGroups}>
          <Button className={styles.navigationButton} variant={"contained"}>
            Beijing Blue Cube Technology
          </Button>
          <Button className={styles.navigationButton} variant={"contained"}>
            Home Page
          </Button>
          <Button className={styles.navigationButton} variant={"contained"}>
            English Turoring
          </Button>
          <Button className={styles.navigationButton} variant={"contained"}>
            About Us
          </Button>
          <Button className={styles.navigationButton} variant={"contained"}>
            Contact Us
          </Button>
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              className={styles.fontRegular}
              style={{
                color: Color.textBlue,
                borderRadius: "5px",
                border: "1px solid" + BgColor.myBlue,
              }}
              onClick={handleClick}
            >
              Language
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                className={styles.fontRegular}
                style={{ color: Color.textBlue }}
              >
                Chinese
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                className={styles.fontRegular}
                style={{ color: Color.textBlue }}
              >
                English
              </MenuItem>
            </Menu>
          </div>
        </Box>
        <Box ckassName={styles.menuForMob}>
          <MenuIcon onClick={toggleMenuForMob} className={styles.menuIcon} />
          {menuForMob ? (
            <ul className={styles.ulForMobileMenu}>
              <li>
                {" "}
                <Button
                  className={styles.navigationButton}
                  variant={"contained"}
                >
                  Home Page
                </Button>
              </li>
              <li>
                {" "}
                <Button
                  className={styles.navigationButton}
                  variant={"contained"}
                >
                  English Turoring
                </Button>
              </li>
              <li>
                {" "}
                <Button
                  className={styles.navigationButton}
                  variant={"contained"}
                >
                  About Us
                </Button>
              </li>
              <li>
                {" "}
                <Button
                  className={styles.navigationButton}
                  variant={"contained"}
                >
                  Contact Us
                </Button>
              </li>
              <li>
                <div className={styles.langBtn}>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    className={styles.fontRegular}
                    style={{
                      color: Color.textBlue,
                      borderRadius: "5px",
                      border: "1px solid" + BgColor.myBlue,
                    }}
                    onClick={handleClick}
                  >
                    Language
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleClose}
                      className={styles.fontRegular}
                      style={{ color: Color.textBlue }}
                    >
                      Chinese
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={styles.fontRegular}
                      style={{ color: Color.textBlue }}
                    >
                      English
                    </MenuItem>
                  </Menu>
                </div>
              </li>
            </ul>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};
const Content = ({ heading }) => {
  const styles = useStyles();
  return (
    <>
      <Box className={styles.contentWrapper}>
        <Box className={styles.content}>
          <Box className={styles.mainHeading2}>
            Perfect Homework: Features of I-REVU:
          </Box>
          <Box className={styles.smallLine}></Box>
          <Box className={styles.boldParagraph}>
            bbbbPerfect Homework (i-Rervu) is a website and application where
            teachers can solve the problems of assigning and correcting
            students' homework in one stop. At the same time, it also provides
            students with opportunities to communicate and discuss with teachers
            and classmates to help them solve academic problems together.
          </Box>
        </Box>
        <Box className={styles.threePartText}>
          <Box style={{ flex: "1" }}>
            <Box className={styles.threeHeadingsWrapper}>
              <Box className={styles.mainHeading3}>University</Box>
              <Box className={styles.smallLine2}></Box>
            </Box>
            <Box className={styles.contentParagraph}>
              <ul style={{ padding: "0 15px" }}>
                <li>
                  Provide teachers with tools for efficient management of
                  schoolwork, improve academic and teaching efficiency, thereby
                  saving time and money.
                </li>
                <li>
                  Eliminate trivial matters (such as management homework, etc.)
                  to improve teachers' teaching enthusiasm.
                </li>
                <li>
                  Teachers don’t need to explain to students about performance
                  evaluation and homework management. A small subscription fee
                  can save a lot of time and money.
                </li>
                <li>
                  Faculty and staff can focus more on important research work,
                  and the academic research capabilities of universities will be
                  greatly improved.
                </li>
                <li>
                  Automated return of homework, teachers do not need to send
                  separate e-mails to each student, and do not need to manage
                  homework (83% of the faculty interviewed said that this tool
                  is urgently needed).
                </li>
                <li>
                  The professors' time is extremely valuable, especially during
                  their participation in major projects. They deal with a large
                  number of complicated tasks and cause the school to lose more
                  than 1,000 hours each year (time is money) that could be used
                  for academic research. If there are 50,000 professors in China
                  who spend 1 hour each month on organizing and managing
                  homework and other matters, the entire teacher group will lose
                  50,000 hours per month (5 years), 20 million (assuming an
                  hourly salary of 200 yuan) .
                </li>
                <li>
                  <strong>Contact us for</strong> consultation...
                </li>
              </ul>
            </Box>
          </Box>
          <Box className={styles.verticalLine}></Box>{" "}
          <Box style={{ flex: "1" }}>
            <Box className={styles.threeHeadingsWrapper}>
              <Box className={styles.mainHeading3}>Teacher </Box>
              <Box className={styles.smallLine2}></Box>
            </Box>
            <Box className={styles.contentParagraph}>
              <ul style={{ padding: "0 15px" }}>
                <li>
                  It is very convenient to send and receive homework or reports,
                  saving the time and paper consumption of sending and receiving
                  homework.
                </li>
                <li>
                  Efficiently collect students’ homework and assign them to
                  relevant teachers (no need to manually collect homework or
                  cause homework to be lost).
                </li>
                <li>
                  Provide teachers with tools for management and correction of
                  homework, and provide guarantee for work convenience and
                  efficiency.
                </li>
                <li>
                  Automated return of homework, teachers do not need to send
                  separate emails to each student, nor do they need to manage
                  homework (83% of the faculty interviewed said that this tool
                  is urgently needed)
                </li>
                <li>
                  Teachers can get extra pay for answering questions for
                  students.
                </li>
                <li>Improve the quality of life.</li>
                <li>
                  <strong>Sign up</strong> for more information
                </li>
              </ul>
            </Box>
          </Box>
          <Box className={styles.verticalLine}></Box>{" "}
          <Box style={{ flex: "1" }}>
            <Box className={styles.threeHeadingsWrapper}>
              <Box className={styles.mainHeading3}>Student</Box>
              <Box className={styles.smallLine2}></Box>
            </Box>
            <Box className={styles.contentParagraph}>
              <ul style={{ padding: "0 15px" }}>
                <li>
                  The winner of the highest monthly score will win a cash prize.
                </li>
                <li>Answer the questions to get points and rewards.</li>
                <li>
                  Provide students with a platform for sharing knowledge between
                  students and students, teachers and students, and enhancing
                  academic ability.
                </li>
                <li>
                  Provide a high-quality, inexpensive, flexible and real-time
                  solution to meet the needs of students.
                </li>
                <li>
                  Professional English learning platform, such as IELTS, TOEFL,
                  English professional test, level 4 and 6 etc.
                </li>
                <li>
                  Scientific research shows that teaching others knowledge is
                  the best way to learn and enhance long-term memory.
                </li>
                <li>
                  Encourage students to share resources and continuously improve
                  themselves instead of comparing themselves with others.
                  Scientific research shows that helping others can increase
                  self-confidence and motivation.
                </li>
                <li>More features...</li>
                <li>
                  <strong>Sign up</strong> for more information
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
        <ul style={{ padding: "0 15px" }} className={styles.bottomUl}>
          <li>
            In addition, our platform can vigorously promote the digital
            management of university archives, such as exam/course archives,
            thereby saving a lot of paper, space, money, and time.
          </li>
          <li>
            Students will get better development, get better grades and
            education, and ultimately promote economic and social development.
          </li>
          <li>Promote environmental protection.</li>
          <li>
            Social responsibility-10% of net profit will be used for charity
            (determined by members' vote).
          </li>
        </ul>
      </Box>
      <footer className={styles.mainPageFooter}>
        <Box className={styles.footerTopWrapper}>
          <Box className={styles.footerTop}>
            <Box
              style={{
                textAlign: "center",
                // display: "flex",
                // alignContent: "center",
                // justifyContent: "center",
                // flexDirection: "column",
                flex: "1",
                padding: "0 30px",
              }}
            >
              <img src={Logo} className={styles.logo} />
              <p className={styles.footerPargraph}>
                Beijing Blue Cube Technology Co., Ltd.
              </p>
            </Box>
            <Box className={styles.verticalLine2}></Box>{" "}
            <Box style={{ flex: "1", padding: "0 30px" }}>
              <Box className={styles.mainHeading4}>Table of Contents</Box>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#">Home Page </a>
                </li>
                <li>
                  <a href="#">About Us </a>
                </li>
                <li>
                  <a href="/english-tutorial">English Tutoring</a>
                </li>
                <li>
                  <a href="#">Contact Us </a>
                </li>
                <li>
                  <a href="#">Agreement Terms </a>
                </li>
              </ul>
            </Box>
            <Box className={styles.verticalLine2}></Box>{" "}
            <Box style={{ flex: "1", padding: "0 30px" }}>
              <Box className={styles.mainHeading4}>Contact Us</Box>
              <p className={styles.footerPargraph}>enquiries@irevu.org</p>
            </Box>
          </Box>
        </Box>

        <Box className={styles.footerBottomWrapper}>
          <Box className={styles.footerBottom}>
            Copyright @ 2019, i-revu. All rights reserved.
          </Box>
        </Box>
      </footer>
    </>
  );
};

const HomePageMainComponent = ({ openFeedbackFunc, openFeedback }) => {
  const styles = useStyles();
  //   const [openedNotifications, setOpenedNotifications] = useState(false);
  //   const openNotification = () => {
  //     setOpenedNotifications(!openedNotifications);
  //   };

  //   const openConfirmationMessage = () => {
  //     setOpenedConfirmationMessage(!openedConfirmationMessage);
  //   };
  return (
    <>
      <Box>
        <Navigation />
        <Carousel>
          <div>
            <img src={SliderImg1} />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src={SliderImg2} />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src={SliderImg3} />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
        <Content />
      </Box>
    </>
  );
};

export const TeamCardDemo = React.memo(function TeamCard() {
  //   const [openFeedback, setOpenFeedback] = useState(false);
  //   const openFeedbackFunc = () => {
  //     setOpenFeedback(!openFeedback);
  //   };

  return (
    <>
      <HomePageMainComponent
      // heading={"Instructions"}
      // openFeedbackFunc={openFeedbackFunc}
      // openFeedback={openFeedback}
      />
    </>
  );
});
export default TeamCardDemo;
