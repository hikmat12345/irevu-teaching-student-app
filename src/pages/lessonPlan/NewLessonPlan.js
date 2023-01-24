import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import NoSsr from "@material-ui/core/NoSsr";
import { Container, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { Fonts, BgColor, Color } from "../../theme/index";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PublishIcon from "@material-ui/icons/Publish";
import openSocket from 'socket.io-client';
import { SOCKET_URL } from './../../config/weChatConfig';

const teacher = true;

const socket = openSocket(SOCKET_URL);
const useStyles = makeStyles({
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
    opacity: 0.5,
  },
  regularFont: {
    fontFamily: Fonts.Regular,
  },
  form: {
    display: "flex",
    flexDirection: "column",
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
  TextFields: {
    margin: "5px 0",
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
  grayTitle: {
    color: "rgba(0,0,0,0.5)",
    fontSize: "13px",
    fontFamily: Fonts.Regular,
    // textTransform: "uppercase",
  },
});

const MyCard = ({ standard, price, open, closeAddingNewResource }) => {
  const classes = useStyles();
  const [selectLevel, setSelectLevel] = useState(false);
  const openEducationLevel = () => {
    setSelectLevel(!selectLevel);
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardContent style={{ padding: "16px" }}>
          <Box
            // display="flex"
            flexDirection="column"
            // justifyContent="center"
            // alignItems="center"
          >
            <Box variant="button" display="block" pb={"10px"}>
              <Box
                display="flex"
                // flexDirection="column"
                justifyContent="space-between"
                // alignItems="center"
              >
                <Box></Box>
                <Box fontFamily={Fonts.Regular} fontSize={"22px"}>
                  + Add New Resource
                </Box>
                <CloseIcon
                  style={{ color: Color.textBlue, cursor: "pointer" }}
                  onClick={closeAddingNewResource}
                />
              </Box>
            </Box>
            <form noValidate autoComplete="off" className={classes.form}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                className={classes.TextFields}
              />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                // onClick={openEducationLevel}
                p={"10px"}
              >
                <Box
                  className={classes.smallestBlueTitle}
                  style={{ fontSize: "16px", opacity: "0.7" }}
                >
                  Paper
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box className={classes.grayTitle}>Word, Wps, Docx, PPT</Box>
                  <PublishIcon
                    style={{ color: Color.textBlue, marginLeft: "15px" }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                // onClick={openEducationLevel}
                p={"10px"}
              >
                <Box
                  className={classes.smallestBlueTitle}
                  style={{ fontSize: "16px", opacity: "0.7" }}
                >
                  Grade
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box className={classes.grayTitle}>
                    Screenshot Grade (Minimum 85%)
                  </Box>
                  <PublishIcon
                    style={{ color: Color.textBlue, marginLeft: "15px" }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                onClick={openEducationLevel}
                p={"10px"}
              >
                <Box
                  className={classes.smallestBlueTitle}
                  style={{ fontSize: "16px", opacity: "0.7" }}
                >
                  Education Level
                </Box>
                <ArrowDropDownIcon style={{ color: Color.textBlue }} />
              </Box>
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                className={classes.TextFields}
              />
            </form>
            <Box
              display="flex"
              // flexDirection="column"
              // justifyContent="flex-end"
              flexDirection="column"
              // alignItems="center"
            >
              {/* <Button
                className={classes.blueButton}
                style={{ marginRight: "10px" }}
              >
                Cancel
              </Button> */}

              <Typography
                className={classes.smallLightText}
                style={{ textAlign: "center", paddingBottom: "5px" }}
              >
                You can have a Maximum of 10 Lesson Plan
              </Typography>
              <Button className={classes.blueButton} style={{ width: "100%" }}>
                Publish
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      {selectLevel ? (
        <Container maxWidth="xl" className={classes.overlayWrapper}>
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
                padding: "15px 20px 20px 20px",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box></Box>
                <Box
                  className={classes.mainHeading2}
                  style={{ textAlign: "center", paddingBottom: "10px" }}
                >
                  LEVEL
                </Box>
                <CloseIcon
                  style={{ color: Color.textBlue, cursor: "pointer" }}
                  onClick={openEducationLevel}
                />
              </Box>

              <Button className={classes.whiteOutlinedButton}>
                PRE-INTERMEDIATE
              </Button>
              <Button className={classes.whiteOutlinedButton}>
                INTERMEDIATE
              </Button>
              <Button className={classes.whiteOutlinedButton}>
                UPPER-INTERMEDIATE
              </Button>
              <Button className={classes.whiteOutlinedButton}>ADVANCED</Button>
            </Box>
          </Card>
        </Container>
      ) : (
        ""
      )}
    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  console.log("func", props);
  return (
    <>
      <Grid
        style={{ marginRight: 0, marginTop: 15 }}
        item
        xs={12}
        md={6}
        lg={4}
      >
        <MyCard
          standard={"pre-intermediate"}
          title={"Introduction to Information & Technology"}
          price={"124"}
          description={
            "Write an essay on Earchquake for 560 five hundred and sixtywords."
          }
          open={props.open}
          closeAddingNewResource={props.closeAddingNewResource}
        />
      </Grid>
    </>
  );
});
export default TeamCardDemo;
