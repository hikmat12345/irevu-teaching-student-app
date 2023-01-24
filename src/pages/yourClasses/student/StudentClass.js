import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Typography,
  withStyles,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { BgColor, Color, Fonts } from "./../../../theme/index";

import AddClass from "./AddClass";
import ClassJoinCard from "../common/ClassJoinCard";

import { getStudentClassList } from "./../../../redux/actions/studentActions";
import { useTranslation } from 'react-i18next';
const styles = (theme) => ({
    blueButton: {
        color: "#fff",
        height: "40px",
        borderRadius: "5px",
        backgroundColor: BgColor.myBlue,
        border: "1px solid transparent",
        padding: "0 20px",
        "&:hover": {
          color: Color.textBlue,
          border: "1px solid" + Color.textBlue,
        },
    },
});
const useStyles = makeStyles(() => ({
    blueButton: {
        color: "#fff",
        height: "40px",
        borderRadius: "5px",
        backgroundColor: BgColor.myBlue,
        border: "1px solid transparent",
        padding: "0 20px",
        "&:hover": {
          color: Color.textBlue,
          border: "1px solid" + Color.textBlue,
        },
    },
}));
const StudentClass = (props) => {
  const { classes, authUser } = props;
  const mystyles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [addClass, setAddClass] = useState(false);
  const classList = useSelector((store) => store.students.classList);
  const {t , i18n} = useTranslation()
  useEffect(() => {
    dispatch(getStudentClassList());
  }, [dispatch]);

  const addingClass = () => {
    setAddClass(!addClass);
  }

  const openClass = (id, class_id) => {
    history.push("/class?id="+class_id);
  }

  return (
    <>
    <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
    >
        <Typography className={classes.mainHeading}
         style={{ fontSize: "20px", fontFamily: "PoppinsMedium" }}
        >
            {t('my_classes')}
        </Typography>
        <Button
            className={mystyles.blueButton}
            onClick={addingClass}
        >
            {t('add_class_capital')}
        </Button>
    </Box>
    <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        paddingTop={0}
        bgcolor="background.paper"
        className="my-classess-main"
    >
        {
          (classList) ? (classList.map((v, i) => {
              return (
                <Grid
                  style={{
                    marginRight: 0,
                    marginTop: 15,
                  }}
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  key={i}
                >
                  <ClassJoinCard
                      authUser={authUser}
                      data={v}
                      openClass={openClass}
                  />
                </Grid>
              );
          })) : ( "" )
        }
    </Box>
    {
        (addClass) ? (
            <AddClass addingClass={addingClass}/>
        ) : ('')
    }
    </>
  );
};

export default withStyles(styles, { withTheme: true })(StudentClass);
