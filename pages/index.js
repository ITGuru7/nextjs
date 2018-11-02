import { findResultsState } from "../components";
import SSRSearch from "../components/ssrSearch";
import SSRLandingPageSearch from "../components/ssrLandingPageSearch";
import LandingPage from "../components/landingPage";
import { Fragment } from "react";
import qs from "qs";
import SearchPage from "../components/searchPage";
import Head from "next/head";
import criticalCssLandingPage from "../utils/criticalCssLandingPage";
import criticalCssSearchPage from "../utils/criticalCssSearchPage";
import Wrapper from "../components/wrapper";
import Router from "next/router";

class Index extends React.Component {
  // Responsible for getting the first result when accessing the website with a search in the url
  static async getInitialProps(params) {
    console.log('initial props')
    let searchState = qs.parse(
      params.asPath.substring(params.asPath.indexOf("?") + 1)
    );
    let resultsState = null;
    if (!searchState["/"] && !searchState["query"]) {
      searchState = {
        "/": ""
      };
    }
    if (searchState["/"] === "") {
      resultsState = await findResultsState(SSRLandingPageSearch, { searchState });
      searchState = null;
    } else {
      searchState = {
        query: searchState.query,
        page: searchState.page ? searchState.page : 1,
        tab: searchState.tab ? searchState.tab : 0
      };

      resultsState = await findResultsState(SSRSearch, {
        searchState
      });
    }
    return {
      resultsState,
      searchState,
      tab: searchState ? parseInt(searchState.tab) : 0
    };
  }

  // Let's skip the LandingPage when loading a search
  // index doesn't keep any state, it just passes on the props when SSR is done
  // this is also where we load our critical css, to speed up SSR
  // subsequent css will be loaded at the end of the body in _document.js
  render() {
    console.log('root')
    return (
      <Wrapper>
        {this.props.searchState ? (
          <Fragment>
            <Head>
              <style>${process.browser ? null : criticalCssSearchPage}</style>
            </Head>
            <SearchPage
              resultsState={this.props.resultsState}
              searchState={this.props.searchState}
              tab={this.props.tab}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Head>
              <style>${process.browser ? null : criticalCssLandingPage}</style>
            </Head>
            <LandingPage nbHits={this.props.resultsState.content.nbHits} />
          </Fragment>
        )}
      </Wrapper>
    );
  }
}

export default Index;
