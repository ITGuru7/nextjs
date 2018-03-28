import React, { Fragment } from "react";
import { Hits, Pagination, SearchBox } from "react-instantsearch/dom";
import { InstantSearch } from "./instantsearch";
import { css, StyleSheet } from "aphrodite";
import searchResult from "./searchResult";
import Divider from "material-ui/Divider";
import Hidden from "material-ui/Hidden";
import Footer from "./footer";
import Tabs, { Tab } from "material-ui/Tabs";
import aphrodite from "../utils/aphrodite";
import Grid from "material-ui/Grid";

class SearchPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 1600,
      loadingFinished: false
    };
  }

  placeholder(width) {
    if (width >= 1920) {
      return 'Tapez ici ce que vous recherchez... Par exemple : "croquettes Gosbi"   ou   "stage reiki Nouméa"   ou    "BCI Orphelinat"   ou   "passeport d\'urgence"   ou encore   "20 rue du Général Mangin"';
    } else if (width >= 961) {
      return 'Par exemple :   "croquettes Gosbi"   ou   "cours yoga Nouméa"   ou    "BCI Orphelinat"   ou   "passeport d\'urgence"   ou encore   "20 rue du Général Mangin"';
    } else if (width >= 601) {
      return 'Ex :   "croquettes Gosbi"   ou   "avocat droit du travail"   ou    "BCI Orphelinat"   ou encore   "20 rue du Général Mangin"';
    } else if (width >= 361) {
      return 'Ex :   "avocat droit du travail"  ou   "BCI"';
    } else {
      return 'Ex :   "croquettes Gosbi"';
    }
  }

  render() {
    const SearchResults = () => {
      return (
        <Fragment>
          <div className="SearchResults">
            <Hits hitComponent={searchResult} />
          </div>
          <div className="Pagination">
            <Pagination />
          </div>
        </Fragment>
      );
    };

    const tabs = () => {
      return (
        <Tabs
          value={0}
          indicatorColor="secondary"
          textColor="primary"
          onChange={this.handleChange}
          className={css(aphrodite.contentLeft)}
        >
          <Tab label="tout" />
          <Tab label="images" disabled />
        </Tabs>
      );
    };

    const searchBox = () => {
      return (
        <SearchBox
          autoFocus={this.state.width > 600}
          translations={{
            placeholder: this.placeholder(this.state.width)
          }}
          ref="searchbox"
          className={css(aphrodite.contentLeft, aphrodite.contentRight)}
          onInput={() => {
            this.setState({
              loadingFinished: true
            });
          }}
          showLoadingIndicator={true}
        />
      );
    };

    const desktop = () => {
      return (
        <Fragment>
          {searchBox()}
          {tabs()}
          <Divider style={{ marginBottom: "28px" }} />
          <SearchResults />
          <Footer />
        </Fragment>
      );
    };

    const mobile = () => {
      const styles = StyleSheet.create({
        marginTop: {
          "@media (max-width: 360px)": {
            marginTop: "4px"
          },
          "@media (min-width: 361px) and (max-width: 600px)": {
            marginTop: "4px"
          },
          "@media (min-width: 601px) and (max-width: 960px)": {
            marginTop: "8px"
          },
          "@media (min-width: 961px) and (max-width: 1919px)": {
            marginTop: "12px"
          },
          "@media (min-width: 1920px)": {
            marginTop: "12px"
          }
        },
        marginBottom: {
          "@media (max-width: 360px)": {
            marginBottom: "8px"
          },
          "@media (min-width: 361px) and (max-width: 600px)": {
            marginBottom: "8px"
          },

          "@media (min-width: 601px) and (max-width: 960px)": {
            marginBottom: "16px"
          },
          "@media (min-width: 961px) and (max-width: 1919px)": {
            marginBottom: "24px"
          },
          "@media (min-width: 1920px)": {
            marginBottom: "24px"
          }
        },
        columnContainer: {
          "@media (max-width: 360px)": {
            height: "100%"
          },
          "@media (min-width: 361px) and (max-width: 600px)": {
            marginBottom: "8px"
          }
        }
      });
      return (
        <Fragment>
          <div
            className={css(
              styles.marginTop,
              aphrodite.contentLeft,
              aphrodite.contentRight
            )}
          >
            <Grid container direction="row" justify="space-between">
              <Grid item>1</Grid>
              <Grid item>2</Grid>
              <Grid item>3</Grid>
            </Grid>
          </div>
          {searchBox()}
          {tabs()}
          <Divider
            style={{ marginBottom: "28px" }}
            className={css(
              styles.marginTop,
              aphrodite.contentLeft,
              aphrodite.contentRight
            )}
          />
          <SearchResults />
          <Footer />
        </Fragment>
      );
    };

    return (
      <InstantSearch
        appId="5NXUF7YDRN"
        apiKey="458ab22e25a2ddf3a174bf03678c9281"
        indexName="directory_nc"
      >
        <Hidden only={["md", "lg", "xl"]} implementation="css">
          {mobile()}
        </Hidden>
        <Hidden only={["xs", "sm"]} implementation="css">
          {desktop()}
        </Hidden>
      </InstantSearch>
    );
  }
}

export default SearchPage;
