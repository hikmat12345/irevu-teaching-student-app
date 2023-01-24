import React, {useState} from "react";
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
import DocViewer, {DocViewerRenderers} from "react-doc-viewer";
import {Document, Page} from "react-pdf";
import {useSelector, useDispatch} from "react-redux";
import Const from "../../helpers/const";
import openSocket from "socket.io-client";
import {useTranslation} from "react-i18next";
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
  data,
  openPayCard,
  openLessonPlan,
  openLessonPlanFun,
  isOwnPlan,
  authUser,
  is_descriptionpaid,
}) => {
  const classes = useStyles();

  // const [openPayCard, SetOpenPayCard] = useState(false);

  // const docs = [
  //   {
  //     uri: "localhost/irevu/irevu-apis/public/files/ask1622576501/1622576853.Points%20Structure.docx",
  //     fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //   },

  //   // { uri: require("./example-files/pdf.pdf") }, // Local File
  // ];
  const sendnotification = e => {
    let lessonData = {
      id: data.created_by,
      for: "student",
      message: authUser.username + " Your Resource downloaded successfully",
      receiverMsg: "Sample resource file downloaded",
    };
    socket.emit("send_notification", lessonData);
    return false;
  };
  const {t, i18n} = useTranslation();
  const maindescription = data.description;
  const splitNChars = (txt, num) => {
    var result = [];
    for (var i = 0; i < txt.length; i += num) {
      result.push(txt.substr(i, num));
    }
    return result;
  };
  var splitdescription = splitNChars(
    data.description,
    Math.round(data.description.length / 2)
  );
  var splitdescription1 = splitdescription[0];
  var splitdescription2 = splitdescription[1];
  return (
    <div>
      {/* <DocViewer 
        pluginRenderers={[DocViewerRenderers]}
        documents={docs}
      /> */}

      {/* <iframe src="https://view.officeapps.live.com/op/embed.aspx?src=http://api.irevu.org/public/images/1621263729.2Completion of IREVU (1) (1).docx"></iframe> */}

      <Box
        display="flex"
        // flexDirection="column"
        justifyContent="space-between"
        // alignItems="center"
      >
        <Box></Box>
        <CloseIcon
          style={{color: Color.textBlue, cursor: "pointer"}}
          onClick={openLessonPlanFun}
        />
      </Box>
      <Grid
        style={{marginRight: 0, marginTop: 15}}
        item
        // xs={12}
        // md={8}
        // lg={5}
      >
        <Card className={classes.root} style={{marginBottom: "10px"}}>
          <CardContent style={{padding: "16px"}}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" justifyContent="space-between">
                <img
                  src={data.profileImage ? data.profileImage : profileImg1}
                  className={classes.profileImg}
                />
                <Box>
                  <Box className={classes.smallText}>{data.userName}</Box>
                  <Typography className={classes.smallLightText}>
                    {data.level}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" textAlign="end">
                <Typography className={classes.smallerTitle}>Price</Typography>
                <Box className={classes.priceInBlue}>RMB {data.price}</Box>
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
                      {data.level}
                    </Typography>

                    <Box fontFamily={Fonts.Regular} fontSize={"22px"}>
                      {data.title}
                    </Box>
                  </Box>
                  {/* <DeleteIcon /> */}
                </Box>
              </Box>
              <br />

              <Typography
                variant="body2"
                style={{
                  filter:
                    authUser.id == data.created_by ? "blur(0px)" : "blur(0px)",
                }}
                color={"primary"}
                component="p"
                className={classes.regularFont}
                dangerouslySetInnerHTML={{
                  __html:
                    authUser.id == data.created_by || is_descriptionpaid
                      ? data.description
                      : splitdescription1,
                }}
              ></Typography>
              {authUser.id != data.created_by && !is_descriptionpaid ? (
                <Typography
                  variant="body2"
                  style={{
                    filter: "blur(3px)",
                  }}
                  color={"primary"}
                  component="p"
                  className={classes.regularFont}
                  dangerouslySetInnerHTML={{__html: splitdescription2}}
                ></Typography>
              ) : (
                <></>
              )}
              <br />
              <Typography
                variant="body2"
                style={{
                  filter: "blur(0px)",
                  fontSize: "22px",
                }}
                color={"primary"}
                component="p"
                className={classes.regularFont}
              >
                {t("grade")} : {data.grade}
              </Typography>
              <br />
              <div>
                {/*data.paper != null &&

              authUser.id != data.created_by ? 
              <a href={(authUser.id == data.created_by ? data.paper : '#' )} target="_blank" download className='btn disabled'>Download PDF</a> 
                :
                <a href={(authUser.id == data.created_by ? data.paper : '#' )} target="_blank" download className='btn'>Download PDF</a> 

             */}

                {data.is_page_description == 1 ? (
                  ""
                ) : data.paper != null && authUser.id != data.created_by ? (
                  <>
                    <a
                      href={
                        Const.BASE_URL +
                        "resource/sampledownload?filename=" +
                        data.paper +
                        "&page_limit_no=" +
                        data.page_limit_no +
                        "&pdftype=sample&type=resource&module_id=" +
                        data.id +
                        "&to=" +
                        data.created_by +
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
                  </>
                ) : (
                  <a
                    href={
                      authUser.id == data.created_by
                        ? Const.BASE_URL +
                          "resource/sampledownload?filename=" +
                          data.paper +
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

              {authUser.id != data.created_by ? (
                data.isPurchase > 0 ? (
                  <Box
                      display="flex"
                      // flexDirection="column"
                      justifyContent="flex-end"
                      // alignItems="center"
                    ><a href={data.paper} target="_blank" download className="btn">
                    View PDF
                  </a></Box>
                ) : (
                  <>
                    <Box
                      display="flex"
                      // flexDirection="column"
                      justifyContent="flex-end"
                      // alignItems="center"
                      onClick={() => openPayCard()}
                    >
                      <Button className={classes.blueButton}>Purchase</Button>
                    </Box>
                    <Typography
                      variant="body2"
                      style={{
                        filter: "blur(0px)",
                        color: "red",
                      }}
                      component="p"
                      className={classes.regularFont}
                      dangerouslySetInnerHTML={{
                        __html: t("payment_pop_up_warning"),
                      }}
                    ></Typography>
                  </>
                )
              ) : (
                ""
              )}
            </Box>
          </CardContent>
        </Card>
        {/* <Button
          className={classes.blueButton}
          style={{ marginTop: "20px", width: "100%" }}
          onClick={() => openPayCard()}
        >
          Purchase the Complete Paper
        </Button> */}
      </Grid>
    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  const authUser = useSelector(state => state?.auth?.user);
  return (
    <MyCard
      data={props.data}
      openPayCard={props.openPayCard}
      openLessonPlan={props.openLessonPlan}
      openLessonPlanFun={props.openLessonPlanFun}
      isOwnPlan={props.isOwnPlan}
      authUser={authUser}
      is_descriptionpaid={props.is_descriptionpaid}
    />
  );
});
export default TeamCardDemo;
