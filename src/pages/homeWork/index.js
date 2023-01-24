import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash';
import { makeStyles } from "@material-ui/core/styles";
import "fontsource-roboto";
import { fade, withStyles } from "@material-ui/core/styles";
import { Header } from "../../components";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import ClassJoinCard from "./ClassJoinCard";
import HomeWorkCard from "./HomeWorkCard";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { useApexInfoStyles } from "@mui-treasury/styles/info/apex";
import Button from "@material-ui/core/Button";
import { Fonts, BgColor, Color } from "../../theme/index";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";

import { getStudentClassList } from "./../../redux/actions/studentActions";
import { getClassesList } from "./../../redux/actions/classesActions";
import { getClassHomeworks } from "./../../redux/actions/classesActions";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  container: {
    alignSelf: "flex-end",
    paddingLeft: 250,
    paddingTop: 70,
    paddingBottom: 20,
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
  },
}));

const cardStyles = makeStyles(() => ({
  root: {
    marginRight: 13,
    marginTop: 13,
    height: "100%",
    transition: "0.3s",
    position: "relative",
    // "&:before": {
    //   transition: "0.2s",
    //   position: "absolute",
    //   width: "100%",
    //   height: "100%",
    //   content: '""',
    //   display: "block",
    //   backgroundColor: "#d9daf1",
    //   borderRadius: "1rem",
    //   zIndex: 0,
    //   bottom: 0,
    // },
    "&:hover": {
      // "&:before": {
      //   bottom: -6,
      // },
      // "& $card": {
      //   boxShadow: "-12px 12px 64px 0 #bcc3d6",
      // },
    },
  },
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "10px",
    // boxShadow: "0 6px 20px 0 #dbdbe8",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    backgroundColor: "#fff",
    transition: "0.3s",
    height: "100%",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#d4d4d4",

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
}));

const ClassCard = ({data, openClass}) => {
  const {t , i18n} = useTranslation()
  const styles = cardStyles();
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <Row p={2} gap={2}>
          <Info position={"middle"} useStyles={useApexInfoStyles} p={0}>
            <Box
              fontSize={"18px"}
              letterSpacing={"0px"}
              lineHeight={"20px"}
              fontWeight={"bold"}
              minHeight={"50px"}
              fontFamily={Fonts.Medium}
              color={Color.textMyBlack}
            >
              {data.name} ({data.class_id})
            </Box>
          </Info>
        </Row>
        <Box
          pb={1}
          px={2}
          color={"grey.600"}
          fontSize={"0.875rem"}
          fontFamily={"Ubuntu"}
        >
        </Box>
        <Row p={2} gap={2} position={"bottom"}>
          <Item position={"middle-right"}>
            <Button
              className={styles.join}
              variant={"contained"}
              onClick={ () => openClass(data.id, data.class_id) }
            >
              {t('open_class')}
            </Button>
          </Item>
        </Row>
      </div>
    </div>
  )
}

const HomeWork = (props) => {
  const {t , i18n} = useTranslation()
  const authUser = useSelector((store) => store.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const classList = useSelector((store) => store.classes.list);
  const studentClassList = useSelector((store) => store.students.classList);
  const closedHomeWorkList = useSelector((store) => store.classes.homeworkList.closedHomework);
  const currentHomeWorkList = useSelector((store) => store.classes.homeworkList.currentHomework);

  const [isOpenClass, setIsOpenClass] = useState(false)
  const [classPId, setClassPId] = useState(null)
  const [classUId, setClassUId] = useState(null)

  useEffect(() => {
    dispatch(getClassesList());
    dispatch(getStudentClassList());
  }, [dispatch]);

  const openClass = (id, classId) => {
    setClassPId(id)
    setClassUId(classId)
    setIsOpenClass( (isOpenClass) => !isOpenClass )

    dispatch(getClassHomeworks(classId));
  }

  return (
    <>
      <Header history={history} />
      <Container maxWidth="xl" className={classes.container +' homework-main'}>
        <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
          <Typography className={classes.mainHeading}>{t('homework')}</Typography>
          {
            (isOpenClass) ? (
              <Box
                display="flex"
                // flexDirection="column"
                justifyContent="space-between"
                // alignItems="center"
              >
                <Box></Box>
                <CloseIcon
                  style={{ color: "primary", cursor: "pointer" }}
                  onClick={() => setIsOpenClass(false)}
                />
              </Box>
            ) : ('')
          }
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            paddingTop={0}
            bgcolor="background.paper"

          >
            {
              (isOpenClass) ? (
                <>
                  {
                    Array.isArray(currentHomeWorkList) ? currentHomeWorkList.map((value, i) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={4}
                          key={i}
                        >
                          <HomeWorkCard classPId={classPId} classUId={classUId} data={value} />
                        </Grid>
                      )
                    }) : ('')
                  }
                  {
                    Array.isArray(closedHomeWorkList) ? closedHomeWorkList.map((value, i) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={4}
                          key={i}
                        >
                          <HomeWorkCard classPId={classPId} classUId={classUId} data={value} />
                        </Grid>
                      )
                    }) : ('')
                  }
                </>
              ) : (
                <>
                  {
                    (authUser.user_type == 1) ? (
                      <>
                        {
                          Array.isArray(classList) ? classList.map((value, i) => {
                            return (
                              <Grid
                                style={{
                                  marginRight: 0,
                                  marginTop: 15,
                                }}
                                item
                                xs={12}
                                md={6}
                                lg={3}
                                key={i}
                              >
                                <ClassCard data={value} openClass={openClass}/>
                              </Grid>
                            )
                          }) : ('')
                        }
                      </>
                    ) : (
                      <>
                        {
                          Array.isArray(studentClassList) ? studentClassList.map((value, i) => {
                            return (
                              <Grid
                                style={{
                                  marginRight: 0,
                                  marginTop: 15,
                                }}
                                item
                                xs={12}
                                md={6}
                                lg={3}
                                key={i}
                              >
                                <ClassCard data={value} openClass={openClass}/>
                              </Grid>
                            )
                          }) : ('')
                        }
                      </>
                    )
                  }
                </>
              )
            }
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default (HomeWork);

// export default withStyles(useStyles, { withTheme: true })(HomeWork);
