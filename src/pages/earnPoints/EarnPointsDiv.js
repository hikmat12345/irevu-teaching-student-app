import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { Fonts, BgColor, Color } from "../../theme/index";
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
    fontSize: "15px",
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
    fontSize: "13px",
    fontFamily: Fonts.Regular,
  },
  smallText: {
    color: BgColor.myBlack,
    fontSize: "16px",
    fontFamily: Fonts.Regular,
  },
  blueNumbersText: {
    color: Color.textBlue,
    fontSize: "25px",
    fontFamily: Fonts.Regular,
    transition: "all .3s ease",
  },
  icons: {
    padding: "10px",
    "&:hover": {
      opacity: ".7",
    },
  },
});

const MyCard = ({
  authUser
}) => {
  const classes = useStyles();
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
              {t('invite_teacher_student')}
            </Box>

            <Typography
              variant="body2"
              color={"primary"}
              component="p"
              className={classes.regularFont}
            >
              {t('referral_link_description')}
            </Typography>
            <Box pt={"10px"}>
              <Typography className={classes.LightText}>
                {t('fifty_points_for_student')}
              </Typography>
              <Typography className={classes.LightText}>
                {t('hundred_points_for_teacher')}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent style={{ padding: "16px" }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {
              (authUser.user_type == 1) ? (
              <Box pt={"10px"}>
                <Typography className={classes.LightText}>
                  {t('answering_a_question')}
                </Typography>
                <Typography className={classes.LightText}>
                  {t('gain_points')}
                </Typography>
              </Box>
              ) : (
                <Box pt={"10px"}>
                  <Typography className={classes.LightText}>
                    {t('answer_question_points')}
                  </Typography>
                  <Typography className={classes.LightText}>
                  	{t('ask_question_points')}
                  </Typography>
                </Box>
              )
            }
          </Box>
        </CardContent>
      </Card>

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
              {t('total_earned_points')}
            </Box>
            <Box pt={"10px"}>
              <Typography className={classes.LightText}>
                {authUser.points}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard({authUser}) {
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
          authUser={authUser}
        />
      </Grid>
    </>
  );
});
export default TeamCardDemo;
