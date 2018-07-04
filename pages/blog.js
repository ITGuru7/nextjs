import About from "../components/about";
import Wrapper from "../components/wrapper";
import qs from "qs";

export default class Blog extends React.Component {
  // Responsible for getting the first result when accessing the website with a search in the url
  static async getInitialProps(params) {
    let postId = qs.parse(
      params.asPath.substring(params.asPath.indexOf("?") + 1)
    );
    return { postId };
  }

  render() {
    return (
      <Wrapper>
        <About value={3} postId={this.props.postId} />
      </Wrapper>
    );
  }
}
