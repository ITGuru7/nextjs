import { App, findResultsState } from "../components";
import LandingPage from '../components/landingPage';
import Wrapper from "../components/wrapper";
import PropTypes from "prop-types";
import Router from "next/router";
import qs from "qs";
const updateAfter = 500;

class Index extends React.Component {
  static propTypes = {
    resultsState: PropTypes.object,
    searchState: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
  }

  static async getInitialProps(params) {
    const searchState = qs.parse(
      params.asPath.substring(params.asPath.indexOf("?") + 1)
    );
    const resultsState = await findResultsState(App, { searchState });
    return { resultsState, searchState };
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState);
    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToUrl(searchState);
      Router.push(href, href, {
        shallow: true
      });
    }, updateAfter);
    this.setState({ searchState });
  };

  componentDidMount() {
    this.setState({ searchState: qs.parse(window.location.search.slice(1)) });
  }

  componentWillReceiveProps() {
    this.setState({ searchState: qs.parse(window.location.search.slice(1)) });
  }

  render() {
    return (
      <Wrapper title={"qwarx.nc"}>
        <LandingPage
          resultsState={this.props.resultsState}
          onSearchStateChange={this.onSearchStateChange}
          searchState={
            this.state && this.state.searchState
              ? this.state.searchState
              : this.props.searchState
          }
        />
      </Wrapper>
    );
  }
}

export default Index;
