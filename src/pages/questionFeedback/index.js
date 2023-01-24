import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { BgColor, Color, Fonts } from "../../theme/index";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TheatersOutlinedIcon from "@material-ui/icons/TheatersOutlined";
import { Header } from "../../components";
import queryString from 'query-string';
import { toast } from 'react-toastify';
import _ from "lodash";
import { userDefaultImage } from "../../assets/index";
import openSocket from 'socket.io-client';
import { saveAs } from 'file-saver'
import {
  Container,
  Button,
  TextField,
  Box,
  Grid,
  Card,
  Typography,
  Input,
} from "@material-ui/core";

import {
  profileImg1,
  profileImg2,
  profileImg3,
  image1,
} from "../../assets/index";

import { forumQuestionDetails, forumFeedbackList, forumFeedbackAnswer, forumFeedbackLike } from "../../redux/actions/forumFeedbackActions"
import { uploadFile } from "../../redux/actions/uploadActions"
import results from "../results";
import { useTranslation } from 'react-i18next';
import { acceptForumQuestion } from "./../../redux/actions/forumActions";
import moment from "moment";
import { SOCKET_URL } from './../../config/weChatConfig';

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
  const { t, i18n } = useTranslation();
  const [answer, setAnswer] = useState('')
  const [image, setImage] = useState([])
  const [video, setVideo] = useState([])
  const [document, setDocument] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleFormDataChange = (e) => {
    setAnswer(e.target.value)
  }

  const handleFileDataChange = (e) => {
    e.persist();
    setUploadedFiles( uploadedFiles =>
          [
            ...uploadedFiles,
            "Please wait file is uploading"
          ]
        );
    let eName = e.target.name
    const Data = new FormData();
    Data.append('file', e.target.files[0])

    dispatch(uploadFile(Data)).then((res) => {
      if( res.type == 'success' ) {
        // setAnswer("")
        // dispatch(forumFeedbackList({question_id: value.id}))
        
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
    const value=queryString.parse(window.location.search, { ignoreQueryPrefix: true });
    dispatch (forumFeedbackAnswer({
          answer: answer,
          question_id: value.id,
          image: image,
          video: video,
          document: document,
          is_like: false
    })).then((res) => {
      if( res.type == 'success' ) {
        setAnswer("")
        setImage([])
        setVideo([])
        setDocument([])
        setUploadedFiles([])
        dispatch(forumFeedbackList({question_id: value.id}))
        let data = {question_id: value.id}
        socket.emit('sender', data)
        let notifyData = {
          id: questionDetail.questionDetail.created_by==authUser.id ? questionDetail.questionDetail.accepted_by: questionDetail.questionDetail.created_by,
          for : questionDetail.questionDetail.created_by==authUser.id ? questionDetail.questionDetail.ask_whom : 'student',
          message : '',
					receiverMsg : `${authUser.username} sent you a message "${res.payload.answer}" in ${questionDetail.questionDetail.title}`
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
        <Card className={styles.sendingMessageDivLeft + ' question-feedback-card'}>
          <CardContent style={{ padding: "16px" }}>
            <Box>
              <Box className={styles.smallestBlueTitle}>
                Answer#{answerNumber}
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
            <Box className={styles.smallText + ' card-feed-answer'}>{answer}</Box>
            <Box className={styles.notificationTitle} style={{ clear: "both" }}>{/*'ANSWER#'+index*/}{data.username}</Box>
            
            {
              Array.isArray(data.image) ? data.image.map((value, index) => {
                return (
                  <div key={index}>
                  <a href={value} target='_blank' download={value}>
                    <img src={value} key={index} className={styles.messageImages} />
                    <br />
                  </a>
                  </div>
                )
              }) : ('')
            }
            {
              Array.isArray(data.video) ? data.video.map((value, index) => {
                return (
                  <div key={index}>
                    <video width="500" height="350" controls key={index}>
                      <source src={value} key={index} type="video/mp4" className={styles.messageImages}/>
                    </video>
                    <br />
                  </div>
                )
              }) : ('')
            }
            {
              Array.isArray(data.document) ? data.document.map((value, index) => {
                return (
                  <div key={index}>
                    <a href={value} key={index} target="_blank" >{value}</a>
                    <br />
                  </div>
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
            <Box className={styles.notificationTitle}>{/*'ANSWER#'+index*/}{'You'}</Box>
            
            {
              Array.isArray(data.image) ? data.image.map((value, index) => {
                return (
                  <a href={value} target='_blank' download={value}>
                    <img src={value} key={index} className={styles.messageImages} />
                    <br />
                  </a>
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

const WhiteCard = ({ heading, textContent }) => {
  const styles = useStyles();
  const imageDownload = (value) => {
    console.log('=====>3',value);
  }
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
        {/* WhiteCard testing detail */}
        <CardContent style={{ padding: "16px" }}>
        {console.log("title===> ", heading)}
        {console.log("textContent===> ", textContent)}
          <Box>
            <Box className={styles.notificationTitle}>{heading }</Box>
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
  const imageDownload = (value) => {
    saveAs(value, 'image.jpg')
  }
  console.log('questionDetail', questionDetail)
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
      {/* NotificationDiv1 testing */}
      <CardContent style={{ padding: "16px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box pr={"10px"}>
            <a href={(questionDetail.userDetail.profileImage) ? questionDetail.userDetail.profileImage : userDefaultImage} target="_blank" download>
              <img src={(questionDetail.userDetail.profileImage) ? questionDetail.userDetail.profileImage : userDefaultImage} className={styles.profileImg} />
              </a>
            </Box>
            <Box>
              {/* <Box className={styles.subTitleLight}>Course id</Box> */}
              <Box className={styles.NotificationProfileName} py={"2px"}>
                {questionDetail.userDetail.fullName === undefined ? "Admin" :
                questionDetail.userDetail.fullName
                }
              </Box>
              <Box className={styles.timeAndDateLight}>{questionDetail.questionDetail.question_type}</Box>
            </Box>
          </Box>
          <Box>
             <Box className={styles.subTitleLight}>{questionDetail.userDetail.fullName !== undefined && 'TIME TO answer'}</Box>
            <Box className={styles.hoursText}>{questionDetail.questionDetail.time_limit}</Box>
            {/* <Box className={styles.smallText} pb={"5px"}>
                  {textContent}
                </Box> */}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const WhiteCard3 = ({
  textContent,
  name,
  date,
  time,
  feedback,
  homework,
  question,
  profileImg,
  func,
}) => {
  const styles = useStyles();
  const imageDownload = (value) => {
    console.log('====>4',value)
  }
  return (
    <>
      <Card
        style={{
          maxWidth: "100%",
          width: "100%",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={func}
      >
        <CardContent style={{ padding: "16px" }}>
          <Box display="flex" justifyContent="space-between">
            <Box pr={"10px"}>
        <a href={profileImg} onClick={imageDownload} download>
              <img src={profileImg} className={styles.profileImg} />
              </a>
            </Box>
            <Box style={{ flex: "2" }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box className={styles.subTitleLight}>
                  {feedback ? (
                    "WRite a feedback"
                  ) : (
                    <>
                      {homework ? (
                        "homework"
                      ) : (
                        <>{question ? "question" : ""}</>
                      )}
                    </>
                  )}
                </Box>
                <Box className={styles.subTitleLight}>
                  {feedback ? (
                    "IELTS"
                  ) : (
                    <>{homework ? "" : <>{question ? "TEM 4" : ""}</>}</>
                  )}
                </Box>
              </Box>
              <Box className={styles.smallestBlueTitle} pt={"5px"}>
                {name}
              </Box>
              <Box className={styles.smallText} pb={"5px"}>
                {textContent}
              </Box>
              <Box className={styles.timeAndDateLight}>
                <span>{time}</span> - <span>{date}</span>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};



const MessagesMainDiv = ({authUser, feedbackList, questionDetail}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const likeFeedback = (feedbackId,is_like) => {
    const value=queryString.parse(window.location.search, { ignoreQueryPrefix: true });
    dispatch(forumFeedbackLike({
      feedback_id: feedbackId
    })).then((res) => {
      if ( res.type == 'success' ) {
        let notifyData = {
          id: questionDetail.questionDetail.created_by==authUser.id ? questionDetail.questionDetail.accepted_by: questionDetail.questionDetail.created_by,
          for : questionDetail.questionDetail.created_by==authUser.id ? 'student' : questionDetail.questionDetail.ask_whom,
          message : '',
          receiverMsg : `${authUser.username} {islike ? 'DisLike' : 'like'} your message "${res.payload.answer}" in ${questionDetail.questionDetail.title}`
        }
        socket.emit('send_notification',notifyData)
        dispatch(forumFeedbackList({"question_id" : value.id}))
      }
    })
  }

  const answerNo = () => {
    const imageDownload = (value) => {
      saveAs(value, 'image.jpg')
    }
    if (Array.isArray(feedbackList)) {
      return (_.size(feedbackList) + 1)
    }
    return 1;
  }
  const data=questionDetail.questionDetail;
  let mins = 0;
  let du = 0;
if(data.time_limit === '15 min'){
  du = 16;
}else {
  du = 61;
}
  

  if(data.accepted_time !== null){
    
    let now = moment(new Date());
    let end = moment(data.accepted_time);
    let duration = moment.duration(now.diff(end));
    mins = duration.asMinutes()
    

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
      {/* MessagesMainDiv testing 3 */}
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
        >
          {
            (questionDetail.questionDetail.accepted_by==authUser.id || authUser.id==questionDetail.questionDetail.created_by) && Array.isArray(feedbackList) ? feedbackList.map((value, index) => {
              return (
                <div key={index}>
                {
                  (authUser.id == value.user_id) ? (
                    <SentMessageCard
                      key={value.id}
                      data ={value}
                      index={(index+1)}
                      likeFeedback={likeFeedback}
                      
                    />
                  ) : (
                    <RecievedMessageCard
                      key={value.id}
                      data ={value}
                      index={(index+1)}
                      likeFeedback={likeFeedback}
                      
                    />
                  )
                }
                </div>
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

        {
          (questionDetail.questionDetail.accepted_by && (questionDetail.questionDetail.accepted_by==authUser.id || authUser.id==questionDetail.questionDetail.created_by)) && ((questionDetail.questionDetail.is_answered || mins < du))? (
          <Box style={{width: "100%"}}>
            <SendingMessageDiv
              authUser={authUser}
              questionDetail={questionDetail}
              answerNumber={answerNo()}
            />
          </Box>
          ) : ('')
        }
        
      </Box>
    </>
  );
};



const NotificationMainDiv = ({ questionDetail,acceptQuestion,passQuestion,authUser }) => {
  const data=questionDetail.questionDetail
  
  const styles = useStyles();
      const {t , i18n} = useTranslation();
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

    const imageDownload = (value) => {
    saveAs(value, 'image.jpg')
  }
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
            {/* NotificationMainDiv  */}
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
console.log('questiondetails--'+data.status)
let minutes =0;
var du = 0;
if(data.time_limit === '15 min'){
  du = 16;
}else {
  du = 61;
}
if(data.created_at){
    
    
  let now = moment(new Date());
  let end = moment(data.created_at);
  let duration = moment.duration(now.diff(end));
   minutes = duration.asMinutes()
  

  console.log("created time======>", data.created_at);
  console.log("time diffrence ========>",minutes);
  console.log("is answered======>",questionDetail.questionDetail.is_answered)


}
  return (

    <>
        <Box>
          <NotificationDiv1
            questionDetail={questionDetail}
          />
          {console.log("questionDetail in white", questionDetail)}
           {t("privacy_policy") == "Privacy Policy" ? (
          <WhiteCard
            heading={"question"}
            textContent={questionDetail.questionDetail.title}
          />
          ):(
           <WhiteCard
            heading={"question"}
            textContent={questionDetail.questionDetail.title_cn ? questionDetail.questionDetail.title_cn : questionDetail.questionDetail.title}
          />
          )}
          
          <WhiteCard
            heading={"description"}
            textContent={questionDetail.questionDetail.description}
          />
          
          {((data.status != 'close') && (data.is_blocked != true) && (data.accepted_by != authUser.id) && ((data.created_by != authUser.id))) 
           && ((!data.is_answered && minutes < du))
           ? (<>
          {console.log("button show=======")}
          <Button
            className={styles.blueButton}
            onClick={() => acceptQuestion(data.id)}
          >
            ACCEPT
          </Button>
            <br/>
            <br/>
          <Button
            className={styles.blueButton}
            onClick={() => passQuestion(data.id)}
          >
            PASS
          </Button></>) : ''}
        </Box>
        
    </>
  );
};

const FourmFeedback = (props) => {
  console.log("props", props)
  const {t , i18n} = useTranslation()
  const authUser = useSelector((store) => store.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const { classes } = props;
  const styles = useStyles();
  const questionDetail = useSelector((store) => store?.forumFeedback?.data)
  console.log("props 1", (props.location.search).split("=").length)
  const arr = (props.location.search).split("=");
   

  console.log("quest===> iid", questionDetail)
  const data=questionDetail?.questionDetail
  const feedbackList = useSelector((store) => store?.forumFeedback?.list)
  const passQuestion = (id) => {
    history.push("/forum");
  }
  const acceptQuestion = (id) => {
    let sellerId  = authUser.id;
    dispatch( acceptForumQuestion({questionId: id, sellerId: sellerId,accepted: true}) ).then((res) => {
      if ( res.type == 'success') {
        let lessonData = {
          id:data.created_by,
          for : data.ask_whom,
          message : authUser.username+' Your Lesson Plan downloaded successfully',
          receiverMsg : "Your Question accepted"
        }
        socket.emit('send_notification',lessonData)
        window.location.reload();
      } else {
        if (res.payload) {
          toast.error(res.payload.output);
        }
      }
    })
  }
  useEffect(() => {
    console.log('message recevier')

    socket.on('recevier', (data) => {
      dispatch(forumFeedbackList({"question_id" : data.question_id})).then( (res) => {
        
        console.log("recevier by ===>>> ",data, res);
      });
  });
  })

  let localResponse = useLocation();
  useEffect(() => {
    // const value = queryString.parse(window.location.search, { ignoreQueryPrefix: true });
    // const data = queryString.parse(window.location.state, { ignoreQueryPrefix: true })
    console.log(localResponse, 'value and data')
    dispatch(forumQuestionDetails({"questionId" : localResponse?.state?.id, "type" : localResponse?.state?.type})).then( (res) => {
      if ( res.type == 'success' ) {
        // setInterval(() => {
          if ( history.location.pathname == "/question-feedback" ) {
            dispatch(forumFeedbackList({"question_id" : localResponse?.state?.id}))
          }
        // }, 2000)
      }
    })
  }, [dispatch]);



  return (
      <>
          <Header history={props.history} />
          {/* FourmFeedback 5 */}
          <Container maxWidth="xl" className={styles.container}>
          <>
              <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
                <Typography className={styles.mainHeading}>
                    
                    {t('feedback')}
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
                            acceptQuestion={acceptQuestion}
                            passQuestion={passQuestion}
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
                      <MessagesMainDiv authUser={authUser} feedbackList={feedbackList} questionDetail={questionDetail}/>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
          </>
          
          </Container>
      </>
  );
}

export default (FourmFeedback);
