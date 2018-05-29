import { App, findResultsState } from "../components";
import LandingPage from "../components/landingPage";
import { Fragment } from "react";
import qs from "qs";
import SearchPage from "../components/searchPage";

class Index extends React.Component {

  // Service worker actived from the very start
  componentDidMount() {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful");
        })
        .catch(err => {
          console.warn("service worker registration failed", err.message);
        });
    }
  }
  componentDidUpdate() {
    console.log(`index updated`)
  }

  shouldComponentUpdate() {
    return false;
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
  render() {
    return (
      <Fragment>
        {this.props.searchState && this.props.resultsState ? (
          <SearchPage
            resultsState={this.props.resultsState}
            searchState={this.props.searchState}
          />
        ) : (
          <LandingPage />
        )}
      </Fragment>
    );
  }
}

export default Index;
