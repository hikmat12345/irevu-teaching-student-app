import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import { Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoTitle, InfoSubtitle } from "@mui-treasury/components/info";
import { useTutorInfoStyles } from "@mui-treasury/styles/info/tutor";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";
import { Button } from "@material-ui/core";
import {userDefaultImage} from "./../../assets";

const useStyles = makeStyles(() => ({
  action: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
}));

const TutorCard = ({ authUser, value }) => {
  //console.log("ssss="+value);
  const styles = useStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });
  const avatarStyles = useDynamicAvatarStyles({ radius: 12, size: 48 });
  return (
    <Row
      width={290}
      marginTop={2}
      marginRight={1}
      p={1.5}
      gap={2}
      bgcolor={"#f5f5f5"}
      borderRadius={10}
    >
      <Item>
        <Avatar
          classes={avatarStyles}
          src={
            (value.profile_image) ? (value.profile_image) : (userDefaultImage)
          }
        />
      </Item>
      <Info position={"middle"} useStyles={useTutorInfoStyles}>
        <InfoTitle>{ value.first_name }</InfoTitle>
        <InfoSubtitle>{value.points} Points</InfoSubtitle>
      </Info>
      {/* <Item ml={1} position={"middle"}>
        <Button variant="outlined" color="primary">
          Hire
        </Button>
      </Item> */}
    </Row>
  );
};

export default (TutorCard);
// export default withStyles(useStyles, { withTheme: true })(TutorCard);