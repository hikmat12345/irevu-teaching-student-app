import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Fonts, BgColor, Color } from "../../theme/index";
import { fade, withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import {
    Container,
    TextField,
    Box,
    Button,
    Card,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { logo } from "../../assets/index";
import axios from "axios";
import { SuccessAlert } from "../../components"

import Const from "../../helpers/const";

const useStyles = (theme) => ({
  container: {
    alignSelf: "flex-end",
    // paddingLeft: 250,
    // paddingTop: 70,
    // paddingBottom: 20,
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
    lineHeight: "48px",
    borderRadius: "5px",
    fontFamily: Fonts.Medium,
    cursor: "pointer",
    textAlign: "center",
    textTransform: "uppercase",
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
  },
  TextFields: {
    width: "100%",
  },
  forgotPass: {
    marginTop: "14px",
    textAlign: "right",
    marginTop: "10px",
  },
  forgotButton : {
    "&:hover": {
      backgroundColor: "whitesmoke",
      padding: "5px",
      borderRadius: "7px"
    },
  }
});

const TopPortion = ({ label, profileImg }) => {
    const styles = useStyles();
    return (
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        p={"30px"}
      >
        <img src={logo} />
        <Box>
          <Typography
            variant="caption"
            color="primary"
            className={styles.smallGrayTitle}
          >
            Welcome to our application
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            className={styles.bigHeading}
            style={{ marginBottom: "-5px" }}
          >
            Reset Password
          </Typography>
        </Box>
      </Box>
    );
  };

const ForgotPassword = (props) => {
    const { classes } = props;

    const dispatch = useDispatch();

    const [email, setEmail] = useState(false);
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleDataChange = (event) => {
        event.persist();
        setEmail(event.target.value);
    };

    const checkValidation = () => {
        if (!email) {
            setError("Please enter email");
            return false;
        }
        return true;
    }

    const handleSubmit = (event) => {
        event.persist();
        if (!checkValidation()) {
            return false;
        }

        axios.post(Const.BASE_URL + "forgotPassword", {
            email: email
        }).then((response) => {
            console.log("response", response)
            setError(false);
            setSuccessMessage("Please check your email.");
        })
        .catch((error) => {
            console.log("error", error.response.data)
            if ( error.response.data.error == undefined ) {
                setError("Server error.");
            } else {
                setError(error.response.data.error)
            }
        });
    };

    return (
      <>
        <Container maxWidth="xl" className={classes.container}>
          <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper" className={classes.center}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
            </Box>

            <TopPortion />
            {
                (error) ? (
                    <>
                    <Alert style={{
                        "width": "600px"
                    }} severity="error">{error}</Alert>
                    </>
                ) : ('')
            }
            <SuccessAlert message={successMessage}/>
            {
                (!successMessage) ? (
                    <>
                        <Card
                        style={{
                            maxWidth: "600px",
                            width: "600px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            marginTop: "10px",
                        }}
                        >
                        <Box style={{ padding: "15px" }}>
                            <TextField
                                type="email"
                                label="Enter Email"
                                variant="outlined"
                                name="email"
                                onChange={handleDataChange}
                                className={classes.TextFields}
                            />
                        </Box>
                    </Card>
                    <Box
                        style={{
                        maxWidth: "600px",
                        width: "600px",
                        marginTop: "10px",
                        }}
                    >
                        <Button
                            style={{
                                padding: "20px",
                                marginTop: "50px",
                            }}
                            className={classes.blueButton}
                            style={{ width: "100%", height: "unset" }}
                            onClick = {handleSubmit}
                        >
                            Submit
                        </Button>
                    </Box>
                    <Box
                    style={{
                        maxWidth: "600px",
                        width: "600px",
                        marginTop: "10px",
                    }}
                    >
                    OR
                    <Link href="/login">
                        <Button
                            style={{
                            padding: "20px",
                            marginTop: "50px",
                            }}
                            style={{ width: "100%", height: "unset" }}
                        >
                            Login
                        </Button>
                    </Link>
                    </Box>
                    </>
                ) : (
                    <Box className={classes.forgotPass}>
                        <Link href="/login" className={classes.forgotButton}>Login</Link>
                    </Box>
                )
            }
          </Box>
        </Container>
      </>
    );
}

// export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, { withTheme: true })(Login)));
export default withStyles(useStyles, { withTheme: true })(ForgotPassword);
