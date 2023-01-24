import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CardContent from "@material-ui/core/CardContent";
import { Fonts, BgColor, Color } from "../../theme/index";

import {InlineShareButtons} from 'sharethis-reactjs';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles({
  root: {
    padding: "10px",
    borderRadius: "10px",
    marginTop: "10px",
  },
  media: {
    height: 140,
  },
  info: {
    color: "#2B65EC",
    textTransform: "initial",
    fontFamily: Fonts.Regular,
  },
  LightText: {
    color: BgColor.myBlack,
    fontSize: "16px",
    fontFamily: Fonts.Medium,
    opacity: 1,
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
  smallestBlueTitle: {
    color: Color.textBlue,
    fontSize: "16px",
    fontFamily: Fonts.Regular,
  },
  smallText: {
    color: BgColor.myBlack,
    fontSize: "15px",
    fontFamily: Fonts.Regular,
  },
  blueNumbersText: {
    color: Color.textBlue,
    fontSize: "25px",
    fontFamily: Fonts.Regular,
    transition: "all .3s ease",
  },
  icons: {
    fontSize: "50px",
    cursor: "pointer",
    padding: "5px",
    "&:hover": {
      opacity: ".7",
    },
  },
  copyText: {
    padding: "10px",
    width: "100%"
  },
  copied : {
    padding: "5px",
    width: "100%",
    backgroundColor: "#dadada"
  }
});

const MyCard = ({
  title,
  description,
  pointsForStudents,
  pointsForTeachers,
}) => {
  const classes = useStyles();

  const authUser = useSelector((store) => store.auth.user);

  const [copySuccess, setCopySuccess] = useState('');

  const refLink = ()  => {
    return window.location.origin.toString()+"/register?invite="+authUser.referral_code
  }
  const copyToClipboard = () => {
    // navigator.clipboard.writeText(refLink());
    if (navigator.clipboard != undefined) {//Chrome
        navigator.clipboard.writeText(refLink()).then(function () {
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }
    else if(window.clipboardData) { // Internet Explorer
        window.clipboardData.setData("Text", refLink());
    }
    setCopySuccess('Copied!');
  };
const {t , i18n} = useTranslation()
  return (
    <div>
      <Card className={classes.root}>
        <CardContent style={{ padding: "16px" }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              fontFamily={Fonts.Regular}
              fontSize={"22px"}
              textAlign="center"
              pb={"10px"}
              color={Color.textBlue}
            >
              {title}
            </Box>

            <Typography
              variant="body2"
              color={"primary"}
              component="p"
              className={classes.regularFont}
              style={{ textAlign: "center" }}
            >
              {description}
            </Typography>
            <Box pt={"10px"}>
              <Typography className={classes.LightText}>
                {pointsForStudents}
              </Typography>
              <Typography className={classes.LightText}>
                {pointsForTeachers}
              </Typography>
            </Box>
            <Box
              display="flex"
              // flexDirection="column"
              justifyContent="flex-end"
              // alignItems="center"
            >
              {/* {teacher ? (
                  ""
                ) : (
                  <Button className={classes.blueButton}>Purchase</Button>
                )} */}
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent style={{ padding: "16px" }}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box className={ classes.copyText}>
              <Box className={classes.smallestBlueTitle}>{t('your_referral_link')}</Box>
              <Box className={ (copySuccess) ? classes.copied +" "+ classes.smallText : classes.smallText}>{ refLink() }</Box>
            </Box>
            <Box color={Color.textBlue} width="40%" display="flex" justifyContent="flex-end" alignItems="center" className="referrral_wechat_icon">
              {/* <a href={"whatsapp://send?text="+refLink()} data-action="share/whatsapp/share">
                <ShareIcon className={classes.icons} />
              </a> */}
              <InlineShareButtons
                config={{
                  alignment: 'center',  // alignment of buttons (left, center, right)
                  color: 'social',      // set the color of buttons (social, white)
                  enabled: true,        // show/hide buttons (true, false)
                  font_size: 16,        // font size for the buttons
                  labels: 'null',        // button labels (cta, counts, null)
                  language: 'en',       // which language to use (see LANGUAGES)
                  networks: [           // which networks to include (see SHARING NETWORKS)
                    'wechat',
                    'linkedin',
                  ],
                  padding: 6,          // padding within buttons (INTEGER)
                  radius: 4,            // the corner radius on each button (INTEGER)
                  show_total: false,
                  size: 20,             // the size of each button (INTEGER)

                  // OPTIONAL PARAMETERS
                  url: refLink(), // (defaults to current url)
                  // image: '',  // (defaults to og:image or twitter:image)
                  // description: '',       // (defaults to og:description or twitter:description)
                  // title: '',            // (defaults to og:title or twitter:title)
                  // message: '',     // (only for email sharing)
                  // subject: '',  // (only for email sharing)
                  // username: '' // (only for twitter sharing)
                }}
              />
              <FileCopyIcon className={classes.icons} onClick={() => copyToClipboard() } />
              {copySuccess}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card className={classes.root}>
        <CardContent style={{ padding: "16px" }}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box marginLeft="200px">
              <Box>{t('referrals')}</Box>
              <Box>{authUser.referral_used}</Box>
            </Box>
            <Box marginRight="200px">
              <Box>{t('points_from_referrals')}</Box>
              <Box>{authUser.points}</Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard() {
  const {t , i18n} = useTranslation()
  return (
    <>
      <Grid
        style={{ marginRight: 0, marginTop: 15 }}
        // item
        // xs={12}
        // md={8}
        // lg={5}
      >
        <MyCard
          pointsForStudents={t('points_for_a_students')}
          pointsForTeachers={t("points_for_a_teacher")}
          title={t("invite_teacher_student")}
          description={t("referral_link_description")}
        />
      </Grid>
    </>
  );
});
export default TeamCardDemo;
