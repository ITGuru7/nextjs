import React, { Fragment } from "react";
import { Pagination, Configure, Stats } from "react-instantsearch/dom";
import SearchBox from "./algolia/searchBox";
import Hits from "./algolia/hits";
import { InstantSearch } from "./instantsearch";
import { css } from "aphrodite";
import Divider from "material-ui/Divider";
import Footer from "./footer";
import Tabs from "./mui/tabs";
import Tab from "./mui/tab";
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
      loadingFinished: false,
      images: []
    };
  }

  render() {
    const SearchResults = () => {
      return (
        <div className={css(aphrodite.wrapperMinHeight)}>
          <Configure hitsPerPage={10} />
          <Hits />
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
          <Tab label="images" />
          <Tab label="carte" />
        </Tabs>
      );
    };



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
          reset={null}
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
            alignItems={"center"}
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
            <Grid item>
              <Grid container direction="row" justify="flex-end">
                <Grid
                  item
                  style={{
                    marginRight: "10px"
                  }}
                >
                  <Link href="/enregistrer">
                    <Button color="secondary" size="small">
                      créer une page
                    </Button>
                  </Link>
                </Grid>
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
                        backgroundColor: "#008cd2"
                      }}
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
          <SearchResults />
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
                <GougleLogo
                  cn={css(aphrodite.gougleLogo, aphrodite.topScreenPadding)}
                />
              </Grid>
              <Grid item />
            </Grid>
          </div>
          {searchBox()}
          {tabs()}
          <Divider />
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
        <Display format="tablet-desktop" implementation="css">
          {desktop()}
        </Display>
      </InstantSearch>
    );
  }
}

export default SearchPage;
