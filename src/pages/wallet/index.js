import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import { Header } from "../../components";
import WalletComponents from "./WalletComponents";
import Topup from "./Topup";
import Withdrawal from "./Withdrawal";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Fonts, BgColor, Color } from "../../theme/index";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from 'react-i18next';
const styles = makeStyles(() => ({
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
  center : {
    display:"inline-block",
    position:"relative"
  }
}));

const YourClasses = () => {
  const classes = styles();
  const history = useHistory();

  const [topup, setTopup] = useState(false)
  const [withdrawal, setwithdrawal] = useState(false)

  const openTopup = () => {
    setTopup(!topup);
  };
  const openwithdrawal = () => {
    setwithdrawal(!withdrawal);
  };
  const {t , i18n} = useTranslation()
  return (
    <>
      <Header history={history} />
      <Container maxWidth="xl" className={classes.container}>
        <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper" className={classes.center}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography className={classes.mainHeading}>
              {topup ? t('topup') : (withdrawal ? t("withdraw") : t("wallet"))}
            </Typography>
            {topup || withdrawal ? (
              <CloseIcon
                style={{ color: Color.textBlue, cursor: "pointer" }}
                onClick={withdrawal ? openwithdrawal : openTopup}
              />
            ) : (
              <Box>
                <Button
                  className={classes.blueButton}
                  style={{ marginRight: "10px" }}
                  onClick={openwithdrawal}
                >
                  {t("withdraw")}
                </Button>
                <Button
                  className={classes.blueButton}
                  onClick={openTopup}
                >
                  {t("topup")}
                </Button>
              </Box>
            )}
          </Box>

          {!topup && !withdrawal ? (
            <WalletComponents openTopup={openTopup} />
          ) : (
            withdrawal ? <Withdrawal closeTopUp={openwithdrawal} /> : <Topup closeTopUp={openTopup} />
          )}
        </Box>
      </Container>
    </>
  );
}

export default (YourClasses);
