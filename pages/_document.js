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
          <script
            dangerouslySetInnerHTML={{
              __html: `window['_fs_debug'] = false;window['_fs_host'] = 'fullstory.com';window['_fs_org'] = 'FN7D4';window['_fs_namespace'] = 'FS';(function(m,n,e,t,l,o,g,y){if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};g.event=function(i,v,s){g('event',{n:i,p:v,s:s})};g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};g.consent=function(a){g("consent",!arguments.length||a)};g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};g.clearUserCookie=function(){};})(window,document,window['_fs_namespace'],'script','user');`
            }}
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
              "user-scalable=yes, initial-scale=1, minimum-scale=1, maximum-scale=2, width=device-width"
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
          <meta property="og:title" content="Qwarx.nc" />
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
