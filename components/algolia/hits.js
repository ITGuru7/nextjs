import React, { Fragment } from "react";
import SearchResult from "../searchResult";
import { connectHits } from "react-instantsearch/connectors";
import Grid from "material-ui/Grid";
import Display from "../../utils/display";

export default connectHits(({ hits }) => {
  const style = {
    width: "75px",
    height: "75px",
    border: "1px black solid",
    marginBottom: "16px",
    marginRight: "16px"
  };

  const mobile = hits => {
    return hits.map((hit, idx) => <SearchResult key={idx} hit={hit} />);
  };

  const desktop = hits => {
    let images = {};
    hits.map(hit => images[hit.name] = hit.images);


    let gallery = (images) => {

    }

    return (
      <Grid container direction="row" spacing={0}>
        <Grid item xs>
          {hits.map((hit, idx) => <SearchResult key={idx} hit={hit} />)}
        </Grid>
        <Grid item xs style={{ marginLeft: "16px" }}>
          <Grid
            container
            direction="column"
            spacing={0}
            style={{ height: "100%" }}
          >
            <Grid container direction="row" spacing={0}>
              <Grid item style={style}>
                X
              </Grid>
              <Grid item style={style}>
                X
              </Grid>
              <Grid item style={style}>
                X
              </Grid>
              <Grid item style={style}>
                X
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <Grid item style={style}>
                X
              </Grid>
              <Grid item style={style}>
                X
              </Grid>
              <Grid item style={style}>
                X
              </Grid>
              <Grid item style={style}>
                X
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <Grid item style={style}>
                X
              </Grid>
              <Grid item style={style}>
                X
              </Grid>
              <Grid item style={style}>
                X
              </Grid>
              <Grid item style={style}>
                X
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Fragment>
      <Display format="tablet-desktop">{desktop(hits)}</Display>
      <Display format="mobile">{mobile(hits)}</Display>
    </Fragment>
  );
});
