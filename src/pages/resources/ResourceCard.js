import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { Fonts, BgColor, Color } from "../../theme/index";
import CloseIcon from "@material-ui/icons/Close";
import {

  Box,
  Button,
  Card,
  Grid,
  Container,
  Typography,
  CardContent,
} from "@material-ui/core";

import { getResourceList, deleteResource } from "../../redux/actions/resourceActions"
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import CardMedia from "@material-ui/core/CardMedia";
const useStyles = makeStyles({
  root: {
    // padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    marginRight: "15px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#d4d4d4",
    cursor: "pointer",
    overflow: "hidden",
    borderTopLeftRadius: "1.5rem",
    borderTopRightRadius: "1.5rem",
    zIndex: 1,
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      display: "block",
      // width: "100%",
      // height: "100%",
      background: "linear-gradient(to top, #014a7d, rgba(0,0,0,0))",
      },
  },
  media: {
    height: 140,
  },
  info: {
    // color: "#2B65EC",
    color: "#fff",
    fontWeight: 500,
    textTransform: "initial",
    fontFamily: Fonts.Regular,
  },
  smallLightText: {
    // color: BgColor.myBlack,
    color: "#fff",
    fontWeight: 500,
    fontSize: "14px",
    fontFamily: Fonts.Regular,
    // opacity: 0.2,
  },
  regularFont: {
    fontFamily: Fonts.Regular,
    fontSize: "1rem",
    fontWeight: 500,
    color: "#fff",
  },
  deleteIcon: {
    // color: Color.textBlue,
    color: "#fff",
    fontWeight: 500,
    fontSize: "20px",
    marginBottom: "-4px",
    marginLeft: "10px",
    transition: "all .3s ease",
    "&:hover": {
      color: "#F50057",
    },
  },
  mainHeading: {
    fontSize: "20px",
    fontFamily: Fonts.Medium,
    opacity: ".8",
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
  title: {
    fontFamily: Fonts.Medium,
    fontSize: "2rem",
    fontWeight: 500,
    color: "#fff",
  },
});

const ConfirmationOverlay = ({ openConfirmationOverlay, confirmDelete }) => {

  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.overlayWrapper}>
      <Card
        style={{
          maxWidth: "600px",
          width: "600px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <Box p={"20px"}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box></Box>
            <Box
              className={classes.mainHeading2}
              style={{ textAlign: "center" }}
              pb={"10px"}
            >
              Are you sure you want to delete this?
            </Box>
            <CloseIcon
              style={{
                color: Color.textBlue,
                cursor: "pointer",
                marginTop: "-10px",
              }}
              onClick={openConfirmationOverlay}
            />
          </Box>
          <Button className={classes.whiteOutlinedButton} onClick={confirmDelete}>Yes</Button>
          <Button className={classes.whiteOutlinedButton} onClick={openConfirmationOverlay}>No</Button>
        </Box>
      </Card>
    </Container>
  );
};

const MyCard = ({
  ownLessonPlan,
  data,
  openLessonPlan,
  openLessonPlanFun,
  image
}) => {
  const mediaStyles = useCoverCardMediaStyles();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { id, title, description, price, level, plan, grade, subject} = data

  const [state, setState] = useState({
    confirmationOverlay: false,
  })

  const openConfirmationOverlay = () => {
    setState({
      confirmationOverlay: !state.confirmationOverlay,
    });
  };

  const confirmDelete = () => {
    dispatch(deleteResource(id)).then((res) => {
      console.log("res", res)
      openConfirmationOverlay()
      dispatch(getResourceList()).then((res) => {
        console.log("res getResourceList", res)
      })
    })
  }

  return (
    <div>
      {
        state.confirmationOverlay ? (
          <ConfirmationOverlay
            openConfirmationOverlay={openConfirmationOverlay}
            confirmDelete={confirmDelete}
          />
        ) : (
          ""
        )
      }
      <Card className={classes.root} style={{ border: "1px solid #d4d4d4" }}>
      <CardMedia
            classes={mediaStyles}
            image={
              image
            }
          />
        <CardContent style={{ padding: "6px", minHeight: "276px",backgroundColor: "rgb(0,0,0,0.5)" }}>

          <Box display="flex" justifyContent="space-between" mb={"5px"} >
          
            <Typography className={classes.smallLightText}>
              {level}
            </Typography>

            <Box>
              <Typography
                variant="button"
                display="inline"
                className={classes.info}
              >
                RMB {price}
              </Typography>
              {
                ownLessonPlan ? (
                  <span>
                    <DeleteIcon
                      color={"primary"}
                      className={classes.deleteIcon}
                      onClick={openConfirmationOverlay}
                    />
                  </span>
                ) : (
                  ""
                )
              }
            </Box>
          </Box>

          <div onClick={() => openLessonPlanFun(id, ownLessonPlan)}>
            <Typography variant="h2" display="block" className={classes.title}>
              
                {title} :<span>&nbsp;</span>
            </Typography>
            {/*<Typography
              variant="body2"
              color={"primary"}
              component="p"
              className={classes.regularFont}
              dangerouslySetInnerHTML={{__html: description }}
            >
            </Typography>*/}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  return (
    <Grid
      style={{ marginRight: 0, marginTop: 15 }}
      item
      xs={12}
      md={6}
      lg={4}
    >
      <MyCard
        data={props.data}
        ownLessonPlan={props.ownLessonPlan}
        openLessonPlan={props.openLessonPlan}
        openLessonPlanFun={props.openLessonPlanFun}
        image={props.image}
      />
    </Grid>
  );
});
export default TeamCardDemo;
