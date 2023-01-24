import React from "react";
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

const teacher = true;

const useStyles = makeStyles(() => ({
  root: {
    marginRight: 13,
    marginTop: 13,
    height: "100%",
    transition: "0.3s",
    position: "relative",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#d4d4d4",
    "&:before": {
      transition: "0.2s",
      position: "absolute",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      backgroundColor: "#d9daf1",
      borderRadius: "1rem",
      zIndex: 0,
      bottom: 0,
    },
    "&:hover": {
      "&:before": {
        bottom: -6,
      },
      "& $card": {
        boxShadow: "-12px 12px 64px 0 #bcc3d6",
      },
    },
  },
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "1rem",
    boxShadow: "0 6px 20px 0 #dbdbe8",
    backgroundColor: "#fff",
    transition: "0.3s",
    height: "100%",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: "0.75rem",
  },
  avatar: {
    fontFamily: "Ubuntu",
    fontSize: "0.875rem",
    backgroundColor: "#6d7efc",
  },
  join: {
    color: "#fff",
    borderRadius: "50px",
    backgroundColor: "#a4c4f9",
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

const CustomCard = ({
  thumbnail,
  title,
  subtitle,
  description,
  joined = false,
}) => {
  const styles = useStyles();
  const btnStyles = useGraphicBtnStyles();
  return (
    <div className={styles.root}>
      <Column className={styles.card}>
        <Row p={2} gap={2}>
          <Avatar className={styles.logo} variant={"rounded"} src={thumbnail} />
          <Info position={"middle"} useStyles={useApexInfoStyles}>
            <InfoTitle>{title}</InfoTitle>
            <InfoSubtitle>{subtitle}</InfoSubtitle>
          </Info>
        </Row>
        <Box
          pb={1}
          px={2}
          color={"grey.600"}
          fontSize={"0.875rem"}
          fontFamily={"Ubuntu"}
        >
          {description}
        </Box>
        <Row p={2} gap={2} position={"bottom"}>
          <Item>
            <AvatarGroup max={4} classes={{ avatar: styles.avatar }}>
              {new Array(5).fill(0).map((_, index) => (
                <Avatar
                  key={index}
                  src={`https://i.pravatar.cc/300?img=${Math.floor(
                    Math.random() * 30
                  )}`}
                />
              ))}
            </AvatarGroup>
          </Item>
          <Item position={"middle-right"}>
            {teacher ? (
              <Button className={styles.join} variant={"contained"}>
                Open Class
              </Button>
            ) : (
              <>
                {joined ? (
                  <Button className={styles.danger} variant={"contained"}>
                    Leave Class
                  </Button>
                ) : (
                  <Button className={styles.join} variant={"contained"}>
                    Join Class
                  </Button>
                )}
              </>
            )}
          </Item>
        </Row>
      </Column>
    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard() {
  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Ubuntu", weights: [400, 700] }]} />
      </NoSsr>
      <Grid
        style={{ marginRight: 15, marginTop: 10 }}
        item
        xs={12}
        md={6}
        lg={4}
      >
        <CustomCard
          thumbnail={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQHCBAj8nRJkEwjWg5TpNuSZZG9iscsf43V1mfx0LZHNDYW3S_&usqp=CAU"
          }
          title={"Introduction to Information & Technology"}
          subtitle={
            !teacher ? "Created by You" : "Created by" + " Class's Teacher Name"
          }
          description={
            <>
              <b>Science and Medical</b> and 3 others are already members of
              this group.
            </>
          }
        />
      </Grid>
    </>
  );
});
export default TeamCardDemo;
