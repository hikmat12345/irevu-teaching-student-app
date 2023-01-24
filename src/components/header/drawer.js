import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fade, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { BgColor, Fonts, Color } from "../../theme";
import Box from "@material-ui/core/Box";
import classNames from "classnames";
import { logout } from "../../redux/actions/authActions";
import Badge from "@material-ui/core/Badge";
import { useTranslation } from 'react-i18next';
const drawerWidth = 240;

// import StarBorder from '@material-ui/icons/StarBorder';

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
    // width: "50px",
  },
  drawerContainer: {
    overflow: "auto",
    // border: "1px solid red",
    // borderBottom: "3px solid yellow",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  activeBtn: {
    backgroundColor: "rgba(82, 129, 239,0.2)",
    borderLeft: "4px solid" + BgColor.myBlue,
    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
    paddingTop: "10px",
    paddingBottom: "10px",
    transition: "all .2s ease",
    "& > .MuiListItemIcon-root": {
      color: BgColor.myBlue,
    },
    "& .MuiSvgIcon-root": {
      transition: "all .2s ease",
    },
    "& > .MuiTypography-body1": { fontFamily: Fonts.Regular },
  },
  navigationText: {
    fontSize: "15px",
    fontFamily: Fonts.Regular,
  },
  disableTab : {
    backgroundColor : 'darkgoldenrod !important'
  },
  navButtons: {
    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
    paddingTop: "10px",
    paddingBottom: "10px",
    "& .MuiSvgIcon-root": {
      transition: "all .2s ease",
    },
  },
});
// let abc = "em";

const DrawerComponent = (props) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  console.log("notificationCount====>" , props)
  const { classes, state, setState, notificationCount } = props;
  
  const [isSubOpen, setIsSubOpen] = useState(false);

  const auth = useSelector((store) => store.auth);

  const handleClick = () => {
    setIsSubOpen((isSubOpen) => !isSubOpen);
  };
useEffect(() => {
  console.log("state menu", state.menu)
  if (state.menu) {
    let _menu = state.menu.filter(e => e.show != false)
  
    setState((state) => ({
      ...state,
      menu: _menu,
    }));
   }
}, [])

   
  const activeNavigation = (title2) => {
    let _menu = state.menu;
    let getItemPosition = 0;
    for (let i = 0; i < _menu.length; i++) {
      _menu[i].active = false;
      if (_menu[i].key == title2) {
        getItemPosition = i + 1;
      }
    }
    _menu[getItemPosition - 1].active = true;
    setState((state) => ({
      ...state,
      menu: _menu,
    }));
  };
  return (
    <SwipeableDrawer
      className={classes.drawer}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={state.drawer}
      onOpen={(event) => {}}
      onClose={(event) => {}}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List key={"topList"}>
          
          {state.menu.map((item, index) => {
            return (
              <div key={index}>
                <ListItem
                  key={index}
                  onClick={() => {
                    if (item.key == "logout") {
                      dispatch(logout());
                      if (!auth.isLoggedIn) {
                        window.location.reload();
                      }
                    } else if (item.expandable) {
                      activeNavigation(item.key);
                      handleClick();
                    } else {
                      activeNavigation(item.key);
                      // if (item.expandable) {
                      //   setState({
                      //     [item.key]: !state[item.key],
                      //   });
                      // }
                      if(!item.disable){
                        props.history.push(item.link);
                      }
                    }
                  }}
                  button
                  className={
                    classNames(
                      !item.active ? classes.navButtons : classes.activeBtn, 
                      item.disable ? classes.disableTab : null
                      )

                  }
                  style={{
                    borderBottom:
                      index == state.menu.length - 1
                        ? "1px solid rgba(0, 0, 0, 0.05)"
                        : "",
                    borderTop:
                      index == 0 ? "0px solid rgba(0, 0, 0, 0.05)" : "",
                    marginTop: index == 0 ? "-5px" : "",
                  }}
                >
                  <ListItemIcon style={{ marginRight: "-15px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <Box className={classes.navigationText}>{t(item.title )} {item.key=="notifications" ?(<Badge badgeContent={notificationCount} color="secondary"></Badge>) : ('')}</Box>
                  {item.expandable ? (
                    isSubOpen ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : (
                    ""
                  )}
                </ListItem>
                {item.expandable && (
                  <Collapse in={isSubOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.expandable.map((expand, Tindex) => {
                        return (
                          <ListItem
                            className={classes.nested}
                            button
                            key={expand.title + Tindex}
                          >
                            <ListItemIcon style={{ marginRight: "-15px" }}>
                              {expand.icon}
                            </ListItemIcon>
                            {/* <ListItemText primary={expand.title} /> */}
                            <Box className={classes.navigationText}>
                              {expand.title}
                            </Box>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </div>
            );
          })}
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default withStyles(styles, { withTheme: true })(DrawerComponent);
