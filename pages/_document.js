import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import JssProvider from "react-jss/lib/JssProvider";
import flush from "styled-jsx/server";
import getPageContext from "../src/getPageContext";
import { StyleSheetServer } from "aphrodite";
import criticalCssLandingPage from "../utils/criticalCssLandingPage";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const pageContext = getPageContext();
    const { html, css } = StyleSheetServer.renderStatic(() => {
      return ctx.renderPage(Component => props => (
        <JssProvider
          registry={pageContext.sheetsRegistry}
          generateClassName={pageContext.generateClassName}
        >
          <Component pageContext={pageContext} {...props} />
        </JssProvider>
      ));
    });
    return {
      ...html,
      css,
      pageContext,
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString()
            }}
          />
          {flush() || null}
        </React.Fragment>
      )
    };
  }

  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <script
            src="https://cdn.polyfill.io/v2/polyfill.min.js"
            async
            defer
          />
          <style
            data-aphrodite
            dangerouslySetInnerHTML={{ __html: this.props.css.content }}
          />
          <title>Qwarx.nc</title>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              "user-scalable=no, initial-scale=1, maximum-scale=1, width=device-width"
            }
          />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary[500]}
          />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <link rel="stylesheet" href="../static/main.css" />
          <link
            rel="stylesheet"
            href="../static/react-instantsearch-override.css"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css"
          />
        </body>
      </html>
    );
  }
}

export default MyDocument;
