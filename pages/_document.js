import Document, { Head, Main, NextScript } from "next/document";
import { StyleSheetServer } from "aphrodite";
import JssProvider from "react-jss/lib/JssProvider";
import flush from "styled-jsx/server";
import getPageContext from "../src/getPageContext";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const pageContext = getPageContext();

    const { html, css } = StyleSheetServer.renderStatic(() =>
      ctx.renderPage(Component => props => (
        <JssProvider
          registry={pageContext.sheetsRegistry}
          generateClassName={pageContext.generateClassName}
        >
          <Component pageContext={pageContext} {...props} />
        </JssProvider>
      ))
    );

    const ids = css.renderedClassNames;
    return {
      ...html,
      css,
      pageContext,
      ids,
      style: (
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

  constructor(props) {
    super(props);
    /* Take the renderedClassNames from aphrodite (as generated
     in getInitialProps) and assign them to __NEXT_DATA__ so that they
     are accessible to the client for rehydration. */
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids;
    }
  }

  render() {
    /* Make sure to use data-aphrodite attribute in the style tag here
     so that aphrodite knows which style tag it's in control of when
     the client goes to render styles. If you don't you'll get a second
     <style> tag */
    const { pageContext } = this.props;
    return (
      <html>
        <Head>
          <style
            data-aphrodite
            dangerouslySetInnerHTML={{ __html: this.props.css.content }}
          />
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              "user-scalable=0, initial-scale=1, " +
              "minimum-scale=1, width=device-width, height=device-height"
            }
          />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary[500]}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
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
