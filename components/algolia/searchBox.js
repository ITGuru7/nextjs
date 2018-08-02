import React, { Fragment } from "react";
import debounce from "lodash/debounce";
import defer from "lodash/defer";
import { connectSearchBox } from "react-instantsearch/connectors";
import Display from "../../utils/display";
import { css } from "aphrodite";
import aphrodite from "../../utils/aphrodite";
import Grid from "@material-ui/core/Grid";

export default class SearchBox extends React.PureComponent {
  render() {
    const DebouncedSearchBox = ({ currentRefinement, refine }) => {
      const debouncedSearch = debounce(e => {
        refine(e.target.value);
        defer(() => {
          document.getElementsByClassName("search_results")
            ? Array.from(
                document.getElementsByClassName("search_results")
              ).forEach(function(element) {
                element.classList.remove("loading");
              })
            : null;
        });
      }, 500);

      const onChange = e => {
        e.persist();
        document.getElementsByClassName("search_results")
          ? Array.from(
              document.getElementsByClassName("search_results")
            ).forEach(function(element) {
              element.classList.add("loading");
            })
          : null;
        debouncedSearch(e, e.eventTarget);
      };

      return (
        <input
          defaultValue={currentRefinement}
          onChange={onChange}
          className="ais-SearchBox-input"
          autoFocus
          onFocus={e => {
            let val = e.target.value;
            e.target.value = "";
            e.target.value = val;
          }}
        />
      );
    };

    const ConnectedSearchBox = connectSearchBox(DebouncedSearchBox);
    const { tablet_desktop } = this.props;

    return (
      <Fragment>
        {tablet_desktop ? (
          <Display format={"tablet-desktop"}>
            <Grid container spacing={0}>
              <Grid item>
                <ConnectedSearchBox />
              </Grid>
              <Grid item>
                <img
                  src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_1.0/qwarx-search-2.png`}
                  srcSet={`
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_1.0/qwarx-search-2.png,
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_2.0/qwarx-search-2.png 2x,
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_3.0/qwarx-search-2.png 3x,
                    `}
                />
              </Grid>
            </Grid>
          </Display>
        ) : (
          <Display format={"mobile"}>
            <Grid
              container
              spacing={0}
              className={css(
                aphrodite.contentLeft,
                aphrodite.contentRight,
                aphrodite.mobileGreyBackground
              )}
            >
              <Grid item xs>
                <ConnectedSearchBox />
              </Grid>
              <Grid
                item
                style={{
                  width: "50px",
                  backgroundColor: "#0E8AB0",
                  shadow: "0 2px 0 0 #f1f1f1"
                }}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={0}
                  style={{ height: "100%" }}
                >
                  <Grid item>
                    <img
                      src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_1.0/qwarx-search-2.png`}
                      srcSet={`
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_1.0/qwarx-search-2.png,
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_2.0/qwarx-search-2.png 2x,
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_3.0/qwarx-search-2.png 3x,
                    `}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Display>
        )}
      </Fragment>
    );
  }
}
