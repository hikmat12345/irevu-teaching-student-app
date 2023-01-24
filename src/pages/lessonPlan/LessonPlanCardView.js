import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import {profileImg1} from "../../assets/index";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {Fonts, BgColor, Color} from "../../theme/index";

import {getQRcode} from "../../redux/actions/paymentActions";
import {wechatAuth} from "../../redux/actions/authActions";
import {useTranslation} from "react-i18next";
import Const from "../../helpers/const";
import openSocket from "socket.io-client";
import {SOCKET_URL} from "./../../config/weChatConfig";

const socket = openSocket(SOCKET_URL);
const useStyles = makeStyles({
  root: {
    padding: "10px",
    marginTop: "10px",
    borderRadius: "10px",
    width: "60%",
    marginLeft: "22%",
    // marginRight: "15px",
  },
  media: {
    height: 140,
  },
  info: {
    color: "#2B65EC",
    textTransform: "initial",
    fontFamily: Fonts.Regular,
  },
  smallText: {
    // color: BgColor.myBlack,
    // fontSize: "14px",
    // fontFamily: Fonts.Regular,
    // opacity: 0.2,
    color: BgColor.myBlack,
    fontSize: "13px",
    fontFamily: Fonts.Regular,
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
  smallLightText: {
    color: BgColor.myBlack,
    fontSize: "14px",
    fontFamily: Fonts.Regular,
    opacity: 0.2,
  },
  regularFont: {
    fontFamily: Fonts.Regular,
  },

  profileImg: {
    width: "40px",
    height: "40px",
    borderRadius: "50px",
    marginRight: "7px",
  },
  smallLightText: {
    color: BgColor.myBlack,
    fontSize: "14px",
    fontFamily: Fonts.Regular,
    opacity: 0.2,
  },
  // profileImg: {
  //   width: "50px",
  //   height: "50px",
  //   borderRadius: "50px",
  // },
  smallText: {
    color: BgColor.myBlack,
    fontSize: "16px",
    fontFamily: Fonts.Regular,
  },
  smallerTitle: {
    fontSize: "12px",
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
    // opacity: ".6",
    padding: "5px 0 0 0",
    margin: "0",
  },
  priceInBlue: {
    color: Color.textBlue,
    fontSize: "22px",
    fontFamily: Fonts.Medium,
  },
});

const MyCard = ({
  plan,
  openPayCard,
  openLessonPlanFun,
  isOwnPlan,
  authUser,
}) => {
  const classes = useStyles();
  const {t, i18n} = useTranslation();

  console.log("plan ===> ", plan);
  const sendnotification = e => {
    let lessonData = {
      id: plan.created_by,
      for: "teacher",
      message: authUser.username + " Your Lesson Plan downloaded successfully",
      receiverMsg: "Sample Lesson Plan file downloaded",
    };
    socket.emit("send_notification", lessonData);
    return false;
  };

  const splitNChars = (txt, num) => {
    var result = [];
    for (var i = 0; i < txt.length; i += num) {
      result.push(txt.substr(i, num));
    }
    return result;
  };
  var splitdescription = splitNChars(
    plan.description,
    Math.round(plan.description.length / 2)
  );
  var splitdescription1 = splitdescription[0];
  var splitdescription2 = splitdescription[1];
  return (
    <div>
      <Box
        display="flex"
        // flexDirection="column"
        justifyContent="space-between"
        // alignItems="center"
      >
        <Box></Box>
        <CloseIcon
          style={{color: Color.textBlue, cursor: "pointer"}}
          onClick={() => openLessonPlanFun()}
        />
      </Box>
      <Grid style={{marginRight: 0, marginTop: 15}} item>
        <Card className={classes.root} style={{marginBottom: "10px"}}>
          <CardContent style={{padding: "16px"}}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" justifyContent="space-between">
                <img
                  src={plan.profileImage ? plan.profileImage : profileImg1}
                  className={classes.profileImg}
                />
                <Box>
                  <Box className={classes.smallText}>{plan.userName}</Box>
                  <Typography className={classes.smallLightText}>
                    {plan.level}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" textAlign="end">
                <Typography className={classes.smallerTitle}>
                  {t("price")}
                </Typography>
                <Box className={classes.priceInBlue}>RMB {plan.price}</Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent style={{padding: "16px"}}>
            <Box
              // display="flex"
              flexDirection="column"
              // justifyContent="center"
              // alignItems="center"
            >
              <Box variant="button" display="block">
                <Box
                // display="flex"
                // justifyContent="space-between"
                >
                  <Box>
                    <Typography className={classes.smallLightText}>
                      {plan.level}
                    </Typography>
                    <Box fontFamily={Fonts.Regular} fontSize={"22px"}>
                      {plan.title}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Typography
                variant="body2"
                color="primary"
                style={{
                  filter:
                    authUser.id == plan.created_by ? "blur(0px)" : "blur(0px)",
                }}
                component="p"
                className={classes.regularFont}
                dangerouslySetInnerHTML={{
                  __html:
                    authUser.id == plan.created_by
                      ? plan.description
                      : splitdescription1,
                }}
              ></Typography>
              {authUser.id != plan.created_by ? (
                <Typography
                  variant="body2"
                  color="primary"
                  style={{
                    filter: "blur(3px)",
                  }}
                  component="p"
                  className={classes.regularFont}
                  dangerouslySetInnerHTML={{__html: splitdescription2}}
                ></Typography>
              ) : (
                <></>
              )}
              <br />
              <div>
                {/*plan.plan != null &&

              authUser.id != plan.created_by ? 
              <a href={(authUser.id == plan.created_by ? plan.plan : '#' )} target="_blank" download className='btn disabled'>{t('download_pdf')}</a> 
                :
                <a href={(authUser.id == plan.created_by ? plan.plan : '#' )} target="_blank" download className='btn'>{t('download_pdf')}</a> 
              */}
                {plan.plan != null && authUser.id != plan.created_by ? (
                  <a
                    href={
                      Const.BASE_URL +
                      "resource/sampledownload?filename=" +
                      plan.plan +
                      "&page_limit_no=" +
                      plan.page_limit_no +
                      "&pdftype=sample&type=lessonplan&module_id=" +
                      plan.id +
                      "&to=" +
                      plan.created_by +
                      "&from=" +
                      authUser.id
                    }
                    target="_blank"
                    download
                    className="btn"
                    onClick={sendnotification}
                  >
                    Sample PDF
                  </a>
                ) : (
                  <a
                    href={
                      authUser.id == plan.created_by
                        ? Const.BASE_URL +
                          "resource/sampledownload?filename=" +
                          plan.plan +
                          "&page_limit_no=-1"
                        : "#"
                    }
                    target="_blank"
                    download
                    className="btn"
                  >
                    View PDF
                  </a>
                )}
              </div>
            </Box>
          </CardContent>
        </Card>
        {authUser.id != plan.created_by ? (
          plan.isPurchase > 0 ? (
            <Box
              display="flex"
              // flexDirection="column"
              justifyContent="flex-end"
              // alignItems="center"
            >
              <a href={plan.plan} target="_blank" download className="btn">
                View PDF
              </a>
            </Box>
          ) : (
            <>
              <Button
                className={classes.blueButton}
                style={{marginTop: "20px", width: "60%", marginLeft: "4%"}}
                onClick={() => openPayCard()}
                // onClick={() => openId()}s
              >
                {t("purchase_the_complete_paper")}
              </Button>
              <Typography
                variant="body2"
                style={{
                  filter: "blur(0px)",
                  color: "red",
                }}
                component="p"
                className={classes.regularFont}
                dangerouslySetInnerHTML={{__html: t("payment_pop_up_warning")}}
              ></Typography>
            </>
          )
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  const authUser = useSelector(state => state?.auth?.user);
  return (
    <MyCard
      plan={props.plan}
      openPayCard={props.openPayCard}
      openLessonPlanFun={props.openLessonPlanFun}
      isOwnPlan={props.isOwnPlan}
      authUser={authUser}
    />
  );
});
export default TeamCardDemo;
