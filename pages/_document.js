import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import JssProvider from "react-jss/lib/JssProvider";
import flush from "styled-jsx/server";
import getPageContext from "../src/getPageContext";
import { StyleSheetServer } from "aphrodite";

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
              "user-scalable=yes, initial-scale=1, maximum-scale=2, width=device-width"
            }
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/images/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/images/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/images/icons/favicon-16x16.png"
          />
          {/*<link rel="manifest" href="/static/images/icons/site.webmanifest" />*/}
          <link
            rel="mask-icon"
            href="/static/images/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/static/images/icons/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="Qwarx.nc" />
          <meta name="application-name" content="Qwarx.nc" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta
            name="msapplication-config"
            content="/static/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta charSet="utf-8" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta property="og:image:height" content="161" />
          <meta property="og:image:width" content="307" />
          <meta property="og:title" content="Qwarx.nc" />
          <meta
            property="og:description"
            content="Tout le web calédonien, rien que le web calédonien."
          />
          <meta property="og:url" content="https://qwarx.io" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/clactacom/image/upload/v1528092749/og-image-qwarx.png"
          />

          <meta
            name="Description"
            content="Tout le web calédonien, rien que le web calédonien."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
