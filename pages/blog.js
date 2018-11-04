import About from "../components/about";
import Wrapper from "../components/wrapper";
import Butter from "buttercms";
const butter = Butter("7a276594e635272c3672f732b018426c18cb9e7a");
import Head from "next/head";

const Blog = ({ post, posts, shallow }) => (
  <Wrapper>
    <Head>
      <title>{post.seo_title}</title>
      <meta name="description" content={post.meta_description} />
      <meta property="og:image" content={post.featured_image} />
      <meta property="og:url" content={`https://qwarx.nc/${post.slug}`} />
      <link rel="canonical" href={`https://qwarx.nc/${post.slug}`} />
    </Head>
    <About value={3} post={post} posts={posts} shallow={shallow} />
  </Wrapper>
);

Blog.getInitialProps = async ({ query: { slug } }) => {
  // butter.feed.retrieve('rss')
  //   .then(function(resp) {
  //     console.log(resp.data)
  //   }).catch(function(resp) {
  //   console.log(resp)
  // });
  let post = null;
  let resp = null;
  let shallow = null;
  resp = await butter.post.list({ page: 1, page_size: 20 });
  const posts = resp.data.data;
  if (slug) {
    resp = await butter.post.retrieve(slug);
    post = resp.data.data;
    shallow = false;
  } else {
    resp = await butter.post.retrieve(posts[0].slug);
    post = resp.data.data;
    shallow = true;
  }

  return { post, posts, shallow };
};

export default Blog;
