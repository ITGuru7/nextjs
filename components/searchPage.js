import React, { Fragment } from "react";
import { Hits, Pagination, SearchBox } from "react-instantsearch/dom";
import { InstantSearch } from "./instantsearch";
import { css, StyleSheet } from "aphrodite";
import searchResult from "./searchResult";
import Divider from "material-ui/Divider";
import Hidden from "material-ui/Hidden";
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
          <Hits hitComponent={searchResult} />
          <Pagination />
        </Fragment>
      );
    };

    const tabs = () => {
      return (
        <Tabs
          value={0}
          indicatorColor="secondary"
          textColor="secondary"
          // onChange={this.handleChange}
          className={css(aphrodite.contentLeft)}
        >
          <Tab label="tout" />
          <Tab
            label="images"
            disabled
          />
        </Tabs>
      );
    };

    const searchBox = props => {
      return (
        <SearchBox
          autoFocus={this.state.width > 600}
          translations={{
            placeholder: this.placeholder(this.state.width)
          }}
          ref="searchbox"
          className={css(
            aphrodite.contentLeft,
            aphrodite.contentRight,
            aphrodite.mobileGreyBackground
          )}
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
          <Divider style={{ marginBottom: "16px" }} />
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
              spacing={0}
              className={css(aphrodite.contentBottom)}
            >
              <Grid item>
                <MenuIcon onClick={this.handleRightOpen} />
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
                <GougleLogo cn={css(aphrodite.gougleLogo)} />
              </Grid>
              <Grid item />
            </Grid>
          </div>
          {searchBox()}
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
