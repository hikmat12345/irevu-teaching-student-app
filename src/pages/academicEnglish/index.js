import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "fontsource-roboto";
import { fade, withStyles } from "@material-ui/core/styles";
import { Header } from "../../components";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box, Button } from "@material-ui/core";
import { BgColor, Color, Fonts } from "../../theme/index";

import QuestionCard from "./QuestionCard";

import { academicForumQuestionList } from "./../../redux/actions/forumActions";
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
  center : {
    display:"inline-block",
    position:"relative"
  },
  filterbtn:{
    borderRadius: "50px",
    backgroundColor: "#3f51b5",
    height: "40px",
    border: "none",
    fontSize: "15px",
    padding: "20px",
    //
    marginLeft: "2px",
    color: "#fff",
    // border: "1px solid transparent",
    // height: "20px",
    // padding: "0 10px",
    // borderRadius: "0px",
    // backgroundColor: BgColor.myBlue,
    // fontSize: "11px",
    "&:hover": {
      color: "#fff",
      border: "1px solid" + Color.textBlue,
      backgroundColor: "#689cf2",
    },
  },
  activefilterbtn:{
    borderRadius: "50px",
    height: "40px",
    border: "none",
    fontSize: "15px",
    padding: "20px",
    //
    marginLeft: "2px",
    color: "#fff",
    // border: "1px solid transparent",
    // height: "20px",
    // padding: "0 10px",
    // borderRadius: "0px",
    backgroundColor: "#689cf2",
    // fontSize: "11px",
    "&:hover": {
      color: "#fff",
      // border: "1px solid #FF8F8A",
      backgroundColor: "#689cf2",
    },
  },
});

const AcademicEnglish = (props) => {
  const {t , i18n} = useTranslation()
  const { classes } = props;
  const authUser = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  
  

  const openQuestionList = useSelector((store) => store.forum.academicOpenList);
  const closeQuestionList = useSelector((store) => store.forum.academicCloseList);
  const [displaylimit, setdisplaylimit] = useState(12);
  const [my_limit, setmylimit] = useState(displaylimit);
  const [others_limit, setotherslimit] = useState(displaylimit);
  const [forumtype, setforumtype] = useState(0);

  useEffect(() =>  {
    dispatch( academicForumQuestionList({status: "open",auth:forumtype}) ).then( (res) => {
      dispatch( academicForumQuestionList({status: "close",auth:forumtype}) )
    })
  }, [forumtype])
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
  return (
    <>
      <Header history={props.history} />
      <Container maxWidth="xl" className={classes.container +' academic-english-main'}>
        { (
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
                {t('academic_english_questions')}
                </Typography>
              </Box>
            </Box>
            <>
                   <Box>

                    <Typography
                      variant="span"
                      component="span"
                      className={classes.mainHeading}
                    >
                    
                    </Typography>
                    {
                   (authUser.user_type == 2) ? (
                    <>
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
                    </>
                    ) : (
                    <>
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
                    </>
                    )
                  }
                  </Box>
                   </>
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
                className='academic-english-card-main'
              >
                {
                  ((openQuestionList !== undefined) && (openQuestionList.length > 0)) ? 
                    openQuestionList.slice(0,my_limit).map((value, index) => {
                      return (<QuestionCard type="open" key={index} data={value} authUser={authUser} />)
                    }) : (t('no_question_found'))
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
                className='academic-english-card-main'
              >
                {
                  ((closeQuestionList !== undefined) && (closeQuestionList.length > 0)) ? 
                    closeQuestionList.slice(0,others_limit).map((value, index) => {
                      return (<QuestionCard type="closed" key={index} data={value} authUser={authUser} />)
                    }) : ('No questions found')
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

export default withStyles(styles, { withTheme: true })(AcademicEnglish);
