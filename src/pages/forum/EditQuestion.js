import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SchoolIcon from "@material-ui/icons/School";
import { makeStyles } from "@material-ui/core/styles";
import { Fonts, BgColor, Color } from "../../theme/index";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CloseIcon from "@material-ui/icons/Close";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SubjectIcon from "@material-ui/icons/Subject";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import ListIcon from "@material-ui/icons/List";
import ImageIcon from "@material-ui/icons/Image";
import TheatersIcon from "@material-ui/icons/Theaters";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import InputAdornment from '@material-ui/core/InputAdornment';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Box,
  TextField,
  Input,
  Button,
  Card,
  Container,
  CardContent,
  Typography,
  FormControl,
} from "@material-ui/core";
import clsx from 'clsx';
import { toast } from 'react-toastify';

import JoditEditor from "jodit-react";
import { ErrorAlert } from "./../../components"
import { editForumQuestion, forumQuestionList } from "./../../redux/actions/forumActions";
import Const from "../../helpers/const"

const useStyles = makeStyles((theme) =>({
  root: {
    padding: "10px",
    borderRadius: "10px",
    marginTop: "10px",
  },
  mainHeading: {
    fontSize: "20px",
    fontFamily: Fonts.Medium,
    opacity: ".8",
  },
  blueButton: {
    color: "#fff",
    height: "40px",
    borderRadius: "5px",
    backgroundColor: BgColor.myBlue,
    border: "1px solid transparent",
    padding: "0 20px",
    "&:hover": {
      color: Color.textBlue,
      border: "1px solid" + Color.textBlue,
    },
  },
  info: {
    color: "#2B65EC",
    textTransform: "initial",
    fontFamily: Fonts.Regular,
  },
  LightText: {
    color: BgColor.myBlack,
    fontSize: "14px",
    fontFamily: Fonts.Medium,
    opacity: 0.25,
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
  smallestBlueTitle: {
    color: Color.textBlue,
    fontSize: "13px",
    fontFamily: Fonts.Regular,
  },
  smallText: {
    color: BgColor.myBlack,
    fontSize: "16px",
    fontFamily: Fonts.Regular,
  },
  LightText: {
    color: BgColor.myBlack,
    fontSize: "14px",
    fontFamily: Fonts.Medium,
    opacity: 0.25,
  },
  blueNumbersText: {
    color: Color.textBlue,
    fontSize: "25px",
    fontFamily: Fonts.Regular,
    transition: "all .3s ease",
  },
  icons: {
    padding: "10px",
    "&:hover": {
      opacity: ".7",
    },
  },
  toggleTab: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "50%",
    minHeight: "40px",
    backgroundColor: "#F2F8FD",
    padding: "10px 0",
    "&:hover": {
      backgroundColor: "#DBECF8",
    },
  },
  toggleTabText: {
    color: "#7BBEE8",
    fontSize: "14px",
    fontFamily: Fonts.Medium,
    // opacity: 0.4,
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
  smallestGrayTitleLight: {
    color: "rgba(0,0,0,0.3)",
    fontSize: "12px",
    fontFamily: Fonts.Regular,
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
      backgroundColor: "#fff",
    },
  },
  center : {
    display:"inline-block",
    position:"relative"
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const MyCard = ({ toggleEditQuestion, authUser, handelFormData }) => {
  const classes = useStyles();
  const [isStudent, setIsStudent] = useState(true);

  const toggleTabButton = (category) => {
    if (category == "student") {
      setIsStudent(true);
      setIsAcademic(false);
      handelFormData("question_category", "normal");
      handelFormData("ask_whom", "student");
    } else {
      setIsStudent(false);
      handelFormData("ask_whom", "teacher");
    }
  };
  
  const [isAcademic, setIsAcademic] = useState(false);
  const toggleTabQuestionType = (type) => {
    if (type == "normal") {
      setIsAcademic(false);
      handelFormData("question_category", "normal");
    } else {
      setIsAcademic(true);
      handelFormData("question_category", "academic_english");
    }
  };

  return (
    <>
      <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography
            variant="h5"
            component="h5"
            className={classes.mainHeading}
          >
            Category
          </Typography>
          <CloseIcon
            style={{ color: Color.textBlue, cursor: "pointer" }}
            onClick={toggleEditQuestion}
          />
        </Box>

        <Card className={classes.root}>
          <CardContent style={{ padding: "5px" }}>
            <Typography
              className={classes.LightText}
              style={{ textAlign: "center", paddingBottom: "10px" }}
            >
              Ask Who
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ borderRadius: "15px", overflow: "hidden" }}
            >
              <Box
                className={classes.toggleTab}
                style={{
                  borderRight: "3px solid rgba(0,0,0,0.05)",
                  padding: "30px 0",
                  width: "100%",
                  backgroundColor: isStudent ? "#DBECF8" : "",
                }}
                // backgroundColor: "#F2F8FD",
                // backgroundColor: "#DBECF8",

                onClick={() => toggleTabButton("student")}
              >
                <SchoolIcon style={{ color: "#7BBEE8", fontSize: "35px" }} />
                <Box className={classes.toggleTabText}>Student</Box>
              </Box>
              <Box
                className={classes.toggleTab}
                style={{
                  padding: "30px 0",
                  width: "100%",
                  backgroundColor: (!isStudent) ? "#DBECF8" : "",
                }}
                onClick={() => toggleTabButton("teacher")}
              >
                <PermIdentityIcon
                  style={{ color: "#7BBEE8", fontSize: "35px" }}
                />
                <Box className={classes.toggleTabText}>Teacher</Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent style={{ padding: "5px" }}>
            <Typography
              className={classes.LightText}
              style={{ textAlign: "center", paddingBottom: "10px" }}
            >
              Type of question
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ borderRadius: "15px", overflow: "hidden" }}
            >
              <Box
                className={classes.toggleTab}
                style={{
                  borderRight: "3px solid rgba(0,0,0,0.05)",
                  backgroundColor: (!isAcademic) ? "#DBECF8" : "",
                  width: (!isStudent) ? "50%" : "100%"
                }}
                onClick={() => toggleTabQuestionType("normal")}
              >
                <Box className={classes.toggleTabText}>Normal Question</Box>
              </Box>
              {
                (!isStudent) ? (
                  <Box
                    className={classes.toggleTab}
                    style={{
                      backgroundColor: (isAcademic) ? "#DBECF8" : "",
                    }}
                    onClick={() => toggleTabQuestionType("academic_english")}
                  >
                    <Box className={classes.toggleTabText}>Academic English</Box>
                  </Box>
                ) : ('')
              }
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

const WhiteCardSelectCategory = ({
  dropdown,
  label,
  textArea,
  formData,
  showQuestionTypeList,
  showFinalQuestionView,
}) => {
  const styles = useStyles();

  const checkValidation = (e) => {
    let pass = true;
    if (!formData.price) {
      pass = false
      toast.error("Please enter a price!")
    } else if (!formData.question_type) {
      pass = false
      toast.error("Please select a question type!")
    } else if (formData.price) {
      if (formData.question_length == "short") {
        if ( (parseFloat(formData.price) >= 0.5) && (parseFloat(formData.price) <= 3) ) {
          pass = true;
        } else {
          pass = false
          toast.error("Price should be between 0.5 and 3!")
        }
      } else {
        if ( (parseFloat(formData.price) >= 3) && (parseFloat(formData.price) <= 15) ) {
          pass = true;
        } else {
          pass = false
          toast.error("Price should be between 3 and 15!")
        }
      }
    }

    if (pass) {
      showFinalQuestionView(e)
    }
  }

  return (
    <>
      <Box
        flexWrap="wrap"
        p={2}
        m={0}
        bgcolor="background.paper"
        style={{ marginTop: "-15px" }}
      >
        <Card
          onClick={() => showQuestionTypeList(false)}
          className={styles.root}
          style={{ marginTop: "0" }}
        >
          <Box style={{ padding: "5px" }}>
            {/* <Box className={styles.smallestBlueTitle}>{heading}</Box> */}
            {/* <Box className={styles.smallText} style={{color:Color.textBlue}}>{textContent}asdf</Box> */}
            {dropdown ? (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                // onClick={func}
              >
                <Box className={styles.smallestBlueTitle}>{label}</Box>
                <ArrowDropDownIcon style={{ color: Color.textBlue }} />
              </Box>
            ) : (
              <>
                {!textArea ? (
                  <TextField
                    id="outlined-basic"
                    label={label}
                    variant="outlined"
                    className={styles.TextFields}
                  />
                ) : (
                  <TextField
                    id="outlined-multiline-static"
                    label={label}
                    multiline
                    rows={4}
                    // defaultValue="Lesson Plan Text"
                    variant="outlined"
                    className={styles.TextFields}
                  />
                )}
              </>
            )}
          </Box>
        </Card>
        <Button
          className={styles.blueButton}
          style={{ marginTop: "20px", width: "100%" }}
          onClick={checkValidation}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

const QuestionTypeListOverlay = ({
  showQuestionTypeList,
  questionTypeList,
}) => {
  const styles = useStyles();
  return (
    <>
      {questionTypeList ? (
        <Container maxWidth="xl" className={styles.overlayWrapper}>
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
                  className={styles.mainHeading2}
                  style={{ textAlign: "center", paddingBottom: "10px" }}
                >
                  Question Type
                </Box>
                <CloseIcon
                  style={{ color: Color.textBlue, cursor: "pointer" }}
                  onClick={() => showQuestionTypeList(false)}
                />
              </Box>
              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList('ielts')}
              >
                IELTS
              </Button>
              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList('toefl')}
              >
                TOEFL
              </Button>
              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList('cet4')}
              >
                cet 4
              </Button>

              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList('cet6')}
              >
                cet 6
              </Button>
              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList('tem4')}
              >
                Tem 4
              </Button>
              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList('tem8')}
              >
                Tem 8
              </Button>

              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList('ket')}
              >
                KET
              </Button>
              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList('pet')}
              >
                PET
              </Button>
              {/* <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList("proof_reading")}
              >
                Proof reading
              </Button>
              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList("personal_statements")}
              >
                Personal statements
              </Button>
              <Button
                className={styles.whiteOutlinedButton}
                onClick={() => showQuestionTypeList("editing")}
              >
                Editing
              </Button> */}
            </Box>
          </Card>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

