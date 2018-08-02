import React, { Fragment } from "react";
import { Pagination, Configure, Stats, Index } from "react-instantsearch/dom";
import SearchBox from "./algolia/searchBox";
import Hits from "./algolia/hits";
import { InstantSearch } from "./instantsearch";
import { css } from "aphrodite";
import Divider from "@material-ui/core/Divider";
import Footer from "./footer";
import Tabs from "./mui/tabsSearchPage";
import Tab from "./mui/tabSearchPage";
import aphrodite from "../utils/aphrodite";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import Display from "../utils/display";
import {
  connectStateResults,
  connectRefinementList
} from "react-instantsearch/connectors";
import qs from "qs";
const searchStateToUrl = searchState =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : "";
import LandingPage from "./landingPage";
import debounce from "lodash/debounce";
import MobileTextLogo from "./mobileTextLogo";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "next/router";

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
      homePage: false,
      rndDidYouKnowText: Math.floor(Math.random() * 6),
      tab: this.props.tab ? this.props.tab : 0
    };
    this.goBackToHomePage = this.goBackToHomePage.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
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

  onSearchStateChange = (searchState, tab) => {
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
      if (tab && this.state.tab !== tab) {
        let href = searchStateToUrl(searchState);
        if (href !== "/?") {
          const endStr =
            href.indexOf("&tab") !== -1 ? href.indexOf("&tab") : href.length;
          href = href.substring(0, endStr);
          href = `${href}&tab=${tab}`;
          Router.push(href, href, { shallow: true });
        }
        this.setState({ tab });
      }
      return;
    }

    // if SSR, no need to sync the state to the URL
    if (process.browser) {
      let href = searchStateToUrl(searchState);
      if (href !== "/?") {
        const endStr =
          href.indexOf("&tab") !== -1 ? href.indexOf("&tab") : href.length;
        href = href.substring(0, endStr);
        href = `${href}&tab=${tab}`;
        Router.push(href, href, { shallow: true });
      }
    }
    if (tab) {
      this.setState({ searchState, tab });
    } else {
      this.setState({ searchState });
    }
  };

  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", debounce(this.updateWidth, 150));
    if (!this.state.searchState) {
      this.setState({ searchState: qs.parse(window.location.search.slice(1)) });
    }
  }

  handleTabChange = (event, tab) => {
    const asPath = this.props.router.asPath;
    const endStr =
      asPath.indexOf("&tab") !== -1 ? asPath.indexOf("&tab") : asPath.length;
    const path = asPath.substring(0, endStr);
    const str = `${path}&tab=${tab}`;
    Router.push(str, str, { shallow: true });
    this.setState({ tab });
  };

  render() {
    const Content = connectStateResults(
      ({ tablet_desktop, mobile, searchState, searchResults }) => {
        let hits = (
          <Hits
            tablet_desktop={tablet_desktop}
            mobile={mobile}
            map={this.state.tab === 5}
            width={this.state.width}
            rndDidYouKnowText={this.state.rndDidYouKnowText}
            onSearchStateChange={this.onSearchStateChange}
          />
        );
        if (!searchState.query || !searchState.query.length) {
          hits = null;
        }
        if (searchResults && !searchResults.nbHits) {
          hits = null;
        }
        return hits;
      }
    );

    const RefinementList = connectRefinementList(props => {
      return null;
    });

    const tabs = () => {
      return (
        <Tabs
          value={this.state.tab}
          indicatorColor="secondary"
          textColor="secondary"
          className={css(aphrodite.contentLeft, aphrodite.mobileGreyBackground)}
          onChange={this.handleTabChange}
          scrollable
          scrollButtons="off"
        >
          <Tab label="tout" />
          <Tab label="annonces" />
          <Tab label="immobilier" />
          <Tab label="shopping" />
          <Tab label="actualités" />
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
            style={{ marginTop: "5px" }}
            alignItems={"center"}
          >
            <Grid item>
              <img
                src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo.png`}
                srcSet={`
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo.png,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_2.0/qwarx-logo.png 2x,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_3.0/qwarx-logo.png 3x
                `}
                alt={`qwarx logo`}
                onClick={e => {
                  e.preventDefault();
                  this.goBackToHomePage ? this.goBackToHomePage() : null;
                }}
                style={{
                  marginTop: "3px",
                  marginBottom: "3px",
                  cursor: this.goBackToHomePage ? "pointer" : "unset",
                  marginLeft: "5px",
                  marginRight: "5px"
                }}
              />
            </Grid>
            <Grid item xs>
              <SearchBox tablet_desktop/>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: "5px" }} />
          {tabs()}
          <div>
            <Typography component={"span"} variant={"caption"}>
              <Stats
                className={css(aphrodite.searchResultsPaddingLeft)}
                translate={(ctxt, n, ms) => {
                  let res;
                  let mili;
                  if (!n) {
                    res = `aucun résultat`;
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
            </Typography>
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
                <img
                  src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo.png`}
                  srcSet={`
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo.png,
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_2.0/qwarx-logo.png 2x,
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_3.0/qwarx-logo.png 3x
                    `}
                  alt={`qwarx logo`}
                  onClick={e => {
                    e.preventDefault();
                    this.goBackToHomePage ? this.goBackToHomePage() : null;
                  }}
                  style={{
                    marginTop: "3px",
                    marginBottom: "3px",
                    cursor: this.goBackToHomePage ? "pointer" : "unset"
                  }}
                />
              </Grid>
              <Grid item>
                <MobileTextLogo />
              </Grid>
            </Grid>
          </div>
          <SearchBox mobile/>
          {tabs()}
          <Divider style={{ marginTop: "8px" }} />
          <div>
            <Typography component={"span"} variant={"caption"}>
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
            </Typography>
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
    const tab = this.state.tab;
    let refinement;
    if (tab === 0) {
      refinement = [];
    }
    if (tab === 1) {
      refinement = ["classifieds"];
    }
    if (tab === 2) {
      refinement = ["realestate"];
    }
    if (tab === 3) {
      refinement = ["ecommerce"];
    }
    if (tab === 4) {
      refinement = ["infos"];
    }
    if (tab === 5) {
      refinement = ["directory", "address", "facebook"];
    }
    return (
      <Fragment>
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
            <RefinementList
              attribute="category"
              defaultRefinement={refinement}
            />
            <Fragment>
              <Display format="mobile" css>
                {process.browser
                  ? this.state.width < 960 ? mobile() : null
                  : mobile()}
              </Display>
              <Display format="tablet-desktop" css>
                {process.browser
                  ? this.state.width >= 960 ? tablet_desktop() : null
                  : tablet_desktop()}
              </Display>
            </Fragment>
          </InstantSearch>
        )}
      </Fragment>
    );
  }
}

export default withRouter(SearchPage);
