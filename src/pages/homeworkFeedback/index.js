import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SendIcon from "@material-ui/icons/Send";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { BgColor, Color, Fonts } from "../../theme/index";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import TheatersOutlinedIcon from "@material-ui/icons/TheatersOutlined";
import { Header } from "../../components";
import { toast } from 'react-toastify';
import _ from "lodash";
import openSocket from 'socket.io-client';
import { useTranslation } from 'react-i18next';

import {
  Container,
  Button,
  TextField,
  Box,
  Grid,
  Card,
  Typography,
  Input,
  TextareaAutosize,
} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import { animateScroll as scroll } from 'react-scroll'
import JoditEditor from "jodit-react";

import { userDefaultImage } from "./../../assets/index";
import Const from "./../../helpers/const"

import { addGradeHomework } from "./../../redux/actions/teacherActions";
import { homeworkFeedbackDetails, homeworkFeedbackList, homeworkFeedbackAnswer, homeworkFeedbackLike } from "../../redux/actions/homeworkFeedbackActions"
import { getHomework } from "./../../redux/actions/homeworkActions";
import { uploadFile } from "../../redux/actions/uploadActions"
import { SOCKET_URL } from './../../config/weChatConfig';


import { submitComment, commentList } from "../../redux/actions/homeworkCommentActions"
const socket = openSocket(SOCKET_URL);
const useStyles = makeStyles(() => ({
    container: {
        alignSelf: "flex-end",
        paddingLeft: 250,
        paddingTop: 70,
        paddingBottom: 20,
    },
    mainHeading: {
        fontSize: "20px",
        fontFamily: Fonts.Medium,
    },
    NotificationProfileName: {
        color: Color.textBlue,
        fontSize: "18px",
        fontFamily: Fonts.Medium,
    },
    smallestBlueTitle: {
        color: Color.textBlue,
        fontSize: "13px",
        fontFamily: Fonts.Regular,
        textTransform: "uppercase",
    },
    notificationTitle: {
        color: "rgba(25,25,25,.4)",
        fontSize: "13px",
        fontFamily: Fonts.Medium,
        textTransform: "uppercase",
    },
    smallText: {
        color: BgColor.myBlack,
        fontSize: "20px",
        fontFamily: Fonts.Regular,
    },
    mainHeading2: {
        fontSize: "25px",
        fontFamily: Fonts.Medium,
    },
    shareCodeText: {
        color: Color.myBlack,
        fontSize: "18px",
        fontFamily: Fonts.Medium,
        textTransform: "uppercase",
        textAlign: "center",
    },
    blueButton: {
        width: "100%",
        height: "40px",
        color: "#fff",
        borderRadius: "5px",
        fontFamily: Fonts.Medium,
        backgroundColor: BgColor.myBlue,
        padding: "0 20px",
        "&:hover": {
        color: Color.textBlue,
        border: "1px solid" + Color.textBlue,
        },
    },
    whiteButton: {
        width: "100%",
        height: "40px",
        color: Color.textBlue,
        fontFamily: Fonts.Medium,
        borderRadius: "5px",
        backgroundColor: "#fff",
        border: "1px solid " + BgColor.myBlue,
        padding: "0 20px",
        margin: "5px 0",
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
    profileImg: {
        width: "50px",
        height: "50px",
        borderRadius: "50px",
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: "10px",
        textAlign: "center",
        color: Color.textMyBlack,
    },
    messageImages: {
        width: "50px",
        height: "50px",
        borderRadius: "5px",
        marginRight: "5px",
        marginBottom: "15px",
    },
    sendButton: {
        color: "#fff",
        width: "100%",
        height: "140px",
        borderRadius: "10px",
        marginTop: "10px",
        marginLeft: "10px",
        backgroundColor: BgColor.myBlue,
        "&:hover": {
        color: Color.textBlue,
        border: "1px solid" + Color.textBlue,
        },
    },
    sendingMessageDivLeft: {
        float: "right",
        maxWidth: "100%",
        width: "100%",
        height: "140px",
        overflow: "auto",
        // padding: "10px",
        borderRadius: "10px",
        marginTop: "10px",
        flex: "7",
    },
    mainHeading: {
        fontSize: "20px",
        fontFamily: Fonts.Medium,
    },
    textBoxIcons: {
        color: Color.textBlue,
        fontSize: "20px",
        cursor: "pointer",
    },
    likeThumb: {
        color: Color.textBlue,
        cursor: "pointer",
        transition: "all .3s ease",
        "&:hover": {
        opacity: ".5",
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
    uploadedFiles: {
      marginLeft: "30px",
      color: "#2a30ff",
    },
    blueButtonSm: {
      color: "#fff",
      fontSize: "12px",
      lineHeight: "17px",
      height: "30px",
      borderRadius: "5px",
      backgroundColor: BgColor.myBlue,
      border: "1px solid transparent",
      padding: "0 12px",
      "&:hover": {
        color: Color.textBlue,
        border: "1px solid" + Color.textBlue,
      },
    },
    root: {
      flexGrow: 1,
    },
    gradePercentage: {
      color: Color.textBlue,
      fontSize: "35px",
      fontFamily: Fonts.Regular,
      opacity: 0.5,
      margin: "0 0 -3px 0",
    },
    smallBlueButton:  {
      height: "40px",
      color: "#fff",
      fontSize: "12px",
      lineHeight: "48px",
      // height: "30px",
      borderRadius: "5px",
      backgroundColor: BgColor.myBlue,
      border: "1px solid transparent",
      padding: "0 25px",
      marginLeft: "2px",
      "&:hover": {
        color: Color.textBlue,
        border: "1px solid" + Color.textBlue,
      },
    },
    deleteButton:  {
      height: "40px",
      color: "#fff",
      fontSize: "12px",
      lineHeight: "48px",
      // height: "30px",
      borderRadius: "5px",
      border: "1px solid transparent",
      padding: "0 25px",
      marginLeft: "2px",
      backgroundColor: "#FF8F8A",      "&:hover": {
        color: "#FF8F8A",
        border: "1px solid #FF8F8A",
      },
    },
}));

const WhitBox = ({ heading }) => {
  const styles = useStyles();
  return (
    <>
      <Box>
        <WhiteCard heading={"DESCRIPTION"} />
      </Box>
    </>
  );
};

const SendingMessageDiv = ({ answerNumber, authUser, questionDetail }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState('')
  const [image, setImage] = useState([])
  const [video, setVideo] = useState([])
  const [document, setDocument] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleFormDataChange = (e) => {
    setAnswer(e.target.value)
  }
  useEffect(() => {
    dispatch(homeworkFeedbackList({question_id: questionDetail?.submmitedHomework?.id}))
  }, [])

  const handleFileDataChange = (e) => {
    e.persist();
    let eName = e.target.name
    const Data = new FormData();
    Data.append('file', e.target.files[0])

    dispatch(uploadFile(Data)).then((res) => {
      if( res.type == 'success' ) {
        if(eName == 'video') {
          setVideo(video => [...video, res.data[0].url])
        } else if(eName == 'document') {
          setDocument(document => [...document, res.data[0].url])
        } else {
          setImage(image => [...image, res.data[0].url])
        }
        setUploadedFiles( uploadedFiles =>
          [
            ...uploadedFiles,
            res.data[0].filename
          ]
        )
      }
    })
  }

  const submitForm = (e) => {
    e.persist();
    dispatch (homeworkFeedbackAnswer({
          answer: answer,
          homework_id: questionDetail?.submmitedHomework?.homework_id,
          homework_submission_id: questionDetail?.submmitedHomework?.id,
          image: image,
          video: video,
          document: document,
          is_like: false
    })).then((res) => {
      console.log("res", res)
      if( res.type == 'success' ) {
        
        setAnswer("")
        setImage([])
        setVideo([])
        setDocument([])
        setUploadedFiles([])
        dispatch(homeworkFeedbackList({question_id: questionDetail?.submmitedHomework?.id}))
        let data = {question_id: questionDetail?.submmitedHomework?.id}
        socket.emit('sender', data)

        let notifyData = {
          id: authUser.id==questionDetail.submmitedHomework.teacher_id ? questionDetail.submmitedHomework.student_id : questionDetail.submmitedHomework.teacher_id,
          for : authUser.id==questionDetail.submmitedHomework.teacher_id ? 'student' : "teacher",
          message : '',
					receiverMsg : `${authUser?.username} sent you a message "${res?.payload?.answer}" in ${questionDetail?.homework?.title}`
        }
        socket.emit('send_notification',notifyData)

      } else {
        toast.error(res.payload.error)
      }
    })
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" >
        <Card className={styles.sendingMessageDivLeft+ ' question-feedback-card'}>
          <CardContent style={{ padding: "16px" }}>
            <Box>
              <Box className={styles.smallestBlueTitle}>
                {/*'Answer#'+answerNumber*/}
              </Box>
              <TextField
                className={styles.smallText}
                style={{ width: "100%" }}
                placeholder="Type message"
                multiline
                rows={2}
                name="answer"
                value={answer}
                onChange={handleFormDataChange}
              />
              <Box style={{ marginTop: "25px" }}>
                <label htmlFor="upload-image" style={{ marginBottom: "0px" }}>
                  <input
                    style={{ display: 'none' }}
                    id="upload-image"
                    name="image"
                    type="file"
                    onChange={handleFileDataChange}
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <ImageOutlinedIcon className={styles.textBoxIcons} />
                </label>
                <label htmlFor="upload-video">
                  <input
                    style={{ display: 'none' }}
                    id="upload-video"
                    name="video"
                    type="file"
                    onChange={handleFileDataChange}
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                  <TheatersOutlinedIcon
                    className={styles.textBoxIcons}
                    style={{ marginLeft: "10px" }}
                  />
                </label>
                <label htmlFor="upload-document">
                  <input
                    style={{ display: 'none' }}
                    id="upload-document"
                    name="document"
                    type="file"
                    onChange={handleFileDataChange}
                    accept=".doc,.docx,.wps,.ppt"
                  />
                  <AttachFileIcon
                    className={styles.textBoxIcons}
                    style={{ marginLeft: "10px" }}
                  />
                </label>
              </Box>
              <Box>
                {
                  Array.isArray(uploadedFiles) ? uploadedFiles.map((value, index) => {
                    return (
                      <span key={index} className={styles.uploadedFiles}>{value}</span>
                    )
                  }) : ('')
                }
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Button
          className={styles.sendButton}
          style={{ flex: ".5", padding: "0" }}
          onClick={submitForm}
        >
          <SendIcon />
        </Button>
      </Box>
    </>
  );
};

const RecievedMessageCard = ({ data, index, likeFeedback }) => {
  const styles = useStyles();
  const { answer, dateTime, is_like } = data;
  console.log('chatting userdetails'+data)
  return (
    <>
      <Card
        style={{
          float: "left",
          maxWidth: "100%",
          width: "100%",
          padding: "0px",
          borderRadius: "10px",
          marginTop: "10px",
          background:"lightblue"
        }}
        className=" student-question-feed-card"
      >
        <CardContent>
          <Box>
            <img src={data.profileImage ? data.profileImage : userDefaultImage} className={styles.profileImg} />
            <Box className={styles.smallText + 'card-feed-answer'}>{answer}</Box>
            <Box className={styles.notificationTitle} style={{ clear: "both" }}>{/*'ANSWER#'+index*/}{data.username}</Box>
            
            {
              Array.isArray(data.image) ? data.image.map((value, index) => {
                return (
                  <>
                    <img src={value} key={index} className={styles.messageImages} />
                    <br />
                  </>
                )
              }) : ('')
            }
            {
              Array.isArray(data.video) ? data.video.map((value, index) => {
                return (
                  <>
                    <video width="500" height="350" controls >
                      <source src={value} key={index} type="video/mp4" className={styles.messageImages}/>
                    </video>
                    <br />
                  </>
                )
              }) : ('')
            }
            {
              Array.isArray(data.document) ? data.document.map((value, index) => {
                return (
                  <>
                    <a href={value} key={index} target="_blank">{value}</a>
                    <br />
                  </>
                )
              }) : ('')
            }
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                className={styles.timeAndDateLight}
                style={{ marginTop: "10px" }}
              >
                <span>{dateTime}</span>
              </Box>
              <Box onClick={() => likeFeedback(data.id,is_like)}>
                {
                  (!is_like) ? (<ThumbUpAltOutlinedIcon className={styles.likeThumb} />) : (<ThumbUpAltIcon className={styles.likeThumb} />)
                }
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const SentMessageCard = ({ data, index, likeFeedback }) => {
  const styles = useStyles();
  const { answer, dateTime, is_like } = data;
  return (
    <>
      <Card
        style={{
          float: "right",
          // maxWidth: "100%",
          width: "100%",
          padding: "0px",
          borderRadius: "10px",
          marginTop: "10px",
          
        }}
        className=" teacher-question-feed-card"
      >
        <CardContent style={{ padding: "16px" }}>
          <Box>
            <img src={data.profileImage ? data.profileImage : userDefaultImage} className={styles.profileImg} />
            <Box className={styles.smallText+ ' card-feed-answer'}>{answer}</Box>
            <Box className={styles.notificationTitle}>{/*'ANSWER'+'#'+index*/} {'You'}</Box>
            
            {
              Array.isArray(data.image) ? data.image.map((value, index) => {
                return (
                  <>
                    <img src={value} key={index} className={styles.messageImages} />
                    <br />
                  </>
                )
              }) : ('')
            }
            {
              Array.isArray(data.video) ? data.video.map((value, index) => {
                return (
                  <>
                    <video width="500" height="350" controls >
                      <source src={value} key={index} type="video/mp4" className={styles.messageImages}/>
                    </video>
                    <br />
                  </>
                )
              }) : ('')
            }
            {
              Array.isArray(data.document) ? data.document.map((value, index) => {
                return (
                  <>
                    <a href={value} key={index} target="_blank">{value}</a>
                    <br />
                  </>
                )
              }) : ('')
            }
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                className={styles.timeAndDateLight}
                style={{ marginTop: "10px" }}
              >
                <span>{dateTime}</span>
              </Box>
              <Box onClick={() => likeFeedback(data.id)}>
                {
                  (!is_like) ? (<ThumbUpAltOutlinedIcon className={styles.likeThumb} />) : (<ThumbUpAltIcon className={styles.likeThumb} />)
                }
              </Box>
            </Box>
          </Box>
        </CardContent>
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
          maxWidth: "100%",
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <CardContent style={{ padding: "16px" }}>
          <Box>
            <Box className={styles.notificationTitle}>{heading}</Box>
            <Box className={styles.smallText}>
              <div dangerouslySetInnerHTML={{__html: textContent }}></div>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const NotificationDiv1 = ({questionDetail}) => {
  const styles = useStyles();

  return (
    <Card
      style={{
        maxWidth: "100%",
        width: "100%",
        borderRadius: "10px",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <CardContent style={{ padding: "16px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box pr={"10px"}>
              <img src={(questionDetail.student.profileImage) ? questionDetail.student.profileImage : userDefaultImage} className={styles.profileImg} />
            </Box>
            <Box>
              {/* <Box className={styles.subTitleLight}>Course id</Box> */}
              <Box className={styles.NotificationProfileName} py={"2px"}>
                {questionDetail.student.fullName}
              </Box>
              {/* <Box className={styles.timeAndDateLight}>{questionDetail.questionDetail.question_type}</Box> */}
            </Box>
          </Box>
          <Box>
            {/* <Box className={styles.subTitleLight}>TIME TO answer</Box>
            <Box className={styles.hoursText}>{questionDetail.questionDetail.time_limit}</Box> */}
            {/* <Box className={styles.smallText} pb={"5px"}>
                  {textContent}
                </Box> */}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const MessagesMainDiv = ({authUser, feedbackList, questionDetail}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const scrollToBottom = ()  => {
    scroll.scrollToBottom({
      containerId: "messageContainer",
      delay:50,
      smooth:false,
    });
  }

  const likeFeedback = (feedbackId,islike) => {
    dispatch(homeworkFeedbackLike({
      feedback_id: feedbackId
    })).then((res) => {
      if ( res.type == 'success' ) {
        dispatch(homeworkFeedbackList({"question_id" : questionDetail.submmitedHomework.id}))
        let data = {question_id: questionDetail?.submmitedHomework?.id}
        socket.emit('sender', data)
        console.log(questionDetail)
        let notifyData = {
          id: authUser.id==questionDetail.submmitedHomework.teacher_id ? questionDetail.submmitedHomework.student_id : questionDetail.submmitedHomework.teacher_id,
          for : authUser.id==questionDetail.submmitedHomework.teacher_id ? 'student' : "teacher",
          message : '',
          receiverMsg : `${authUser?.username} ${islike ? 'DisLike' : 'like'} your message "${res?.payload?.answer}" in ${questionDetail?.homework?.title}`
        }
        socket.emit('send_notification',notifyData)
      }
    })
  }

  const answerNo = () => {
    if (Array.isArray(feedbackList)) {
      return (_.size(feedbackList) + 1)
    }
    return 1;
  }

  return (
    <>
      <Box
        display="flex"
        // flexDirection="column"
        justifyContent="space-between"
        // alignItems="center"
      >
        {/* <Typography
          className={styles.mainHeading}
          style={{ marginBottom: "5px" }}
        >
          Feedback
        </Typography> */}
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        style={{
          height: "calc(100vh - 170px)",
        }}
      >
        <Box
          py={"10px"}
          px={"20px"}
          style={{
            overflow: "auto",
            borderRadius: "10px",
            backgroundColor: "rgba(82, 129, 239,.1)",
            minHeight: "440px",
            width: "100%"
          }}
          id="messageContainer"
        >
          {
            Array.isArray(feedbackList) ? feedbackList.map((value, index) => {
              return (
                <>
                {
                  (authUser.id == value.user_id) ? (
                    <SentMessageCard
                      key={index}
                      data ={value}
                      index={(index+1)}
                      likeFeedback={likeFeedback}
                    />
                  ) : (
                    <RecievedMessageCard
                      key={index}
                      data ={value}
                      index={(index+1)}
                      likeFeedback={likeFeedback}
                    />
                  )
                }
                {scrollToBottom()}
                </>
              )
            }) : ('')
          }

          {/* <SentMessageCard
            heading={"question#1"}
            textContent={
              "It is a long established fact that a reader will be distracted by the readable content"
            }
            time={"07:53"}
            date={"25/07/2020"}
          />
          <RecievedMessageCard
            heading={"question#1"}
            textContent={
              "Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary."
            }
            time={"07:53"}
            date={"25/07/2020"}
            // images={[image1, image1]}
          />
          <SentMessageCard
            heading={"question#1"}
            textContent={
              " Lorem Ipsum, 'Lorem ipsum dolor sit amet line in section."
            }
            time={"07:53"}
            date={"25/07/2020"}
            images={[image1, image1]}
          />
          <SentMessageCard
            heading={"question#1"}
            textContent={
              "very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32"
            }
            time={"07:53"}
            date={"25/07/2020"}
          /> */}
        </Box>

        <Box style={{width: "100%"}}>
          <SendingMessageDiv
            authUser={authUser}
            questionDetail={questionDetail}
            answerNumber={answerNo()}
          />
        </Box>
      </Box>
    </>
  );
};

const NotificationMainDiv = ({ questionDetail, authUser,homeWorkData }) => {
  const styles = useStyles();
  const [openedNotifications, setOpenedNotifications] = useState(false);
  const openNotification = () => {
    setOpenedNotifications(!openedNotifications);
  };

  const [openedConfirmationMessage, setOpenedConfirmationMessage] = useState(
    false
  );

  const openConfirmationMessage = () => {
    setOpenedConfirmationMessage(!openedConfirmationMessage);
  };

  const openNotificationAndopenConfirmationMessage = () => {
    setOpenedNotifications(!openedNotifications);
    openConfirmationMessage();
  };

  const ConfirmationMessage = ({
    dropdown,
    label,
    textArea,
    func,
    openConfirmationMessage,
    openNotification,
    openNotificationAndopenConfirmationMessage,
  }) => {
    const styles = useStyles();
    return (
      <>
        <Container maxWidth="xl" className={styles.overlayWrapper}>
          <Card
            style={{
              maxWidth: "100%",
              width: "100%",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            <Box style={{ padding: "26px" }}>
              <Box className={styles.smallestBlueTitle}>Are you sure?</Box>
              <Box className={styles.smallText}>
                You will no longr be able to answer this quesion. Do you want to
                leave this question?
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                className={styles.blueButton}
                style={{ margin: "5px" }}
                onClick={openNotificationAndopenConfirmationMessage}
              >
                leave quesion
              </Button>
              <Button
                className={styles.blueButton}
                style={{ margin: "5px" }}
                onClick={openConfirmationMessage}
              >
                return
              </Button>
            </Box>
          </Card>
        </Container>
      </>
    );
  };

  return (
    <>
        <Box>
          <NotificationDiv1
            questionDetail={questionDetail}
          />
          <WhiteCard
            heading={"question"}
            textContent={questionDetail.homework  ? questionDetail.homework.title : homeWorkData.description}
          />
          <WhiteCard
            heading={"description"}
            textContent={questionDetail.homework.description}
          />
          <AssignmentCard submittedHomework={questionDetail.submmitedHomework} authUser={authUser} questionDetail={questionDetail}
          homeWorkData={homeWorkData}
          />
        </Box>
    </>
  );
}

const AssignmentCard = ({ submittedHomework, authUser,questionDetail,homeWorkData }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const editor = useRef(null)
  const config = {
    // buttons : ['bold', 'italic',],
    // "buttons": "source,bold,italic,underline,strikethrough,eraser,superscript,subscript,ul,ol,indent,outdent,left,font,fontsize,paragraph,classSpan",
    minHeight : "400",
    toolbarButtonSize: "small",
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    uploader: {
      url: Const.FILE_LIST_URL,
      headers : {
        Authorization : localStorage.userToken
      },
    },
    // "autofocus": true,
    "askBeforePasteHTML": false,
    "askBeforePasteFromWord": false
  }

  const [isEdit, setIsEdit] = useState(false);
  const [mode, setMode] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const [formData, setFormDataData] = useState({
    class_id: "",
    student_id: "",
    homework_id: "",
    grade : (submittedHomework.grade) ? submittedHomework.grade : 0,
    grade_detail : (submittedHomework.grade_detail) ? (submittedHomework.grade_detail) : submittedHomework.homework_details,
  });
  const comments = useSelector((store) => store.homeworkComment.list)
  const [editorState, setEditorState] = useState((submittedHomework.grade_detail) ? (submittedHomework.grade_detail) : submittedHomework.homework_details); 
  const onEditorStateChange = (val) => {
    setEditorState(val);
    setFormDataData((formData) => ({
      ...formData,
      grade_detail: val,
    }));
  }
  const onCommentEditorStateChange = (val) => {
    setcommentFormData((formData) => ({
      ...commentFormData,
      comment: val,
    }));
  }

  const handleFormDataChange = (event) => {
    event.persist();
    setFormDataData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  }

  const [commentFormData, setcommentFormData] = useState({
    class_id: "",
    student_id: "",
    teacher_id: "",
    homework_id: "",
    comment : "",
  });

  const handleCommentFormDataChange = (event) => {
    event.persist();
    setcommentFormData((commentFormData) => ({
      ...commentFormData,
      comment: event.target.value,
    }));
  }

  const commentFormSubmit = (event) => {
    onCommentEditorStateChange(kdmeditortext2.html())
    commentFormData.comment=kdmeditortext2.html()
    event.persist();
    setIsSubmit(true)
    let Data = {
      ...commentFormData,
      class_id: submittedHomework.class_id,
      student_id: submittedHomework.student_id,
      homework_id: submittedHomework.homework_id,
      teacher_id: submittedHomework.teacher_id,
    }
    dispatch(submitComment(Data)).then((response) => {
      setIsSubmit(false)
      if ( response.type == 'success' ) {
        formSubmit("","",true);
        setMode(false)
        setcommentFormData((commentFormData) => ({
          ...commentFormData,
          comment: "",
        }));
        dispatch(commentList({
          student_id: submittedHomework.student_id,
          homework_id: submittedHomework.homework_id,
          teacher_id: submittedHomework.teacher_id,
        }))
        toast.success("Successfully submitted.");
      } else {
        toast.error("Server error, Please check your details.");
      }
    });
  }

  const getValues = () => {
    setFormDataData((formData) => ({
      ...formData,
      grade: (submittedHomework.grade) ? submittedHomework.grade : 0,
      grade_detail : (submittedHomework.grade_detail) ? (submittedHomework.grade_detail) : submittedHomework.homework_details
    }));
    setEditorState((submittedHomework.grade_detail) ? (submittedHomework.grade_detail) : submittedHomework.homework_details);
  }

  useEffect(() => {
    getValues()
    dispatch(commentList({
      student_id: submittedHomework.student_id,
      homework_id: submittedHomework.homework_id,
      teacher_id: submittedHomework.teacher_id,
    }))
  }, [submittedHomework]);

  const isEditOrComment = (value) => {
    setMode(value)
  }

  const formSubmit = (event="",eventtype="",is_editable="") => {
    if(!is_editable){
      
      onEditorStateChange(kdmeditortext.html())
      formData.grade_detail=kdmeditortext.html()
    }

    if(event){
      event.persist();
    }
    setIsSubmit(true)
    if(submittedHomework){
      let Data = {
        ...formData,
        class_id: submittedHomework.class_id,
        student_id: submittedHomework.student_id,
        homework_id: submittedHomework.homework_id,
        eventtype: eventtype
      }
      console.log("this is data===>", Data)
      dispatch(addGradeHomework(Data)).then((response) => {
        console.log("response", response)
  
        if ( response.type == 'success' ) {
          if(eventtype!="save"){
            setMode(false)
            let notifyData = {
              id: submittedHomework.student_id,
              for : 'student',
              message : '',
              receiverMsg : `${authUser?.username} add grade in ${questionDetail?.homework?.title}`
            }
            socket.emit('send_notification',notifyData)
            toast.success("Successfully submitted.");
          }
          else{
            setIsSubmit(false)
            setMode(false)
            toast.success("Successfully saved.");
          
            
          }
          
        } else {
          toast.error("Server error, Please check your details.");
        }
      });
      
    }else {
      toast.error("Server error, Please check your details.");
    }
  }
  const {t , i18n} = useTranslation()
  const [kdmeditortext, setkdmeditortext] = useState('');
  const kdmed=()=>{
    // alert('inner')
    var kdmeditortxt=window.kdmeditor()
    setkdmeditortext(kdmeditortxt)
  }
  const [kdmeditortext2, setkdmeditortext2] = useState('');
  const kdmed2=()=>{
    // alert('inner')
    var kdmeditortxt2=window.kdmeditor2()
    setkdmeditortext2(kdmeditortxt2)
  }
  setTimeout(() => {
    kdmed()
    kdmed2()
  }, 500)
  return (
    <>
      <Card
        style={{
          maxWidth: "100%",
          // width: "550px",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Box style={{ marginBottom: "30px" }}>
            <Typography
              className={styles.profileName}
            >
              {t('grade')}:
            </Typography>
            <Typography className={styles.gradePercentage}>{(formData.grade) ? (formData.grade) : submittedHomework.grade}%</Typography>
            <Typography className={styles.gradePercentage}>{(formData.marks_grade) ? (formData.marks_grade) : submittedHomework.marks_grade}</Typography>
          </Box>

          {
            ((authUser.user_type == 1) && (mode == 'e')) ? (
              <>
                <Box style={{
                  marginBottom: "10px",
                }}>
                  <TextField
                    // label="Grade"
                    variant="outlined"
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleFormDataChange}
                    className={styles.TextFields}
                  />
                      <TextField
                    // label="Grade"
                    variant="outlined"
                    type="text"
                    name="marks_grade"
                    value={formData.marks_grade}
                    onChange={handleFormDataChange}
                    className={styles.TextFields}
                  />
                </Box>
                <Box>
                  {/*<JoditEditor
                    ref={editor}
                    value={editorState}
                    config={Const.EDITOR_CONFIG}
                    // tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => onEditorStateChange(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={ (text) => {} }
                  />*/}
                  <textarea name="content12">{editorState}</textarea>
                  <p>{t('count_word_msg')}< span  class ="word_count2" > 0 </ span > </p>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  pt={"10px"}
                  style={{float:"left"}}
                >
                  <Button
                    disabled={isSubmit}
                    className={styles.smallBlueButton}
                    onClick={(e)=>formSubmit(e,'save')}
                  >
                    Save
                  </Button>
                </Box>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  pt={"10px"}
                >
                  <Button
                    disabled={isSubmit}
                    className={styles.deleteButton + ' homework-grade-cancel-btn'}
                    onClick={() => isEditOrComment(false)}
                  >
                    Cancle
                  </Button>
                  <Button
                    disabled={isSubmit}
                    className={styles.smallBlueButton}
                    onClick={formSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box className={styles.smallText} dangerouslySetInnerHTML={{__html: formData.grade_detail }}></Box>
              </>
            )
          }
          {
            ((authUser.user_type == 1) && (mode == 'c')) ? (
              <>
              <Box style={{
                  marginBottom: "10px",
                }}>
                  <TextField
                    // label="Grade"
                    variant="outlined"
                    type="number"
                    name="grade"
                    value={formData.grade}
                    onChange={handleFormDataChange}
                    className={styles.TextFields}
                  />
                </Box>
                <Box>
                  {/*<JoditEditor
                    ref={editor}
                    value={commentFormData.comment}
                    config={Const.EDITOR_CONFIG}
                    // tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => onCommentEditorStateChange(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={ (text) => {} }
                  />*/}
                  <textarea name="content2">{commentFormData.comment}</textarea>
                  <p>{t('count_word_msg')}< span  class ="word_count1" > 0 </ span > </p>
                </Box>
                
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  pt={"10px"}
                >
                  <Button
                    disabled={isSubmit}
                    className={styles.deleteButton + ' homework-grade-cancel-btn'}
                    onClick={() => isEditOrComment(false)}
                  >
                    Cancle
                  </Button>
                  <Button
                    disabled={isSubmit}
                    className={styles.smallBlueButton}
                    onClick={commentFormSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </>
            ) : (<></>)
          }
          {
            ((authUser.user_type == 1) && (!mode)) ? (
              <>
                <Button
                  className={styles.smallBlueButton}
                  onClick={() => isEditOrComment('e')}
                >
                  EDIT
                </Button>
                <Button
                  className={styles.smallBlueButton}
                  onClick={() => isEditOrComment('c')}
                >
                  Comment
                </Button>
              </>
            ) : (<></>)
          }
        </CardContent>
      </Card>

      <Card
        style={{
          maxWidth: "100%",
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <CardContent style={{ padding: "16px" }}>
          <Box>
            <Box className={styles.notificationTitle}>{t('comments')}</Box>
            <List>
            {
              (Array.isArray(comments)) ? comments.map((value, i) => {
                return (
                  <>
                    <ListItem alignItems="flex-start" key={i}>
                      <Box className={styles.smallText} dangerouslySetInnerHTML={{__html: value.comment }}></Box>
                    </ListItem>
                    <Divider component="li" />
                  </>
                )
              }) : ("No result found.")
            }
            </List>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const HomeworkFeedback = (props) => {

  const authUser = useSelector((store) => store.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const { classes } = props;
  const styles = useStyles();
  useEffect(() => {
    console.log('message recevier')
    socket.on('recevier', (data) => {
      console.log("recevier by ===>>> ",data);
      console.log({match: props.match.params.id})
      console.log({question_id: data.question_id})

      if(props.match.params.id == data.question_id){
        dispatch(homeworkFeedbackList({question_id: data.question_id}))
      }
      });
  });

  useEffect(() => {
    // console.log("props.match.path", props.match.path)
    dispatch(homeworkFeedbackDetails(props.match.params.id)).then( (res) => {
      if ( res.type == 'success' ) {
        // setInterval(() => {
        //   if ( history.location.pathname == "/homework-feedback/"+props.match.params.id ) {
            dispatch(homeworkFeedbackList({question_id: res.payload.submmitedHomework.id}))
        //   }
        // }, 2000)
      }
    })
  }, [dispatch]);
  useEffect(() => {
    dispatch(getHomework(props.match.params.id)).then( (res) => {
      // console.log("res", res);
      if ( res.type == 'success' ) {

      }
    })
  }, [dispatch])
  const questionDetail = useSelector((store) => store.homeworkFeedback.data)
  const feedbackList = useSelector((store) => store.homeworkFeedback.list)
  const homeWorkData = useSelector((store) => store.homeworks.data);

  console.log("homeWorkData ==== >>>>>", homeWorkData)
const {t , i18n} = useTranslation()
  return (
      <>
          <Header history={props.history} />
          <Container maxWidth="xl" className={styles.container + ' homework-feedback-main'}>
          <>
              <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
                <Typography className={styles.mainHeading}>
                    {t('homework_feedback_label')}
                </Typography>
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    paddingTop="15px"
                    bgcolor="background.paper"
                >
                  <Grid container spacing={3}>
                    <Grid item lg={8} md={12}>
                        <NotificationMainDiv
                            questionDetail={questionDetail}
                            authUser={authUser}
                            heading={"Instructions"}
                            homeWorkData={homeWorkData}
                        />
                    </Grid>
                    
                    <Grid
                      item
                      lg={4}
                      md={12}
                      style={{
                          padding: "0",
                      }}
                    >
                      <MessagesMainDiv 
                        authUser={authUser} 
                        feedbackList={feedbackList}
                        questionDetail={questionDetail}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
          </>
          </Container>
      </>
  );
}

export default (HomeworkFeedback);
