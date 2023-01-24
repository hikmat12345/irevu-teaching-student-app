import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { Fonts, BgColor, Color } from "../../theme/index";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import {
  GreenTick1,
  GreenTick2,
  GreenTick3,
  GreenTick4,
  GreenTick5,
} from "../../assets/images/index";

const teacher = true;

const useStyles = makeStyles({
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
    lineHeight: "40px",
    borderRadius: "5px",
    fontFamily: Fonts.Medium,
    cursor: "pointer",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: BgColor.myBlue,
    padding: "0 20px",
    "&:hover": {
      opacity: 0.5,
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
  root: {
    padding: "10px",
    borderRadius: "10px",
    marginRight: "15px",
  },
  media: {
    height: 140,
  },
  info: {
    color: "#2B65EC",
    textTransform: "initial",
    fontFamily: Fonts.Regular,
  },
  smallLightText: {
    color: BgColor.myBlack,
    fontSize: "14px",
    fontFamily: Fonts.Regular,
    opacity: 0.2,
  },
  regularFont: {
    fontFamily: Fonts.Regular,
  },
  form: {
    display: "flex",

    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: "0px",
    right: "15px",
    color: Color.textMyBlack,
    cursor: "pointer",
    marginBottom: "-6px",
    marginLeft: "10px",
  },
  payCard: {
    maxWidth: "600px",
    width: "600px",
    padding: "20px 0",
    borderRadius: "10px",
    marginTop: "10px",
  },
  payServiceDiv: {
    width: "100%",
    padding: "0px 0px",
    borderRadius: "0",
    backgroundColor: "#ECF2FF",
    boxShadow: "none",
    marginTop: "10px",
  },
  totalPriceDiv: {
    width: "100%",
    padding: "0px 0px",
    borderRadius: "0",
    backgroundColor: "#DBE6FF",
    boxShadow: "none",
  },
});

const ReceiptCardDiv = ({ openPayCard, openReceiptCard }) => {
  const styles = useStyles();
  const btnStyles = useGraphicBtnStyles();
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Card className={styles.payCard}>
      <Box p={"0px"}>
        <Box
          style={{
            position: "relative",
          }}
        >
          <Box className={styles.mainHeading2} style={{ textAlign: "center" }}>
            Receipt
          </Box>
          {/* <CloseIcon
            style={{ color: Color.textBlue, cursor: "pointer" }}
            className={styles.closeIcon}
            onClick={() => openReceiptCard()}
          /> */}
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
          p={"30px"}
          pb={"40px"}
        >
          <img src={GreenTick2} />
          <Box
            className={styles.smallText}
            style={{ textAlign: "center", opacity: ".7" }}
          >
            Payment Succesful
          </Box>
        </Box>
        <Card className={styles.payServiceDiv}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Box className={styles.smallestBlueTitle}>Service</Box>
                <Box className={styles.smallText}>Lesson Plan</Box>
                <Box
                  className={styles.smallLightText}
                  style={{ opacity: ".4" }}
                >
                  (plus 10% platform fee)
                </Box>
              </Box>
              <Box style={{ textAlign: "right" }}>
                <Box className={styles.smallestBlueTitle}>Cost</Box>
                <Box className={styles.smallText}>3 RMB</Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card className={styles.totalPriceDiv}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Box className={styles.smallestBlueTitle}>Total</Box>
              </Box>
              <Box>
                <Box className={styles.smallText}>3.3 RMB</Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box
        className={styles.blueButton}
        style={{ width: "80%", margin: "20px auto 0 auto" }}
        onClick={() => openReceiptCard()}
      >
        Return Home
      </Box>
    </Card>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  return (
    <ReceiptCardDiv
      openPayCard={props.openPayCard}
      openReceiptCard={props.openReceiptCard}
    />
  );
});
export default TeamCardDemo;
