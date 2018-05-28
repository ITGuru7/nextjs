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
          <style>
            {`@font-face{font-family:Roboto;font-style:normal;font-weight:300;src:local("Roboto Light"),local("Roboto-Light"),url(/static/fonts/roboto-v18-latin-300.woff2) format("woff2"),url(/static/fonts/roboto-v18-latin-300.woff) format("woff")}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local("Roboto"),local("Roboto-Regular"),url(/static/fonts/roboto-v18-latin-regular.woff2) format("woff2"),url(/static/fonts/roboto-v18-latin-regular.woff) format("woff")}@font-face{font-family:Roboto;font-style:normal;font-weight:500;src:local("Roboto Medium"),local("Roboto-Medium"),url(/static/fonts/roboto-v18-latin-500.woff2) format("woff2"),url(/static/fonts/roboto-v18-latin-500.woff) format("woff")}body{margin:0;padding:0;background-color:#fff}html *{font-family:Roboto,sans-serif}*,::after,::before{box-sizing:inherit}a{text-decoration:none}a:link,a:visited{color:#0e8ab0}html{box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}input{outline:0;border:1px solid #0e8ab0}@media (max-width:600px){.ais-SearchBox-input{border-radius:0!important;border:1px solid #d2d2d2!important;height:40px!important;padding-left:.3rem!important;padding-right:.3rem!important;width:100%!important}}@media (min-width:601px) and (max-width:959px){.ais-SearchBox-input{border-radius:0!important;border:1px solid #d2d2d2!important;height:40px!important;padding-left:.3rem!important;padding-right:.3rem!important;width:100%!important}}.ais-SearchBox-input:focus{border:1px solid #0e8ab0!important}@media (min-width:960px){.ais-SearchBox-input{border-radius:0!important;border:1px solid #d2d2d2!important;height:34px!important;padding-left:.3rem!important;padding-right:.3rem!important;width:500px!important;border-right:#0e8ab0}}.jss16{width:100%;display:flex;flex-wrap:wrap;box-sizing:border-box}.jss17{flex:0 0 auto;margin:0;box-sizing:border-box}.jss19{flex-direction:column}.jss24{align-items:center}.jss33{justify-content:center}.jss34{justify-content:flex-end}.jss36{justify-content:space-around}.jss42{flex-grow:1;max-width:100%;flex-basis:0}@media (min-width:0px) and (max-width:599.95px){.jss1{display:none}}@media (min-width:600px) and (max-width:959.95px){.jss4{display:none}}@media (min-width:960px) and (max-width:1279.95px){.jss7{display:none}}@media (min-width:1280px) and (max-width:1919.95px){.jss10{display:none}}@media (min-width:1920px){.jss13{display:none}}.jss126{margin:0;display:block}.jss130{color:rgba(0,0,0,.54);font-size:2.125rem;font-weight:400;font-family:Roboto,Helvetica,Arial,sans-serif;line-height:1.20588em}.jss131{color:rgba(0,0,0,.87);font-size:1.5rem;font-weight:400;font-family:Roboto,Helvetica,Arial,sans-serif;line-height:1.35417em}.jss136{color:rgba(0,0,0,.54);font-size:.75rem;font-weight:400;font-family:Roboto,Helvetica,Arial,sans-serif;line-height:1.375em}.jss139{text-align:center}.jss150{height:1px;margin:0;border:none;flex-shrink:0;background-color:rgba(0,0,0,.12)}.jss107{fill:currentColor;width:1em;height:1em;display:inline-block;font-size:24px;flex-shrink:0}.jss173{top:0;left:0;width:100%;height:100%;display:block;z-index:0;position:absolute;overflow:hidden;border-radius:inherit}.jss170{color:inherit;margin:0;border:0;display:inline-flex;padding:0;outline:0;position:relative;align-items:center;border-radius:0;vertical-align:middle;justify-content:center;-moz-appearance:none;text-decoration:none;background-color:transparent;-webkit-appearance:none}.jss170::-moz-focus-inner{border-style:none}.jss154{color:rgba(0,0,0,.87);padding:8px 16px;font-size:.875rem;min-width:88px;min-height:36px;box-sizing:border-box;line-height:1.4em;font-family:Roboto,Helvetica,Arial,sans-serif;font-weight:500;border-radius:2px;text-transform:uppercase}.jss155{width:100%;display:inherit;align-items:inherit;justify-content:inherit}.jss157{color:#0e8ab0}.jss167{padding:7px 8px;min-width:64px;font-size:.8125rem;min-height:32px}._1lu8zvv{margin-top:3px!important;margin-bottom:3px!important}@media (max-width:600px){._34ek51{width:200px!important}}@media (min-width:601px){._34ek51{width:250px!important}}._1lzgd5j{background-color:#f8f8f8!important}`}
          </style>
          <style
            data-aphrodite
            dangerouslySetInnerHTML={{ __html: this.props.css.content }}
          />
          <title>My page</title>
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
