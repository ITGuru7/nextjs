import React, { Fragment } from "react";
import debounce from "lodash/debounce";
import defer from "lodash/defer";
import { connectSearchBox } from "react-instantsearch/connectors";
import Display from "../../utils/display";
import { css } from "aphrodite";
import aphrodite from "../../utils/aphrodite";

export default connectSearchBox(({ refine }) => {
  const debouncedSearch = debounce(e => {
    refine(e.target.value);
    defer(() =>
      document.getElementById("search_results").classList.remove("loading")
    );
  }, 500);

  const onChange = e => {
    e.persist();
    document.getElementById("search_results").classList.add("loading");
    debouncedSearch(e, e.eventTarget);
  };

  return (
    <Fragment>
      <Display format={"tablet-desktop"}>
        <input
          placeholder=""
          type="search"
          onChange={onChange}
          className="ais-SearchBox-input"
        />
      </Display>
      <Display format={"mobile"}>
        <div
          className={css(
            aphrodite.contentLeft,
            aphrodite.contentRight,
            aphrodite.mobileGreyBackground
          )}
        >
          <input
            placeholder=""
            type="search"
            onChange={onChange}
            className={`ais-SearchBox-input`}
          />
        </div>
      </Display>
    </Fragment>
  );
});
