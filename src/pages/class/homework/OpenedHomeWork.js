import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import _ from "lodash";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, withStyles } from "@material-ui/core";
import { BgColor, Color, Fonts } from "../../../theme/index";
import CardContent from "@material-ui/core/CardContent";
import { Card, Grid, Box, Button, Paper, Typography } from "@material-ui/core";
import { userDefaultImage } from "./../../../assets/index";
import ShowMoreText from 'react-show-more-text';
import JoditEditor from "jodit-react";
import { TextField } from "@material-ui/core";
import { toast } from 'react-toastify';

import Const from "./../../../helpers/const"

import { getHomework } from "./../../../redux/actions/homeworkActions";
import { getSubmittedHomeworkList, addGradeHomework } from "./../../../redux/actions/teacherActions";
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(() => ({
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
    // maxWidth: "600px",
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
    height: "40px",
    color: "#fff",
    fontSize: "12px",
    lineHeight: "48px",
    // height: "30px",
    borderRadius: "5px",
    backgroundColor: BgColor.myBlue,
    border: "1px solid transparent",
    padding: "0 25px",
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
}));

const WhiteCard = ({ heading, textContent }) => {
  const styles = useStyles();

  return (
    <>
      <Card
        style={{
          // maxWidth: "1000px",
          // width: "550px",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Box>
            <Box className={styles.smallestBlueTitle}>{heading}</Box>
            <Box className={styles.smallText} dangerouslySetInnerHTML={{__html: textContent }}></Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const AssignmentCard = ({ submittedHomework, setOpenAssignment }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const editor = useRef(null)
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
      // "autofocus": true,
      "askBeforePasteHTML": false,
      "askBeforePasteFromWord": false
  }

  const [formData, setFormDataData] = useState({
    class_id: "",
    student_id: "",
    homework_id: "",
    grade : "",
    grade_detail : "",
  });

  const [editorState, setEditorState] = useState('');
  const onEditorStateChange = (val) => {
    setEditorState(val);
    setFormDataData((formData) => ({
      ...formData,
      grade_detail: val,
    }));
  }

  const handleFormDataChange = (event) => {
    event.persist();
    setFormDataData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  }

  const formSubmit = (event) => {
    setFormDataData((formData) => ({
      ...formData,
      'grade_detail': kdmeditortext.html(),
    }));
    formData.grade_detail=kdmeditortext.html()
    event.persist();
    let Data = {
      ...formData,
      class_id: submittedHomework.homework_details.class_id,
      student_id: submittedHomework.studentId,
      homework_id: submittedHomework.homework_details.homework_id,
    }
    dispatch(addGradeHomework(Data)).then((response) => {
      console.log("response", response)
      if ( response.type == 'success' ) {
        history.push("/homework-feedback/" + submittedHomework.homework_details.id)
        // dispatch(getSubmittedHomeworkList({
        //   homework_id: submittedHomework.homework_details.homework_id
        // }))
      } else {
        toast.error("Server error, Please check your details.");
      }
    });
  }
  const {t , i18n} = useTranslation()
  const [kdmeditortext, setkdmeditortext] = useState('');
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
      <Card
        style={{
          maxWidth: "600px",
          // width: "550px",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Box>
            {/* <Box className={styles.smallestBlueTitle}>{heading}</Box> */}
            <Box className={styles.smallText}>
              <p dangerouslySetInnerHTML={{__html: submittedHomework.homework_details.homework_details}}></p>
            </Box>
            <Typography
              className={styles.profileName}
              style={{ marginTop: "60px" }}
            >
              {t('grade_capital')}:
            </Typography>
            <Typography className={styles.gradePercentage}>{(submittedHomework.homework_details.grade) ? submittedHomework.homework_details.grade : 0}%</Typography>
          </Box>

          <Card
            style={{
              maxWidth: "800px",
              // width: "550px",
              padding: "10px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            <TextField
              label="Grade"
              variant="outlined"
              type="number"
              name="grade"
              value={formData.grade}
              onChange={handleFormDataChange}
              className={styles.TextFields}
            />
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
            <CardContent>
              <Box>
                {/*<JoditEditor
                  ref={editor}
                  value={editorState}
                  config={config}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={newContent => onEditorStateChange(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={ (text) => {} }
                />*/}
                <textarea name="content12">{editorState}</textarea>
                <p>{t('count_word_msg')}< span  class ="word_count2" > 0 </ span > </p>
              </Box>
            </CardContent>
          </Card>


          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            pt={"10px"}
          >
            <Button
              className={styles.blueButtonSm}
              onClick={formSubmit}
            >
              Submit
            </Button>
            <Button
              className={styles.blueButtonSm}
              onClick={() => setOpenAssignment(null)}
            >
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const BlueCard = ({homeWorkData}) => {
  const styles = useStyles();
  const students = useSelector((store) => store.classes.enrollStudentList);
  return (
    <>
      <Box className={styles.blueCardWrapper} style={{ padding: "0 10px" }}>
        <Box className={styles.blueCard}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Box>
                <p className={styles.dueDate}>Due date {homeWorkData.deadline_date}</p>
              </Box>
              {/* <Box>
                <p className={styles.daysLeft}>{homeWorkData.day_left} days left</p>
              </Box> */}
            </Box>
            <Box>
              <p className={styles.submissionText} style={{ color: "#fff" }}>

                <span>{homeWorkData.total_submission}</span> / <span>{students.length}</span> Submissions
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const MainHeading = ({ heading }) => {
  const styles = useStyles();
  return (
    <>
      <Typography className={styles.mainHeading} style={{ margin: "15px 0" }}>
        {heading}
      </Typography>
    </>
  );
};

const SubmitStudentDiv = ({ data, setOpenAssignment }) => {
  const styles = useStyles();
  const history = useHistory();

  const openHomeworkFeedback = (id) => {
    history.push("/homework-feedback/" + id)
  }

  return (
    <>
      <Card
        style={{
          // maxWidth: "600px",
          // width: "550px",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <img src={(data.profileImage) ? data.profileImage : userDefaultImage} className={styles.profileImg} />
              <Box>
                <Box className={styles.profileName}>{data.studentFirstName}</Box>
                <Box className={styles.profileId}>ID {data.studentId}</Box>
              </Box>
            </Box>

            {
              (data.homework_details.grade) ? (
                <Box className={styles.profileName}>
                  <span>(tk) </span>
                  Grade : <span>{data.homework_details.grade}</span>
                </Box>
              ) : ('')
            }
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: "20px" }}
          >
            <Box display="flex" justifyContent="flex-start" alignItems="center" style={{ minWidth: "90%"}}>
              <Box className={styles.docImg}></Box>
              <Box style={{ minWidth: "90%"}}>
                <Box className={styles.profileName}>
                  <ShowMoreText
                      /* Default options */
                      lines={2}
                      more={"READ"}
                      less={"HIDE"}
                      className='content-css'
                      anchorClass={styles.blueLink}
                      // onClick={this.executeOnClick}
                      expanded={false}

                  >
                    <div dangerouslySetInnerHTML={{__html: data.homework_details.homework_details }}></div>
                  </ShowMoreText>
                </Box>
                {/* <Box className={styles.blueLink}>READ</Box> */}
              </Box>
            </Box>
            <Button className={styles.blueButtonSm} onClick={() => openHomeworkFeedback(data.homework_details.id)}>
              {(data.homework_details.grade) ? "View" : "Grade"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const TeamCardDemo = (props) => {
  const { openedHomeworkId, openHomework, authUser } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomework(openedHomeworkId)).then( (res) => {
      // console.log("res", res);
      if ( res.type == 'success' ) {

      }
    })
    dispatch(getSubmittedHomeworkList({
      homework_id: openedHomeworkId
    })).then( (res) => {
      // console.log("res", res);
      if ( res.type == 'success' ) {

      }
    })
  }, [dispatch]);

  const homeWorkData = useSelector((store) => store.homeworks.data);
  const submittedHomeworkList = useSelector((store) => store.teachers.submittedHomeworkList);

  const [submittedHomework, setSubmittedHomework] = useState(null)

  const openGradeSection = (id) => {
    let p = _.find(submittedHomeworkList, function(o) { return o.homework_details.id == id; });
    setSubmittedHomework(p)
    props.setOpenAssignment()
  }

  return (
    <>
      {/* <Grid container>
        <Grid> */}
          <Box
            // style={{ maxWidth: "600px" }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MainHeading heading={"Instructions"} />
            <CloseIcon
              style={{ color: Color.textBlue, cursor: "pointer" }}
              onClick={ () => openHomework(openedHomeworkId) }
            />
          </Box>
          <WhiteCard
            heading={"Title"}
            textContent={ homeWorkData.title }
          />
          <WhiteCard
            heading={"Description"}
            textContent={ homeWorkData.description }
          />
          { (authUser.user_type == 1) ? (
            <>
              <BlueCard
                homeWorkData={homeWorkData}
              />
              <MainHeading heading={"Submissions"} />
              {
                 (Array.isArray(submittedHomeworkList)) ? (
                    submittedHomeworkList.map((v, i) => {
                      return (
                        <div key={i}>
                          <SubmitStudentDiv
                            data={v}
                            setOpenAssignment={openGradeSection}
                          />
                        </div>
                      )
                    })
                 ) : ('Not found')
              }
            </>
          ) : (
            ""
          )}
        {/* </Grid> */}
        {/* <Grid item xs={12} md={6} lg={6}>
          {
            props.openAssignment ? (
              <AssignmentCard
                submittedHomework={submittedHomework}
                setOpenAssignment={openGradeSection}
              />
            ) : (
              ""
            )
          }
        </Grid> */}
      {/* </Grid> */}
    </>
  );
}

export default (TeamCardDemo)
