import React, { Fragment } from "react";
import SearchResult from "../searchResult";
import { connectHits } from "react-instantsearch/connectors";
import Grid from "material-ui/Grid";
import Display from "../../utils/display";
import Link from "next/link";
import Typography from "material-ui/Typography";
import aphrodite from "../../utils/aphrodite";
import { css } from "aphrodite";

export default connectHits(({ hits }) => {
  const style = {
    width: "75px",
    height: "75px",
    marginBottom: "32px",
    marginRight: "16px"
  };

  const mobile = hits => {
    return (
      <div id={"search_results"} className={css(aphrodite.mobileGreyBackground)}>
        {hits.map((hit, idx) => <SearchResult key={idx} hit={hit} />)}
      </div>
    );
  };

  const desktop = hits => {
    let imagesObj = {};
    let images = [];
    hits.map(hit => {
      if (hit.images) {
        const hitImages = Object.values(hit.images);
        hitImages.map(
          hitImage =>
            (imagesObj[hitImage] = {
              name: hit.name,
              objectID: hit.objectID,
              images: hitImages
            })
        );
        images = images.concat(hitImages);
      }
    });

    return (
      <Grid container direction="row" spacing={0} id={"search_results"}>
        <Grid
          item
          xs
          className={css(
            aphrodite.searchResultsPaddingLeft,
            aphrodite.searchResultsPaddingRight,
            aphrodite.rightBorder
          )}
        >
          {hits.map((hit, idx) => <SearchResult key={idx} hit={hit} />)}
        </Grid>
        <Grid item xs style={{ marginLeft: `12px` }}>
          <Grid
            container
            direction="row"
            spacing={0}
            style={{ maxWidth: `500px` }}
          >
            {images.map((image, idx) => {
              const uri = `https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,w_75,h_75/${image}`;
              return (
                <Grid item style={style} key={idx}>
                  <Link
                    href={{
                      pathname: `/${imagesObj[image].objectID}`
                    }}
                  >
                    <a rel="nofollow">
                      <Fragment>
                        <img src={uri} height={75} width={75} />
                        <Typography variant="caption" color="secondary">
                          {`${imagesObj[image].name.substring(0, 10)}..`}
                        </Typography>
                      </Fragment>
                    </a>
                  </Link>
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
