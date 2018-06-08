import React, { Fragment } from "react";
import { Pagination, Configure, Stats } from "react-instantsearch/dom";
import SearchBox from "./algolia/searchBox";
import Hits from "./algolia/hits";
import { InstantSearch } from "./instantsearch";
import { css } from "aphrodite";
import Divider from "@material-ui/core/Divider";
import Footer from "./footer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import aphrodite from "../utils/aphrodite";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "next/link";
import Router from "next/router";
import QwarxLogo from "./qwarxLogo";
import Display from "../utils/display";
import Button from "@material-ui/core/Button";
import { connectStateResults } from "react-instantsearch/connectors";
import qs from "qs";
import Wrapper from "../components/wrapper";
const searchStateToUrl = searchState =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : "";
import LandingPage from "./landingPage";
if (process.browser) {
  require("../static/react-instantsearch-override.css");
  require("../static/main.css");
  require("../static/algolia-min.css");
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchState: this.props.searchState,
      resultsState: this.props.resultsState,
      homePage: false
    };
    this.goBackToHomePage = this.goBackToHomePage.bind(this);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  updateWidth() {
    this.setState({ width: window.innerWidth });
  }

  goBackToHomePage() {
    Router.push("/", "/", { shallow: true });
    this.setState({ homePage: true });
  }

  onSearchStateChange = searchState => {
    if (!searchState.page || !searchState.query) {
      return;
    }

    const statePage = this.state.searchState.page
      ? this.state.searchState.page
      : 1;

    if (
      searchState.query === this.state.searchState.query &&
      searchState.page === statePage
    ) {
      return;
    }

    // if SSR, no need to sync the state to the URL
    if (process.browser) {
      const href = searchStateToUrl(searchState);
      if (href !== "/?") {
        Router.push(href, href, { shallow: true });
      }
    }
    this.setState({ searchState });
  };

  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth);
    if (!this.state.searchState) {
      this.setState({ searchState: qs.parse(window.location.search.slice(1)) });
    }
  }

  render() {
    const Content = connectStateResults(
      ({ tablet_desktop, mobile, searchState, searchResults }) => {
        let hits = <Hits tablet_desktop={tablet_desktop} mobile={mobile} />;
        if (!searchState.query || !searchState.query.length) {
          hits = null;
        }
        if (searchResults && !searchResults.nbHits) {
          hits = null;
        }
        return hits;
      }
    );

    const tabs = () => {
      return (
        <Tabs
          value={0}
          indicatorColor="secondary"
          textColor="secondary"
          className={css(aphrodite.contentLeft)}
        >
          <Tab label="tout" />
          <Tab label="images" />
          <Tab label="carte" />
        </Tabs>
      );
    };

    const tablet_desktop = () => {
      return (
        <div>
          <Grid
            container
            direction="row"
            spacing={0}
            style={{ marginTop: "10px" }}
            alignItems={"center"}
          >
            <Grid item>
              <QwarxLogo
                cn={css(
                  aphrodite.gougleLogo,
                  aphrodite.topScreenPadding,
                  aphrodite.gougleLogoMarginDesktop
                )}
                goBackToHomePage={this.goBackToHomePage}
              />
            </Grid>
            <Grid item xs>
              <SearchBox tablet_desktop />
            </Grid>
            <Grid item>
              <Grid container direction="row" justify="flex-end">
                <Grid
                  item
                  style={{
                    marginRight: "10px"
                  }}
                >
                  <Link href="/enregistrer">
                    <Button
                      color="primary"
                      size="medium"
                      variant="outlined"
                      onClick={() => {}}
                    >
                      se connecter
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: "5px" }} />
          {/*{tabs()}*/}
          <div style={{ minHeight: "40px" }}>
            <Stats
              className={css(aphrodite.searchResultsPaddingLeft)}
              translate={(ctxt, n, ms) => {
                let res;
                let mili;
                if (!n) {
                  res = `aucun résultats`;
                } else if (n === 1) {
                  res = `1 résultat`;
                } else {
                  res = `${n.toLocaleString()} résultats`;
                }
                if (!n) {
                  mili = ``;
                } else if (ms === 1) {
                  mili = ` (0.01 secondes)`;
                } else if (ms < 10) {
                  mili = ` (0.0${ms.toLocaleString()} secondes)`;
                } else {
                  mili = ` (0.${ms.toLocaleString()} secondes)`;
                }

                return `${res}${mili}`;
              }}
            />
          </div>
          <div className={css(aphrodite.wrapperMinHeight)}>
            <Content tablet_desktop />
            <Pagination showPrevious={false} showFirst={false} />
          </div>
          <Footer />
        </div>
      );
    };

    const mobile = () => {
      const { open } = this.props;
      const handleOpenDialog = () => {
        this.setState({ openDialog: true });
      };
      const displayName = "";
      const photoURL = "";

      return (
        <Fragment>
          <div
            className={css(
              aphrodite.contentTop,
              aphrodite.contentLeft,
              aphrodite.contentRight,
              aphrodite.mobileGreyBackground
            )}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={0}
              className={css(aphrodite.contentBottom)}
            >
              <Grid item>
                <MenuIcon
                  className={css(aphrodite.topScreenPadding)}
                  onClick={this.handleRightOpen}
                />
                <Drawer
                  anchor="right"
                  open={open}
                  onClose={this.handleRightClose}
                  onClick={this.handleRightClose}
                >
                  <List disablePadding>
                    <Link href={"/enregistrer"}>
                      <ListItem button>
                        <ListItemText primary="se connecter" />
                      </ListItem>
                    </Link>
                  </List>
                </Drawer>
              </Grid>
              <Grid item>
                <Link href={"/"}>
                  <QwarxLogo
                    cn={css(aphrodite.gougleLogo, aphrodite.topScreenPadding)}
                    goBackToHomePage={this.goBackToHomePage}
                  />
                </Link>
              </Grid>
              <Grid item />
            </Grid>
          </div>
          <SearchBox mobile />
          {/*{tabs()}*/}
          <Divider style={{ marginTop: "8px" }} />
          <div>
            <Stats
              className={css(aphrodite.searchResultsPaddingLeft)}
              translate={(ctxt, n, ms) => {
                let res;
                let mili;
                if (!n) {
                  res = `aucun résultats`;
                } else if (n === 1) {
                  res = `1 résultat`;
                } else {
                  res = `${n.toLocaleString()} résultats`;
                }
                if (!n) {
                  mili = ``;
                } else if (ms === 1) {
                  mili = ` (0.01 secondes)`;
                } else if (ms < 10) {
                  mili = ` (0.0${ms.toLocaleString()} secondes)`;
                } else {
                  mili = ` (0.${ms.toLocaleString()} secondes)`;
                }

                return `${res}${mili}`;
              }}
            />
          </div>
          <div className={css(aphrodite.wrapperMinHeight)}>
            <Content mobile />
            <Pagination
              showFirst={false}
              translations={{
                previous: "précédent",
                next: "suivant"
              }}
            />
          </div>
          <Footer />
        </Fragment>
      );
    };
    return (
      <Wrapper>
        {this.state.homePage ? (
          <LandingPage />
        ) : (
          <InstantSearch
            appId="5NXUF7YDRN"
            apiKey="458ab22e25a2ddf3a174bf03678c9281"
            indexName="qwarx.nc"
            // resultsState is generated from index.js, will be used only once on SSR, not needed
            // afterwards, so no need to sync it on the state
            resultsState={this.props.resultsState}
            // search state need to be maintained localy, since we are in a controlled mode
            // the searchState can come from index.js, or locally
            searchState={
              this.state && this.state.searchState
                ? this.state.searchState
                : this.props.searchState
            }
            onSearchStateChange={this.onSearchStateChange}
          >
            <Configure hitsPerPage={10} />
            {process.browser ? (
              <Fragment>
                <Display format="mobile" css>
                  {this.state.width < 960 ? mobile() : null}
                </Display>
                <Display format="tablet-desktop" css>
                  {this.state.width >= 960 ? tablet_desktop() : null}
                </Display>
              </Fragment>
            ) : (
              <Fragment>
                <Display format="mobile" css>
                  {mobile()}
                </Display>
                <Display format="tablet-desktop" css>
                  {tablet_desktop()}
                </Display>
              </Fragment>
            )}
          </InstantSearch>
        )}
      </Wrapper>
    );
  }
}

export default SearchPage;
