import React from "react";
import Box from "@material-ui/core/Box";
import { Header } from "../../components";
import WalletComponents from "./WalletComponents";
import Topup from "./Topup";
import Button from "@material-ui/core/Button";
// import OpenedHomeWork from "./OpenedHomeWork";
// import UnCheckedGradedHomeWork from "./UnCheckedGradedHomeWork";
// import OpenedClassPage from "./OpenedClassPage";
import CloseIcon from "@material-ui/icons/Close";
import Container from "@material-ui/core/Container";
// import CreateHomeWorkPage from "./CreateHomeWorkPage";
import Typography from "@material-ui/core/Typography";
import { Fonts, BgColor, Color } from "../../theme/index";
import { fade, withStyles } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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
  mainHeading: {
    fontSize: "20px",
    fontFamily: Fonts.Medium,
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
});

class YourClasses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topup: false,
    };
  }

  openTopup = () => {
    this.setState({ topup: !this.state.topup });
  };

  render() {
    const { classes } = this.props;
    const state = this.state;
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };
    return (
      <>
        <Header history={this.props.history} />
        <Container maxWidth="xl" className={classes.container}>
          <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography className={classes.mainHeading}>
                {state.topup ? "Topup" : "Wallet"}
              </Typography>
              {state.topup ? (
                <CloseIcon
                  style={{ color: Color.textBlue, cursor: "pointer" }}
                  onClick={this.openTopup}
                />
              ) : (
                <Box>
                  <Button
                    className={classes.blueButton}
                    style={{ marginRight: "10px" }}
                  >
                    Withdraw
                  </Button>
                  <Button
                    className={classes.blueButton}
                    onClick={this.openTopup}
                  >
                    TopUp
                  </Button>
                </Box>
              )}
            </Box>

            {!state.topup ? (
              <WalletComponents openTopup={this.openTopup} />
            ) : (
              <Topup />
            )}
          </Box>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(YourClasses);
