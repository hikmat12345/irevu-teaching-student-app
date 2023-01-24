import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import { 
  Card,
  withStyles 
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

import GetAppIcon  from '@material-ui/icons/GetApp';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import {InlineShareButtons} from 'sharethis-reactjs';

import { BgColor, Color, Fonts } from "../../theme/index";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { useApexInfoStyles } from "@mui-treasury/styles/info/apex";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import { user } from "../../assets/index";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import openSocket from 'socket.io-client';
import { getClass, enrollStudent, enrollStudentsList } from "../../redux/actions/classesActions";
import { SOCKET_URL } from './../../config/weChatConfig';

const useStyles = makeStyles(() => ({
  card: {
    width: "100%",
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
  mainHeading2: {
    fontSize: "25px",
    fontFamily: Fonts.Medium,
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
  cross: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  grayLine: {
    width: "100%",
    height: "1px",
    backgroundColor: BgColor.myBlack,
    opacity: ".2",
    margin: "0 10px",
  },
  orText: {
    color: Color.myBlack,
    fontSize: "18px",
    fontFamily: Fonts.Medium,
    opacity: ".5",
    justifyContent: "space-between",
  },
  shareCodeText: {
    color: Color.myBlack,
    fontSize: "18px",
    fontFamily: Fonts.Medium,
    textTransform: "uppercase",
    textAlign: "center",
  },
  closeIcon: {
    position: "absolute",
    top: "0px",
    right: "5px",
    color: Color.textBlue,
    cursor: "pointer",
    marginBottom: "-6px",
    marginLeft: "10px",
  },
  socialMediaIcons: {
    color: Color.textBlue,
    fontSize: "40px",
    cursor: "pointer",
  },
  TextFields: {
    // margin: "0px 0 10px 0",
  },
  Tile: {
    height: "70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: "5px",
    padding: "0px 15px",
    margin: "3px",
    transition: "all .3s ease",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,.04)",
    },
    "& div img": {
      marginTop: "3px",
      marginRight: "10px",
    },
  },
  Tile2: {
    height: "70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.04)",
    borderRadius: "5px",
    padding: "0px 15px",
    margin: "3px",
    transition: "all .3s ease",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,.2)",
    },
  },
  submissionText: {
    fontSize: "14px",
    fontFamily: Fonts.Medium,
    opacity: ".6",
    padding: "10px 0",
    margin: "0",
  },
  submissionTextAnchor: {
    color: Color.textBlue,
    fontSize: "14px",
    fontFamily: Fonts.Medium,
    textDecoration: "none",
    // opacity: ".6",
    padding: "10px 0",
    margin: "0",
  },
  studentList: {
    backgroundColor: "#f5f5f5",
    padding: "12px",
  },
  studentListLi: {
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#e3e3e3"
    },
  },
}));

