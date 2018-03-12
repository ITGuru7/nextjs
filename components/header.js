import Grid from "material-ui/Grid";
import Link from "next/link";
import Button from "material-ui/Button";
import React from "react";

import Grow from "material-ui/transitions/Grow";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import Drawer from "material-ui/Drawer";
import AccountIcon from "material-ui-icons/AccountCircle";
import IconButton from "material-ui/IconButton";
import List, { ListItem, ListItemText } from "material-ui/List";
import firebaseApp from "../utils/firebaseApp";
import Fade from "material-ui/transitions/Fade";
import Tooltip from "material-ui/Tooltip";
import { MenuItem, MenuList } from "material-ui/Menu";
import { Manager, Popper, Target } from "react-popper";
import classNames from "classnames";
import ClickAwayListener from "material-ui/utils/ClickAwayListener";
import { withRouter } from "next/router";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import { FormControl, FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import Input, { InputLabel } from "material-ui/Input";
import Select from "material-ui/Select";
import crypto from "crypto";
import lodash from "lodash";
import rebase from "re-base";
import Recaptcha from "react-recaptcha";
import { inject, observer } from "mobx-react";
import { css, StyleSheet } from "aphrodite";

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

  accountIcon: {},

  svg: {
    "@media (max-width: 360px)": {
      width: "50%",
      height: "50%"
    },
    "@media (min-width: 361px) and (max-width: 600px)": {
      width: "60%",
      height: "60%"
    },
    "@media (min-width: 601px) and (max-width: 750px)": {
      width: "70%",
      height: "70%"
    }
  }
});

