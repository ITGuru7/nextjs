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
import QwarxLogo from "./qwarxLogo";
import Display from "../utils/display";
import Button from "@material-ui/core/Button";
import { connectStateResults } from "react-instantsearch/connectors";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchState: this.props.searchState
    };
  }

  onSearchStateChange = searchState => {
    this.setState({ searchState });
  };

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('toto');
    return true;
  }

  render() {
    const { firstLetter } = this.props;

    const Content = connectStateResults(({ searchState, searchResults }) => {
      if (!searchState.query || !searchState.query.length) {
        return null;
      }
      if (searchResults && !searchResults.nbHits) {
        return null;
      }
      return <Hits />;
    });

    const SearchResults = () => {
      return (
        <div className={css(aphrodite.wrapperMinHeight)}>
          <Configure hitsPerPage={10} />
          <Content />
          <Fragment>
            <Display format="desktop">
              <Pagination showPrevious={false} showFirst={false} />
            </Display>
            <Display format="mobile-tablet">
              <Pagination
                showFirst={false}
                translations={{
                  previous: "précédent",
                  next: "suivant"
                }}
              />
            </Display>
          </Fragment>
        </div>
      );
    };

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

    const searchBox = () => {
      return (
        <SearchBox
          searchState={this.state.searchState}
          firstLetter={firstLetter}
        />
      );
    };

    const desktop = () => {
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
              />
            </Grid>
            <Grid item xs>
              {searchBox()}
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
                      color="secondary"
                      size="small"
                      style={{
                        color: "white",
                        backgroundColor: "#0E8AB0"
                      }}
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
          <SearchResults />
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
                <QwarxLogo
                  cn={css(aphrodite.gougleLogo, aphrodite.topScreenPadding)}
                />
              </Grid>
              <Grid item />
            </Grid>
          </div>
          {searchBox()}
          {/*{tabs()}*/}
          <Divider />
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
          <SearchResults />
          <Footer />
        </Fragment>
      );
    };

    return (
      <div>
        <InstantSearch
          appId="5NXUF7YDRN"
          apiKey="458ab22e25a2ddf3a174bf03678c9281"
          indexName="qwarx.nc"
          // searchState={this.state.searchState}
          // onSearchStateChange={this.onSearchStateChange}
        >
          <Display format="mobile" implementation="css">
            {mobile()}
          </Display>
          <Display format="tablet-desktop" implementation="css">
            {desktop()}
          </Display>
        </InstantSearch>
      </div>
    );
  }
}

export default SearchPage;
