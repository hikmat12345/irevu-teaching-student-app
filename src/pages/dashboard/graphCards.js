import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(({ spacing, palette }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    card: {
      display: "flex",
      padding: spacing(2),
      minWidth: 268,
      borderRadius: 10,
      boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
      "& > *:nth-child(1)": {
        marginRight: spacing(2),
      },
      "& > *:nth-child(2)": {
        flex: "auto",
      },

      marginTop: 20,
      marginBottom: 10,
      marginRight: 20,
    },
    avatar: {},
    heading: {
      fontFamily: family,
      fontSize: 16,
      marginBottom: 0,
    },
    subheader: {
      fontFamily: family,
      fontSize: 14,
      color: palette.grey[600],
      letterSpacing: "1px",
      marginBottom: 4,
    },
    value: {
      marginLeft: 8,
      fontSize: 14,
      color: palette.grey[500],
    },
  };
});

const useSliderStyles = makeStyles(() => ({
  root: {
    height: 4,
  },
  rail: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "rgb(202,211,216)",
  },
  track: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "rgb(117,156,250)",
  },
  thumb: {
    display: "none",
  },
}));

export const KanbanCardDemo = React.memo(function KanbanCard() {
  const styles = useStyles();
  const sliderStyles = useSliderStyles();
  return (
    <Card className={cx(styles.card)} elevation={0}>
      <Avatar src={"https://i.pravatar.cc/300"} className={styles.avatar} />
      <Box>
        <h3 className={styles.heading}>Assignment Completed</h3>
        <p className={styles.subheader}>23 y.o • Canada</p>
        <Box display={"flex"} alignItems={"center"}>
          <Slider classes={sliderStyles} defaultValue={30} />
          <span className={styles.value}>3/10</span>
        </Box>
      </Box>
    </Card>
  );
});

export default KanbanCardDemo;
