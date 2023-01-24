import React, { useState, useRef,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import NoSsr from "@material-ui/core/NoSsr";
import { Container, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { TextField } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { Fonts, BgColor, Color } from "../../theme/index";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PublishIcon from "@material-ui/icons/Publish";
import { useTranslation } from 'react-i18next';
import {
  Select,
  InputLabel,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import JoditEditor from "jodit-react";

import Const from "../../helpers/const";
import { ErrorAlert } from "../../components";

import {
  getResourceList,
  addResourcePlan,
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
  grayTitle: {
    color: "rgba(0,0,0,0.5)",
    fontSize: "13px",
    fontFamily: Fonts.Regular,
    // textTransform: "uppercase",
  },
});

const MyCard = (props) => {
  const {t , i18n} = useTranslation()
  const { authUser, closeAddingNewResource } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
const authData = useSelector(state => state?.auth?.user)
  const editor = useRef(null);
  const config = {
    minHeight: "400",
    toolbarButtonSize: "small",
    placeholder:t('page_paper_placeholder'),
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    uploader: {
      url: Const.FILE_LIST_URL,
      headers: {
        Authorization: localStorage.userToken,
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
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
  };
  const [editorState, setEditorState] = useState("");
  const [page_limit_no_visible, setpage_limit_no_visible] = useState(true);

  const onEditorStateChange = (val) => {
    setEditorState(val);
    setFormDataData((formData) => ({
      ...formData,
      description: val,
    }));
  };

  const [formData, setFormDataData] = useState({
    title: "",
    subject: "",
    price: "",
    is_paid: false,
    paper: "",
    page_limit_no: 1,
    grade: "",
    level: "Elementary",
    description: "",
    is_page_description:false
  });
  const [errors, setErrors] = useState({
    title: false,
    subject: false,
    price: false,
    is_paid: false,
    paper: false,
    page_limit_no: false,
    grade: false,
    level: false,
    description: false,
    is_page_description: false,
  });

  const [isFileUploading, setIsFileUploading] = useState(false);
  const [fileName, setFileName] = useState("pdf only");
  const [error, setError] = useState(false);
  const [docError, setDocError] = useState(false);

  // {
  //   title : "",
  //   subject : "",
  //   price : "",
  //   plan : "",
  //   grade : "",
  //   level : "",
  //   description : "",
  // }

  let levels = [
    "Primary School",
    "Middle School",
    "High School",
    "Under-Graduate",
    "Post-Graduate",
  ];

  const handleFormDataChange = (event) => {
    event.persist();
    setFormDataData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
    if(event.target.name=="is_page_description"){
      if(event.target.value){
        setFormDataData((formData) => ({
          ...formData,
          page_limit_no: 1,
        }));
      }
    }
    if (event.target.value == "") {
      setErrors(() => ({
        ...errors,
        [event.target.name]: true,
      }));
    }
    else{
      setErrors(() => ({
        ...errors,
        [event.target.name]: false,
      }));
    }
  };

  const errorHandle = (err) => {
    setError((error) => ({
      ...error,
      title: err.title ? err.title : false,
      subject: err.subject ? err.subject : false,
      price: err.price ? err.price : false,
      paper: err.paper ? err.paper : false,
      grade: err.page_limit_no ? err.page_limit_no : false,
      grade: err.grade ? err.grade : false,
      level: err.level ? err.level : false,
      description: err.description ? err.description : false,
      is_page_description: err.is_page_description ? err.is_page_description
       : false,
    }));
  };
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
          paper: res.data.url,
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
    let checkError = false;
    Object.keys(formData).forEach((data) => {
      if (
        formData[data] === "" ||
        formData[data] === null ||
        formData[data] === undefined
      ) {
        if(formData.is_page_description && data=="paper"){

        }
        else{
          errors[data] = true;
          checkError = true;
        }
        
      }
    });
    if (checkError || (!formData.is_page_description && !formData.paper)) {
      setError("Please don't leave any field empty");
      return;
    }
    const Data = new FormData();
    console.log("formData", formData);

    Data.append("title", formData.title);
    Data.append("subject", formData.subject);
    Data.append("price", formData.price);
    Data.append("is_paid", formData.is_paid ? 1 : 1 );
    Data.append("is_page_description", formData.is_page_description ? 1 : 0 );
    Data.append("paper", formData.paper);
    Data.append("page_limit_no", formData.is_page_description ? 1 : formData.page_limit_no);
    Data.append("grade", formData.grade);
    Data.append("level", formData.level);
    Data.append("description", formData.description);
    // Data.append("page_limit_no", 1);
   
    dispatch(addResourcePlan(Data)).then((response) => {
      if (response.type == "error") {
        if(response.payload.limit_error){
          setError(response.payload.error);
        }
        else{
          setError("You are missing fields, Please check your details.");
        }
        // errorHandle(error);
        
      } else {
        //
        dispatch(getResourceList());
        setError("");
        closeAddingNewResource();
        let lessonData = {
          id:authData.id,
          type:"all",
          for : 'student',
          message : authData.username+' Your Resource Added successfully',
					receiverMsg : "You have a new Resource Plan"
        }
        socket.emit('send_notification',lessonData)
      }
    });
  };
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
                  + {t('add_new_resources')}
                </Box>
                <CloseIcon
                  style={{ color: "primary", cursor: "pointer" }}
                  onClick={closeAddingNewResource}
                />
              </Box>
            </Box>
            <form noValidate autoComplete="off" className={classes.form}>
              <TextField
                label={t("subject")}
                variant="outlined"
                name="subject"
                error={errors.subject}
                value={formData.subject}
                onChange={handleFormDataChange}
                className={classes.TextFields}
              />
              <TextField
                label={t("title")}
                variant="outlined"
                name="title"
                error={errors.title}
                value={formData.title}
                onChange={handleFormDataChange}
                className={classes.TextFields}
              />
              {/*<JoditEditor
                ref={editor}
                value={editorState}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => onEditorStateChange(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(text) => {}}
              />*/}
              <textarea name="content12">{editorState}</textarea>
              <p>{t('count_word_msg')}< span  class ="word_count2" > 0 </ span > </p>
              { !formData.is_page_description ? (
              <label
                htmlFor="upload-photo"
                style={{
                  marginTop: "10px",
                }}
              >
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="paper"
                  type="file"
                  onChange={handleFileDataChange}
                  accept=".pdf"
                />
                <Box
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <Box>
                    <Box>{t('paper')}</Box>
                    <Box>
                      {fileName} <PublishIcon />
                    </Box>
                  </Box>
                </Box>
              </label> ) : ''}
              {docError ? <ErrorAlert message={docError} /> : ""}
              {/* <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                // onClick={openEducationLevel}
                p={"10px"}
              >
                <Box
                  className={classes.smallestBlueTitle}
                  style={{ fontSize: "16px", opacity: "0.7" }}
                >
                  Paper
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box className={classes.grayTitle}>Word, Wps, Docx, PPT</Box>
                  <PublishIcon
                    style={{ color: Color.textBlue, marginLeft: "15px" }}
                  />
                </Box>
              </Box> */}

              {/* <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                // onClick={openEducationLevel}
                p={"10px"}
              >
                <Box
                  className={classes.smallestBlueTitle}
                  style={{ fontSize: "16px", opacity: "0.7" }}
                >
                  Grade
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box className={classes.grayTitle}>
                    Screenshot Grade (Minimum 85%)
                  </Box>
                  <PublishIcon
                    style={{ color: Color.textBlue, marginLeft: "15px" }}
                  />
                </Box>
              </Box> */}
              {
                !formData.is_page_description ? (
              <TextField
                label={t('no_of_pages_placeholder')}
                variant="outlined"
                type="number"
                min="1"
                name="page_limit_no"
                error={errors.page_limit_no}
                value={formData.page_limit_no}
                onChange={handleFormDataChange}
                className={classes.TextFields}
              /> ) : ('')}
              <TextField
                label={t('grade')}
                variant="outlined"
                name="grade"
                error={errors.grade}
                value={formData.grade}
                onChange={handleFormDataChange}
                className={classes.TextFields}
              />
              <Box style={{ padding: "26px" }}>
                <InputLabel id="level">{t('education_level')}</InputLabel>
                <Select
                  value={formData.level}
                  labelId="level"
                  name="level"
                  error={errors.level}
                  onChange={handleFormDataChange}
                  style={{
                    width: "100%",
                  }}
                >
                  {levels.map((v, i) => {
                    return (
                      <MenuItem
                        key={i}
                        value={v}
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        {v}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Box>

              <TextField
                label={t('price')+" (RMB)"}
                variant="outlined"
                type="number"
                name="price"
                error={errors.price}
                value={formData.price}
                onChange={handleFormDataChange}
                className={classes.TextFields}
              />
            </form>
            <FormControlLabel
              control={
                <Checkbox
                  name="is_paid"
                  checked={formData.is_paid}
                  onChange={() =>setFormDataData((formData) => ({
                    ...formData,
                    ['is_paid']: !formData.is_paid,
                  }))}
                  color="primary"
                />
              }
              label={t('is_paid')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="is_page_description"
                  checked={formData.is_page_description}
                  onChange={() =>setFormDataData((formData) => ({
                    ...formData,
                    ['is_page_description']: !formData.is_page_description,
                  }))}
                  color="primary"
                />
              }
              label={t('is_page_description')}
            />
            <Box
              display="flex"
              // flexDirection="column"
              // justifyContent="flex-end"
              flexDirection="column"
              // alignItems="center"
            >
              {/* <Button
                className={classes.blueButton}
                style={{ marginRight: "10px" }}
              >
                Cancel
              </Button> */}

              <Typography
                className={classes.smallLightText}
                style={{ textAlign: "center", paddingBottom: "5px" }}
              >
                {t('you_can_have_maximum_of_10_resources')}
              </Typography>
              {error ? <ErrorAlert message={error} /> : ""}
              <Button
                className={classes.blueButton}
                style={{ width: "100%" }}
                onClick={formSubmit}
                disabled={isFileUploading}
              >
                {!isFileUploading ? t('publish_capital') : t('witing_file_upoading')}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
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
          closeAddingNewResource={props.closeAddingNewResource}
        />
      </Grid>
    </>
  );
});
export default TeamCardDemo;