const PriceList = ({ showPriceList, priceList, authUser }) => {
  const styles = useStyles();
  return (
    <>
      {priceList ? (
        <Container maxWidth="xl" className={styles.overlayWrapper}>
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
                  className={styles.mainHeading2}
                  style={{ textAlign: "center", paddingBottom: "10px" }}
                >
                  Price list
                </Box>
                <CloseIcon
                  style={{ color: Color.textBlue, cursor: "pointer" }}
                  onClick={showPriceList}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box
                  mb={"15px"}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Box
                    className={styles.smallText}
                    style={{ color: Color.textBlue }}
                  >
                    For Students Questions:
                  </Box>

                  <Box className={styles.LightText}>
                    Small Question = 0.5 - 3 rmb,
                  </Box>
                  <Box className={styles.LightText}>
                    Long Question = 3 - 15 rmb
                  </Box>
                </Box>
                <Box
                  mb={"15px"}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Box
                    className={styles.smallText}
                    style={{ color: Color.textBlue }}
                  >
                    For Teachers Questions:
                  </Box>

                  <Box className={styles.LightText}>
                    Small Question = 5 - 25 rmb,
                  </Box>
                  <Box className={styles.LightText}>
                    Long Question = 25 - 75 rmb
                  </Box>
                </Box>
                <Box
                  mb={"15px"}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Box
                    className={styles.smallText}
                    style={{ color: Color.textBlue }}
                  >
                    Academic English:
                  </Box>

                  <Box className={styles.LightText}>
                    CET 4 and TEM 4 = 25 rmb,
                  </Box>
                  <Box className={styles.LightText}>
                    CET 6 and TEM 8 = 25 rmb,
                  </Box>
                  <Box className={styles.LightText}>
                    IELTS and TOEFEL = 50 rmb,
                  </Box>
                </Box>
                <Box className={styles.LightText}>
                  (plus 10% platform fee)
                </Box>
              </Box>
            </Box>
          </Card>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

const MyCardForSelectCategory = ({ toggleShowLength, authUser, handelFormData ,toggleEditQuestion}) => {
  const classes = useStyles();
  const [isShortQue, setIsShortQue] = useState(true);

  const toggleTabButton = (category) => {
    if (category == "short") {
      setIsShortQue(true);
      handelFormData("question_length", "short");
      handelFormData("time_limit", "15 min");
      // handelFormData("price", "0.5-3");
    } else {
      setIsShortQue(false);
      handelFormData("question_length", "long");
      handelFormData("time_limit", "1 hour");
      // handelFormData("price", "3-15");
    }
  }

  return (
    <>
      <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography
            variant="h5"
            component="h5"
            className={classes.mainHeading}
          >
            Category
          </Typography>
          <CloseIcon
            style={{ color: Color.textBlue, cursor: "pointer" }}
            onClick={toggleEditQuestion}
          />
        </Box>

        <Card className={classes.root}>
          <CardContent style={{ padding: "5px" }}>
            <Typography
              className={classes.LightText}
              style={{ textAlign: "center", paddingBottom: "10px" }}
            >
              Question Type
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ borderRadius: "15px", overflow: "hidden" }}
            >

              <Box
                className={classes.toggleTab}
                style={{
                  borderRight: "3px solid rgba(0,0,0,0.05)",
                  padding: "30px 0",
                  cursor: "pointer",
                  backgroundColor: (isShortQue) ? "#DBECF8" : "",
                }}
                // backgroundColor: "#F2F8FD",
                // backgroundColor: "#DBECF8",

                onClick={() => toggleTabButton("short")}
              >
                <SubjectIcon style={{ color: "#7BBEE8", fontSize: "35px" }} />
                <Box className={classes.toggleTabText}>Short Question</Box>
              </Box>

              <Box
                className={classes.toggleTab}
                style={{
                  cursor: "pointer",
                  padding: "30px 0",
                  backgroundColor: (!isShortQue) ? "#DBECF8" : "",
                }}
                onClick={() => toggleTabButton("long")}
              >
                <ShortTextIcon style={{ color: "#7BBEE8", fontSize: "35px" }} />
                <Box className={classes.toggleTabText}>Long Question</Box>
              </Box>

            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

const TimeAndPriceCard = ({
  showPriceList,
  handelFormData,
  formData
}) => {
  const styles = useStyles();
  
  return (
    <>
      <Box
        flexWrap="wrap"
        p={2}
        m={0}
        bgcolor="background.paper"
        style={{ marginTop: "-15px" }}
      >
        <Card
          // onClick={() => showQuestionTypeList(false)}
          className={styles.root}
          style={{ marginTop: "0" }}
        >
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Box style={{ flex: "1", padding: "5px" }}>
              <Box className={styles.smallestBlueTitle}>Time LIMIT</Box>
              <TextField
                id="standard-size-small"
                // defaultValue="2 hrs"
                placeholder="2 hrs"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                value={formData.time_limit}
              />
            </Box>

            <Box style={{ flex: "3", padding: "5px" }}>
              <Box className={styles.smallestBlueTitle}>price</Box>
              <FormControl className={clsx(styles.margin, styles.withoutLabel, styles.textField)}>
                <Input
                  id="filled-adornment-weight"
                  // defaultValue="number"
                  name="price"
                  placeholder="0.5-3"
                  size="small"
                  value={formData.price}
                  onChange={(e) => handelFormData("price", e.target.value)}
                  endAdornment={<InputAdornment position="end">RMB</InputAdornment>}
                />
              </FormControl>
            </Box>
            <Box style={{ flex: ".2", padding: "5px" }}>
              <HelpOutlineIcon
                style={{ color: Color.textBlue }}
                onClick={showPriceList}
              />
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
};

const BottomBar = ({}) => {
  const styles = useStyles();

  return (
    <>
      <Card
        style={{
          maxWidth: "600px",
          // width: "550px",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "30px",
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

const SelectCategory = ({
  toggleEditQuestion,
  toggleShowLength,
  authUser,
  handelFormData
}) => {
  const styles = useStyles();

  return (
    <>
      <MyCard
        toggleEditQuestion={toggleEditQuestion}
        authUser={authUser}
        handelFormData={handelFormData}
      />

      <Button
        className={styles.blueButton}
        style={{ marginTop: "20px", width: "100%" }}
        onClick={toggleShowLength}
      >
        Next
      </Button>

      {/* <WhiteCard
        label={"What Do You Need"}
        dropdown={true}
        showQuestionType={showQuestionType}
        toggleShowLength={toggleShowLength}
      /> */}
    </>
  );
};

const FinalQuestionView = ({ showFinalQuestionView, formData, editorState, onEditorStateChange, handelFormData, submitForumQuestion, editData }) => {
  const styles = useStyles();

  const editor = useRef(null)
  const [content, setContent] = useState('')
  const { t, i18n } = useTranslation();
  const [kdmeditortext, setkdmeditortext] = useState('');
  const config = {
      minHeight : "400",
      toolbarButtonSize: "small",
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      uploader: {
        url: Const.FILE_LIST_URL,
        headers : {
          Authorization : localStorage.userToken
        },
      },
      // filebrowser: {
      //     ajax: {
      //         url: 'connector/index.php'
      //     }
      // }
      // "autofocus": true,
      "askBeforePasteHTML": false,
      "askBeforePasteFromWord": false
  }

  const checkValidation = (e) => {
    onEditorStateChange(kdmeditortext.html())

    formData.description=kdmeditortext.html()
    if (!formData.subject) {
      toast.error("Please enter subject!")
    } else if (!formData.title) {
      toast.error("Please enter title!")
    } else if (!formData.description) {
      toast.error("Please enter description!")
    } else {
      submitForumQuestion(e)
    }
  }
  const kdmed=()=>{
    // alert('inner')
    var kdmeditortxt=window.kdmeditor()
    setkdmeditortext(kdmeditortxt)
  }
  setTimeout(() => {
    kdmed()
  }, 500)
  return (
    <>
      <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
        <Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              variant="h5"
              component="h5"
              className={styles.mainHeading}
            >
              Question
            </Typography>
            <CloseIcon
              style={{ color: Color.textBlue, cursor: "pointer" }}
              onClick={showFinalQuestionView}
            />
          </Box>

          <Card
            style={{
              padding: "10px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            <CardContent>
              <Box>
                <Box className={styles.smallestBlueTitle}>{t('subject')}</Box>
                <TextField style={{width: "100%"}} value={formData.subject} name="subject" onChange={ (e) => handelFormData("subject", e.target.value) } />
              </Box>
            </CardContent>
          </Card>

          <Card
            style={{
              padding: "10px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            <CardContent>
              <Box>
                <Box className={styles.smallestBlueTitle}>{t('title')}</Box>
                <TextField style={{width: "100%"}} value={formData.title} name="title" onChange={ (e) => handelFormData("title", e.target.value) } />
              </Box>
            </CardContent>
          </Card>

          {/* <FinalQuestionComponent
            heading={"Title"}
            textContent={"Vivamus eget aliquam dui. Ineger"}
          /> */}
          {/* <FinalQuestionComponent
            heading={"Description"}
            textContent={
              "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lor"
            }
            bottomBar={true}
          /> */}

          <Card
            style={{
              padding: "10px",
              borderRadius: "10px",
              marginTop: "10px",
              marginLeft:'-25%',
              overflow:"visible"
            }}
            className="forum-texteditor"
          >
            <CardContent>
              <Box>
                <Box style={{
              marginLeft:'21%'
            }} className={styles.smallestBlueTitle}>{t('description')}</Box>
                {/* <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={ (text) => onEditorStateChange(text) }
                /> */}

              {/*<JoditEditor
                ref={editor}
                value={editorState}
                config={Const.EDITOR_CONFIG}
                
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => onEditorStateChange(newContent)}
                onChange={ (text) => {} }
              />*/}
              <textarea name="content12">{editorState}</textarea>
              <p>{t('count_word_msg')}< span  class ="word_count2" > 0 </ span > </p>
              </Box>
            </CardContent>
          </Card>

          <Button
            className={styles.blueButton}
            style={{ marginTop: "20px", width: "100%" }}
            onClick={checkValidation}
          >
            {t('post_capital')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

const SelectLength = ({
  toggleEditQuestion,
  questionTypeList,
  showQuestionTypeList,
  showFinalQuestionView,
  toggleShowLength,
  authUser,
  formData,
  handelFormData
}) => {
  const [priceList, setPriceList] = useState(false);
  const showPriceList = () => {
    setPriceList(!priceList);
  };

  const questionTypeText = () => {
    if ( (!formData.question_type) ) {
      return "Question Type";
    } else if ( formData.question_type == "ielts" ) {
      return "IELTS";
    } else if ( formData.question_type == "toefl" ) {
      return "TOEFL";
    } else if ( formData.question_type == "cet4" ) {
      return "CET 4";
    } else if ( formData.question_type == "cet6" ) {
      return "CET 6";
    } else if ( formData.question_type == "tem4" ) {
      return "TEM 4";
    } else if ( formData.question_type == "tem8" ) {
      return "TEM 8";
    } else {
      return "Question Type";
    }
  }

  return (
    <>
      <MyCardForSelectCategory
        toggleEditQuestion={toggleEditQuestion}
        toggleShowLength={toggleShowLength}
        authUser={authUser}
        formData={formData}
        handelFormData={handelFormData}
      />
      <TimeAndPriceCard 
        showPriceList={showPriceList} 
        authUser={authUser} 
        formData={formData} 
        handelFormData={handelFormData} 
        showQuestionTypeList={showQuestionTypeList}
      />

      <WhiteCardSelectCategory
        label={ questionTypeText() }
        dropdown={true}
        showQuestionTypeList={showQuestionTypeList}
        showFinalQuestionView={showFinalQuestionView}
        authUser={authUser}
        formData={formData}
        handelFormData={handelFormData}
      />

      <QuestionTypeListOverlay
        questionTypeList={questionTypeList}
        showQuestionTypeList={showQuestionTypeList}
        authUser={authUser}
        handelFormData={handelFormData}
        formData={formData}
      />

      {priceList ? (
        <PriceList priceList={priceList} showPriceList={showPriceList} authUser={authUser} />
      ) : (
        ""
      )}
    </>
  );
};

export const EditQuestion = React.memo(function TeamCard(props) {
  const classes = useStyles();
  const [questionType, setQuestionType] = useState(false);
  const { authUser, editData, toggleEditQuestion } = props;
  const dispatch = useDispatch();

  console.log("editData", editData)

  const showQuestionType = () => {
    setQuestionType(!questionType);
  };
  const [length, setLength] = useState(true);
  const toggleShowLength = () => {
    // setLength(!length);
    setLength(true);
  };
  const [questionTypeList, setQuestionTypeList] = useState(false);
  const showQuestionTypeList = (val) => {
    setQuestionTypeList(!questionTypeList);

    if (val)
      handelFormData("question_type", val)
  };
  const [finalQuestionView, setFinalQuestionView] = useState(false);
  const showFinalQuestionView = () => {
    setFinalQuestionView(!finalQuestionView);
  };

  const [editorState, setEditorState] = useState(editData.description);
  const [error, setError] = useState(false);

  const onEditorStateChange = (val) => {
    setEditorState(val);
    // handelFormData("description", draftToHtml(convertToRaw(val.getCurrentContent())))

    handelFormData("description", val)
  }

  const [formData, setFormData] = useState({
    "id" : editData.id,
    "title" : editData.title,
    "ask_whom" : editData.ask_whom,
    "description" : editData.description,
    "question_category" : editData.question_category,
    "question_length" : editData.question_length,
    "time_limit" : editData.time_limit,
    "price" : editData.price,
    "question_type" : editData.question_type,
    "subject" : editData.subject,
    "status" : "open",
    "is_answered" : 0,
    "is_locked" : 0,
  });

  const handelFormData = (key, val) => {
    setFormData( (formData) => ({
      ...formData,
      [key] : val
    }) )
  }

  const submitForumQuestion = () => {
    dispatch( editForumQuestion(formData) ).then( (res) => {
      // console.log( "res", res );
      if ( res.type == "success" ) {
        // window.location.reload()
        dispatch( forumQuestionList({status: "open"}) )
        toggleEditQuestion()
      } else if (res.type == "error" ) {
        toast.error(res.payload.error)
      } else {
        toast.error("Internal server error.")
      }
    } )
  }

  return (
    <>
      <Grid
        style={{ marginRight: 0, marginTop: 15, width: "50%" }}
        // item
        // xs={12}
        // md={8}
        // lg={5}
        className={classes.center}
      >
        {!length ? (
          <SelectCategory
            showQuestionType={showQuestionType}
            toggleEditQuestion={toggleEditQuestion}
            toggleShowLength={toggleShowLength}
            authUser={authUser}
            handelFormData={handelFormData}
            formData={formData}
            editData={editData}
          />
        ) : (
          <>
            {!finalQuestionView ? (
              <SelectLength
                questionTypeList={questionTypeList}
                showQuestionTypeList={showQuestionTypeList}
                showFinalQuestionView={showFinalQuestionView}
                toggleShowLength={toggleShowLength}
                authUser={authUser}
                handelFormData={handelFormData}
                formData={formData}
                editData={editData}
                toggleEditQuestion={toggleEditQuestion}
              />
            ) : (
              <FinalQuestionView
                showFinalQuestionView={showFinalQuestionView}
                toggleEditQuestion={toggleEditQuestion}
                authUser={authUser}
                handelFormData={handelFormData}
                formData={formData}
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                submitForumQuestion={submitForumQuestion}
                editData={editData}
              />
            )}
          </>
        )}
      </Grid>
      {/* <QuestionTypeOverlay
        questionType={questionType}
        showQuestionType={showQuestionType}
        authUser={authUser}
        handelFormData={handelFormData}
        formData={formData}
      /> */}
      
    </>
  );
});
export default EditQuestion;
