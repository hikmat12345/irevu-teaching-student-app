import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logo,logo_chi } from "../../assets";
import { fade, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Android from "@material-ui/icons/Android";
import Apple from "@material-ui/icons/Apple";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import AccountBalanceWalletOutlined from "@material-ui/icons/AccountBalanceWalletOutlined";
import ArrowRight from "@material-ui/icons/ArrowRight";
import Drawer from "./drawer";
import { Divider } from "@material-ui/core";
import { Color, Fonts } from "../../theme/index";

import HomeOutlined from "@material-ui/icons/HomeOutlined";
import ForumOutlined from "@material-ui/icons/ForumOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import ClassOutlinedIcon from "@material-ui/icons/ClassOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import ScoreOutlinedIcon from "@material-ui/icons/ScoreOutlined";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LanguageOutlined from "@material-ui/icons/LanguageOutlined";
import SupervisorAccountOutlined from "@material-ui/icons/SupervisorAccountOutlined";
import Link from "@material-ui/icons/Link";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { readNotificationList,getNotificationList } from "../../redux/actions/userActions";
import { FormatColorResetOutlined, MessageOutlined } from "@material-ui/icons";
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
  Container,
  Button,
  TextField,
  Box,
  Grid,
  Card,
  Input
} from '@material-ui/core';
import { getNewMessageNotifications } from "../../redux/actions/messagnerActions";
import { setDocumentLoading } from "react-doc-viewer/build/state/actions";

const drawerWidth = 240;

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "#2b65ec",
    fontWeight: "800",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    fontFamily: Fonts.Regular,
    borderRadius: "5px",
    border: "1px solid transparent",
    backgroundColor: "#fff",
    transition: "all .3s ease",
    "&:focus": {
      border: "1px solid" + Color.textBlue,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  //Drawer

  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  chip: {
    marginRight: theme.spacing(3),
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    color: Color.textBlue,
    fontFamily: Fonts.Regular,
    borderColor: Color.textBlue,
    padding: "0 5px",
  },
});

const mobileMenuId = "primary-search-account-menu-mobile";
const menuId = "primary-search-account-menu";

