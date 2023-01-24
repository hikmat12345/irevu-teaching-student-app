import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, withStyles } from "@material-ui/core";
import { BgColor, Color, Fonts } from "./../../../theme/index";
import CardContent from "@material-ui/core/CardContent";
import { Card, Grid, Box, Button, Paper, Typography } from "@material-ui/core";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import ListIcon from "@material-ui/icons/List";
import ImageIcon from "@material-ui/icons/Image";
import TheatersIcon from "@material-ui/icons/Theaters";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import queryString from 'query-string';
import Container from "@material-ui/core/Container";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import JoditEditor from "jodit-react";

import { ErrorAlert } from "./../../../components";

import { studentSubmitHomeworkDetails , studentsHomeWorkData } from "./../../../redux/actions/studentActions";
import { getHomework } from "./../../../redux/actions/homeworkActions";

import Const from "../../../helpers/const"
import { toast } from "react-toastify";
import openSocket from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { SOCKET_URL } from './../../../config/weChatConfig';


const useStyles = makeStyles(() => ({
  container: {
    alignSelf: "flex-end",
    // paddingLeft: 250,
    // paddingTop: 70,
    // paddingBottom: 20,
    textAlign: "center",
  },
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
  blueButton2: {
    color: "#fff",
    height: "40px",
    lineHeight: "40px",
    borderRadius: "5px",
    fontFamily: Fonts.Medium,
    cursor: "pointer",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: BgColor.myBlue,
    border: "1px solid transparent",
    padding: "0 20px",
    "&:hover": {
      color: Color.textBlue,
      border: "1px solid" + Color.textBlue,
      backgroundColor: "unset",
    },
  },
  subTitle: {
    color: "rgba(0,0,0,0.7)",
    fontSize: "12px",
    fontFamily: Fonts.Regular,
  },
  center : {
    display:"inline-block",
    position:"relative"
  }
}));
const BottomBar = () => {
  const styles = useStyles();

  return (
    <>
      <Card
        style={{
          maxWidth: "800px",
          // width: "550px",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormatBoldIcon style={{ margin: "0 5px" }} />
            <FormatItalicIcon style={{ margin: "0 5px" }} />
            <FormatUnderlinedIcon style={{ margin: "0 5px" }} />
            <ListIcon style={{ margin: "0 5px" }} />
            <ImageIcon style={{ margin: "0 5px" }} />
            <TheatersIcon style={{ margin: "0 5px" }} />
            <StrikethroughSIcon style={{ margin: "0 5px" }} />
          </Box>
          <Box className={styles.blueButton2}>Save</Box>
        </Box>
      </Card>
    </>
  );
};

const WhiteCard = ({ heading, textContent }) => {
  const styles = useStyles();

  return (
    <>
      <Card
        style={{
          maxWidth: "800px",
          // width: "550px",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Box>
            <Box className={styles.smallestBlueTitle}>{heading}</Box>
            <Box className={styles.smallText} dangerouslySetInnerHTML={{__html: textContent}}></Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

const MainHeading = ({ heading, subTitle }) => {
  const styles = useStyles();
  return (
    <>
      <Typography className={styles.mainHeading} style={{ margin: "15px 0" }}>
        {heading} <span className={styles.subTitle}>({subTitle})</span>
      </Typography>
    </>
  );
}

const TeamCardDemo = (props) => {
  const authUser = useSelector((store) => store.auth.user);
  const styles = useStyles();
  const dispatch = useDispatch();
  const editor = useRef(null)

  const { openedHomeworkId, openSubmitHomework } = props;

  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(true);

  const classDetails = useSelector((store) => store.classes.data);
  const homeworkDetails = useSelector((store) => store.homeworks.data);
  const homeWorkData = useSelector(state => state.students.studentsHomeWorkData)
  console.log('=======>>>>>1122',homeworkDetails);
let savedHomeWork = homeWorkData.find(e=> e.homework_id == openedHomeworkId)
  const [editorState, setEditorState] = useState(savedHomeWork?.homework_details);
  const onEditorStateChange = (val) => {
    setEditorState(val);
  }
  const [submitededitorState, setsubmitededitorState] = useState(homeworkDetails.homework_submission_details?.homework_details);
  useEffect(() => {
    dispatch(getHomework(openedHomeworkId)).then( (res) => {
      if ( res.type == 'success' ) {}
    })
  }, [dispatch]);

  const saveHomeworkDetails = () =>{
    setEditorState(kdmeditortext.html())
    var editorState2=kdmeditortext.html()
    dispatch(studentsHomeWorkData([...homeWorkData,{
      "homework_id" : openedHomeworkId,
      // "homework_details" : editorState2,
      "homework_details" : editorState,
    }]))
    toast.success('Data Save Successfully')
  }

  const submitHomeworkDetails = (e,save="") => {
    setEditorState(kdmeditortext.html())
    var editorState2=kdmeditortext.html()

    e.persist();
    dispatch(studentSubmitHomeworkDetails({
      class_id : classDetails.id,
      homework_details : editorState2,
      // homework_details : editorState,
      homework_id : openedHomeworkId,
      checked : false,
      submitted : save === "" ? 1 : 0,
      save:save
    }) ).then( (res) => {
      console.log(homeworkDetails)
      if ( res.type == 'success' ) {
        const socket = openSocket(SOCKET_URL);
        console.log(classDetails.user_id)
          let socketData = {
            id:homeworkDetails.user_id,
            for : 'teacher',
            message : authUser.username+' has submitted homework',
            receiverMsg : "New homework submitted"
          }
          
        setError(false);
        if(save === ""){
          openSubmitHomework(false);
          toast.success('Homework submitted succesfully')
          socket.emit('send_notification',socketData)
        }
        else{
          toast.success('Data Save Successfully')
          openSubmitHomework(false);
        }
      } else {
        toast.warning(res.payload.error)
        
        // setError(res.payload);
      }
    })
  }
  const [kdmeditortext, setkdmeditortext] = useState('');
  const kdmed=()=>{
    // alert('inner')
    var kdmeditortxt=window.kdmeditor()
    setkdmeditortext(kdmeditortxt)
  }
  const { t, i18n } = useTranslation();
  setTimeout(() => {
    var submitdetails=homeworkDetails.homework_submission_details ? homeworkDetails.homework_submission_details.homework_details : "";
    kdmed()
    if(kdmeditortext){
      kdmeditortext.html(submitdetails)
    }
  }, 500)
  return (
    <>
      <Container maxWidth="xl" className={styles.container}>
        <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper" className={styles.center}>
          {
            (error) ? (
                <ErrorAlert message={error} />
            ) : ('')
          } 
          <Box
            style={{ maxWidth: "600px" }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MainHeading heading={"Homework"} subTitle={"Submission"} />
            <CloseIcon
              style={{ color: Color.textBlue, cursor: "pointer" }}
              onClick={props.openSubmitHomework}
            />
          </Box>
          <WhiteCard
            heading={"Title"}
            textContent={homeworkDetails.title}
          />
          <WhiteCard
            heading={"Description"}
            textContent={homeworkDetails.description}
          />
          <Card
            style={{
              maxWidth: "800px",
              // width: "550px",
              padding: "10px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            <CardContent>
              <Box>
                {/*<JoditEditor
                  ref={editor}
                  value={editorState}
                  config={Const.EDITOR_CONFIG}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={newContent => onEditorStateChange(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={ (text) => {} }
                />*/}
                <textarea name="content12">{submitededitorState}</textarea>
                <p>{t('count_word_msg')}< span  class ="word_count2" > 0 </ span > </p>
              </Box>
            </CardContent>
          </Card>
          <Card
            style={{
              maxWidth: "800px",
              // width: "550px",
              padding: "10px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box onClick={submitHomeworkDetails} className={styles.blueButton2}>Submit</Box>
              {/* <FormControlLabel
                control={
                  <Switch
                    checked={submitted}
                    onChange={(val) => setSubmitted(!submitted)}
                    name="submitted"
                    color="primary"
                  />
                }
                label="Final submission?"
              /> */}
              {/*<Box onClick={saveHomeworkDetails} className={styles.blueButton2}>Save</Box>
            </Box>*/}
            <Box onClick={(e)=>submitHomeworkDetails(e,'save')} className={styles.blueButton2}>Save</Box>
            </Box>
          </Card>
          
          {/* <WhiteCard
            // heading={"Description"}
            textContent={
              "The established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages reader will be distracted by the  publishing packages and web page editors now use and web page editors now use readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use and web page editors now use Lor the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages reader will be distracted by the  publishing packages and web page editors now use and web page editors now use readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use to do."
            }
          />
          <BottomBar /> */}
        </Box>
      </Container>
    </>
  );
}

export default (TeamCardDemo);