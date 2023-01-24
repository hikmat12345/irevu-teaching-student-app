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
  center : {
    display:"inline-block",
    position:"relative"
  }
});

const Forum = (props) => {
  const {t , i18n} = useTranslation()
  const { classes } = props;
  const authUser = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  const [editData, setEditData] = useState();
  const [state, setState] = useState({
    askQuestion: false,
    isEdit: false,
  });
  
  useEffect(() =>  {
    dispatch( forumQuestionList({status: "open"}) ).then( (res) => {
      dispatch( forumQuestionList({status: "close"}) )
    })
  }, [dispatch])

  const openQuestionList = useSelector((store) => store.forum.openList);
  const closeQuestionList = useSelector((store) => store.forum.closeList);

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
      <Container maxWidth="xl" className={classes.container}>
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
                {t('questions')}
                </Typography>
                {
                   (authUser.user_type == 2) ? (
                    <Button
                      className={classes.blueButton}
                      onClick={toggleAskQuestion}
                    >
                      {t('Ask_a_Question')}
                    </Button>
                   ) : ('')
                }
              </Box>
            </Box>
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
              >
                {
                  ((openQuestionList !== undefined) && (openQuestionList.length > 0)) ? 
                    openQuestionList.map((value, index) => {
                      return (<QuestionCard type="open" toggleEditQuestion={toggleEditQuestion} key={index} data={value} authUser={authUser} />)
                    }) : t('no_question_found')
                }
              </Box>
              {/* </Carousel> */}
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
              >
                {
                  ((closeQuestionList !== undefined) && (closeQuestionList.length > 0)) ? 
                    closeQuestionList.map((value, index) => {
                      return (<QuestionCard type="closed" key={index} data={value} authUser={authUser} />)
                    }) : t('No questions found')
                }
              </Box>
              {/* </Carousel> */}
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(Forum);
