import React from "react";
import "fontsource-roboto";
import Box from "@material-ui/core/Box";
import { Header } from "../../components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "react-multi-carousel/lib/styles.css";
import "react-multi-carousel/lib/styles.css";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import ReferralLinkDiv from "./ReferralLinkDiv";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Fonts, BgColor, Color } from "../../theme/index";
import { fade, withStyles } from "@material-ui/core/styles";
// import "../contact/node_modules/react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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

class ReferralLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Header history={this.props.history} />
        <Container className={classes.container}>
          <Box bgcolor="background.paper" className={classes.center + ' referralink-main'}>
            <ReferralLinkDiv />
          </Box>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ReferralLink);
