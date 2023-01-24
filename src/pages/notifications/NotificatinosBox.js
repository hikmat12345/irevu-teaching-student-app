import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { BgColor, Color, Fonts } from "../../theme/index";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import TheatersOutlinedIcon from "@material-ui/icons/TheatersOutlined";
import openSocket from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import Badge from "@material-ui/core/Badge";
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
import { getNotificationList, readNotificationList } from "../../redux/actions/userActions";
import {
  userDefaultImage,
  profileImg2,
  image1,
} from "../../assets/index";
import moment from "moment";
import Link from "@material-ui/icons/Link";
import { SOCKET_URL } from './../../config/weChatConfig';

import { GiftedChat } from 'react-gifted-chat';



const socket = openSocket(SOCKET_URL);
const useStyles = makeStyles(() => ({
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
    fontSize: "13px",
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
    maxWidth: "600px",
    width: "600px",
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

const SendingMessageDiv = ({ textContent, answerNumber }) => {
  const styles = useStyles();
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Card className={styles.sendingMessageDivLeft}>
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
                id="message"
              />
              <Box style={{ marginTop: "20px" }}>
                <ImageOutlinedIcon className={styles.textBoxIcons} />
                <TheatersOutlinedIcon
                  className={styles.textBoxIcons}
                  style={{ marginLeft: "10px" }}
                />
                <AttachFileIcon
                  className={styles.textBoxIcons}
                  style={{ marginLeft: "10px" }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Button
          className={styles.sendButton}
          style={{ flex: ".5", padding: "0" }}
        >
          <SendIcon />
        </Button>
      </Box>
    </>
  );
};

const RecievedMessageCard = ({ heading, textContent, images, time, date }) => {
  const styles = useStyles();
  return (
    <>
      <Card
        style={{
          float: "left",
          maxWidth: "600px",
          width: "600px",
          padding: "0px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Box>
            <Box className={styles.notificationTitle}>{heading}</Box>
            <Box className={styles.smallText}>{textContent}</Box>
            {images ? (
              <Box pt={"10px"}>
                <img src={images[0]} className={styles.messageImages} />
                <img src={images[1]} className={styles.messageImages} />
              </Box>
            ) : (
              ""
            )}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                className={styles.timeAndDateLight}
                style={{ marginTop: "10px" }}
              >
                <span>{time}</span> - <span>{date}</span>
              </Box>
              <Box>
                <ThumbUpAltIcon className={styles.likeThumb} />
              </Box>
            </Box>

          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const SentMessageCard = ({ heading, textContent, images, time, date }) => {
  const styles = useStyles();
  return (
    <>
      <Card
        style={{
          float: "right",
          maxWidth: "600px",
          width: "600px",
          padding: "0px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <CardContent style={{ padding: "16px" }}>
          <Box>
            <Box className={styles.notificationTitle}>{heading}</Box>
            <Box className={styles.smallText}>{textContent}</Box>
            {images ? (
              <Box pt={"10px"}>
                <img src={images[0]} className={styles.messageImages} />
                <img src={images[1]} className={styles.messageImages} />
              </Box>
            ) : (
              ""
            )}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                className={styles.timeAndDateLight}
                style={{ marginTop: "10px" }}
              >
                <span>{time}</span> - <span>{date}</span>
              </Box>
              <Box>
                <ThumbUpAltIcon className={styles.likeThumb} />
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
          maxWidth: "600px",
          width: "600px",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <CardContent style={{ padding: "16px" }}>
          <Box>
            <Box className={styles.notificationTitle}>{heading}</Box>
            <Box className={styles.smallText}>{textContent}</Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const NotificationDiv1 = ({
  textContent,
  name,
  date,
  time,
  feedback,
  homework,
  question,
  profileImg,
  Hours,
}) => {
  const styles = useStyles();
  return (
    <Card
      style={{
        maxWidth: "600px",
        width: "600px",
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
              <img src={profileImg} className={styles.profileImg} />
            </Box>
            <Box>
              <Box className={styles.subTitleLight}>Course id</Box>
              <Box className={styles.NotificationProfileName} py={"2px"}>
                {name}
              </Box>
              <Box className={styles.timeAndDateLight}>IELTS</Box>
            </Box>
          </Box>
          <Box>
            <Box className={styles.subTitleLight}>TIME TO answer</Box>
            <Box className={styles.hoursText}>{Hours} Hours</Box>
            {/* <Box className={styles.smallText} pb={"5px"}>
                  {textContent}
                </Box> */}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const MessagesMainDiv = ({ openFeedbackFunc }) => {
  const styles = useStyles();

  return (
    <>
      <Box
        display="flex"
        // flexDirection="column"
        justifyContent="space-between"
      // alignItems="center"
      >
        <Typography
          className={styles.mainHeading}
          style={{ marginBottom: "5px" }}
        >
          Feedback
        </Typography>

        <CloseIcon
          style={{ color: Color.textBlue, cursor: "pointer" }}
          onClick={openFeedbackFunc}
        />
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
          }}
        >
          <SentMessageCard
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
          />
        </Box>
        <Box>
          <SendingMessageDiv
            textContent={
              "It is a long established fact that a reader will be distracted by the readable content"
            }
            answerNumber={"2"}
          />
        </Box>
      </Box>
    </>
  );
};
const redirectpage = (notificationdetails, history, authUser, dispatch) => {
  console.log("insdie the redirect fucntion", notificationdetails)
  dispatch(readNotificationList(notificationdetails.id))
  let name = "";
  // let model_type="";
  // let name =  notificationdetails.model_type;
  if(notificationdetails.model_type !== undefined){
name = notificationdetails.model_type;
  }else if(notificationdetails.questionDetail.broadcast_whom == "all") {
  name = "all"
  }else if(notificationdetails.questionDetail.broadcast_whom == "teacher") {
    name = "teacher"
  }else if(notificationdetails.questionDetail.broadcast_whom == "student") {
    name = "student"
  }
  if (name == "homeworks" || name == "Class_Added" || name == "NewClassAdded") {
    history.push('/class?id=' + notificationdetails.classId ,{id: notificationdetails.model_id, type:  notificationdetails.model_type});
  }
  else if (name == "homework_submissions" || name == "homework_feedbacks" || name == "Homework_Grade_Added") {
    history.push('/homework-feedback/' + notificationdetails.model_id ,{id: notificationdetails.model_id, type:  notificationdetails.model_type});
  }
  else if (name == "forum_feedbacks" || notificationdetails.type == "QuestionGradAdded") {
    if (notificationdetails.type == "writeFeedback_acedemic" || notificationdetails.type == "QuestionGradAdded") {
      history.push('/academic-feedback/' + notificationdetails.model_id);
    }
    else {

      history.push('/question-feedback?id=' + notificationdetails.model_id ,{id: notificationdetails.model_id, type:  notificationdetails.model_type});
    }
  }
  else if (name === "forum_questions" || name === "wechatQRCode") {
    if (notificationdetails.question_category == "academic_english" || notificationdetails.type === "academic") {
      history.push('/academic-feedback/' + notificationdetails.model_id ,{id: notificationdetails.model_id, type:  notificationdetails.model_type});
    }
    else {
         history.push('/question-feedback?id=' + notificationdetails.model_id ,{id: notificationdetails.model_id, type:  notificationdetails.model_type});
    } 
  }


  else if (name == "ReferralUsed") {
    history.push('/referral-link');
  }
  else if (name == "PDF_Download" || name == "Resource_added" || name == "Lesson_added") {
    authUser.user_type == 2 ? history.push('/resources?id=' + notificationdetails.model_id) : history.push('/lesson-plan?id=' + notificationdetails.model_id);
  }
  else if (name == "Withdrawal" || name == "FirstTrasaction") {
    history.push('/wallet')
  }
  else if (name == "RefundRequest" || name == "RefundRequestedByStudent" || name == "RefundRejectedForStudent" || name == "RefundInitiatedForStudent" || name == "RefundAcceptedForStudent") {
    history.push('/wallet')
  }

  else  { 
      history.push('/question-feedback' ,{id: notificationdetails.model_id, type:  notificationdetails.model_type});
  }
}
const WhiteCard3 = ({
  textContent,
  name,
  name_cn,
  date,
  time,
  notificationName,
  feedback,
  homework,
  question,
  profileImg,
  func,
  notificationdetails,
  history,
  authUser, 
  model_id,
  model_type
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const deductplatfromFee = (amount, notificationdetails) => {
    if (notificationdetails && notificationdetails.questionDetail && notificationdetails.questionDetail.question_category === 'academic_english') {
      let a = parseFloat(parseFloat(amount) - ((parseFloat(amount) * 10) / 100));
      return a.toFixed(2)

    }
    return parseFloat(amount);
  }
  return (
    <>
      <Card
        style={{
          maxWidth: "600px",
          width: "600px",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      // onClick={func}
      >
        {/* {("notificationdetails, history, authUser,",JSON.stringify(notificationdetails), JSON.stringify(history), JSON.stringify(authUser)} */}
        <CardContent style={{ padding: "16px" }} onClick={() => redirectpage(notificationdetails, history, authUser, dispatch)}>
          <Box display="flex" justifyContent="space-between">
            <Box pr={"10px"}>
              <img src={profileImg} className={styles.profileImg} />
            </Box>
            <Box style={{ flex: "2" }} className="notification-card-section">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {/* <Box className={styles.subTitleLight}>
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
                </Box> */}

                <Box className={styles.subTitleLight}>
                   {
                    (notificationName == "" || notificationName == null) ? "admin" : notificationName
                  }

                </Box>

                <Box className={styles.subTitleLight}>
                  {feedback ? (
                    "IELTS"
                  ) : (
                    <>{homework ? "" : <>{question ? "TEM 4" : ""}</>}</>
                  )}
                </Box>
              </Box>
              {/* {console.log(t("privacy_policy"), 'tttttttttt')} */}
              {t("privacy_policy") == "Privacy Policy" ? (
                <Box className={styles.smallestBlueTitle} pt={"5px"}>
                  {name} {' '} {notificationdetails.is_seen == 0 ? (<Badge badgeContent={'new'} color="secondary"></Badge>) : ""}
                </Box>
              ) : (
                <Box className={styles.smallestBlueTitle} pt={"5px"}>

                  {name_cn == undefined ? notificationdetails?.questionDetail?.question_title : name_cn } {' '} {notificationdetails.is_seen == 0 ? (<Badge badgeContent={'new'} color="secondary"></Badge>) : ""}
                </Box>

              )}

              <Box className={styles.smallText}>
                {notificationdetails?.questionDetail?.price ? (notificationdetails?.questionDetail?.price.indexOf('RMB') >= 0 ? 'Price ' + deductplatfromFee(notificationdetails?.questionDetail?.price, notificationdetails) : 'Price ' + deductplatfromFee(notificationdetails?.questionDetail?.price, notificationdetails) + ' RMB') : ''}

              </Box>
              <Box className={styles.smallText} pb={"5px"} dangerouslySetInnerHTML={{ __html: textContent == undefined ? notificationdetails?.questionDetail?.question_description : textContent }}>
              {/* {console.log("notificationdetails ===", notificationdetails?.questionDetail?.question_title, textContent)} */}
</Box>
              <Box className={styles.timeAndDateLight}>
                <span>{date}</span>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const NotificationMainDiv = ({ openFeedbackFunc, openFeedback }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const authUser = useSelector((store) => store.auth.user);
  useEffect(() => {
    // dispatch(readNotificationList())
    dispatch(getNotificationList())


  }, [])
  const notificationList = useSelector((store) => store.users.notificationList);
  // console.log("notification list ===>>>>", notificationList)

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
              maxWidth: "600px",
              width: "600px",
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

  // console.log("notificationList", notificationList);
  const { t } = useTranslation()
  const [displaylimit, setdisplaylimit] = useState(8);
  const [my_limit, setmylimit] = useState(displaylimit);
  const [others_limit, setotherslimit] = useState(displaylimit);
  const loadmore = (type) => {
    if (type == "my") {
      var limit = my_limit + displaylimit
      setmylimit(limit)
    }
    else {
      var limit = others_limit + displaylimit
      setotherslimit(limit)
    }
  }

  const [messages, setMessages] = useState([
    {
    _id: 1,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    } 
}])
const [message, setMessage] = useState('')
const onSend = useCallback((messages = []) => {
  setMessages(previousMessages =>
      GiftedChat.append(...previousMessages, messages),
  );

 
}, []);

 

  return (
    <>
      {openedNotifications ? (
        <Box>
          <NotificationDiv1
            profileImg={profileImg2}
            name={"Nicolas Porter"}
            date={"20/01/2020"}
            time={"15:22"}
            textContent={
              "Vivamus eget aliquam dui. Ineger, EGET VENENATIS ENIM QUIS?"
            }
            feedback={true}
            Hours={"2"}
          />
          <WhiteCard
            heading={"question"}
            textContent={
              "It is a long established fact that a reader will be distracted by the readable content"
            }
          />
          <WhiteCard
            heading={"description"}
            textContent={
              "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
            }
          />
          {!openFeedback ? (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              pt={"10px"}
              style={{ maxWidth: "600px", width: "600px", padding: "10px" }}
            >
              <Button
                className={styles.blueButton}
                style={{ marginRight: "5px" }}
                onClick={openFeedbackFunc}
              >
                Accept
              </Button>
              <Button
                className={styles.whiteButton}
                style={{ marginLeft: "5px" }}
                onClick={openConfirmationMessage}
              >
                Pass
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Box>
      ) : (
        <Box>
          <>
            {
              (notificationList) ?
                (notificationList
                  .slice(0, my_limit).map((data, i) => {
  
                    

                    return (
                      <> 
                       <WhiteCard3
                        key={i}
                        profileImg={(data?.profileImage) ? data?.profileImage : userDefaultImage}
                        name={data?.notificationName}
                        name_cn={data?.notificationName}
                        date={moment(data?.createdAt).format("HH:ii - DD/MM/YYYY")}
                        time={""}
                        textContent={data?.questionDetail?.description}
                        notificationName={data?.userName}
                        // feedback={false}
                        // opent={false}
                        // func={openNotification}
                        notificationdetails={data}
                        history={history}
                        authUser={authUser}
                        model_type = {data?.model_type}
                        model_id = {data?.model_id}
 

                      />
                      </>
                    )
                  })) : ("")
            }

           
            
            </>


          {Array.isArray(notificationList) && notificationList.length > my_limit ?
            (<Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
              <Button onClick={() => loadmore('my')} style={{ position: "relative", top: "25px", backgroundColor: "#6274d5" }}>
                {t("load_more")}
              </Button>
            </Box>) : ('')}

          {/* <WhiteCard3
            profileImg={profileImg2}
            name={"Nicolas Porter"}
            date={"20/01/2020"}
            time={"15:22"}
            textContent={
              "Vivamus eget aliquam dui. Ineger, EGET VENENATIS ENIM QUIS?"
            }
            feedback={true}
            opent={true}
            func={openNotification}
          />
          <WhiteCard3
            profileImg={profileImg1}
            name={"Tyler Ellis"}
            date={"07/11/2020"}
            time={"01:10"}
            textContent={"Submission in Course #ITC202"}
            homework={true}
            // openIt={openIt}
            func={openNotification}
          />
          <WhiteCard3
            profileImg={profileImg3}
            name={"Ellis Porter"}
            date={"20/01/2020"}
            time={"15:22"}
            textContent={"Ineger, EGET  ENIM QUI VENENATIS eget eget. "}
            question={true}
            // openIt={openIt}
            func={openNotification}
          />
          <WhiteCard3
            profileImg={profileImg2}
            name={"Nicolas Porter"}
            date={"20/01/2020"}
            time={"15:22"}
            textContent={
              "Vivamus eget aliquam dui. Ineger, EGET VENENATIS ENIM QUIS?"
            }
            feedback={true}
            // openIt={openIt}
            func={openNotification}
          />
          <WhiteCard3
            profileImg={profileImg1}
            name={"Tyler Ellis"}
            date={"07/11/2020"}
            time={"01:10"}
            textContent={"Submission in Course #ITC202"}
            homework={true}
            // openIt={openIt}
            func={openNotification}
          /> */}
        </Box>
      )}
      {openedConfirmationMessage ? (
        <ConfirmationMessage
          openNotification={openNotification}
          openConfirmationMessage={openConfirmationMessage}
          openNotificationAndopenConfirmationMessage={
            openNotificationAndopenConfirmationMessage
          }
        />
      ) : null}
    </>
  );
};

export const TeamCardDemo = React.memo(function TeamCard() {
  const [openFeedback, setOpenFeedback] = useState(false);
  const openFeedbackFunc = () => {
    setOpenFeedback(!openFeedback);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12}>
          <NotificationMainDiv
            heading={"Instructions"}
            openFeedbackFunc={openFeedbackFunc}
            openFeedback={openFeedback}
          />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          style={{
            padding: "0",
          }}
        >
          {openFeedback ? (
            <MessagesMainDiv openFeedbackFunc={openFeedbackFunc} />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </>
  );
});
export default TeamCardDemo;
