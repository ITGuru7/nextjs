import React, { Fragment } from "react";
import { Hits, Pagination, SearchBox, Stats } from "react-instantsearch/dom";
import { InstantSearch } from "./instantsearch";
import Grid from "material-ui/Grid";
import { css, StyleSheet } from "aphrodite";
import { connectStateResults } from "react-instantsearch/connectors";
import LoadingComponent from "./loadingComponent";
import Fade from "material-ui/transitions/Fade";
import searchResult from "./searchResult";
import Divider from "material-ui/Divider";
import Typography from "material-ui/Typography";
import Hidden from "material-ui/Hidden";
import Header from "./header";
import Footer from "./footer";

class SearchPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 1600,
      loadingFinished: false
    };
  }

  styles = StyleSheet.create({
    stats: {
      "@media (max-width: 360px)": {
        marginTop: "1%",
        textAlign: "center",
        color: "#43464A",
        fontWeight: 300,
        fontSize: "10px"
      },
      "@media (min-width: 361px) and (max-width: 600px)": {
        marginTop: "1%",
        textAlign: "center",
        color: "#43464A",
        fontWeight: 300,
        fontSize: "12px"
      },
      "@media (min-width: 601px) and (max-width: 960px)": {
        marginTop: "1%",
        textAlign: "center",
        color: "#43464A",
        fontWeight: 400,
        fontSize: "12px"
      },
      "@media (min-width: 961px) and (max-width: 1919px)": {
        marginTop: "1%",
        textAlign: "center",
        color: "#43464A",
        fontWeight: 400,
        fontSize: "90%"
      },
      "@media (min-width: 1920px)": {
        marginTop: "1%",
        textAlign: "center",
        color: "#43464A",
        fontWeight: 400,
        fontSize: "90%"
      }
    }
  });

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
    const Connect = connectStateResults(({ searching }) => {
      return searching ? (
        <div style={{ paddingTop: "20px" }}>
          <LoadingComponent
            minHeight="170px"
            width={this.state.width ? this.state.width : 1920}
          />
          <LoadingComponent
            minHeight="170px"
            width={this.state.width ? this.state.width : 1920}
          />
          <LoadingComponent
            minHeight="170px"
            width={this.state.width ? this.state.width : 1920}
          />
          <LoadingComponent
            minHeight="170px"
            width={this.state.width ? this.state.width : 1920}
          />
        </div>
      ) : null;
    });

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

    const desktop = () => {
      return (
        <Fragment>
          <SearchBox
            autoFocus={this.state.width > 600}
            translations={{
              placeholder: this.placeholder(this.state.width)
            }}
            ref="searchbox"
            onInput={() => {
              this.setState({
                loadingFinished: true
              });
            }}
          />
          <Typography
            type="title"
            color="primary"
            component={"span"}
            style={{ fontWeight: 500 }}
          >
            TOUT
          </Typography>
          <Divider style={{ marginBottom: "28px" }} />
          {this.state.loadingFinished ? null : <Connect />}
          {this.state.loadingFinished ? (
            <SearchResults />
          ) : (
            <Fade timeout={{ enter: 500, exit: 500 }} in={true}>
              <SearchResults />
            </Fade>
          )}
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
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={0}
            style={{ flexGrow: 1 }}
          >
            <Grid item xs={11} className={css(styles.marginTop)}>
              <Header />
            </Grid>
            <Grid item xs={11}>
              <SearchBox
                autoFocus={this.state.width > 600}
                translations={{
                  placeholder: this.placeholder(this.state.width)
                }}
                ref="searchbox"
                onInput={() => {
                  this.setState({
                    loadingFinished: true
                  });
                }}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography
                type="title"
                color="primary"
                component={"span"}
                style={{ fontWeight: 500 }}
              >
                TOUT
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <Divider style={{ marginBottom: "28px" }} />
            </Grid>
            <Grid item xs={11}>
              {this.state.loadingFinished ? null : <Connect />}
              {this.state.loadingFinished ? (
                <SearchResults />
              ) : (
                <Fade timeout={{ enter: 500, exit: 500 }} in={true}>
                  <SearchResults />
                </Fade>
              )}
            </Grid>
            <Grid item xs={11}>
              <Footer/>
            </Grid>
          </Grid>
        </Fragment>
      );
    };

    return (
      <InstantSearch
        appId="5NXUF7YDRN"
        apiKey="458ab22e25a2ddf3a174bf03678c9281"
        indexName="directory_nc"
      >
        <Hidden only={['md','lg', 'xl']} implementation="css">
          {mobile()}
        </Hidden>
        <Hidden only={['xs', 'sm']} implementation="css">
          {desktop()}
        </Hidden>
      </InstantSearch>
    );
  }
}

export default SearchPage;
