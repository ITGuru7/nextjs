import React, { Fragment } from "react";
import {
  Hits,
  Pagination,
  SearchBox,
  Configure,
  Stats
} from "react-instantsearch/dom";
import { InstantSearch } from "./instantsearch";
import { css } from "aphrodite";
import searchResult from "./searchResult";
import Divider from "material-ui/Divider";
import Footer from "./footer";
import Tabs from "./styled/tabs";
import Tab from "./styled/tab";
import aphrodite from "../utils/aphrodite";
import Grid from "material-ui/Grid";
import MenuIcon from "material-ui-icons/Menu";
import Drawer from "material-ui/Drawer";
import List, { ListItem, ListItemText } from "material-ui/List";
import Link from "next/link";
import GougleLogo from "./gougleLogo";
import Display from "../utils/display";
import Button from "material-ui/Button";

class SearchPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width: 1600,
      loadingFinished: false
    };
  }

  render() {
    const SearchResults = () => {
      return (
        <Fragment>
          <Configure hitsPerPage={10} />
          <Hits hitComponent={searchResult} />
          <Pagination showPrevious={false} showFirst={false} />
        </Fragment>
      );
    };

    const tabs = style => {
      return (
        <Tabs
          value={0}
          indicatorColor="secondary"
          textColor="secondary"
          // onChange={this.handleChange}
          className={css(aphrodite.contentLeft)}
          // style={style}
        >
          <Tab label="tout" />
          <Tab label="images" disabled />
        </Tabs>
      );
    };

    const defaultSubmit = (
      <svg
        viewBox="0 0 258 235"
        xmlns="http://www.w3.org/2000/svg"
        className={css(aphrodite.searchIcon)}
      >
        <g fillRule="nonzero" fill="none">
          <path
            d="M46.83 12.8C65.62 2.04 88.31-1.48 109.53 2.64c15.83 3 30.8 10.37 42.86 21.06 17.77 15.44 29.03 38.06 30.73 61.54 1.59 19.48-3.22 39.37-13.65 55.92 1.25 1.12 2.49 2.26 3.74 3.38.4-.43 1.21-1.31 1.62-1.74.52.43 1.56 1.31 2.08 1.75 3.63-1.56 6.15 1.88 8.55 3.95 22.88 20.46 45.74 40.94 68.64 61.38 4.34 3.6 4.83 10.91.68 14.85-3.67 3.55-6.34 9.05-11.87 9.89-3.71.72-7.31-1.12-9.83-3.73-22.35-20.02-44.72-40.03-67.09-60.03-2.49-2.3-6.25-4.48-5.26-8.47-.44-.41-1.31-1.23-1.74-1.64.41-.7.83-1.4 1.24-2.1-.7-.6-2.1-1.81-2.8-2.41-11.72 12.46-27.31 21.07-43.89 25.13-21.08 5.06-43.99 2.52-63.27-7.5-19.84-10.06-35.7-27.7-43.67-48.48-7.5-19.47-8.08-41.53-1.63-61.38 6.92-21.49 22.17-40.15 41.86-51.21zm42.34 4.41c-24.66.9-48.42 14.66-61.22 35.8-9.49 15.33-13.31 34.15-10.18 51.94 2.87 17.56 12.28 33.98 26 45.31 13.36 11.22 30.73 17.66 48.2 17.43 15.34.19 30.63-4.75 43.17-13.54 14.21-10.01 24.94-24.95 29.48-41.76 5.49-19.64 2.45-41.42-8.16-58.82-13.74-23.07-40.49-37.55-67.29-36.36z"
            fill="#43464A"
          />
          <path
            d="M82.53 27.84c14.58-2.14 29.8.82 42.5 8.28 14.08 8.12 24.86 21.67 29.79 37.14 4.85 15.72 3.61 33.25-3.68 48.03-7.91 16.79-23.37 29.78-41.25 34.74-13.68 3.65-28.54 2.96-41.73-2.24-14.15-5.44-26.42-15.82-33.66-29.2-6.8-11.91-9-26.08-7.43-39.61 2.03-16.97 11.05-32.91 24.34-43.6 8.98-7.08 19.75-12.03 31.12-13.54zm1.93 25.87c-11.78 2.3-22.32 10.27-27.67 21.02-5.08 9.6-5.9 21.38-2.03 31.55 4.13 11.21 13.44 20.46 24.83 24.19 15.43 5.49 33.85-.17 43.72-13.18 7.26-9.14 10.12-21.58 7.49-32.97-2.69-11.22-10.11-21.41-20.42-26.76-7.84-4.3-17.18-5.61-25.92-3.85z"
            fill="#008CD2"
          />
        </g>
      </svg>
    );

    const searchBox = cn => {
      return (
        <SearchBox
          autoFocus
          translations={{
            placeholder: ""
          }}
          ref="searchbox"
          className={cn}
          onInput={() => {
            this.setState({
              loadingFinished: true
            });
          }}
          showLoadingIndicator={true}
          submit={defaultSubmit}
        />
      );
    };

    const desktop = () => {
      return (
        <Fragment>
          <Grid
            container
            direction="row"
            spacing={0}
            style={{ marginTop: "10px" }}
            alignItems={'center'}
          >
            <Grid item>
              <GougleLogo
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
            <Grid item xs>
              <Grid container direction="row" justify="flex-end">
                <Grid item>
                  <Link href="/enregistrer">
                    <Button
                      // variant="raised"
                      color="secondary"
                      size="small"
                      style={{ marginRight: "10px" }}
                    >
                      se connecter
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: "5px" }} />
          {tabs()}
          <Stats
            className={css(aphrodite.searchResultsLeft)}
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
          <Grid container direction="row" spacing={0}>
            <Grid item xs style={{ marginTop: "9px" }}>
              <SearchResults />
            </Grid>
            <Grid item xs />
          </Grid>
          <Footer />
        </Fragment>
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
              alignItems='center'
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
                <GougleLogo
                  cn={css(aphrodite.gougleLogo, aphrodite.topScreenPadding)}
                />
              </Grid>
              <Grid item />
            </Grid>
          </div>
          {searchBox(
            css(
              aphrodite.contentLeft,
              aphrodite.contentRight,
              aphrodite.mobileGreyBackground
            )
          )}
          {tabs()}
          <Divider style={{ marginBottom: "16px" }} />
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
        <Display format="mobile" implementation="css">
          {mobile()}
        </Display>
        <Display format="tablet" implementation="css">
          {desktop()}
        </Display>
        <Display format="desktop" implementation="css">
          {desktop()}
        </Display>
      </InstantSearch>
    );
  }
}

export default SearchPage;
