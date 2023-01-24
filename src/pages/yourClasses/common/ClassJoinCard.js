import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GoogleFontLoader from "react-google-font-loader";
import NoSsr from "@material-ui/core/NoSsr";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useApexInfoStyles } from "@mui-treasury/styles/info/apex";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import { BgColor, Color, Fonts } from "./../../../theme/index";
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles(() => ({
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

const CustomCard = ({ data, openClass, authUser }) => {
  const styles = useStyles();
  const btnStyles = useGraphicBtnStyles();
const { t, i18n } = useTranslation();
  const joined = true;
  return (
    <div className={styles.root}>
      <div className={styles.card}>
      {/* <Column className={styles.card}> */}
        <Row p={2} gap={2}>
          {/* <Avatar className={styles.logo} variant={"rounded"} src={thumbnail} /> */}
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

            {/* <InfoSubtitle>{subtitle}</InfoSubtitle> */}
          </Info>
        </Row>
        <Box
          pb={1}
          px={2}
          color={"grey.600"}
          fontSize={"0.875rem"}
          fontFamily={"Ubuntu"}
        >
          {/* {description} */}
        </Box>
        <Row p={2} gap={2} position={"bottom"}>
          <Item>
            {/* <AvatarGroup max={4} classes={{ avatar: styles.avatar }}>
              {new Array(5).fill(0).map((_, index) => (
                <Avatar
                  key={index}
                  src={`https://i.pravatar.cc/300?img=${Math.floor(
                    Math.random() * 30
                  )}`}
                />
              ))}
            </AvatarGroup> */}
            {
              (data.studentCount) ? <> {data.studentCount}+ </> : 0
            } Students
          </Item>
          <Item position={"middle-right"}>
            <Button
              className={styles.join}
              variant={"contained"}
              onClick={ () => openClass(data.id, data.class_id) }
            >
              {t('open_class')}
            </Button>
            {/* {
              (authUser.user_type == 1) ? (
                <Button
                  className={styles.join}
                  variant={"contained"}
                  onClick={ () => openClass(data.id, data.class_id) }
                >
                  Open Class
                </Button>
              ) : (
              <>
                {
                  joined ? (
                    <Button className={styles.danger} variant={"contained"}>
                      Leave Class
                    </Button>
                  ) : (
                    <Button className={styles.join} variant={"contained"}>
                      Join Class
                    </Button>
                  )
                }
              </>
            )} */}
          </Item>
        </Row>
      {/* </Column> */}
      </div>
    </div>
  );
};

const TeamCardDemo = ({ data, key, openClass, authUser }) => {

  return (
    <>
      <NoSsr>
        <GoogleFontLoader
          fonts={[
            {
              font: "Ubuntu",
              weights: [400, 700],
            },
          ]}
        />
      </NoSsr>
        {
           (data) ? (<CustomCard
            data={ data }
            authUser={authUser}
            openClass={openClass}
          />) : ("")
        }
    </>
  );
};

// export default TeamCardDemo;

export default React.memo(TeamCardDemo);
