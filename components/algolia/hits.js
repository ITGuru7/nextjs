import React, { Fragment } from "react";
import SearchResult from "../searchResult";
import { connectHits } from "react-instantsearch/connectors";
import Grid from "material-ui/Grid";
import Display from "../../utils/display";

export default connectHits(({ hits }) => {
  const style = {
    width: "75px",
    height: "75px",
    marginBottom: "16px",
    marginRight: "16px"
  };

  const mobile = hits => {
    return hits.map((hit, idx) => <SearchResult key={idx} hit={hit} />);
  };

  const desktop = hits => {
    let imagesObj = {};
    let images = [];
    hits.map(hit => {
      if (hit.images) {
        images = images.concat(Object.values(hit.images));
        imagesObj[hit.name] = hit.images;
      }
    });

    return (
      <Grid container direction="row" spacing={0}>
        <Grid item xs>
          {hits.map((hit, idx) => <SearchResult key={idx} hit={hit} />)}
        </Grid>
        <Grid item xs style={{ marginLeft: "16px", marginRight: "130px" }}>
          <Grid container direction="row" spacing={0}>
            {images.map((image, idx) => {
              const uri = `https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_limit,dpr_auto,w_75,h_75/${image}`;
              return (
                <Grid item style={style} key={idx}>
                  <img src={uri} height={75} width={75}/>
                </Grid>
              );
            })}
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
