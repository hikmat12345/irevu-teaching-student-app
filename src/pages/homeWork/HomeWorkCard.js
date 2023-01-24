import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useGraphicBtnStyles } from "@mui-treasury/styles/button/graphic";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ShowMoreText from 'react-show-more-text';
import { useTranslation } from 'react-i18next';
import DefaultDateFormat from '../../helpers/DefaultDateFormat'
const useStyles = makeStyles({
  root: {
    // paddingTop: "10px",
    // paddingBottom: "10px",
    padding: "10px",
    // backgroundColor: "rgba(43,101,236,.05)",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#d4d4d4",
    marginRight: "15px",
    marginBottom: "15px",
    minHeight: "295px"
  },
  media: {
    height: 140,
  },
  info: {
    color: "#2B65EC",
    textTransform: "initial",
  },
  danger: {
    color: "#F47364",
  },
});

const MyCard = ({data}) => {

  const {t , i18n} = useTranslation()
  const classes = useStyles();
  const btnStyles = useGraphicBtnStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent style={{ padding: "16px" }}>
          <Box display="flex" justifyContent="space-between">
            <Typography gutterBottom variant="h5" component="h2">
              {t('assignment')}# {data.id}
            </Typography>
            <Typography
              variant="button"
              variant="caption"
              display="inline"
              gutterBottom
            >
              {t('submitted')} :<span>&nbsp;</span>
              <Typography
                variant="button"
                display="inline"
                gutterBottom
                className={classes.info}
                style={{ fontSize: "16px" }}
              >
                <strong>{data.total_submitted}</strong>
              </Typography>
              <Typography
                variant="button"
                display="inline"
                gutterBottom
                className={classes.join}
              >
                /40
              </Typography>
            </Typography>
          </Box>
          <Box component="span" display="block" mt={"20px"}>
            <Typography variant="button" display="inline" gutterBottom>
              {t('class')} :<span>&nbsp;</span>
              <Typography
                variant="caption"
                display="inline"
                gutterBottom
                className={classes.info}
              >
                {data.class_id}
              </Typography>
            </Typography>
          </Box>
          {/* <Box component="span" display="block">
            <Typography variant="button" display="inline" gutterBottom>
              Subject :<span>&nbsp;</span>
              <Typography
                variant="caption"
                display="inline"
                gutterBottom
                className={classes.info}
              >
                Physics
              </Typography>
            </Typography>
          </Box>
          <Box component="span" display="block">
            <Typography variant="button" display="inline" gutterBottom>
              Category :<span>&nbsp;</span>
              <Typography
                variant="caption"
                display="inline"
                gutterBottom
                className={classes.info}
              >
                Essay
              </Typography>
            </Typography>
          </Box> */}

          <Box component="span" display="block">
            <Typography variant="button" display="inline" gutterBottom>
              {t('issue_date')} :<span>&nbsp;</span>
              <Typography
                variant="caption"
                display="inline"
                gutterBottom
                className={classes.info}
              >
                {DefaultDateFormat(data.created_at)}
              </Typography>
            </Typography>
          </Box>
          <Box component="span" display="block">
            <Typography variant="button" display="inline" gutterBottom>
              {t('last_date')} :<span>&nbsp;</span>
              <Typography
                variant="caption"
                display="inline"
                gutterBottom
                className={classes.danger}
              >
              {DefaultDateFormat(data.deadline_date)}
              </Typography>
            </Typography>
          </Box>
          <Box component="span" display="block">
            <Typography variant="button" display="inline" gutterBottom>
              {t('topic')}:<span>&nbsp;</span>
              <Typography
                variant="caption"
                display="inline"
                gutterBottom
                className={classes.info}
              >
                {data.title}
              </Typography>
            </Typography>
          </Box>
          <Typography variant="button" display="block">
            <Box fontWeight="bold" mt={"20px"}>
              {t('assignment')} :<span>&nbsp;</span>
            </Box>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="span">
            <ShowMoreText
                /* Default options */
                lines={2}
                // more='Show more'
                // less='Show less'
                className='content-css'
                anchorClass='my-anchor-css-class'
                // onClick={this.executeOnClick}
                expanded={false}
                // width={280}
            >
              <div dangerouslySetInnerHTML={{__html: data.description }}></div>
            </ShowMoreText>
          </Typography>
        </CardContent>

        {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
      </Card>
    </div>
  );
};

export const TeamCardDemo = React.memo(function TeamCard(props) {
  return (
    <>
        <MyCard data={props.data}/>
    </>
  );
});
export default TeamCardDemo;
