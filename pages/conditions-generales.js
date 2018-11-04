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
          content={`Conditions Générales`}
        />
        <meta
          name="og:description"
          key="og:description"
          content={`Conditions Générales`}
        />
        <meta
          property="og:url"
          content={`https://qwarx.nc/conditions-generales`}
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/clactacom/image/upload/c_scale,f_auto,q_auto,w_1200/v1540854581/og-image-qwarx-3.png"
        />
        <link rel="canonical" href={`https://qwarx.nc/conditions-generales`} />
      </Head>
      <About value={1} />
    </Wrapper>
  );
};
