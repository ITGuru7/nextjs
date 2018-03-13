import React, { Fragment } from "react";
import Head from "next/head";
import Header from "./header.js";
import Footer from "./footer.js";
import Grid from "material-ui/Grid";
import { css, StyleSheet } from "aphrodite";
import withRoot from "../src/withRoot";

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

class Layout extends React.Component {
  render() {

    return (
      <Fragment>
        <Head>
          <title>{this.props.title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
        </Head>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={0}
          style={{ flexGrow: 1 }}
        >
          <Grid item xs={11} sm={11} md={11} lg={8} xl={8}>
            <Grid item className={css(styles.marginTop)}>
              <Header />
            </Grid>
            <Grid item className={css(styles.marginTop, styles.marginBottom)}>
              {this.props.children}
            </Grid>
            <Grid item className={css(styles.marginBottom)}>
              <Footer />
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withRoot(Layout);