const Header = (props) => {
  const { t, i18n } = useTranslation();
  const { classes } = props;
  // const dispatch = useDispatch();

  const [state, setState] = useState({
      mobileAnchor: null,
      profileAnchor: null,
      isMobileMenuOpen: false,
      isMenuOpen: false
  });

  const notificationList = useSelector((store) => store.users.notificationList);
  const messangerCount = useSelector((store) => store.MessangerReducer.count_new_msg);
  console.log(messangerCount, 'messangerCount')
  const authUser = useSelector((store) => store.auth.user);
  const [balance, setBalance] = useState(`Balance RMB : ${authUser.balance}`)
  const dispatch = useDispatch();
  var notificationCount = notificationList.filter(val => {
      return val.is_seen == 0
  })
  const [sidebar, setSidebar] = useState({
    drawer : true,
    menu : [
      {
        active: false,
        title: 'dashboard',
        icon: <HomeOutlined />,
        expandable: false,
        key: "dashboard",
        link: "/",
      },
      {
        active: false,
        title: 'forum',
        show: (authUser.education !== 'high_school' && authUser.education !== 'primary' || authUser.user_type === "1") ? true : false,
        icon: <ForumOutlined />,
        expandable: false,
        key: "forum",
        link: "/forum",
      },
      // {
      //   show: (authUser.user_type == 2) ? true : false,
      //   active: false,
      //   title: t('my_forum'),
      //   icon: <ForumOutlined />,
      //   expandable: false,
      //   key: "my-forum",
      //   link: "/forum/my-forum",
      // },
      {
        active: false,
        title: 'notifications',
        icon: <NotificationsOutlinedIcon />,
        expandable: false,
        key: "notifications",
        link: "/notifications",
        notificationcount:notificationCount.length
      },
      {
        disable: (authUser.subscription_status != 1 && authUser.user_type == 1) ? true : false,
        active: false,
        title: 'classes',
        icon: <ClassOutlinedIcon />,
        expandable: false,
        key: "your-classes",
        link: "/your-classes",

      },
      // {
      //   active: false,
      //   title: t('home_work'),
      //   icon: <WorkOutlineOutlinedIcon />,
      //   expandable: false,
      //   key: "home-work",
      //   link: "/home-work",
      // },
      {
        active: false,
        title: (authUser.user_type == 1) ? 'lesson_plans' : 'resources',
        icon: <NoteOutlinedIcon />,
        expandable: false,
        key: (authUser.user_type == 1) ? "lesson-plan" : "resources",
        link: (authUser.user_type == 1) ? "/lesson-plan" : "resources",
      },
      {
        active: false,
        title: 'earn_points',
        icon: <ScoreOutlinedIcon />,
        expandable: false,
        key: "earn-points",
        link: "/earn-points",
      },
      {
        active: false,
        title: (authUser.user_type == 1) ? 'referral_link' : 'send_referral_link',
        icon: <Link />,
        expandable: false,
        key: "referral-link",
        link: "/referral-link",
      },
      // {
      //   active: false,
      //   title: "Results",
      //   icon: <NoteOutlinedIcon />,
      //   expandable: false,
      //   key: "results",
      //   link: "/results",
      // },
      {
        active: false,
        title: 'wallet',
        icon: <NoteOutlinedIcon />,
        expandable: false,
        key: "wallet",
        link: "/wallet",
      },
      
      {
        show: (authUser.user_type == 1) ? true : false,
        active: false,
        title:'subscription',
        icon:<MonetizationOnIcon /> ,
        expandable: false,
        key: "subscription",
        link: "/subscription",
      },
      {
        active: false,
        title: 'contact_us',
        icon: <ContactPhoneOutlinedIcon />,
        expandable: false,
        key: "contact-us",
        link: "/contact-us",
      },
      {
        active: false,
        title: 'view_account',
        icon: <AccountCircleOutlinedIcon />,
        expandable: false,
        key: "view-account",
        link: "/view-account",
      },
      {
        active: false,
        title: 'academic_english',
        show: (authUser.education !== 'high_school' && authUser.education !== 'primary' || authUser.user_type === "1") ? true : false,
        icon: <LanguageOutlined />,
        key: "academic_english",
        link: "/academic-english",
        expandable: false,
        // expandable: [
        //   {
        //     active: true,
        //     title: "Teacher Questions",
        //     icon: <SupervisorAccountOutlined />,
        //     key: "academic_english/teacherquestions",
        //     link: "/academic-english",
        //   },
        // ],
      },
      {
        active: false,
        title: 'help_guide',
        icon: <HelpOutlineIcon />,
        expandable: false,
        key: "help-guide",
        link: "/help-guide",
      },
      {
        active: false,
        title: 'Messenger',
        icon: <MessageOutlined />,
        expandable: false,
        key: "messenger",
        link: "/messenger",
      },
      {
        active: false,
        title: 'logout',
        icon: <AccountCircleOutlinedIcon />,
        expandable: false,
        key: "logout",
        link: "/logout",
      },
      
    ]
  });
  // const [load,  ]=useState(false)
  useEffect(() => {
    // dispatch(readNotificationList())
    dispatch(getNotificationList())
  }, [])
  const messangerId=1;
  const localStorageData= localStorage.getItem("user")
  const localStorageFiltered=JSON.parse(localStorageData)
  const userId=localStorageFiltered.id;
    
  useEffect(() => { 
    dispatch(getNewMessageNotifications(messangerId, userId ))
  }, [])
  // setInterval(function() {    
  //   dispatch(getNewMessageNotifications(messangerId, userId ))
  // }, 6000);
  useEffect(() =>  {
    setBalance(`Balance RMB : ${authUser.balance}`)
  }, [authUser])
  
  const toggleDrawer = () => {
    setSidebar((sidebar) => ({
      ...sidebar,
      drawer: !sidebar.drawer,
    }));
  };

  

  const handleMobileMenuOpen = (event) => {
    setState( (state) => ({
      ...state,
      mobileAnchor: event.currentTarget,
      isMobileMenuOpen: !state.isMobileMenuOpen,
    }));
  };

  const handleProfileMenuOpen = (event) => {
    setState( (state) => ({
      ...state,
      mobileProfileAnchor: event.currentTarget,
      isMenuOpen: !state.isMenuOpen,
    }));
  };

  const handleMenuClose = (event) => {
    setState( (state) => ({
      ...state,
      mobileProfileAnchor: false,
      isMenuOpen: !state.isMenuOpen,
    }));
  };

  const handleMobileMenuClose = () => {
    setState( (state) => ({
      ...state,
      mobileAnchor: null,
      isMobileMenuOpen: !state.isMobileMenuOpen,
    }));
  };

  const renderMenu = () => {
    return (
      <Menu
        anchorEl={state.mobileAnchor}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={state.isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  };

  const renderProfileMenu = (state, handleMenuClose) => {
    return (
      <Menu
        anchorEl={state.profileAnchor}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={state.isMenuOpen}
        onClose={handleMenuClose}
      >
      </Menu>
    );
  };

const [openLangOptions, setOpenLangOptions] = useState(true);
  const handleClick = (lng) => {
    i18n.changeLanguage(lng);
    openLangsOptions();
  };
  const openLangsOptions = () => {
    setOpenLangOptions(!openLangOptions);
  };
  return (
    <div className={classes.grow}>

      <ToastContainer 
        position="top-right"
        autoClose={10000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />

      <AppBar position="fixed" className={classes.appBar} color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Avatar sizes={'20'} src={t('login')=='LOGIN' ? logo:logo_chi} />
          <Typography className={classes.title} variant="h6" noWrap>
            Irevu
          </Typography>
          {/*<div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              // style={{ fontFamily: Fonts.Regular, backgroundColor: "#fff" }}
            />
          </div>
*/}
          
          <div className={classes.grow} />
            <div style={{ width: '90px', margin: '0 auto' }}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  style={{
                    color: '#000',
                    borderRadius: '5px',
                    border: '1px solid #fff',
                  }}
                  onClick={openLangsOptions}
                  >
                  {t('language')}
                </Button>

                {!openLangOptions ? (
                <div className="dropdownDiv">
                  <ul>
                    <li>
                      <a
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                      href="#"
                      onClick={() => handleClick('chi')}
                      >
                      Chinese
                      {t('language') != 'LANGUAGE' && (
                      <CheckCircleIcon
                      name="CheckCircle"
                      size={15}
                      color="primary"
                      />
                      )}
                    </a>
                  </li>
                  <li>
                    <a
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    href="#"
                    onClick={() => handleClick('en')}
                    >
                    English
                    {t('language') == 'LANGUAGE' && (
                    <CheckCircleIcon
                    name="CheckCircle"
                    size={15}
                    color="primary"
                    />
                    )}
                  </a>

                </li>
              </ul>
            </div>
            ) : (
            ''
            )}
          </div>
          <Chip
            icon={<AccountBalanceWalletOutlined />}
            label={balance}
            clickable
            color="primary"
            onDelete={() => {}}
            deleteIcon={<ArrowRight style={{ color: Color.textBlue }} />}
            variant="outlined"
            className={classes.chip}
            onClick={() => props.history.push("/wallet")}
          />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              color="inherit"
              >
              <Badge>
                <Android />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              color="inherit"
              
            >
              <Badge color="secondary">
                <Apple />
              </Badge>
            </IconButton> */}
            <IconButton
              aria-label="show {notificationCount.length} new notifications"
              color="inherit"
              onClick={() => props.history.push("/notifications")}
            >
              <Badge badgeContent={notificationCount.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          
            <IconButton
              aria-label="show {messenger.length} new /messenger"
              color="inherit"
              onClick={() => props.history.push("/messenger")}
            >
              <Badge badgeContent={messangerCount==0 ? 0 :messangerCount} color="secondary">
                <MessageOutlined />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              onClick={() => props.history.push("/view-account")}
              color="inherit"
            >
              <AccountCircle/>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>

        {renderMenu()}
        {renderProfileMenu(state, handleMenuClose)}
      </AppBar>

      <Drawer
        history={props.history}
        state={sidebar}
        setState={setSidebar}
        notificationCount={notificationCount.length}
      />
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Header);