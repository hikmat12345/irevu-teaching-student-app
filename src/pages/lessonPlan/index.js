import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash';
import FormCard from "./FormCard";
import NewLessonPlan from "./NewLessonPlan";
import PayCard from "./PayCard";
import ReceiptCard from "./ReceiptCard";
import Box from "@material-ui/core/Box";
import { Header } from "../../components";
import "react-multi-carousel/lib/styles.css";
import Button from "@material-ui/core/Button";
import LessonPlanCard from "./LessonPlanCard";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import LessonPlanCardView from "./LessonPlanCardView";
import { Fonts, BgColor, Color } from "../../theme/index";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';
import {
  InputAdornment,
} from "@material-ui/core";

import { getLessionPlanList, getOtherLessionPlanList, seacrhLessionPlan } from "../../redux/actions/lessionPlanActions"
import Const from '../../helpers/const'
import queryString from 'query-string';
const styles = (theme) => ({
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
  mainHeading: {
    fontSize: "20px",
    fontFamily: Fonts.Medium,
  },
  overlayWrapper: {
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    zIndex: "2000",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  TextFields: {
    width: "55%",
    margin: "8px",
  }
});

const LessonPlan = (props) => {

  const {t , i18n} = useTranslation()
  const authUser = useSelector((store) => store.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const { classes } = props;
  const [LessonPlanid, setLessonPlanid] = useState("")
  const [state, setState] = useState({
    openLessonPlan: false,
    addingNewLessonPlan: false,
    addingNewResource: false,
    payCard: false,
    receiptCard: false,
  })

  useEffect(() => {
    dispatch(getLessionPlanList())
    dispatch(getOtherLessionPlanList())

    const value=queryString.parse(window.location.search, { ignoreQueryPrefix: true });
    if(value.id){
        setLessonPlanid(value.id)
        // openLessonPlanFun(value.id,true)
    }
  }, [dispatch])

  const lessionPlanList = useSelector((store) => store.lessionPlan.list)
  const lessonPlansByOthers = useSelector((store) => store.lessionPlan.listByOthers)

  const [search, setSearch] = useState("")

  const [plan, setPlan] = useState(null)
  const [isOwnPlan, setIsOwnPlan] = useState(true)
  const [displaylimit, setdisplaylimit] = useState(12);
  const [my_limit, setmylimit] = useState(displaylimit);
  const [others_limit, setotherslimit] = useState(displaylimit);
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      dispatch(seacrhLessionPlan(search)).then((res) => {
      })
    }
  }

  const open = (toBeOpened) => {
    setState({
      [toBeOpened]: !state[toBeOpened],
    });
  }
  const closeAddingNewLessonPlan = () => {
    setState({
      addingNewLessonPlan: !state.addingNewLessonPlan,
    });
  };
  const closeAddingNewResource = () => {
    setState({
      addingNewResource: !state.addingNewResource,
    });
  };
  const openLessonPlan = () => {
    // setLessonPlanid('')
    // if(LessonPlanid){
    //   console.log('test')
    //   history.push("/lesson-plan");
    // }
    setState({
      openLessonPlan: !state.openLessonPlan,
    });
  };
  const openLessonPlanFun = (id, ownLessonPlan) => {
    var p = null;
    if ( ownLessonPlan ) {
      p = _.find(lessionPlanList, function(o) { return o.id == id; });
    } else {
      p = _.find(lessonPlansByOthers, function(o) { return o.id == id; });
    }
    setPlan(p)
    setIsOwnPlan(ownLessonPlan)
    // console.log("id", id)
    // console.log("p", p)
    // console.log("plan", plan)
    setState({
      openLessonPlan: !state.openLessonPlan,
    });
    setLessonPlanid("")
  }
  
  const openPayCard = () => {
    setState({
      payCard: !state.payCard,
      openLessonPlan: true
    });
  }

  const openReceiptCard = () => {
    setState({
      receiptCard: !state.receiptCard,
    });
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
  const images=[
    Const.BASE_URL+'public/images/lesson-plans/image1.jpg',
    Const.BASE_URL+'public/images/lesson-plans/image2.jpg',
    Const.BASE_URL+'public/images/lesson-plans/image3.jpg',
    Const.BASE_URL+'public/images/lesson-plans/image4.jpg',
    Const.BASE_URL+'public/images/lesson-plans/image5.jpg',
    Const.BASE_URL+'public/images/lesson-plans/image6.jpg',
    Const.BASE_URL+'public/images/lesson-plans/image7.jpg',
    Const.BASE_URL+'public/images/lesson-plans/image8.jpg',
    Const.BASE_URL+'public/images/lesson-plans/image9.jpg',
    Const.BASE_URL+'public/images/lesson-plans/image10.png',
  ];
  var imagecount=0;
  return (
    <>
      <Header history={history} />

      {state.payCard ? (
        <Container maxWidth="xl" className={classes.overlayWrapper}>
          <PayCard
            plan={plan}
            authUser={authUser}
            openPayCard={openPayCard}
            openReceiptCard={openReceiptCard}
          />
        </Container>
      ) : (
        ""
      )}
      {state.receiptCard ? (
        <Container maxWidth="xl" className={classes.overlayWrapper}>
          <ReceiptCard openReceiptCard={openReceiptCard} />
        </Container>
      ) : (
        ""
      )}

      {state.addingNewLessonPlan ? (
        <Container maxWidth="xl" className={classes.overlayWrapper}>
          <FormCard
            closeAddingNewLessonPlan={closeAddingNewLessonPlan}
          />
        </Container>
      ) : (
        ""
      )}
      {state.addingNewResource ? (
        <Container maxWidth="xl" className={classes.overlayWrapper}>
          <NewLessonPlan
            closeAddingNewResource={closeAddingNewResource}
          />
        </Container>
      ) : (
        ""
      )}

      <Container maxWidth="xl" className={classes.container+ ' lessonplan-main'}>
        {state.openLessonPlan ? (
          <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
            <LessonPlanCardView
              openPayCard={openPayCard}
              openLessonPlanFun={openLessonPlanFun}
              plan={plan}
              isOwnPlan={isOwnPlan}
            />
          </Box>
        ) : (
          <>
            <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography className={classes.mainHeading}>
                  {t('my_lesson_plans')}
                </Typography>
                <Button
                  className={classes.blueButton}
                  onClick={() =>
                    open(
                      "addingNewLessonPlan"
                    )
                  }
                >
                  {t('add_lesson_plans')}
                </Button>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                paddingTop={0}
                bgcolor="background.paper"
              >
                {
                  (Array.isArray(lessionPlanList)) ? lessionPlanList.slice(0,my_limit).map((value, index) => {
                    if(LessonPlanid==value.id){
                      openLessonPlanFun(value.id,true)
                    }
                    var image=""
                      if(imagecount>images.length-1)
                      {
                        imagecount=0
                      }
                      image=images[imagecount]
                      imagecount++
                    return (
                    <LessonPlanCard
                      key={index}
                      data={value}
                      ownLessonPlan={true}
                      openLessonPlan={state.openLessonPlan}
                      openLessonPlanFun={openLessonPlanFun}
                      image={image}
                    />
                    )
                  }) : ("No result found.")
                }
                
                {/* <LessonPlanCard
                  openLessonPlan={openLessonPlan}
                  openConfirmationOverlay={openConfirmationOverlay}
                  confirmationOverlay={state.confirmationOverlay}
                />
                <LessonPlanCard
                  openLessonPlan={openLessonPlan}
                  openConfirmationOverlay={openConfirmationOverlay}
                /> */}
              </Box>

            </Box>
            {Array.isArray(lessionPlanList) && lessionPlanList.length > my_limit ? 
                  (<Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
                  <Button className={classes.blueButton} onClick={()=>loadmore('my')}>
                      {t("load_more")}
                  </Button>
                </Box>) : ('')}
            <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
              <Typography className={classes.mainHeading}>
                {t('lesson_plans_by_others')}
              </Typography>
              <Box>
                <TextField
                  label={t('search_paper')}
                  variant="outlined"
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearch}
                  className={classes.TextFields}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                  }}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                paddingTop={0}
                bgcolor="background.paper"
              >
                {
                  (Array.isArray(lessonPlansByOthers)) ? lessonPlansByOthers.slice(0,others_limit).map((value, index) => {
                     if(LessonPlanid==value.id){
                      openLessonPlanFun(value.id,false)
                    }
                    var image=""
                      if(imagecount>3)
                      {
                        imagecount=0
                      }
                      image=images[imagecount]
                      imagecount++
                    return <LessonPlanCard 
                      key={index} 
                      data={value} 
                      ownLessonPlan={false}
                      openLessonPlan={state.openLessonPlan}
                      openLessonPlanFun={openLessonPlanFun} 
                      image={image}
                      />;
                  }) : ("No plans fount.")
                }
              </Box>
              {Array.isArray(lessonPlansByOthers) && lessonPlansByOthers.length > others_limit ? 
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

export default withStyles(styles, { withTheme: true })(LessonPlan);
