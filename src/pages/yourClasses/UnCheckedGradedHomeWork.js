import React from "react";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";

import { BgColor, Color, Fonts } from "../../theme/index";

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
    width: "100%",
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
}));

const WhitBox = ({ heading }) => {
  const styles = useStyles();
  return <Box>main be editer will be edit</Box>;
};

export const TeamCardDemo = React.memo(function TeamCard() {
  return (
    <>
      <WhitBox heading={"Instructions"} />
    </>
  );
});
export default TeamCardDemo;
