import About from "../components/about";
import Wrapper from "../components/wrapper";
import Head from "next/head";

const Contact = () => {
  return (
    <Wrapper>
      <Head>
        <meta name="description" key="description" content={`Contact`} />
        <meta name="og:description" key="og:description" content={`Contact`} />
        <meta
          property="og:url"
          content={`https://qwarx.nc/contact`}
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/clactacom/image/upload/c_scale,f_auto,q_auto,w_1200/v1540854581/og-image-qwarx-3.png"
        />
        <link rel="canonical" href={`https://qwarx.nc/contact`} />

      </Head>
      <About value={2} />
    </Wrapper>
  );
};

export default Contact;
