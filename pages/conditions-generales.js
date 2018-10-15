import About from "../components/about";
import Wrapper from "../components/wrapper";
import Head from "next/head";

export default () => {
  return (
    <Wrapper>
      <Head>
        <meta name="description" key="description" content={`Conditions Générales`} />
        <meta name="og:description" key="og:description" content={`Conditions Générales`} />
      </Head>
      <About value={1} />
    </Wrapper>
  );
};
