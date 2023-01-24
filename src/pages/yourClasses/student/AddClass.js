import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import { BgColor, Color, Fonts } from "../../../theme/index";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import { FormField } from '../../../components';
import QrReader from 'react-qr-reader'

import { studentEnrollInClass } from "../../../redux/actions/classesActions";
import { useTranslation } from 'react-i18next';
import openSocket from 'socket.io-client';
import { SOCKET_URL } from './../../../config/weChatConfig';

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
    border: "1px solid transparent",
    backgroundColor: BgColor.myBlue,
    padding: "0 20px",
    "&:hover": {
      color: Color.textBlue,
      border: "1px solid" + Color.textBlue,
    },
    svg: {
      color: "#fff",
    },
    "&:hover svg": {
      color: Color.textBlue,
      marginRight: "5px",
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
}));

const CustomCard = ({ addingClass }) => {
  const styles = useStyles();

  return (
    <>
      <Container maxWidth="xl" className={styles.overlayWrapper}>
        <EnrollStudentDiv addingClass={addingClass} />
      </Container>
    </>
  );
};

const ScanQrCode = ({handleError, handleScan, openScan}) => {
  const styles = useStyles();

  return (
    <>
      <Container maxWidth="xl" className={styles.overlayWrapper}>
        <Card
          style={{
            maxWidth: "350px",
            width: "350px",
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
            <CloseIcon
              color={"primary"}
              className={styles.closeIcon}
              onClick={openScan}
            />
          </Box>
          <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
          </Card>
      </Container>
    </>
  );
}

const EnrollStudentDiv = ({ addingClass }) => {
  const authUser = useSelector((store) => store.auth.user);
  const styles = useStyles();

  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [isOpenScan, setIsOpenScan] = useState(false);

  const [formData, setFormData] = useState({
    class_id : ""
  });

  const openScan = () => {
    setIsOpenScan(!isOpenScan)
  }

  const handleChange = (event) => {
    event.persist();
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };
  const students = useSelector((store) => store.classes.enrollStudentList);
  const handleSubmit = (event) => {
    dispatch(studentEnrollInClass(formData)).then( (res) => {  
        if ( res.type == 'success' ) {
          const socket = openSocket(SOCKET_URL);
          let socketData = {
            id:formData.username,
            for : 'student',
            message : authUser.username+' have added you in class ',
            receiverMsg : "New Class Added"
          }
          socket.emit('send_notification',socketData)
          window.location.reload();
        } else {
            setError(res.payload.error)
        }
    })
  }

  const handleScan = (data) => {
    console.log("data", data)
    if ( data ) {
      setFormData({
        class_id: data,
      });
      setIsOpenScan(!isOpenScan)
    }
  }

  const handleError = err => {
    console.error("err", err)
    setError(err)
  }
const { t, i18n } = useTranslation();
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

        {
           (isOpenScan) ? (
             <ScanQrCode handleScan={handleScan} handleError={handleError} openScan={openScan} />
           ) : ('')
        }

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
              {t('add_class_capital')}
            </Box>
            <CloseIcon
              color={"primary"}
              className={styles.closeIcon}
              onClick={addingClass}
            />
          </Box>

          <Box className={styles.grayLine}></Box>

          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            style={{ padding: "20px 0" }}
          >
                <FormField
                    label={t('class_id_capital')}
                    name={"class_id"}
                    value={formData.class_id}
                    handle={handleChange}
                    error={error}
                />
          </Box>

        <Box className={styles.orText}>{t('or')} {t('scan_a_qr_code_capital')}</Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{
              width: "40%",
              padding: "10px 0",
              margin: "0 auto",
            }}
          ></Box>
          <Button
            className={styles.blueButton}
            style={{ width: "100%", height: "unset", borderRadius: "6px" }}
            onClick={openScan}
          >
            <CameraAltOutlinedIcon style={{ marginRight: "5px" }} />
            {t('scan_capital')}
          </Button>
        </Box>

        <Button
          className={styles.blueButton}
          style={{ width: "100%", height: "unset", borderRadius: "0px" }}
          onClick={handleSubmit}
        >
          + {t('add_class_capital')}
        </Button>
      </Card>
    </>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  return <CustomCard addingClass={props.addingClass} />;
});
export default TeamCardDemo;
