import React,{ useEffect, useState } from "react";
import "fontsource-roboto";
import { fade, withStyles } from "@material-ui/core/styles";
import { Header } from "../../components";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
// import "../contact/node_modules/react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-multi-carousel/lib/styles.css";
import "react-multi-carousel/lib/styles.css";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import "react-multi-carousel/lib/styles.css";
import { Fonts, BgColor, Color } from "../../theme/index";
import NotificationBox from "./NotificatinosBox";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
const styles = (theme) => ({
  container: {
    alignSelf: "flex-end",
    // paddingLeft: 250,
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
  mainHeading: {
    fontSize: "20px",
    fontFamily: Fonts.Medium,
  },
  overlayWrapper: {
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    zIndex: "2000",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  center : {
    display:"inline-block",
    position:"relative"
  }
});
  const Notifications =(props) => { 

  const {t , i18n} = useTranslation()
  

  const data = useSelector(state => state.users.notificationList)
  console.log('===>>>>>>>>>>>>>',data);
    const { classes } = props;

 const [postsPerPage] = useState(5);
 const [offset, setOffset] = useState(1);
 const [posts, setAllPosts] = useState([]);
 const [pageCount, setPageCount] = useState(0)
 
 /*const getPostData = (data) => {
   return (
     data.map(post => <div className="container" key={post.id}>
       <p>User ID: {post.id}</p>
       <p>Title: {post.title}</p>
     </div>)
   )
 
 }*/
 
 const getAllPosts = async () => {
   const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
   const data = res.data;
   const slice = data.slice(offset - 1 , offset - 1 + postsPerPage)

   // For displaying Data
   //const postData =  getPostData(postsPerPage);
 
   // Using Hooks to set value
   setAllPosts(postsPerPage)
   setPageCount(Math.ceil(data.length / postsPerPage))
   //console.log('offset');
   //console.log(offset);
 }
 
 const handlePageClick = (event) => {
   const selectedPage = event.selected;
   setOffset(selectedPage + 1)

//console.log('selectedPage');
//console.log(selectedPage);
 };
 
 useEffect(() => {
   getAllPosts()
 }, [offset])

//console.log('postsPerPage');
//console.log(postsPerPage);


    
    return (
      <>
        <Header history={props.history} />
        {/* <Container maxWidth="xl" className={classes.overlayWrapper}>
          <FormCard />
        </Container> */}
        <Container maxWidth="xl" className={classes.container}>
          <>
            <Box flexWrap="wrap" bgcolor="background.paper" className={classes.center}>
              <Typography className={classes.mainHeading}>
                {t('notifications')}
              </Typography>
             
                <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                paddingTop={0}
                bgcolor="background.paper"
              >
                <NotificationBox />
              </Box>
             
            </Box>       
           
          </>
        </Container>
        
      </>
    );
  
};




export default withStyles(styles, { withTheme: true })(Notifications);
