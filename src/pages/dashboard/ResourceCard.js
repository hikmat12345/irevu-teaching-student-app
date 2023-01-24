import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import NoSsr from "@material-ui/core/NoSsr";
import Avatar from "@material-ui/core/Avatar";
import { Fonts, Color } from "../../theme/index";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import GoogleFontLoader from "react-google-font-loader";
import { Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useNewsInfoStyles } from "@mui-treasury/styles/info/news";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import {userDefaultImage} from "./../../assets";
import { useTranslation } from 'react-i18next'; 

const useStyles = makeStyles(() => ({
  card: {
    marginRight: 13,
    marginTop: 20,
    position: "relative",
    boxShadow: "0 8px 24px 0 rgba(0,0,0,0.12)",
    overflow: "visible",
    borderRadius: "1.5rem",
    transition: "0.3s",
    "& $shadow": {
      display: "none",
    },
    "& $shadow2": {
      display: "none",
    },
    "&:hover": {
      transform: "translateY(-4px)",
    },
    // "&:hover": {
    //   transform: "translateY(-2px)",
    //   "& $shadow": {
    //     bottom: "-1.5rem",
    //   },
    //   "& $shadow2": {
    //     bottom: "-2.5rem",
    //   },
    // },
    "&:before": {
      content: '""',
      position: "absolute",
      zIndex: 0,
      display: "block",
      width: "100%",
      bottom: -1,
      height: "100%",
      borderRadius: "1.5rem",
      backgroundColor: "rgba(0,0,0,0.08)",
    },
  },
  main: {
    overflow: "hidden",
    borderTopLeftRadius: "1.5rem",
    borderTopRightRadius: "1.5rem",
    zIndex: 1,
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      display: "block",
      width: "100%",
      height: "100%",
      background: "linear-gradient(to top, #014a7d, rgba(0,0,0,0))",
    },
  },
  content: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 1,
    padding: "1.5rem 1.5rem 1rem",
  },
  avatar: {
    width: 48,
    height: 48,
  },
  tag: {
    display: "inline-block",
    fontFamily: Fonts.Medium,
    backgroundColor: "#ff5dac",
    borderRadius: "0.5rem",
    padding: "2px 0.8rem",
    color: "#fff",
    marginBottom: "0.5rem",
  },
  title: {
    fontFamily: Fonts.Medium,
    fontSize: "2rem",
    fontWeight: 500,
    color: "#fff",
  },
  author: {
    zIndex: 1,
    position: "relative",
    borderBottomLeftRadius: "1.5rem",
    borderBottomRightRadius: "1.5rem",
  },
  shadow: {
    transition: "0.2s",
    position: "absolute",
    zIndex: 0,
    width: "88%",
    height: "100%",
    bottom: 0,
    borderRadius: "1.5rem",
    backgroundColor: "rgba(0,0,0,0.06)",
    left: "50%",
    transform: "translateX(-50%)",
  },
  shadow2: {
    bottom: 0,
    width: "72%",
    backgroundColor: "rgba(0,0,0,0.04)",
  },
}));

const News3CardDemo = ({ actionPage, data ,image}) => {
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const {t , i18n} = useTranslation()
  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Sen", weights: [400, 800] }]} />
      </NoSsr>
      <Card className={styles.card}>
        <Box className={styles.main} minHeight={200} position={"relative"}>
          <CardMedia
            classes={mediaStyles}
            image={
              image
            }
          />

          <div className={styles.content}>
            {/* <Button variant="outlined" color="primary">
            Read More
           </Button> */}
            <div className={styles.tag}>{data.subject}</div>
            <Typography variant={"h2"} className={styles.title}>
              {data.title}
            </Typography>
            <br />
            <Button
              variant="contained"
              color="secondary"
              style={{ fontFamily: Fonts.Medium }}
              onClick={ () =>actionPage(data.id) }
            >
              {t('Read More')}
            </Button>
          </div>
        </Box>
        <Row
          className={styles.author}
          m={0}
          p={3}
          pt={2}
          gap={2}
          bgcolor={"common.white"}
        >
          <Item>
            <Avatar
              className={styles.avatar}
              src={
                (data.profile_image) ? (data.profile_image) : (userDefaultImage)
              }
            />
          </Item>
          <Info position={"middle"} useStyles={useNewsInfoStyles}>
            <InfoTitle style={{ fontFamily: Fonts.Regular }}>
              {data.name}
            </InfoTitle>
            <InfoSubtitle
              style={{ fontSize: "12px", fontFamily: Fonts.Regular }}
            >
              Author Published {data.published}
            </InfoSubtitle>
          </Info>
        </Row>
        <div className={styles.shadow} />
        <div className={`${styles.shadow} ${styles.shadow2}`} />
      </Card>
    </>
  );
}

export default (News3CardDemo);
// export default withStyles(useStyles, { withTheme: true })(News3CardDemo);
