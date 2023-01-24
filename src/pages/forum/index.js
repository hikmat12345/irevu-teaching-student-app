import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "fontsource-roboto";
import { fade, withStyles } from "@material-ui/core/styles";
import { Header } from "../../components";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, Button } from "@material-ui/core";
import { BgColor, Color, Fonts } from "../../theme/index";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import QuestionCard from "./QuestionCard";
import AskQuestion from "./AskQuestion";
import EditQuestion from "./EditQuestion";
import { forumQuestionList } from "./../../redux/actions/forumActions";
import { useTranslation } from 'react-i18next';
const styles = (theme) => ({
  container: {
    alignSelf: "flex-end",
    paddingLeft: 250,
    paddingTop: 70,
    paddingBottom: 20,
    textAlign: "center",
  },
  root: {
    maxWidth: 345,
    marginTop: 10,
    marginRight: 10,
  },
  media: {
    height: 140,
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
  filterbtn:{
    marginLeft: "2px",
    color: "#fff",
    // border: "1px solid transparent",
    height: "20px",
    padding: "0 10px",
    borderRadius: "0px",
    backgroundColor: BgColor.myBlue,
    fontSize: "11px",
    "&:hover": {
      color: Color.textBlue,
      border: "1px solid" + Color.textBlue,
    },
  },
  activefilterbtn:{
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
  center : {
    display:"inline-block",
    position:"relative"
  }
});

const Forum = (props) => {
  const {t , i18n} = useTranslation()
  const { classes } = props;
  // const forumtype = props.match.params.type
  const [forumtype, setforumtype] = useState(0);
  const authUser = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  const [editData, setEditData] = useState();
  const [state, setState] = useState({
    askQuestion: false,
    isEdit: false,
  });
  
  useEffect(() => {
    if(props.location && props.location.state && props.location.state.step){
      if(props.location.state.step === 1){
         setState({
          askQuestion: false,
          isEdit: false
         })
         dispatch( forumQuestionList({status: "open",auth:forumtype}) ).then( (res) => {
          dispatch( forumQuestionList({status: "close",auth:forumtype}) )
        })
      }
    }
  }, [props]);

  useEffect(() =>  {
      dispatch( forumQuestionList({status: "open",auth:forumtype}) ).then( (res) => {
      dispatch( forumQuestionList({status: "close",auth:forumtype}) )
    })
  }, [forumtype])

  const openQuestionList = useSelector((store) => store.forum.openList);
  const closeQuestionList = useSelector((store) => store.forum.closeList);
  const [displaylimit, setdisplaylimit] = useState(12);
  const [my_limit, setmylimit] = useState(displaylimit);
  const [others_limit, setotherslimit] = useState(displaylimit);
  const toggleAskQuestion = () => {
    setState((state) => ({
      ...state,
      askQuestion: !state.askQuestion,
      isEdit: false
    }));
  }

  const toggleEditQuestion = (data) => {
    setState((state) => ({
      ...state,
      askQuestion: false,
      isEdit: !state.isEdit 
    }));
    setEditData(data)
    // console.log("data", data)
  }
  const loadmore =(type)=>{
    if(type=="my"){
      var limit=my_limit + displaylimit
      setmylimit(limit)
    }
    else{
      var limit=others_limit + displaylimit
      setotherslimit(limit)
    }
  }
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Header history={props.history} />
      <Container maxWidth="xl" className={classes.container + ' forum-main'}>
        { (state.askQuestion) ? (
          <AskQuestion toggleAskQuestion={toggleAskQuestion} authUser={authUser} />
        ) : (state.isEdit) ? (
          <EditQuestion toggleEditQuestion={toggleEditQuestion} editData={editData} authUser={authUser} />
        ) : (
          <>
            <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography
                  variant="h5"
                  component="h5"
                  className={classes.mainHeading}
                >
                {forumtype=='my-forum' ? t('my_questions'): t('questions')}
                </Typography>
                {
                   (authUser.user_type == 2) ? (
                   <>
                  <Box>

                    <Typography
                      variant="span"
                      component="span"
                      className={classes.mainHeading}
                    >
                    
                    </Typography>
                    <Button
                      className={forumtype==0 ? classes.activefilterbtn + ' active' : classes.filterbtn}
                      onClick={()=>setforumtype(0)}
                    >
                      {t('all_questions')}
                    </Button>
                    <Button
                      className={forumtype==1 ? classes.activefilterbtn + ' active': classes.filterbtn}
                      onClick={()=>setforumtype(1)}
                    >
                      {t('my_questions')}
                    </Button>
                    <Button
                      className={forumtype==='my_answers' ? classes.activefilterbtn + ' active': classes.filterbtn}
                      onClick={()=>setforumtype('my_answers')}
                    >
                      {t('my_answers')}
                    </Button>

                  </Box>
                    <Button
                      className={classes.blueButton}
                      onClick={toggleAskQuestion}
                    >
                      {t('Ask_a_Question')}
                    </Button>
                    </>
                   ) : (
                   <>
                   <Box>

                    <Typography
                      variant="span"
                      component="span"
                      className={classes.mainHeading}
                    >
                    
                    </Typography>
                    <Button
                      className={forumtype==0 ? classes.activefilterbtn + ' active' : classes.filterbtn}
                      onClick={()=>setforumtype(0)}
                    >
                      {t('all_questions')}
                    </Button>
                    <Button
                      className={forumtype==='my_answers' ? classes.activefilterbtn + ' active': classes.filterbtn}
                      onClick={()=>setforumtype('my_answers')}
                    >
                      {t('my_answers')}
                    </Button>

                  </Box>
                   </>
                   )
                }
              </Box>
            </Box>
            {
              (authUser.user_type == 2) ?
              (
            <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
              <Typography
                variant="h5"
                component="h5"
                className={classes.mainHeading}
              >
                {t('forum_student_text')}
              </Typography>
            </Box>) : ('')}
            <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
              <Typography
                variant="h5"
                component="h5"
                className={classes.mainHeading}
              >
                {t('new_questions')}
              </Typography>
              {/* <Carousel responsive={responsive}> */}
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                paddingTop={0}
                bgcolor="background.paper"
                className="forum-inner"
              >
                {
                  ((openQuestionList !== undefined) && (openQuestionList.length > 0)) ? 
                    openQuestionList.slice(0,my_limit).map((value, index) => {
                      
                      return (<QuestionCard type="open" toggleEditQuestion={toggleEditQuestion} key={index} data={value} authUser={authUser} />)
                    }) : t('no_question_found')
                }
              </Box>
              {/* </Carousel> */}
              {Array.isArray(openQuestionList) && openQuestionList.length > my_limit ? 
                  (<Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
                  <Button className={classes.blueButton} onClick={()=>loadmore('my')}>
                      {t("load_more")}
                  </Button>
                </Box>) : ('')}
            </Box>
            <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
              <Typography
                variant="h5"
                component="h5"
                className={classes.mainHeading}
              >
                {t('closed_questions')}
              </Typography>
              {/* <Carousel responsive={responsive}> */}
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                paddingTop={0}
                bgcolor="background.paper"
                className="forum-inner"
              >
                {
                  ((closeQuestionList !== undefined) && (closeQuestionList.length > 0)) ? 
                    closeQuestionList.slice(0,others_limit).map((value, index) => {
                      return (<QuestionCard type="closed" key={index} data={value} authUser={authUser} toggleEditQuestion={toggleEditQuestion}/>)
                    }) : t('No questions found')
                }
              </Box>
              {/* </Carousel> */}
              {Array.isArray(closeQuestionList) && closeQuestionList.length > others_limit ? 
                  (<Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
                  <Button className={classes.blueButton} onClick={()=>loadmore('others')}>
                      {t("load_more")}
                  </Button>
                </Box>) : ('')}
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(Forum);
