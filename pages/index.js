import Layout from "../components/layout";
import Fonts from "../utils/fonts";
import Head from "next/head";
import { Fragment } from "react";
import { initStore } from "../store/store";
import { Provider } from "mobx-react";
import dynamic from "next/dynamic";
const SearchPage = dynamic(import("../components/searchPage"));

class Welcome extends React.PureComponent {
  static getInitialProps({ req }) {
    const isServer = !!req;
    const store = initStore(isServer);
    return { lastUpdate: store.lastUpdate, isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.lastUpdate);
  }

  componentDidMount() {
    Fonts();
    if ("serviceWorker" in navigator) {
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
  render() {
    return (
      <Provider store={this.store}>
        <Fragment>
          <Head>
            <link
              rel="stylesheet"
              href="../static/react-instantsearch-override.css"
            />
            <link rel="stylesheet" href="../static/main.css" />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css"
            />
          </Head>
          <Layout title={"gougle.nc"}>
            <SearchPage />
          </Layout>
        </Fragment>
      </Provider>
    );
  }
}

export default Welcome;
