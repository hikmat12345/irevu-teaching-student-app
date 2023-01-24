import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from 'react-i18next';
import CloseIcon from "@material-ui/icons/Close";

import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  CardContent,
} from "@material-ui/core";

import { Fonts, Color, BgColor } from "../../theme/index";
import moment from "moment";
import { toast } from 'react-toastify';

import { acceptForumQuestion, deleteForumQuestion, forumQuestionList, editForumQuestion } from "./../../redux/actions/forumActions";
import openSocket from 'socket.io-client';
import DefaultDateFormat from '../../helpers/DefaultDateFormat'
import { SOCKET_URL } from './../../config/weChatConfig';

const socket = openSocket(SOCKET_URL);
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: Fonts.Reguler,
    borderRadius: "10px",
    // maxWidth: 345,
    minWidth: 390,
    marginTop: 20,
    marginRight: 7,
    marginBottom: 10,
    marginLeft: 5,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#d4d4d4",
    "& .MuiCardHeader-title": {
      lineHeight: "16px",
    },
    "& .MuiTypography-body2": {
      fontFamily: Fonts.Regular,
    },
    "& .MuiCardHeader-subheader": {
      fontSize: "14px",
    },
    "& .MuiCardContent-root p": {
      lineHeight: "18px",
    },
    "& .MuiCardActions-root p": {
      fontFamily: Fonts.Medium,
    },
    "& .MuiCollapse-wrapperInner  .MuiTypography-body1": {
      fontFamily: Fonts.Regular,
      lineHeight: "20px",
    },
    "& .MuiCollapse-wrapperInner  .MuiTypography-body2": {
      fontSize: "14px",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardHeader: {
    fontFamily: Fonts.Medium,
    cursor:"pointer",
  },
  blueButton:  {
    marginLeft: "2px",
    color: "#fff",
    // border: "1px solid transparent",
    height: "20px",
    padding: "0 10px",
    borderRadius: "0px",
    backgroundColor: "#8A97FF",
    fontSize: "11px",
    "&:hover": {
      color: Color.textBlue,
      border: "1px solid" + Color.textBlue,
    },
  },
  deleteButton:  {
    marginLeft: "2px",
    color: "#fff",
    // border: "1px solid transparent",
    height: "20px",
    padding: "0 10px",
    borderRadius: "0px",
    backgroundColor: "#FF8F8A",
    fontSize: "11px",
    "&:hover": {
      color: "#FF8F8A",
      border: "1px solid #FF8F8A",
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
}));

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
}

