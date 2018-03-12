import Head from "next/head";
import Header from "./header.js";
import Footer from "./footer.js";
import { Fragment } from "react";

export default ({ children, title = "gougle.nc" }) => (
  <Fragment>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
    </Head>
    <Header />
    {children}
    <Footer />
  </Fragment>
);
