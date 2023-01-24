import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BgColor, Color, Fonts } from "../../theme/index";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  Box,
  TextField,
  Card,
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(() => ({
  mainHeading: {
    fontSize: "20px",
    fontFamily: Fonts.Medium,
    opacity: ".8",
  },
  smallestBlueTitle: {
    color: Color.textBlue,
    fontSize: "13px",
    fontFamily: Fonts.Regular,
    textTransform: "uppercase",
  },
  smallText: {
    color: BgColor.myBlack,
    fontSize: "16px",
    fontFamily: Fonts.Regular,
  },
  overlayWrapper: {
    position: "fixed",
    top: "0",
    left: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    zIndex: "2000",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mainHeading2: {
    fontSize: "25px",
    fontFamily: Fonts.Medium,
  },
  shareCodeText: {
    color: Color.myBlack,
    fontSize: "18px",
    fontFamily: Fonts.Medium,
    textTransform: "uppercase",
    textAlign: "center",
  },
  whiteOutlinedButton: {
    width: "100%",
    height: "40px",
    color: Color.textBlue,
    fontFamily: Fonts.Medium,
    borderRadius: "5px",
    backgroundColor: "#fff",
    border: "2px solid " + BgColor.myBlue,
    padding: "0 20px",
    margin: "5px 0",
  },
  TextFields: {
    width: "100%",
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
}));

const FormField = ( props ) => {
  const { type, label, name, handle, func, value, error } = props;
  const styles = useStyles();
  return (
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
        <Box style={{ padding: "26px" }}>
          {
            ( type == 'dropdown' ) ? (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                onClick={func}
              >
                <Box className={styles.smallestBlueTitle}>{label}</Box>
                <ArrowDropDownIcon style={{ color: Color.textBlue }} />
              </Box>
            ) : ( '' )
          }
          {
            ( type == 'textArea' ) ? (
              <TextField
                  // id="outlined-multiline-static"
                  label={label}
                  multiline
                  rows={4}
                  name={name}
                  onChange={handle}
                  // defaultValue="Lesson Plan Text"
                  variant="outlined"
                  className={styles.TextFields}
                />
            ) : ('')
          }
          {
            ( type == 'date' ) ? (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  // id="outlined-basic"
                  label={label}
                  disablePast= {true}
                  variant="outlined"
                  name={name}
                  value={value}
                  onChange={handle}
                  className={styles.TextFields}
                />
              </MuiPickersUtilsProvider>
            ) : ('')
          }
          {
            ( type == 'time' ) ? (
              <TextField
                // id="outlined-basic"
                label={label}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                variant="outlined"
                name={name}
                onChange={handle}
                className={styles.TextFields}
              />
            ) : ('')
          }
          {
            ( type == 'password' ) ? (
              <TextField
                // id="outlined-basic"
                error={ (error) ? true : false }
                helperText= { (error) ? error : '' }
                label={label}
                name={name}
                onChange={handle}
                type="password"
                variant="outlined"
                className={styles.TextFields}
              />
            ) : ('')
          }
          {
            ( !type ) ? (
              <TextField
                // id="outlined-basic"
                label={label}
                variant="outlined"
                name={name}
                onChange={handle}
                className={styles.TextFields}
                value={ value }
                error={ (error) ? true : false }
                helperText= { (error) ? error : '' }
              />
            ) : ('')
          }
        </Box>
      </Card>
    </>
  );
};

export default FormField;