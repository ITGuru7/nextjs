import About from "../components/about";
import Wrapper from "../components/wrapper";

const Blog = ({ slug }) => (
  <Wrapper>
    <About value={3} slug={slug} />
  </Wrapper>
);

Blog.getInitialProps = async ({ query: { slug } }) => {
  return { slug };
};

export default Blog;