@inject("appStore")
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "0",
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
    this.updateDimensions = this.updateDimensions.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.unsubscribe = () => null;
  }

  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    return { userAgent };
  }

  handleChange = name => event => {
    let str = event.target.value;
    str = str.replace(/\\/g, "/");
    this.setState({
      [name]: str
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
    this.fetchFirebase();
  }

  componentWillUnmount() {}

  fetchFirebase() {
    if (this.props.appStore.user) {
      this.props.appStore.base.bindToState(
        `users/${this.props.appStore.user.uid}`,
        {
          context: this,
          state: "firebase_user",
          then: () => {
            this.setState({ loadingUserInfos: false });
          },
          onFailure: () => {
            console.error(`can't get user informations`);
          }
        }
      );
    }
  }

  componentWillMount() {
    this.registerUser();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    this.unsubscribe();
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth
    });
  }

  registerUser() {
    this.unsubscribe = firebaseApp.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.props.appStore.user = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL
          };
        } else {
          this.props.appStore.user = user;
          this.setState({ logingOutAnimation: !!this.props.appStore.user });
        }
      },
      error => {
        console.log(error);
      },
      completed => {
        console.log(completed);
      }
    );
  }

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

  responsiveHeaderHeight(width) {
    if (width >= 1920) {
      return "67px";
    } else if (width >= 961) {
      return "57.45px";
    } else if (width >= 601) {
      return "47px";
    } else if (width >= 361) {
      return `40px`;
    } else if (width) {
      return `40px`;
    } else return "";
  }

  responsiveLogoHeight(width) {
    if (width >= 1920) {
      return "120%";
    } else if (width >= 961) {
      return "120%";
    } else if (width >= 601) {
      return "120%";
    } else if (width >= 361) {
      return `120%`;
    } else if (width) {
      return `120%`;
    } else return "100%";
  }

  render() {
    const pathname = this.props.router.pathname;
    if (pathname !== "/enregistrer") {
      this.props.appStore.redirect_to = pathname;
    }

    let AccountManagementIcon = props => {
      if (!props.deconnect) {
        const openMenu = this.state.openMenu;
        const styles = {
          root: {
            display: "flex"
          },
          popperClose: {
            pointerEvents: "none"
          }
        };
        if (this.state.width <= 750) {
          return null;
        } else {
          return (
            <div>
              <Manager>
                <Target>
                  <Button
                    aria-owns={openMenu ? "menu-list" : null}
                    aria-haspopup="true"
                    onClick={this.handleClickMenu}
                  >
                    <Avatar
                      alt={props.app_store.user.displayName}
                      src={props.app_store.user.photoURL}
                      className={css(styles.avatar)}
                    >
                      {!props.app_store.user.photoURL && (
                        <AccountIcon
                          style={{ width: "100%", height: "100%" }}
                        />
                      )}
                    </Avatar>
                  </Button>
                </Target>
                {openMenu ? (
                  <Popper
                    placement="bottom-start"
                    eventsEnabled={openMenu}
                    className={classNames({ [styles.popperClose]: !openMenu })}
                    style={{ zIndex: 999 }}
                  >
                    <ClickAwayListener
                      onClickAway={this.handleCloseMenuClickAway}
                    >
                      <Grow
                        in={openMenu}
                        id="menu-list"
                        style={{ transformOrigin: "0 0 0" }}
                      >
                        <Paper>
                          <MenuList role="menu">
                            <MenuItem onClick={this.handleLogout}>
                              Se déconnecter
                            </MenuItem>
                          </MenuList>
                        </Paper>
                      </Grow>
                    </ClickAwayListener>
                  </Popper>
                ) : null}
              </Manager>
            </div>
          );
        }
      } else {
        return (
          <div>
            <Avatar
              alt={props.app_store.user.displayName}
              src={props.app_store.user.photoURL}
              className={css(styles.avatar)}
            >
              <AccountIcon style={{ width: "100%", height: "100%" }} />
            </Avatar>
          </div>
        );
      }
    };

    let handleLogout = () => {
      firebaseApp.auth().signOut();
      this.props.appStore.adminMode = false;
    };

    let handleOpenDialog = () => {
      this.setState({ openDialog: true });
    };

    let signUp;
    if (!this.props.appStore.user) {
      signUp = (
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
      if (this.state.logingOutAnimation) {
        signUp = (
          <Fade timeout={{ enter: 1000, exit: 1000 }} in={true}>
            {signUp}
          </Fade>
        );
      }
    } else {
      signUp = (
        <div>
          <List>
            <ListItem button onClick={handleOpenDialog}>
              <ListItemText primary="Créer une page" />
            </ListItem>

            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Se déconnecter" />
            </ListItem>
          </List>
        </div>
      );
    }

    let RenderInterface = props => {
      let handleOpenDialog = () => {
        this.setState({ openDialog: true });
      };

      if (props.width > 750) {
        if (props.app_store.user) {
          return (
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              spacing={0}
            >
              <Grid item>
                <Tooltip
                  title="C'est gratuit !       Pour tout le monde !"
                  placement="bottom"
                >
                  <Button
                    onClick={handleOpenDialog}
                    className={css(styles.button)}
                  >
                    créer une page
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <AccountManagementIcon app_store={this.props.appStore} />
              </Grid>
            </Grid>
          );
        } else {
          return this.state.logingOutAnimation ? (
            <Fade timeout={{ enter: 1000, exit: 1000 }} in={true}>
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
            </Fade>
          ) : (
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
          );
        }
      } else {
        const displayName = props.app_store.user
          ? props.app_store.user.displayName
          : "";
        const photoURL = props.app_store.user
          ? props.app_store.user.photoURL
          : "";
        return (
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
            spacing={16}
          >
            <Grid item>
              <IconButton onClick={this.handleRightOpen}>
                <Avatar
                  alt={displayName}
                  src={photoURL}
                  className={css(styles.avatar)}
                >
                  {!photoURL && (
                    <AccountIcon style={{ width: "100%", height: "100%" }} />
                  )}
                </Avatar>
              </IconButton>
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
        );
      }
    };

    var refreshPage = () => {
      if (window.location.pathname === "/") {
        document.getElementsByClassName("ais-SearchBox__reset")[0].click();
      }
    };

    let dialogue = () => {
      const openDialog = this.state.openDialog;
      let quitState = { openDialog: false };
      const { pageTitle, status, model, checked, verified, width } = this.state;
      const base = rebase.createClass(firebaseApp.database());
      const user = this.props.appStore.user;
      let pages = this.state.firebase_user
        ? Object.assign({}, this.state.firebase_user.pages)
        : {};

      let handleCloseDialog = () => {
        this.setState({ openDialog: false });
      };
      let handleQuit = () => {
        this.setState(quitState);
      };

      let handleContinue = () => {
        let hash = crypto.randomBytes(2).toString("hex");
        let sanitizedPageTitle = pageTitle.replace(
          /(\s+)|(\.)|(#)|(%)|(\$)|(\/)|(\[)|(\])/g,
          "-"
        );
        sanitizedPageTitle = lodash.deburr(sanitizedPageTitle);
        let sanitizedPageTitleWithHash = `${sanitizedPageTitle}-${hash}`;
        let objectID = `${model}/${sanitizedPageTitleWithHash}`;

        let that = this;
        if (!pages[model]) {
          pages[model] = {};
        }
        pages[model][sanitizedPageTitleWithHash] = true;
        let type = null;
        if (model === "web") {
          type = "website";
        }

        base
          .update(`users/${user.uid}`, {
            data: { pages }
          })
          .then(() => {
            base
              .post(`directory/${objectID}`, {
                data: {
                  objectID: objectID,
                  name: pageTitle,
                  opening: {
                    Dimanche: {
                      afternoon: {
                        closing: "",
                        opening: ""
                      },
                      morning: {
                        closing: "",
                        opening: ""
                      }
                    },
                    Jeudi: {
                      afternoon: {
                        closing: "",
                        opening: ""
                      },
                      morning: {
                        closing: "",
                        opening: ""
                      }
                    },
                    Lundi: {
                      afternoon: {
                        closing: "",
                        opening: ""
                      },
                      morning: {
                        closing: "",
                        opening: ""
                      }
                    },
                    Mardi: {
                      afternoon: {
                        closing: "",
                        opening: ""
                      },
                      morning: {
                        closing: "",
                        opening: ""
                      }
                    },
                    Mercredi: {
                      afternoon: {
                        closing: "",
                        opening: ""
                      },
                      morning: {
                        closing: "",
                        opening: ""
                      }
                    },
                    Samedi: {
                      afternoon: {
                        closing: "",
                        opening: ""
                      },
                      morning: {
                        closing: "",
                        opening: ""
                      }
                    },
                    Vendredi: {
                      afternoon: {
                        closing: "",
                        opening: ""
                      },
                      morning: {
                        closing: "",
                        opening: ""
                      }
                    }
                  },
                  user,
                  type,
                  ranking: 1
                }
              })
              .then(() => {
                that.setState({ redirectTo: `/${objectID}` });
              })
              .catch(err => {
                if (err) {
                  console.error(err);
                }
              });
          })
          .catch(err => {
            if (err) {
              console.error(err);
            }
          });
      };

      let handleChangeChecked = () => {
        this.setState({ checked: !this.state.checked });
      };

      let handleVerified = () => {
        this.setState({ verified: true });
      };

      let continueDisabled = !checked || pageTitle.length < 3 || !verified;

      return (
        <div>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{`Créer une page`}</DialogTitle>
            <DialogContent>
              <Grid container direction={"column"} spacing={24}>
                <Grid item>
                  <DialogContentText>
                    {`Avant de créer une page, avez-vous vérifié que votre page n'existe pas déjà\u00a0 ?
                                     Si la page existe déjà, cliquez dans le menu de la page sur le lien\u00a0 :
                                    "Prendre le contrôle de cette page". Sinon, indiquez le titre de votre page ci-dessous\u00a0 :`}
                  </DialogContentText>
                </Grid>
                <Grid item>
                  <Input
                    value={pageTitle}
                    placeholder={"Titre de la page à créer"}
                    onChange={this.handleChange("pageTitle")}
                    inputProps={{
                      "aria-label": "Description"
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={16}
                    alignItems="center"
                  >
                    <Grid item>
                      <InputLabel htmlFor="status-simple">
                        Statut de la page :{" "}
                      </InputLabel>
                    </Grid>
                    <Grid item xs>
                      <Select
                        value={status}
                        onChange={this.handleChange("status")}
                        input={<Input name="statut" id="status-simple" />}
                        fullWidth
                      >
                        <MenuItem value={"admin"}>Classique</MenuItem>
                        <MenuItem disabled value={"collaborative"}>
                          Page collaborative (wiki)
                        </MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={16}
                    alignItems="center"
                  >
                    <Grid item>
                      <InputLabel htmlFor="model-simple">
                        Modèle de page :{" "}
                      </InputLabel>
                    </Grid>
                    <Grid item xs>
                      <FormControl fullWidth>
                        <Select
                          value={model}
                          onChange={this.handleChange("model")}
                          input={<Input name="model" id="model-simple" />}
                          fullWidth
                        >
                          <MenuItem value={"biz"}>Entreprise</MenuItem>
                          <MenuItem value={"aso"}>Association</MenuItem>
                          <MenuItem value={"int"}>Institution</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ paddingTop: "40px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checked}
                        onChange={handleChangeChecked}
                        value="checkedA"
                        style={{ color: "#008CD2" }}
                      />
                    }
                    label="Je certifie être le propriétaire de l'entité concernée ou être habilité à gérer la page de cette entité
                                et je demande à devenir l'administrateur de cette page."
                  />
                </Grid>
                <Grid item>
                  <Recaptcha
                    sitekey="6LfM2z8UAAAAAAFGS0eF9KQeNQKLMgnKv66ypgbg"
                    render="explicit"
                    hl="fr"
                    size={width < 600 ? "compact" : null}
                    verifyCallback={handleVerified}
                  />
                </Grid>
                <Grid item>
                  <DialogActions>
                    <Button onClick={handleQuit} style={{ color: "#008CD2" }}>
                      {`abandonner`}
                    </Button>
                    <Button
                      onClick={handleContinue}
                      disabled={continueDisabled}
                      style={{ color: continueDisabled ? "grey" : "#008CD2" }}
                    >
                      {`continuer`}
                    </Button>
                  </DialogActions>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </div>
      );
    };

    if (this.state.redirectTo) {
      this.props.router(this.state.redirectTo);
    }
    return (
      <Grid container direction="row" justify="space-between" spacing={0}>
        <Grid
          item
          xs={4}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          style={{ height: this.responsiveHeaderHeight(this.state.width) }}
        >
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={0}
            style={{ height: this.responsiveLogoHeight(this.state.width) }}
          >
            <Link href="/">
              <Tooltip title="Page d‘accueil" placement="bottom">
                <Grid item>
                  <svg
                    onClick={refreshPage.bind(this)}
                    style={{
                      width: "90%"
                    }}
                    viewBox="0 0 1115 235"
                    id="svg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g fillRule="nonzero">
                        <path
                          d="M160.83 12.8c18.79-10.76 41.48-14.28 62.7-10.16 15.83 3 30.8 10.37 42.86 21.06 17.77 15.44 29.03 38.06 30.73 61.54 1.59 19.48-3.22 39.37-13.65 55.92 1.25 1.12 2.49 2.26 3.74 3.38.4-.43 1.21-1.31 1.62-1.74.52.43 1.56 1.31 2.08 1.75 3.63-1.56 6.15 1.88 8.55 3.95 22.88 20.46 45.74 40.94 68.64 61.38 4.34 3.6 4.83 10.91.68 14.85-3.67 3.55-6.34 9.05-11.87 9.89-3.71.72-7.31-1.12-9.83-3.73-22.35-20.02-44.72-40.03-67.09-60.03-2.49-2.3-6.25-4.48-5.26-8.47-.44-.41-1.31-1.23-1.74-1.64.41-.7.83-1.4 1.24-2.1-.7-.6-2.1-1.81-2.8-2.41-11.72 12.46-27.31 21.07-43.89 25.13-21.08 5.06-43.99 2.52-63.27-7.5-19.84-10.06-35.7-27.7-43.67-48.48-7.5-19.47-8.08-41.53-1.63-61.38 6.92-21.49 22.17-40.15 41.86-51.21zm42.34 4.41c-24.66.9-48.42 14.66-61.22 35.8-9.49 15.33-13.31 34.15-10.18 51.94 2.87 17.56 12.28 33.98 26 45.31 13.36 11.22 30.73 17.66 48.2 17.43 15.34.19 30.63-4.75 43.17-13.54 14.21-10.01 24.94-24.95 29.48-41.76 5.49-19.64 2.45-41.42-8.16-58.82-13.74-23.07-40.49-37.55-67.29-36.36z"
                          fill="#43464A"
                        />
                        <path
                          d="M196.53 27.84c14.58-2.14 29.8.82 42.5 8.28 14.08 8.12 24.86 21.67 29.79 37.14 4.85 15.72 3.61 33.25-3.68 48.03-7.91 16.79-23.37 29.78-41.25 34.74-13.68 3.65-28.54 2.96-41.73-2.24-14.15-5.44-26.42-15.82-33.66-29.2-6.8-11.91-9-26.08-7.43-39.61 2.03-16.97 11.05-32.91 24.34-43.6 8.98-7.08 19.75-12.03 31.12-13.54zm1.93 25.87c-11.78 2.3-22.32 10.27-27.67 21.02-5.08 9.6-5.9 21.38-2.03 31.55 4.13 11.21 13.44 20.46 24.83 24.19 15.43 5.49 33.85-.17 43.72-13.18 7.26-9.14 10.12-21.58 7.49-32.97-2.69-11.22-10.11-21.41-20.42-26.76-7.84-4.3-17.18-5.61-25.92-3.85zM995.525 55.785c9.678-7.435 21.717-11.42 33.675-10.815 13.937.718 27.255 7.65 36.957 18.18-4.92 5.264-9.873 10.486-14.8 15.724-5.63-5.748-12.676-10.217-20.52-11.307-11.2-1.737-22.8 3.916-29.585 13.374-4.578 6.38-6.981 14.505-6.557 22.527.366 10.85 6.133 21.223 14.727 27.058 7.755 5.438 17.823 6.899 26.694 3.994 6.46-2.161 11.868-6.717 16.755-11.54 4.985 5.134 9.946 10.295 14.842 15.534-7.03 7.598-15.559 13.814-25.105 17.228-14.19 4.781-30.36 3.043-43.124-5.186-10.361-6.44-18.376-16.883-22.514-28.821-3.34-9.069-3.894-19.001-2.851-28.597 2.003-14.817 9.93-28.64 21.406-37.353zM862.677 44.962c3.112-.009 6.231 0 9.351-.026 18.817 21.992 37.438 44.165 56.214 66.192.016-21.698-.016-43.405.016-65.103 6.957-.017 13.913-.017 20.87 0 .024 37.431.008 74.871.008 112.302-3.194.018-6.379.009-9.563.018-18.679-21.992-37.3-44.053-56.002-66.028 0 21.62.008 43.24 0 64.87h-20.902c0-37.406-.017-74.82.008-112.225z"
                          fill="#008CD2"
                        />
                        <path
                          d="M577 28.49c8.6 0 17.19-.01 25.79.01.01 34.23-.02 68.46.01 102.7 17.16.03 34.31 0 51.47.01.01 8.6 0 17.19 0 25.78-25.76.02-51.51.01-77.27.01 0-42.84-.01-85.67 0-128.51zm105.01-.01c27.59.02 55.18 0 82.77.01.02 8.59.01 17.18.01 25.78-18.99.02-37.98-.01-56.96.01-.07 8.48-.07 16.96 0 25.44 13.81.02 27.62-.01 41.44.01.01 8.69.01 17.37 0 26.06-13.83.01-27.65-.02-41.47.01-.02 8.47-.02 16.93 0 25.4 18.99.05 37.98-.03 56.96.04.06 8.58.01 17.17.03 25.76H682c.01-42.84-.02-85.68.01-128.52z"
                          fill="#43464A"
                        />
                        <path
                          d="M46.01 30.13c15.01-4.76 31.76-3.74 46.05 2.9 8 3.58 15.05 8.92 21.37 14.93-5.87 6.24-11.82 12.4-17.72 18.62-6.76-6.18-14.82-11.28-23.92-13.02-13.23-2.51-27.44 2.84-36.1 13.05-7.95 9.17-11.59 22.04-9.12 33.98 2.99 15.76 16.4 28.85 32.24 31.4 9.5 1.69 19.37-.59 27.7-5.27-.05-5.57-.01-11.14-.02-16.71-8.26-.02-16.51 0-24.76-.02 0-8.59-.01-17.18 0-25.78 16.76-.01 33.51 0 50.26 0 .01 18.33.01 36.66 0 54.99-10.37 9.17-22.88 16.65-36.82 18.43-16.78 2.48-34.5-1.42-48.22-11.52C11.79 135.36 2.02 117.69.37 99.24c-1.31-13.62 1.42-27.7 8.4-39.52C16.76 45.53 30.5 34.9 46.01 30.13zm256.21-1.63c8.52-.01 17.04-.03 25.56.01.01 25.51.02 51.01 0 76.52-.1 8.59 3.39 17.52 10.4 22.76 6.46 5.1 15.79 6.21 23.23 2.63 9.33-4.18 14.63-14.5 14.76-24.44.09-25.82.01-51.65.04-77.48 8.6-.03 17.19-.01 25.78-.01.02 23.52.01 47.03.01 70.55.09 9.02.25 18.28-2.81 26.9-3.78 11.59-12.27 21.59-23.27 26.91-10.64 5.5-23.19 6.57-34.87 4.47-13.67-2.52-26.24-11.16-32.71-23.57-4.15-7.54-6.15-16.17-6.14-24.76.03-26.83 0-53.66.02-80.49zm167.86 3.71c15.96-6.74 34.68-6.76 50.54.3 8.44 3.59 15.98 9.02 22.51 15.43-5.62 6.44-11.87 12.27-17.51 18.68-6.69-5.96-14.48-11.09-23.38-12.93-13.58-2.86-28.31 2.67-37.11 13.3-4.95 5.97-8.3 13.31-9.19 21.05-1.61 11.86 2.69 24.35 11.25 32.72 7.18 7.41 17.43 11.81 27.77 11.77 7.44.11 14.73-2.2 21.22-5.73.06-5.6.02-11.2.03-16.79-8.24-.02-16.48 0-24.72-.01-.02-8.58.02-17.16-.02-25.74 16.84-.11 33.68-.02 50.52-.05.02 18.25-.01 36.49.02 54.74-9.92 8.92-21.88 16.17-35.19 18.41-15.83 2.62-32.78 0-46.37-8.8-16.38-9.87-27.44-27.57-29.97-46.44-1.57-13.28-.05-27.25 6.35-39.16 6.83-13.88 18.94-24.93 33.25-30.75z"
                          fill="#008CD2"
                        />
                        <path
                          d="M804.45 127.67c5.8-2.15 12.98-1.05 17.31 3.57 6.22 6.01 6.06 17.28-.5 23-6.46 6.3-18.17 5.19-23.48-2.08-6.34-7.82-2.87-21.02 6.67-24.49z"
                          fill="#43464A"
                        />
                      </g>
                      <path
                        d="M646.276 223.167c0 1.298.365 2.299 1.095 3.002.73.703 1.718 1.055 2.962 1.055 1.569 0 2.61-.46 3.124-1.38.514-.919.825-1.838.933-2.758h8.276c0 3.624-1.11 6.545-3.327 8.763-1.082 1.136-2.38 2.028-3.894 2.677-1.515.65-3.219.974-5.112.974-2.597 0-4.8-.54-6.613-1.623-1.812-1.082-3.205-2.515-4.178-4.3-.595-1.082-1.001-2.326-1.217-3.732-.217-1.407-.325-2.948-.325-4.625v-13.55c0-1.677.108-3.219.325-4.625.216-1.406.622-2.65 1.217-3.732.973-1.785 2.366-3.219 4.178-4.3 1.812-1.082 4.016-1.623 6.613-1.623 1.893 0 3.61.324 5.152.973 1.542.65 2.853 1.542 3.935 2.678 2.164 2.434 3.246 5.598 3.246 9.493h-8.276c0-1.677-.365-2.907-1.096-3.692-.73-.784-1.717-1.176-2.961-1.176-1.244 0-2.231.392-2.962 1.176-.73.785-1.095 1.961-1.095 3.53v16.795zm21.258-31.643v-14.28h8.276v8.275l-8.276 6.005zm39.027 26.045h-16.39v5.598c0 1.298.365 2.299 1.096 3.002.73.703 1.717 1.055 2.961 1.055 1.569 0 2.61-.46 3.124-1.38.514-.919.825-1.838.933-2.758h8.276c0 3.624-1.109 6.545-3.327 8.763-1.081 1.136-2.38 2.028-3.894 2.677-1.515.65-3.219.974-5.112.974-2.596 0-4.8-.54-6.613-1.623-1.812-1.082-3.204-2.515-4.178-4.3-.595-1.082-1-2.326-1.217-3.732-.217-1.407-.325-2.948-.325-4.625v-13.55c0-1.677.108-3.219.325-4.625.216-1.406.622-2.65 1.217-3.732.974-1.785 2.366-3.219 4.178-4.3 1.813-1.082 4.017-1.623 6.613-1.623 1.893 0 3.61.324 5.152.973 1.542.65 2.854 1.542 3.936 2.678 2.163 2.434 3.245 5.49 3.245 9.168v11.36zm-16.39-6.491h8.114v-4.706c0-1.569-.365-2.745-1.095-3.53-.73-.784-1.718-1.176-2.962-1.176-1.244 0-2.231.392-2.961 1.176-.73.785-1.096 1.961-1.096 3.53v4.706zm37.486-5.68c-.054-1.406-.5-2.461-1.339-3.164a4.355 4.355 0 0 0-2.88-1.055c-1.299 0-2.3.42-3.002 1.258a4.355 4.355 0 0 0-1.055 2.88c0 .757.189 1.501.568 2.231.378.73 1.352 1.393 2.92 1.988l4.869 1.947c3.083 1.19 5.206 2.813 6.37 4.869 1.162 2.055 1.744 4.3 1.744 6.734 0 1.73-.311 3.34-.933 4.828a12.825 12.825 0 0 1-2.556 3.935c-1.082 1.136-2.38 2.028-3.895 2.677-1.514.65-3.164.974-4.95.974-3.353 0-6.166-1.055-8.438-3.164-1.135-1.028-2.055-2.313-2.758-3.854-.703-1.542-1.082-3.34-1.136-5.396h7.789a7.884 7.884 0 0 0 1.177 3.164c.622.974 1.717 1.46 3.286 1.46 1.19 0 2.258-.391 3.205-1.176.946-.784 1.42-1.88 1.42-3.286 0-1.136-.298-2.11-.893-2.92-.595-.812-1.677-1.515-3.246-2.11l-3.975-1.46c-2.597-.974-4.639-2.421-6.126-4.342-1.488-1.92-2.231-4.26-2.231-7.018 0-1.73.324-3.34.973-4.828a11.746 11.746 0 0 1 2.678-3.854 10.93 10.93 0 0 1 3.813-2.474c1.46-.568 3.03-.852 4.706-.852 1.677 0 3.232.297 4.666.892a10.663 10.663 0 0 1 3.691 2.516c1.028 1.081 1.84 2.366 2.434 3.854a12.66 12.66 0 0 1 .893 4.746h-7.79zm13.55-11.521V181.38h8.276v12.496h5.111v6.49h-5.111v22.8c0 .974.094 1.731.284 2.272.189.54.5.947.933 1.217.432.27.96.433 1.582.487a27.43 27.43 0 0 0 2.312.081v7.79h-3.407c-1.894 0-3.476-.298-4.747-.893s-2.285-1.353-3.043-2.272a8.924 8.924 0 0 1-1.663-3.124c-.352-1.163-.527-2.285-.527-3.367v-24.99h-4.138v-6.491h4.138zm31.643 0V181.38h8.276v12.496h5.112v6.49h-5.112v22.8c0 .974.095 1.731.284 2.272.19.54.5.947.933 1.217.433.27.96.433 1.582.487a27.43 27.43 0 0 0 2.313.081v7.79h-3.408c-1.893 0-3.475-.298-4.746-.893-1.272-.595-2.286-1.353-3.043-2.272a8.924 8.924 0 0 1-1.663-3.124c-.352-1.163-.528-2.285-.528-3.367v-24.99h-4.138v-6.491h4.138zm15.822 13.793c0-1.677.108-3.219.325-4.625.216-1.406.622-2.65 1.217-3.732.973-1.785 2.366-3.219 4.178-4.3 1.812-1.082 4.016-1.623 6.613-1.623 2.596 0 4.8.54 6.613 1.622 1.812 1.082 3.204 2.516 4.178 4.3.595 1.083 1 2.327 1.217 3.733.217 1.406.325 2.948.325 4.625v13.55c0 1.677-.108 3.218-.325 4.625-.216 1.406-.622 2.65-1.217 3.732-.974 1.785-2.366 3.218-4.178 4.3-1.813 1.082-4.017 1.623-6.613 1.623-2.597 0-4.8-.54-6.613-1.623-1.812-1.082-3.205-2.515-4.178-4.3-.595-1.082-1.001-2.326-1.217-3.732-.217-1.407-.325-2.948-.325-4.625v-13.55zm8.276 14.848c0 1.569.365 2.745 1.095 3.53.73.784 1.718 1.176 2.962 1.176 1.244 0 2.231-.392 2.961-1.176.73-.785 1.096-1.961 1.096-3.53v-16.146c0-1.569-.365-2.745-1.096-3.53-.73-.784-1.717-1.176-2.961-1.176-1.244 0-2.231.392-2.962 1.176-.73.785-1.095 1.961-1.095 3.53v16.146zm47.222-28.641v41.136h-8.276v-3.976h-.162c-.866 1.299-1.907 2.367-3.124 3.205-1.217.839-2.772 1.258-4.666 1.258a9.474 9.474 0 0 1-3.083-.527 7.136 7.136 0 0 1-2.758-1.745c-.812-.811-1.46-1.852-1.948-3.124-.487-1.27-.73-2.826-.73-4.665v-31.562h8.276v28.479c0 1.514.352 2.704 1.055 3.57.703.865 1.704 1.298 3.002 1.298 1.569 0 2.65-.487 3.245-1.46.595-.974.893-2.38.893-4.22v-27.667h8.276zm6.815 0V181.38h8.276v12.496h5.112v6.49h-5.112v22.8c0 .974.095 1.731.284 2.272.19.54.5.947.934 1.217.432.27.96.433 1.582.487a27.43 27.43 0 0 0 2.312.081v7.79h-3.408c-1.893 0-3.475-.298-4.746-.893-1.271-.595-2.286-1.353-3.043-2.272a8.924 8.924 0 0 1-1.663-3.124c-.352-1.163-.528-2.285-.528-3.367v-24.99h-4.138v-6.491h4.138zm31.644 0V181.38h8.276v12.496h5.112v6.49h-5.112v22.8c0 .974.095 1.731.284 2.272.19.54.5.947.933 1.217.433.27.96.433 1.582.487a27.43 27.43 0 0 0 2.313.081v7.79h-3.408c-1.893 0-3.475-.298-4.747-.893-1.27-.595-2.285-1.353-3.042-2.272a8.924 8.924 0 0 1-1.664-3.124c-.351-1.163-.527-2.285-.527-3.367v-24.99h-4.138v-6.491h4.138zm16.552 41.136v-41.136h8.276v4.381c1.677-1.515 3.327-2.705 4.95-3.57 1.622-.866 3.624-1.298 6.004-1.298v8.763a6.713 6.713 0 0 0-2.516-.487c-.865 0-1.798.148-2.799.446-1 .298-1.907.798-2.718 1.501-.866.703-1.569 1.623-2.11 2.759-.54 1.136-.811 2.542-.811 4.219v24.422h-8.276zm21.34-27.343c0-1.677.107-3.219.324-4.625.216-1.406.622-2.65 1.217-3.732.973-1.785 2.366-3.219 4.178-4.3 1.812-1.082 4.017-1.623 6.613-1.623s4.8.54 6.613 1.622c1.812 1.082 3.205 2.516 4.178 4.3.595 1.083 1 2.327 1.217 3.733.217 1.406.325 2.948.325 4.625v13.55c0 1.677-.108 3.218-.325 4.625-.216 1.406-.622 2.65-1.217 3.732-.973 1.785-2.366 3.218-4.178 4.3-1.812 1.082-4.017 1.623-6.613 1.623s-4.8-.54-6.613-1.623c-1.812-1.082-3.205-2.515-4.178-4.3-.595-1.082-1.001-2.326-1.217-3.732-.217-1.407-.325-2.948-.325-4.625v-13.55zm8.275 14.848c0 1.569.365 2.745 1.095 3.53.73.784 1.718 1.176 2.962 1.176 1.244 0 2.231-.392 2.961-1.176.73-.785 1.096-1.961 1.096-3.53v-16.146c0-1.569-.365-2.745-1.096-3.53-.73-.784-1.717-1.176-2.961-1.176-1.244 0-2.231.392-2.962 1.176-.73.785-1.095 1.961-1.095 3.53v16.146zm47.222-28.641v41.136h-8.276v-3.976h-.162c-.866 1.299-1.907 2.367-3.124 3.205-1.217.839-2.772 1.258-4.665 1.258a9.474 9.474 0 0 1-3.084-.527 7.136 7.136 0 0 1-2.758-1.745c-.812-.811-1.46-1.852-1.948-3.124-.486-1.27-.73-2.826-.73-4.665v-31.562h8.276v28.479c0 1.514.352 2.704 1.055 3.57.703.865 1.704 1.298 3.002 1.298 1.569 0 2.65-.487 3.246-1.46.595-.974.892-2.38.892-4.22v-27.667h8.276zm32.05 0l-10.71 41.136h-7.303l-10.71-41.136h8.762l5.518 26.288h.162l5.517-26.288h8.763zm26.775 23.692h-16.39v5.598c0 1.298.365 2.299 1.095 3.002.73.703 1.718 1.055 2.962 1.055 1.568 0 2.61-.46 3.123-1.38.514-.919.825-1.838.934-2.758h8.276c0 3.624-1.11 6.545-3.327 8.763-1.082 1.136-2.38 2.028-3.895 2.677-1.514.65-3.218.974-5.111.974-2.597 0-4.8-.54-6.613-1.623-1.812-1.082-3.205-2.515-4.179-4.3-.595-1.082-1-2.326-1.217-3.732-.216-1.407-.324-2.948-.324-4.625v-13.55c0-1.677.108-3.219.324-4.625.217-1.406.622-2.65 1.217-3.732.974-1.785 2.367-3.219 4.179-4.3 1.812-1.082 4.016-1.623 6.613-1.623 1.893 0 3.61.324 5.152.973 1.542.65 2.853 1.542 3.935 2.678 2.164 2.434 3.246 5.49 3.246 9.168v11.36zm-16.39-6.491h8.114v-4.706c0-1.569-.366-2.745-1.096-3.53-.73-.784-1.717-1.176-2.961-1.176-1.244 0-2.232.392-2.962 1.176-.73.785-1.095 1.961-1.095 3.53v4.706zm-1.217-22.638l7.302-11.44h8.763l-10.71 11.44h-5.355zm43.084 32.293l-3.165-43.49h10.386l-3.164 43.49h-4.057zm-2.11 14.28v-8.276h8.276v8.276h-8.276z"
                        fill="#43464A"
                      />
                    </g>
                  </svg>
                </Grid>
              </Tooltip>
            </Link>
          </Grid>
        </Grid>

        <Grid
          item
          xs={4}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          style={{ height: this.responsiveHeaderHeight(this.state.width) }}
        >
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={0}
            style={{ height: "100%" }}
          >
            <Grid item>
              {dialogue()}
              <RenderInterface
                width={this.state.width}
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

export default withRouter(Header);
