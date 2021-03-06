import About from "../components/about";
import Wrapper from "../components/wrapper";
import Head from "next/head";

export default () => {
  return (
    <Wrapper>
      <Head>
        <meta
          name="description"
          key="description"
          content={`Mentions Légales`}
        />
        <meta
          name="og:description"
          key="og:description"
          content={`Mentions Légales`}
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/clactacom/image/upload/c_scale,f_auto,q_auto,w_1200/v1540854581/og-image-qwarx-3.png"
        />
        <meta property="og:url" content={`https://qwarx.nc/mentions-legales`} />
        <link rel="canonical" href={`https://qwarx.nc/mentions-legales`} />
      </Head>
      <About value={0} />
    </Wrapper>
  );
};
