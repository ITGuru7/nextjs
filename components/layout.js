import Head from "next/head";
import Header from "./header.js";

export default ({ children, title = "gougle.nc" }) => (
  <html>
    <head />
    <body>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <Header/>
    </body>
  </html>
);