const RecipeReviewCard = ({ type, data, authUser, toggleEditQuestion }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const {t , i18n} = useTranslation();
  const { id } = data;

  const [expanded, setExpanded] = React.useState(false);
  const [expandedvalue, setexpandedvalue] = React.useState('');

  const handleExpandClick = (id="") => {
    setexpandedvalue(expanded ? '' : id);
    setExpanded(!expanded);
    
  };

  const acceptQuestion = (id) => {
    let sellerId  = authUser.id;
    dispatch( acceptForumQuestion({questionId: id,sellerId: sellerId,accepted:true}) ).then((res) => {
      // console.log("res", res)
      if ( res.type == 'success') {
        let lessonData = {
          id:data.created_by,
          for : data.ask_whom,
          message : authUser.username+' Your Lesson Plan downloaded successfully',
          receiverMsg : "Your Question accepted"
        }
        socket.emit('send_notification',lessonData)
        history.push("/question-feedback?id="+id);
      } else {
        if (res.payload) {
          toast.error(res.payload.output);
        }
      }
    })
  }

  const openQuestion = (id) => {
    history.push("/question-feedback?id="+id);
  }

  const passQuestion = (id) => {
    history.push("/forum/");
  }

  const isEditable = (data) => {
    if ((data.is_editable) && (!data.is_blocked) && (data.created_by == authUser.id)) {
      return (
        <>
          <Button
            className={classes.blueButton}
            onClick={() => toggleEditQuestion(data)}
          >
            EDIT
          </Button>
          <Button
            className={classes.deleteButton}
            onClick={openConfirmationOverlay}
          >
            DELETE
          </Button>
        </>
      )
    }
    return '';
  }

  const [state, setState] = useState({
    confirmationOverlay: false,
  })

  const openConfirmationOverlay = () => {
    setState({
      confirmationOverlay: !state.confirmationOverlay,
    });
  };

  const confirmDelete = () => {
    dispatch(deleteForumQuestion(id)).then((res) => {
      console.log("res", res)
      openConfirmationOverlay()
      dispatch(forumQuestionList()).then((res) => {
        console.log("res forumQuestionList", res)
      })
    })
  }
  var opendisplay=false
  if((data.is_blocked == true) && (data.accepted_by == authUser.id) || (data.created_by == authUser.id) || type=="open"){
    opendisplay=true
  }

  return (
    <>
      {state.confirmationOverlay ? (
        <ConfirmationOverlay
          openConfirmationOverlay={openConfirmationOverlay}
          confirmDelete={confirmDelete}
        />
      ) : (
        ""
      )}
      <Card className={classes.root}>
      {t("privacy_policy") == "Privacy Policy" ? (
        <CardHeader
          className={classes.cardHeader}
          avatar={
            //   <CardActionArea>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {data.firstChar}
            </Avatar>
            //   </CardActionArea>
          }
          action={isEditable(data)}
          title={ <CardActions onClick={opendisplay ? () => openQuestion(data.id) : ''}>{data.subject}</CardActions> }
          
          // subheader={ moment(data.created_at).format("MMMM DD, YYYY") }
          subheader={ DefaultDateFormat(data.created_at) }
          
        />
        ):(
          <CardHeader
          className={classes.cardHeader}
          avatar={
            //   <CardActionArea>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {data.firstChar}
            </Avatar>
            //   </CardActionArea>
          }
          action={isEditable(data)}
          title={ <CardActions onClick={opendisplay ? () => openQuestion(data.id) : ''}>{data.subject}</CardActions> }
          
          // subheader={ moment(data.created_at).format("MMMM DD, YYYY") }
          subheader={ DefaultDateFormat(data.created_at) }
        />

        )}
        
        <CardContent style={{ padding: "16px" }}>
          <Typography variant="body2" color="textSecondary" component="p">
          {t("privacy_policy") == "Privacy Policy" ? (
            <span className="title" dangerouslySetInnerHTML={{__html: data.title }} onClick={opendisplay ? () => openQuestion(data.id) : ''} style={{cursor:"pointer"}}/>
            ):(
             <span className="title" dangerouslySetInnerHTML={{__html: data.title_cn ? data.title_cn : data.title}} onClick={opendisplay ? () => openQuestion(data.id) : ''} style={{cursor:"pointer"}}/>
            )}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <Typography
            variant="body2"
            className={classes.title}
            style={{ color: "gray" }}
            color="textSecondary"
            //component="p"
            //component={'span'}
          >
            { 
              ((data.is_blocked == true) && (data.accepted_by == authUser.id)) ? (
                <Button
                  className={classes.blueButton}
                  onClick={() => openQuestion(data.id)}
                >
                  OPEN
                </Button>
              ) : (data.created_by == authUser.id) ? (
                <Button
                  className={classes.blueButton}
                  onClick={() => openQuestion(data.id)}
                >
                  OPEN
                </Button>
              ) : (
                <>
                  {
                    (type == 'open') ? (
                      <>
                        <Button
                          className={classes.blueButton}
                          onClick={() => acceptQuestion(data.id)}
                        >
                          ACCEPT
                        </Button>
                        <Button
                          className={classes.blueButton}
                          onClick={() => passQuestion(data.id)}
                        >
                          PASS
                        </Button>
                      </>
                    ) : ('')
                  }
                </>
              )
            }
            {/* NOT ACCEPTED */}
          </Typography>
          <CardHeader
          subheader={'Price:'+(data.price.indexOf('RMB') >= 0 ? data.price : data.price+' RMB')}
        />
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded && expandedvalue==data.id,
            })}
            onClick={()=>handleExpandClick(data.id)}
            aria-expanded={expanded && expandedvalue==data.id}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded && expandedvalue==data.id} timeout="auto" unmountOnExit>
          <CardContent>
            {t("privacy_policy") == "Privacy Policy" ? (
            <CardHeader
              className={classes.questionmark}
              titleTypographyProps={{
                style: {
                  marginLeft: -16,
                },
              }}
              subheaderTypographyProps={{
                style: {
                  marginLeft: -16,
                },
              }}
              avatar={
                <Avatar aria-label="recipe" style={{ left: -16 }}>
                  {data.firstChar}
                </Avatar>
              }
              title={ data.title }
              subheader={ moment(data.created_at).format("DD MM YYYY") }
            />
            ):(
            <CardHeader
              className={classes.questionmark}
              titleTypographyProps={{
                style: {
                  marginLeft: -16,
                },
              }}
              subheaderTypographyProps={{
                style: {
                  marginLeft: -16,
                },
              }}
              avatar={
                <Avatar aria-label="recipe" style={{ left: -16 }}>
                  {data.firstChar}
                </Avatar>
              }
              title={ data.title_cn ? data.title_cn: data.title }
              subheader={ moment(data.created_at).format("DD MM YYYY") }
            />
            )}
            {/* <Typography paragraph component={'span'}> */}
              {/*<div className="title" dangerouslySetInnerHTML={{__html: data.description}} />*/}
            {/* </Typography> */}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

export default (RecipeReviewCard);
// export default withStyles(useStyles, { withTheme: true })(RecipeReviewCard);
