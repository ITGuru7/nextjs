import Grid from "material-ui/Grid";
import Link from "next/link";
import Button from "material-ui/Button";
import Hidden from "material-ui/Hidden";
import React, { Fragment } from "react";

import Drawer from "material-ui/Drawer";
import List, { ListItem, ListItemText } from "material-ui/List";
import firebaseApp from "../utils/firebaseApp";
import { Manager, Popper, Target } from "react-popper";
import { css, StyleSheet } from "aphrodite";
import MenuIcon from "material-ui-icons/Menu";
import GougleLogo from "./gougleLogo";
import aphrodite from '../utils/aphrodite';

const styles = StyleSheet.create({
  button: {
    color: "white",
    backgroundColor: "#078cd8",
    "@media (min-width: 601px) and (max-width: 960px)": {
      fontSize: "10px",
      fontWeight: "400"
    },
    "@media (min-width: 961px) and (max-width: 1919px)": {
      fontWeight: "400",
      fontSize: "10px"
    },
    "@media (min-width: 1920px)": {
      fontWeight: "400",
      fontSize: "12px"
    }
  },

  avatar: {
    backgroundColor: "#e8e9e9"
  },

  svg: {
    "@media (max-width: 360px)": {
      width: "50%",
      height: "50%"
    },
    "@media (min-width: 361px) and (max-width: 600px)": {
      width: "60%",
      height: "60%"
    },
    "@media (min-width: 601px) and (max-width: 950px)": {
      width: "70%",
      height: "70%"
    }
  },

  headerHeight: {
    "@media (max-width: 599px)": {
      height: "40px"
    },
    "@media (min-width: 600px) and (max-width: 960px)": {
      height: "47px"
    },
    "@media (min-width: 961px) and (max-width: 1919px)": {
      height: "57.45px"
    },
    "@media (min-width: 1920px)": {
      height: "67px"
    }
  },
  logoHeight: {
    "@media (min-width: 1px)": {
      height: "120%"
    },
    "@media (max-width: 0px)": {
      height: "100%"
    }
  }
});

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      svgHeight: "0px",
      open: false,
      openMenu: false,
      openDialog: false,
      logingOutAnimation: false,
      redirectTo: null,
      pageTitle: "",
      status: "admin",
      model: "biz",
      checked: false,
      verified: false,
      loadingUserInfos: true
    };
  }

  handleChange = name => event => {
    let str = event.target.value;
    str = str.replace(/\\/g, "/");
    this.setState({
      [name]: str
    });
  };

  toggleDrawer = open => this.setState({ open: open });

  handleRightOpen = () => this.toggleDrawer(true);

  handleRightClose = () => this.toggleDrawer(false);

  handleClickMenu = () => {
    this.setState({ openMenu: true });
  };

  handleCloseMenu = () => {
    this.setState({ openMenu: false });
  };

  handleCloseMenuClickAway = () => {
    if (this.state.openMenu) {
      this.setState({ openMenu: false });
    }
  };

  handleLogout = () => {
    firebaseApp.auth().signOut();
    this.props.appStore.adminMode = false;
  };

  redirectToAccountManagement = () => {
    this.setState({ redirectTo: "/gerer_compte" });
  };

  render() {
    let handleLogout = () => {
      firebaseApp.auth().signOut();
      this.props.appStore.adminMode = false;
    };

    let handleOpenDialog = () => {
      this.setState({ openDialog: true });
    };

    let signUp = (
      <div>
        <List disablePadding>
          <Link href={"/enregistrer"}>
            <ListItem button>
              <ListItemText primary="se connecter" />
            </ListItem>
          </Link>
        </List>
      </div>
    );

    let RenderInterface = props => {
      let handleOpenDialog = () => {
        this.setState({ openDialog: true });
      };
      const displayName = "";
      const photoURL = "";

      return (
        <Fragment>
          <Hidden only={["xs", "sm"]} implementation="css">
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-start"
              spacing={16}
            >
              <Grid item>
                <Link href="/enregistrer">
                  <Button className={css(styles.button)}>se connecter</Button>
                </Link>
              </Grid>
            </Grid>
          </Hidden>
          <Hidden only={["md", "lg", "xl"]} implementation="css">
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-start"
              spacing={16}
            >
              <Grid item>
                <MenuIcon onClick={this.handleRightOpen} />
                <Drawer
                  anchor="right"
                  open={props.open}
                  onClose={this.handleRightClose}
                  onClick={this.handleRightClose}
                >
                  {signUp}
                </Drawer>
              </Grid>
            </Grid>
          </Hidden>
        </Fragment>
      );
    };

    const mobile = () => {};

    const desktop = () => {};

    return (
      <Grid container direction="row" justify="space-between" spacing={0}>
        <Grid
          item
          className={css(styles.headerHeight)}
        >
          <Link href="/">
            <GougleLogo cn={css(aphrodite.gougleLogo)}/>
          </Link>
        </Grid>

        <Grid item xs={4} sm={3} md={3} lg={3} xl={3}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            spacing={0}
            style={{ height: "100%" }}
          >
            <Grid item>
              <RenderInterface
                open={this.state.open}
                logoutAnimation={this.state.logoutAnimation}
                app_store={this.props.appStore}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Header;
