import { App, findResultsState } from "../components";
import LandingPage from "../components/landingPage";
import { Fragment } from "react";
import qs from "qs";
import SearchPage from "../components/searchPage";
import Head from "next/head";
import criticalCssLandingPage from "../utils/criticalCssLandingPage";
import criticalCssSearchPage from "../utils/criticalCssSearchPage";

class Index extends React.Component {
  // Service worker actived from the very start
  componentDidMount() {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {})
        .catch(err => {
          console.warn("service worker registration failed", err.message);
        });
    }
  }

  // Responsible for getting the first result when accessing the website with a search in the url
  static async getInitialProps(params) {
    let searchState = qs.parse(
      params.asPath.substring(params.asPath.indexOf("?") + 1)
    );
    let resultsState = null;
    if (searchState["/"] === "") {
      searchState = null;
    } else {
      resultsState = await findResultsState(App, { searchState });
    }
    return { resultsState, searchState };
  }

  // Let's skip the LandingPage when loading a search
  // index doesn't keep any state, it just passes on the props when SSR is done
  // this is also where we load our critical css, to speed up SSR
  // subsequent css will be loaded at the end of the body in _document.js
  render() {
    return (
      <Fragment>
        {this.props.searchState && this.props.resultsState ? (
          <Fragment>
            <Head>
              <style>${criticalCssSearchPage}</style>
            </Head>
            <SearchPage
              resultsState={this.props.resultsState}
              searchState={this.props.searchState}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Head>
              <style>${criticalCssLandingPage}</style>
            </Head>
            <LandingPage />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Index;
