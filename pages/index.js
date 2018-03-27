import Layout from "../components/layout";
import Fonts from "../utils/fonts";
import Head from 'next/head';
import {Fragment} from "react";
import SearchPage from "../components/searchPage";

class Welcome extends React.PureComponent {
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
      <Fragment>
        <Head>
          <link rel='stylesheet' href='../static/loadingComponent.css' />
          <link rel='stylesheet' href='../static/hits.css' />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css"/>

        </Head>
        <Layout title={"gougle.nc"}>
          <SearchPage />
        </Layout>
      </Fragment>
    );
  }
}

export default Welcome;
