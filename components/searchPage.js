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
import debounce from "lodash/debounce";
import MobileTextLogo from "./mobileTextLogo";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "next/router";
import Head from "next/head";

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
      rndDidYouKnowText: Math.floor(Math.random() * 6),
      tab: this.props.tab ? this.props.tab : 0
    };
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

  onSearchStateChange = (searchState, tab) => {
    if (searchState.configure) {
      delete searchState["configure"];
    }
    if (searchState.hitsPerPage) {
      delete searchState["hitsPerPage"];
    }
    if (!tab) {
      tab = 0;
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
      searchState = qs.parse(window.location.search.slice(1));
      this.setState({ searchState });
    }
    let href = searchStateToUrl(this.state.searchState);
    if (href !== "/?") {
      Router.push(href, href, { shallow: true });
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
            tab={this.state.tab}
            width={this.state.width}
            rndDidYouKnowText={this.state.rndDidYouKnowText}
            onSearchStateChange={this.onSearchStateChange}
          />
        );
        const noResults = !searchState.query || !searchState.query.length;
        if (noResults) {
          let tabName = "";
          let noSearchmsg = "";
          let width = mobile ? 80 : 115;
          switch (tab) {
            case 0:
              tabName = "Tout";
              noSearchmsg = `Dans cet onglet vous accédez à toutes les catégories : sites généralistes, petites annonces, annonces immobilières, ecommerce, sites d’infos, etc. en Nouvelle-Calédonie.`;
              break;
            case 1:
              tabName = "Annonces";
              noSearchmsg = `Dans cet onglet vous accédez à toutes les petites-annonces trouvées sur tous les sites de petites-annonces en Nouvelle-Calédonie.`;
              break;
            case 2:
              tabName = "Immobilier";
              noSearchmsg = `Dans cet onglet vous accédez à toutes les petites-annonces immobilières trouvées sur tous les sites d’immobilier en Nouvelle-Calédonie.`;
              break;
            case 3:
              tabName = "Shopping";
              noSearchmsg = `Dans cet onglet vous accédez à tous les articles vendus par les sites de e-commerce en Nouvelle-Calédonie.`;
              break;
            case 4:
              tabName = "Infos";
              noSearchmsg = `Dans cet onglet vous accédez à tous les articles publiés par les sites d’informations en Nouvelle-Calédonie`;
              break;
            case 5:
              tabName = "Annuaires";
              noSearchmsg = `Dans cet onglet vous accédez à tous les pages d'entreprises, particuliers, lieux... possédant une adresse en Nouvelle-Calédonie`;
              break;
            case 6:
              tabName = "Adresses";
              noSearchmsg = `Dans cet onglet vous accédez à toutes les adresses geolocalisées sur Nouméa`;
              break;
            default:
          }
          hits = (
            <Grid
              container
              style={{ height: "100%", marginLeft: mobile ? "0px" : "120px" }}
              spacing={40}
            >
              <Grid item>
                <img
                  src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_${width},dpr_1.0/qwarx_landing_page.png`}
                  srcSet={`
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_${width},dpr_1.0/qwarx_landing_page.png,
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_${width},dpr_2.0/qwarx_landing_page.png 2x,
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_${width},dpr_3.0/qwarx_landing_page.png 3x
                            `}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant={"headline"}
                  component={"h1"}
                  color={"primary"}
                  gutterBottom
                >
                  {`Pas de résultat dans l'onglet ${tabName}`}
                </Typography>
                <Typography
                  variant={"subheading"}
                  component={"p"}
                  color={"primary"}
                  style={{
                    maxWidth: "580px",
                    marginRight: mobile ? "12px" : "0px"
                  }}
                  gutterBottom
                >
                  {noSearchmsg}
                </Typography>
              </Grid>
            </Grid>
          );
        }
        if (searchResults && !searchResults.nbHits) {
          let tabName = "";
          let noSearchmsg = "";
          let noResultsmsg = "";
          let width = mobile ? 80 : 115;
          let qwarx_man = "";
          switch (tab) {
            case 0:
              tabName = "Tout";
              noResultsmsg = `Il se peut que vous cherchiez une information qui n'a pas encore été découverte par Qwarx.nc. Si ce n'est pas le cas, nous vous suggérons de formuler votre recherche différement`;
              qwarx_man = `qwarx-error`;
              break;
            case 1:
              tabName = "Annonces";
              noResultsmsg = `Vous êtes dans l'onglet ${tabName}. Avez-vous vérifié dans les autres onglets s’il y a des résultats ?`;
              qwarx_man = `qwarx_look`;
              break;
            case 2:
              tabName = "Immobilier";
              noResultsmsg = `Vous êtes dans l'onglet ${tabName}. Avez-vous vérifié dans les autres onglets s’il y a des résultats ?`;
              qwarx_man = `qwarx_look`;
              break;
            case 3:
              tabName = "Shopping";
              noResultsmsg = `Vous êtes dans l'onglet ${tabName}. Avez-vous vérifié dans les autres onglets s’il y a des résultats ?`;
              qwarx_man = `qwarx_look`;
              break;
            case 4:
              tabName = "Infos";
              noResultsmsg = `Vous êtes dans l'onglet ${tabName}. Avez-vous vérifié dans les autres onglets s’il y a des résultats ?`;
              qwarx_man = `qwarx_look`;
              break;
            case 5:
              tabName = "Annuaires";
              noResultsmsg = `Vous êtes dans l'onglet ${tabName}. Avez-vous vérifié dans les autres onglets s’il y a des résultats ?`;
              qwarx_man = `qwarx_look`;
              break;
            case 6:
              tabName = "Adresses";
              noResultsmsg = `Vous êtes dans l'onglet ${tabName}. Avez-vous vérifié dans les autres onglets s’il y a des résultats ?`;
              qwarx_man = `qwarx_look`;
              break;
            default:
          }
          hits = (
            <Grid
              container
              style={{ height: "100%", marginLeft: mobile ? "0px" : "120px" }}
              spacing={40}
            >
              <Grid item>
                <img
                  src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_${width},dpr_1.0/${qwarx_man}.png`}
                  srcSet={`
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_${width},dpr_1.0/${qwarx_man}.png,
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_${width},dpr_2.0/${qwarx_man}.png 2x,
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_${width},dpr_3.0/${qwarx_man}.png 3x
                            `}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant={"headline"}
                  component={"h1"}
                  color={"primary"}
                  gutterBottom
                >
                  {`Votre recherche n'a donné aucun résultat.`}
                </Typography>
                <Typography
                  variant={"subheading"}
                  component={"p"}
                  color={"primary"}
                  style={{
                    maxWidth: "580px",
                    marginRight: mobile ? "12px" : "0px"
                  }}
                  gutterBottom
                >
                  {noResultsmsg}
                </Typography>
                <Typography variant="subheading" align="center" gutterBottom>
                  <a
                    href={"https://goo.gl/forms/U1H2fxHpMhiEchAq2"}
                    target="_blank"
                    rel="external noopener noreferrer"
                    style={{ color: "#1565c0" }}
                  >
                    {` Votre site n'est pas dans Qwarx.nc?`}
                  </a>
                </Typography>
              </Grid>
            </Grid>
          );
        }
        return hits;
      }
    );

    const RefinementList = connectRefinementList(props => {
      return null;
    });

    const tabs = mobile => {
      return (
        <Tabs
          value={this.state.tab}
          className={css(aphrodite.contentLeft)}
          onChange={this.handleTabChange}
          scrollable={mobile}
          scrollButtons="off"
        >
          <Tab
            label="tout"
            tab_color={"#BF2885"}
            tab_text_color={"white"}
            mobile={mobile ? 1 : 0}
          />
          <Tab
            label="annonces"
            tab_color={"#0E8AB0"}
            tab_text_color={"white"}
            mobile={mobile ? 1 : 0}
          />
          <Tab
            label="immobilier"
            tab_color={"#13CCBE"}
            tab_text_color={"black"}
            mobile={mobile ? 1 : 0}
          />
          <Tab
            label="shopping"
            tab_color={"#FFF212"}
            tab_text_color={"black"}
            mobile={mobile ? 1 : 0}
          />
          <Tab
            label="infos"
            tab_color={"#FF8800"}
            tab_text_color={"black"}
            mobile={mobile ? 1 : 0}
          />
          <Tab
            label="annuaires"
            tab_color={"#FF1F34"}
            tab_text_color={"white"}
            mobile={mobile ? 1 : 0}
          />
          {/*<Tab*/}
          {/*label="adresses"*/}
          {/*tab_color={"#045A87"}*/}
          {/*tab_text_color={"white"}*/}
          {/*mobile={mobile ? 1 : 0}*/}
          {/*deactivated*/}
          {/*/>*/}
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
                src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo-2.png`}
                srcSet={`
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo-2.png,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_2.0/qwarx-logo-2.png 2x,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_3.0/qwarx-logo-2.png 3x
                `}
                alt={`qwarx logo`}
                onClick={e => {
                  e.preventDefault();
                  window.location = "/";
                }}
                style={{
                  marginTop: "3px",
                  marginBottom: "3px",
                  cursor: "pointer",
                  marginLeft: "5px",
                  marginRight: "5px"
                }}
              />
            </Grid>
            <Grid item xs>
              <SearchBox tablet_desktop />
            </Grid>
          </Grid>
          <Divider style={{ marginTop: "5px" }} />
          {tabs(false)}
          <div>
            <Typography component={"span"} variant={"caption"}>
              <Stats
                className={css(aphrodite.searchResultsPaddingLeft)}
                translate={(ctxt, n, ms) => {
                  let res;
                  let mili;
                  if (!n) {
                    // res = `aucun résultat`;
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

                  return n ? `${res}${mili}` : null;
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
                  src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo-2.png`}
                  srcSet={`
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo-2.png,
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_2.0/qwarx-logo-2.png 2x,
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_3.0/qwarx-logo-2.png 3x
                    `}
                  alt={`qwarx logo`}
                  onClick={e => {
                    e.preventDefault();
                    window.location = "/";
                  }}
                  style={{
                    marginTop: "3px",
                    marginBottom: "3px",
                    cursor: "pointer"
                  }}
                />
              </Grid>
              <Grid item>
                <MobileTextLogo />
              </Grid>
            </Grid>
          </div>
          <SearchBox mobile />
          {tabs(true)}
          <div>
            <Typography component={"span"} variant={"caption"}>
              <Stats
                className={css(aphrodite.searchResultsPaddingLeft)}
                translate={(ctxt, n, ms) => {
                  let res;
                  let mili;
                  if (!n) {
                    // res = `aucun résultat`;
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

                  return n ? `${res}${mili}` : null;
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
      refinement = ["directory", "facebook"];
    }
    if (tab === 6) {
      refinement = ["address"];
    }
    return (
      <Fragment>
        <Head>
          <meta
            name="description"
            key="description"
            content={`${
              this.state.searchState.query
            } >> Qwarx.nc : le moteur de recherche de tous les calédoniens`}
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/clactacom/image/upload/v1528092749/og-image-qwarx.png"
          />
          <meta
            name="og:description"
            key="og:description"
            content={`${
              this.state.searchState.query
            } >> Qwarx.nc : le moteur de recherche de tous les calédoniens`}
          />
          <meta
            property="og:url"
            content={`https://qwarx.nc${this.props.router.asPath}`}
          />
          <link
            rel="canonical"
            href={`https://qwarx.nc${this.props.router.asPath}`}
          />
        </Head>
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
          <RefinementList attribute="category" defaultRefinement={refinement} />
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
      </Fragment>
    );
  }
}

export default withRouter(SearchPage);
