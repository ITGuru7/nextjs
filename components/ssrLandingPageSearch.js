import React from "react";
import {
  SearchBox,
  Hits,
  Configure,
} from "react-instantsearch/dom";
import { InstantSearch } from "./instantsearch";

// Minimal search app used for SSR only
class SSRLandingPageSearch extends React.Component {
  render() {
    return (
      <InstantSearch
        appId="5NXUF7YDRN"
        apiKey="458ab22e25a2ddf3a174bf03678c9281"
        indexName="qwarx.nc"
        resultsState={this.props.resultsState}
        onSearchStateChange={this.props.onSearchStateChange}
        searchState={this.props.searchState}
      >
        <Configure hitsPerPage={0} analytics={false} attributesToRetrieve={null} attributesToHighlight={null} />
        <SearchBox />
        <Hits />
      </InstantSearch>
    );
  }
}

export default SSRLandingPageSearch;