const CustomCard = (props) => {
  const {t , i18n} = useTranslation()
  const styles = useStyles();
  const dispatch = useDispatch();
  const [enrollingStudent, setEnrollingStudent] = useState(false);
  const { authUser } = props;

  // useEffect(() => {
  //   const value=queryString.parse(window.location.search, { ignoreQueryPrefix: true });
  //   dispatch(getClass(value.id)).then( (res) => {
  //     if ( res.type == 'success' ) {
  //       dispatch(enrollStudentsList({class_id: res.payload.id}))
  //     }
  //   })
  // }, [dispatch]);

  const openEnrollingStudent = () => {
    setEnrollingStudent(!enrollingStudent);
  };

  const students = useSelector((store) => store.classes.enrollStudentList);
  
  // const [students, setStudentsData] = useState([
  //   {
  //     name: "Khursheed",
  //     profilePicture: profileImg1,
  //   }
  // ])
  
  return (
    <>
      <Box className={styles.card}>
        <Row>
          {/* <Avatar className={styles.logo} variant={"rounded"} src={thumbnail} /> */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{ width: "100%", paddingRight: "20px" }}
          >
            <div>
              <Info position={"middle"} useStyles={useApexInfoStyles} p={0}>
                <Box pb={0.3} className={styles.LightText}>
                  <b>{t('student')}</b>
                </Box>
                <Box lineHeight={"15px"} className={styles.mainHeading}>
                  {t('currently_enrolled')}
                </Box>
              </Info>
            </div>

            { (authUser.user_type == 1) ? (
                <Button
                  className={styles.blueButton}
                  onClick={openEnrollingStudent}
                >
                  {t('add_student')}
                </Button>
              ) : ('') 
            }
            
          </Box>
        </Row>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexWrap="wrap"
          p={"30px 10px"}
          // style={{ width: "100%" }}
        >
          {students.map((value, i) => {
            return (
              <Box className={styles.Tile} key={i}>
                <Box>
                  <img
                    src={(value.profile_image) ? value.profile_image : user}
                    className={styles.profileImg}
                  />
                </Box>
                <p className={styles.submissionText}>{value.first_name}</p>
              </Box>
            );
          })}
          {/* <Box className={styles.Tile2}>
            <a href="" className={styles.submissionTextAnchor}>
              show more
            </a>
          </Box> */}
        </Box>
      </Box>
      
      { ((authUser.user_type == 1) && (enrollingStudent)) ? (
        <Container maxWidth="xl" className={styles.overlayWrapper}>
          <EnrollStudentDiv authUser={authUser} openEnrollingStudent={openEnrollingStudent} />
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

const EnrollStudentDiv = (props) => {
  const {t , i18n} = useTranslation()
  const styles = useStyles();
  const myClass = useSelector((store) => store.classes);
  const dispatch = useDispatch();
  const { openEnrollingStudent, authUser } = props;

  const [username, setUsername] = useState('');

  const handleSignupDataChange = (event) => {
    event.persist();
    setUsername(event.target.value);
  };
  const handleSubmit = (e) => {
    e.persist();
    const submitData = {
      class_id: myClass.data.id,
      username: username
    }
    dispatch(enrollStudent(submitData)).then( (res) => {
      if ( res.type == 'success' ) {
        const socket = openSocket(SOCKET_URL);
          let socketData = {
            id:submitData.username,
            for : 'student',
            message : authUser.username+' have added you in class ',
            receiverMsg : "New homework Added"
          }
          socket.emit('send_notification',socketData)
        openEnrollingStudent();
      }
    });
  }

  const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        handleSubmit(e)
      }
  }

  return (
    <>
      <Card
        style={{
          maxWidth: "600px",
          width: "600px",
          // padding: "20px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <Box
          style={{
            padding: "20px",
          }}
        >
          <Box
            style={{
              position: "relative",
            }}
          >
            <Box
              className={styles.mainHeading2}
              style={{ textAlign: "center" }}
            >
              {t('add_student_small')}
            </Box>
            <CloseIcon
              color={"primary"}
              className={styles.closeIcon}
              onClick={openEnrollingStudent}
            />
          </Box>

          <Card
            style={{
              width: "100%",

              padding: "0px 0px",
              borderRadius: "10px",
              backgroundColor: "#E9EFFD",
              marginTop: "10px",
            }}
          >
            <CardContent style={{ padding: "16px" }}>
              <Box
                display="flex"
                // justifyContent="space-between"
                // alignItems="center"
                flexDirection="column"
              >
                <TextField
                  id="outlined-basic"
                  name="username"
                  label={t('student_name')}
                  variant="outlined"
                  className={styles.TextFields}
                  onChange={handleSignupDataChange}
                  onKeyDown={handleKeyDown}
                  error={ (myClass.enrollStudentError) ? true : false }
                  helperText={ (myClass.enrollStudentError) ? myClass.enrollStudentError : '' }
                />
                {/* <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  className={styles.TextFields}
                  style={{ marginTop: "10px" }}
                /> */}
                {/* <Box className={styles.smallestBlueTitle}>Student ID</Box>
                <Box className={styles.smallText}>Benjamin Holmes</Box> */}
              </Box>
            </CardContent>
          </Card>

          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            style={{ padding: "20px 0" }}
          >
            <Box className={styles.grayLine}></Box>
            <Box className={styles.orText}>{t('or_capital')}</Box>
            <Box className={styles.grayLine}></Box>
          </Box>
          <Box className={styles.shareCodeText}>
            {t('share_qr_code_with_students_capital')}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{
              width: "40%",
              padding: "30px 0",
              margin: "0 auto",
            }}
          >
            {/* <a href={"whatsapp://send?text="+myClass.data.qr_image} data-action="share/whatsapp/share" className="MuiButtonBase-root MuiButton-root MuiButton-text">
              <ShareIcon className={styles.socialMediaIcons} />
            </a> */}
            <InlineShareButtons
          config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            color: 'social',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'null',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'wechat',
              'linkedin',
              // 'messenger',
              // 'facebook',
              // 'twitter'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            show_total: false,
            size: 30,             // the size of each button (INTEGER)

            // OPTIONAL PARAMETERS
            url: myClass.data.qr_image, // (defaults to current url)
            // image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            // description: 'custom text',       // (defaults to og:description or twitter:description)
            // title: 'custom title',            // (defaults to og:title or twitter:title)
            // message: 'custom email text',     // (only for email sharing)
            // subject: 'custom email subject',  // (only for email sharing)
            // username: 'custom twitter handle' // (only for twitter sharing)
          }}
        />

            <a href={myClass.data.qr_image} download="QR Image" target="_blank" className="MuiButtonBase-root MuiButton-root MuiButton-text">
              <GetAppIcon className={styles.socialMediaIcons} />
            </a>
            <a href={myClass.data.qr_image} target="_blank" className="MuiButtonBase-root MuiButton-root MuiButton-text">
              <SelectAllIcon className={styles.socialMediaIcons} />
            </a>
          </Box>
        </Box>

        <Button
          className={styles.blueButton}
          style={{ width: "100%", height: "unset", borderRadius: "0px" }}
          onClick={ handleSubmit }
        >
          + {t('add_student')}
        </Button>
      </Card>
    </>
  );
};

export default (CustomCard)