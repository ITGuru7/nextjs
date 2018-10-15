import About from "../components/about";
import Wrapper from "../components/wrapper";
import Head from "next/head";

const Contact = () => {
  return (
    <Wrapper>
      <Head>
        <meta name="description" key="description" content={`Contact`} />
        <meta name="og:description" key="og:description" content={`Contact`} />
      </Head>
      <About value={2} />
    </Wrapper>
  );
};

export default Contact;
