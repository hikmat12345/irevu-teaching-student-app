import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "fontsource-roboto";
import { fade, withStyles } from "@material-ui/core/styles";
import { Header } from "../../components";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import "react-multi-carousel/lib/styles.css";
import "react-multi-carousel/lib/styles.css";
import EarnPointsDiv from "./EarnPointsDiv";

import "react-multi-carousel/lib/styles.css";
import { Fonts, BgColor, Color } from "../../theme/index";

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
  },
  center : {
    display:"inline-block",
    position:"relative"
  },
});

const EarnPoints = (props) => {
  const { classes } = props;
  const history = useHistory();
  const authUser = useSelector((store) => store.auth.user);

  return (
    <>
      <Header history={history} />
      <Container maxWidth="xl" className={classes.container + ' earnpoint-main'}>
        <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper" className={classes.center}>
          <EarnPointsDiv authUser={authUser} />
        </Box>
      </Container>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(EarnPoints);
