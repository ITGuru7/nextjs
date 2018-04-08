import React, { Fragment } from "react";
import debounce from "lodash/debounce";
import { connectSearchBox } from "react-instantsearch/connectors";
import Display from "../../utils/display";
import { css } from "aphrodite";
import aphrodite from "../../utils/aphrodite";

export default connectSearchBox(({ refine }) => {
  const debouncedSearch = debounce(e => {
    refine(e.target.value);
  }, 500);

  const onChange = e => {
    e.persist();
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
