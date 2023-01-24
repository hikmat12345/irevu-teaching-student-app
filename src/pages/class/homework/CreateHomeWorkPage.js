import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { BgColor, Color, Fonts } from "./../../../theme/index";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import openSocket from 'socket.io-client';
import {
  Grid,
  Box,
  TextField,
  Button,
  Card,
  Container,
  Typography,
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import queryString from 'query-string';
import JoditEditor from "jodit-react";
import moment from "moment";

import { createHomework } from "./../../../redux/actions/homeworkActions";
import { useTranslation } from 'react-i18next';
import { SOCKET_URL } from './../../../config/weChatConfig';

const useStyles = makeStyles(() => ({
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
  shareCodeText: {
    color: Color.myBlack,
    fontSize: "18px",
    fontFamily: Fonts.Medium,
    textTransform: "uppercase",
    textAlign: "center",
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
  TextFields: {
    width: "100%",
  },
  blueButton: {
    color: "#fff",
    height: "40px",
    lineHeight: "48px",
    borderRadius: "5px",
    fontFamily: Fonts.Medium,
    cursor: "pointer",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: BgColor.myBlue,
    padding: "0 20px",
    "&:hover": {
      color: Color.textBlue,
      border: "1px solid" + Color.textBlue,
    },
  },
}));

const WhiteCard = ({ type, label, name, handle, func, val }) => {
  const styles = useStyles();
  return (
    <>
      <Card
        style={{
          maxWidth: "800px",
          width: "800px",
          borderRadius: "10px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        <Box style={{ padding: "26px" }}>
          {
            ( type == 'dropdown' ) ? (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                onClick={func}
              >
                <Box className={styles.smallestBlueTitle}>{label}</Box>
                <ArrowDropDownIcon style={{ color: Color.textBlue }} />
              </Box>
            ) : ( '' )
          }
          {
            ( type == 'textArea' ) ? (
              <TextField
                  id="outlined-multiline-static"
                  label={label}
                  multiline
                  rows={4}
                  name={name}
                  onChange={handle}
                  // defaultValue="Lesson Plan Text"
                  variant="outlined"
                  className={styles.TextFields}
                />
            ) : ('')
          }
          {
            ( type == 'date' ) ? (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  id="outlined-basic"
                  label={label}
                  disablePast= {true}
                  variant="outlined"
                  name={name}
                  value={val}
                  onChange={handle}
                  className={styles.TextFields}
                />
              </MuiPickersUtilsProvider>
            ) : ('')
          }
          {
            ( type == 'time' ) ? (
              <TextField
                id="outlined-basic"
                label={label}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                variant="outlined"
                name={name}
                onChange={handle}
                className={styles.TextFields}
                value={val}
              />
            ) : ('')
          }
          {
            ( !type ) ? (
              <TextField
                id="outlined-basic"
                label={label}
                variant="outlined"
                name={name}
                onChange={handle}
                className={styles.TextFields}
              />
            ) : ('')
          }
        </Box>
      </Card>
    </>
  );
};

const WhitBox = ({ openCreateHomeWorkPage }) => {
  const students = useSelector((store) => store.classes.enrollStudentList);
  const authUser = useSelector((store) => store.auth.user);
  const {t , i18n} = useTranslation()
  const socket = openSocket(SOCKET_URL);
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [addCourseID, setAddCourseID] = useState(false);
  const [deadLineDiv, setDeadLineDiv] = useState(false);

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const currenttime=()=>{
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // var timewithampm = hours + ':' + minutes + ' ' + ampm;
    var timewithampm = hours + ':' + minutes;

    console.log('current time',timewithampm)
    return timewithampm;
  }
  const [selectedTime, setSelectedTime] = React.useState(currenttime());

  const editor = useRef(null)

  const [editorState, setEditorState] = useState('');

  const onEditorStateChange = (val) => {
    setEditorState(val);
    handelFormData("description", val)
  }

  const handelFormData = (key, val) => {
    setFormData( (formData) => ({
      ...formData,
      [key] : val
    }) )
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [formData, setFormData] = useState({
    title : "",
    description : "",
    course_id : "",
    class_id : "",
    deadline_time : "",
    overtime : ""
  });

  const showCourseIDdiv = () => {
    setAddCourseID(!addCourseID);
  };
  const showDeadLineDiv = () => {
    setDeadLineDiv(!deadLineDiv);
  };

  const handleFormDataChange = (e) => {
    e.persist();
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    // setFormData((formData) => ({
    //   ...formData,
    //   'description': kdmeditortext.html(),
    // }));
    formData.description=kdmeditortext.html()
    const ids=[]
    students.map((value, i) => {
      ids.push(value.id)
    })
    e.persist();
    const value = queryString.parse(window.location.search, { ignoreQueryPrefix: true });
    formData.class_id = value.id;
    formData.deadline_date = moment(selectedDate).format("DD/MM/YYYY");
    dispatch(createHomework(formData)).then( (res) => {
      if ( res.type == 'success' ) {
        let teachersocketData = {
            id:authUser.id,
            for : 'teacher',
            message : 'You have added homework successfully ',
            receiverMsg : "New homework Added"
        }
        socket.emit('send_notification',teachersocketData)
        let socketData = {
            id:authUser.id,
            ids:ids,
            for : 'student',
            message : authUser.username+' have added homework successfully ',
            receiverMsg : "New homework Added"
        }
        socket.emit('send_notification',socketData)
        window.location.reload();
        openCreateHomeWorkPage();
      }
    })
  }
const [kdmeditortext, setkdmeditortext] = useState('');
  const kdmed=()=>{
    // alert('inner')
    var kdmeditortxt=window.kdmeditor()
    setkdmeditortext(kdmeditortxt)
  }
  setTimeout(() => {
    kdmed()
  }, 500)

  const timechange=(e)=>{
    e.persist();
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
    setSelectedTime(e.target.value)
  }
  return (
    <>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            className={styles.mainHeading}
            style={{ margin: "15px 0" }}
          >
            {t('create_a_homework')}
          </Typography>
          <CloseIcon
            style={{ color: Color.textBlue, cursor: "pointer" }}
            onClick={openCreateHomeWorkPage}
          />
        </Box>
        <Box style={{
          display: "inline-block"
        }}>
          <WhiteCard label={t('title')}  name={"title"} handle={handleFormDataChange} />
          {/* <WhiteCard label={"Description"} type={'textArea'} name={"description"} handle={handleFormDataChange} /> */}

          <Card
            style={{
              maxWidth: "800px",
              width: "800px",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            <Box style={{ padding: "26px" }}>
              {/*(<JoditEditor
                ref={editor}
                value={editorState}
                config={Const.EDITOR_CONFIG}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => onEditorStateChange(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={ (text) => {} }
              />*/}
              <textarea name="content12">{editorState}</textarea>
              <p>{t('count_word_msg')}< span  class ="word_count2" > 0 </ span > </p>
              </Box>
          </Card>

          <WhiteCard
            type={'date'}
            label={t('deadline_date')}
            name={"deadline_date"} 
            handle={handleDateChange}
            val={selectedDate}
          />
          <WhiteCard 
            type={'time'}
            label={t('deadline_time')}
            name={"deadline_time"} 
            handle={(e)=>timechange(e)}
            // handle={handleFormDataChange}
            val={selectedTime}
            />
            {/*<div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl">
            <TextField className="MuiInputBase-input" type="time" style={{width: "100%"}} value={selectedTime} name="title" onChange={(e)=>timechange(e)}/>
            </div>*/}
          <WhiteCard 
            label={t('overtime')}
            name={"overtime"} 
            handle={handleFormDataChange}
          />





          
          <Box
            style={{
              maxWidth: "600px",
              width: "600px",
              marginTop: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              style={{
                padding: "20px",
                marginTop: "50px",
              }}
              className={styles.blueButton}
              style={{ width: "100%", height: "unset" }}
              onClick={handleSubmit}
            >
              + {t('create_homework_capital')}
            </Button>
          </Box>
        </Box>
      </Box>

      {deadLineDiv ? (
        <Container maxWidth="xl" className={styles.overlayWrapper}>
          <CloseIcon
            style={{ color: Color.textBlue, cursor: "pointer" }}
            onClick={showDeadLineDiv}
          />
          calender
        </Container>
      ) : (
        ""
      )}
      {addCourseID ? (
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
                  Select your Course
                </Box>
                <CloseIcon
                  style={{ color: Color.textBlue, cursor: "pointer" }}
                  onClick={showCourseIDdiv}
                />
              </Box>

              <Button className={styles.whiteOutlinedButton}>
                Course Name
              </Button>
              <Button className={styles.whiteOutlinedButton}>
                Course Name
              </Button>
              <Button className={styles.whiteOutlinedButton}>
                Course Name
              </Button>
              <Button className={styles.whiteOutlinedButton}>
                Course Name
              </Button>
              <Button className={styles.whiteOutlinedButton}>
                Course Name
              </Button>
            </Box>
          </Card>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  return (
    <WhitBox
      heading={"Instructions"}
      openCreateHomeWorkPage={props.openCreateHomeWorkPage}
    />
  );
});
export default TeamCardDemo;
