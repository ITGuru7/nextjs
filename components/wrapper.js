import { Fragment } from "react";
import withRoot from "../src/withRoot";
import Head from "next/head";
import { StyleSheet } from "aphrodite";
if (typeof window !== "undefined") {
  /* StyleSheet.rehydrate takes an array of rendered classnames,
  and ensures that the client side render doesn't generate
  duplicate style definitions in the <style data-aphrodite> tag */
  StyleSheet.rehydrate(window.__NEXT_DATA__.ids);
}

class Wrapper extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        {this.props.children}
      </Fragment>
    );
  }
}

export default withRoot(Wrapper);
