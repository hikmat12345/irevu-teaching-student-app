import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Container, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { Fonts, BgColor, Color } from "../../theme/index";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PublishIcon from '@material-ui/icons/Publish';
import { useTranslation } from 'react-i18next';
import {
  Select,
  InputLabel,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import JoditEditor from "jodit-react";

import Const from "../../helpers/const"
import { ErrorAlert } from "../../components"

import { addLessionPlan, getLessionPlanList } from "../../redux/actions/lessionPlanActions";
import {
  uploadDoc,
} from "../../redux/actions/resourceActions";
import openSocket from 'socket.io-client';
import { SOCKET_URL } from './../../config/weChatConfig';


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
});

const MyCard = (props) => {
  const {t , i18n} = useTranslation()
  const { authUser, closeAddingNewLessonPlan } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const editor = useRef(null)
  const config = {
      minHeight : "400",
      toolbarButtonSize: "small",
      placeholder:t('page_paper_placeholder'),
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      uploader: {
        url: Const.FILE_LIST_URL,
        headers : {
          Authorization : localStorage.userToken
        },
      },
      // filebrowser: {
      //     ajax: {
      //         url: Const.FILE_UPLOAD_URL,
      //         headers : {
      //           Authorization : localStorage.userToken
      //         },
      //     }
      // },
      // "autofocus": true,
          buttons: [],
    buttonsXS: [
      // "source",
      "|",
      "bold",
      "italic",
      "|",
      "ul",
      "ol",
      "eraser",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "table",
      "|",
      "align",
      "\n",
      "undo",
      "redo",
      "|",
      "copyformat",
      "fullsize",
      // "dots",
    ],
    buttonsMD: ["bold", "italic"],
      "askBeforePasteHTML": false,
      "askBeforePasteFromWord": false
  }
  const [editorState, setEditorState] = useState('');

  const onEditorStateChange = (val) => {
    setEditorState(val);
    setFormDataData((formData) => ({
      ...formData,
      description: val,
    }));
  }

  const [formData, setFormDataData] = useState({
      title : "",
      subject : "",
      price : "",
      plan : "",
      skill : "",
      notes : "",
      level : "Elementary",
      description : "",
  });
  const authData = useSelector(state => state?.auth?.user)
  const [fileName, setFileName] = useState("pdf only");
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [error, setError] = useState(false);
  const [docError, setDocError] = useState(false);
  // {
  //   title : "",
  //   subject : "",
  //   price : "",
  //   plan : "",
  //   skill : "",
  //   notes : "",
  //   level : "",
  //   description : "",
  // }

  let levels = [
    "Elementary",
    "Pre-Intermediate",
    "Intermediate",
    "Upper-Intermediate",
    "Advanced",
  ]

  const handleFormDataChange = (event) => {
    event.persist();
    setFormDataData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  }


  const errorHandle = (err) => {
    setError((error) => ({
      ...error,
      title : (err.title) ? err.title : false,
      subject : (err.subject) ? err.subject : false,
      price : (err.price) ? err.price : false,
      plan : (err.plan) ? err.plan : false,
      skill : (err.skill) ? err.skill : false,
      notes : (err.notes) ? err.notes : false,
      level : (err.level) ? err.level : false,
      description : (err.description) ? err.description : false,
    }))
  }

  // const handleFileDataChange = (event) => {
  //   event.persist();
  //   setFileName(event.target.files[0].name);
  //   setFormDataData((formData) => ({
  //     ...formData,
  //     plan: event.target.files[0],
  //   }));
  // }
const handleFileDataChange = (event) => {

    event.persist();
    const Data = new FormData();
    setFileName(event.target.files[0].name);
    let file = event.target.files[0];
    Data.append("file", file);
    setIsFileUploading(true);
    dispatch(uploadDoc(Data)).then((res) => {
      console.log("res", res);
      if (res.type == "success") {
        setFormDataData((formData) => ({
          ...formData,
          plan: res.data.url,
        }));
        setIsFileUploading(false);
        setDocError("");
      } else if (res.data.error) {
        setDocError(res.data.error);
      } else {
        setDocError("Server error, Please upload valid paper.");
      }
    });
  };
  const formSubmit = (event) => {
    onEditorStateChange(kdmeditortext.html())
    formData.description=kdmeditortext.html()
    event.persist();
    const Data = new FormData();
    Data.append('title', formData.title)
    Data.append('subject', formData.subject)
    Data.append('price', formData.price)
    Data.append('plan', formData.plan)
    Data.append('skill', formData.skill)
    Data.append('notes', formData.notes)
    Data.append('level', formData.level)
    Data.append('description', formData.description)
    Data.append('page_limit_no', formData.skill)

    dispatch(addLessionPlan(Data)).then((response) => {
      console.log("response", response)
      if ( response.type == 'error' ) {
        // errorHandle(error);
        if(response.payload.limit_error){
          setError(response.payload.error);
        }
        else{
          setError("Server error, Please check your details.");
        }
      } else {
        let lessonData = {
          id:authData.id,
          type:"all",
          for : 'student',
          message : authData.username+' Your Lessonplan Added successfully',
          receiverMsg : "You have a new Lesson Plan"
        }
        socket.emit('send_notification',lessonData)
        // 
        dispatch(getLessionPlanList())
        setError("");
        closeAddingNewLessonPlan()
      }
    });
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
                  + {t('add_new_lesson_plan')}
                </Box>
                <CloseIcon
                  style={{ color: Color.textBlue, cursor: "pointer" }}
                  onClick={closeAddingNewLessonPlan}
                />
              </Box>
            </Box>
            <form noValidate autoComplete="off" className={classes.form}>
              <TextField
                label={t('subject')}
                variant="outlined"
                name="subject"
                value={formData.subject}
                onChange={handleFormDataChange}
                className={classes.TextFields}
              />
              <TextField
                label={t('title')}
                variant="outlined"
                name="title"
                value={formData.title}
                onChange={handleFormDataChange}
                className={classes.TextFields}
              />
              
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
              <label htmlFor="upload-photo" style={{
                marginTop: "10px"
              }}>
                <input
                  style={{ display: 'none' }}
                  id="upload-photo"
                  name="plan"
                  type="file"
                  onChange={handleFileDataChange}
                  accept=".pdf"
                />
                <Box style={{ 
                    width: '100%',
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}>
                  <Box>
                    <Box>Plan</Box>
                    <Box>{fileName}<PublishIcon/></Box>
                  </Box>
                </Box>
              </label>

              <TextField
                label={t('no_of_pages_placeholder')}
                variant="outlined"
                name="skill"
                value={formData.skill}
                onChange={handleFormDataChange}
                className={classes.TextFields}
              />
              
              <Box style={{ padding: "26px" }}>
                <InputLabel id="level">{t('level')}</InputLabel>
                <Select value={formData.level} labelId="level" name="level" onChange={handleFormDataChange} style={{
                  width:"100%"
                }} >
                  {
                    levels.map((v) => {
                      return (
                        <MenuItem key={v} value={v} style={{
                          textTransform: "uppercase"
                        }}>{v}</MenuItem>
                      )
                    })
                  }
                </Select>
              </Box>
              <TextField
                label={t('price') +" (RMB)"}
                variant="outlined"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormDataChange}
                className={classes.TextFields}
              />
              <TextField
                label={t('please_add_teachers_notes_if_required_capital')}
                multiline
                rows={4}
                variant="outlined"
                name="notes"
                value={formData.notes}
                onChange={handleFormDataChange}
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
              <Typography
                className={classes.smallLightText}
                style={{ textAlign: "center", paddingBottom: "5px" }}
              >
                {t('you_can_have_maximum_of_10_lesson_plan')}
              </Typography>
              {
                (error) ? (
                  <ErrorAlert message={error}/>
                ) : ("")
              }
              <Button className={classes.blueButton} style={{ width: "100%" }} onClick={formSubmit}>
                {t('publish_capital')}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  // console.log("funccsf dsdfasdfsadfsd");
  return (
    <>
      <Grid
        style={{ 
          marginRight: 0, 
          marginTop: 15,
          height: "90vh",
          overflowY: "auto",
        }}
        item
        xs={12}
        md={6}
        lg={4}
      >
        <MyCard
          open={props.open}
          closeAddingNewLessonPlan={props.closeAddingNewLessonPlan}
        />
      </Grid>
    </>
  );
});
export default TeamCardDemo;
