import React, { Fragment } from "react";
import SearchResult from "../searchResult";
import { connectHits } from "react-instantsearch/connectors";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import aphrodite from "../../utils/aphrodite";
import object from "../../utils/object";
import { css } from "aphrodite";

class Hits extends React.Component {
  render() {
    const { hits, tablet_desktop } = this.props;
    const render_mobile = hits => {
      return (
        <div
          className={"search_results"}
          style={{ backgroundColor: "#f1f1f1", height: "110%" }}
        >
          {hits.map(hit => <SearchResult mobile key={hit.id.url} hit={hit} />)}
        </div>
      );
    };
    const render_tablet_desktop = hits => {
      let imagesObj = {};
      let images = [];
      hits.map(hit => {
        const image = hit.meta.image;
        if (image) {
          imagesObj = {
            name: hit.id.title,
            objectID: hit.objectID,
            url: image
          };
          images.push(imagesObj);
        }
      });
      return (
        <Grid
          container
          direction="row"
          spacing={0}
          className={"search_results"}
          style={{ flexWrap: "nowrap" }}
        >
          <Grid
            item
            className={css(
              aphrodite.searchResultsPaddingLeft,
              aphrodite.searchResultsPaddingRight,
              aphrodite.rightBorder
            )}
          >
            {hits.map((hit, idx) => (
              <SearchResult tablet_desktop key={hit.id.url} hit={hit} />
            ))}
          </Grid>
          {Object.keys(hits).length ? (
            <Grid item style={{ marginLeft: `12px` }}>
              <Grid
                container
                direction="column"
                spacing={0}
                style={{ width: `439px` }}
              >
                <Grid item>
                  <Grid container direction="row" spacing={0}>
                    {images.map((image, idx) => {
                      const uri = `https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,b_rgb:EEEEEE,g_auto,c_fill,w_75,h_75,dpr_1.0/d_qwarx-no-image.png/${image.url}`;
                      const uri_dpr1 = `https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,b_rgb:EEEEEE,g_auto,c_fill,w_75,h_75,dpr_1.0/d_qwarx-no-image.png/${image.url}`;
                      const uri_dpr2 = `https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,b_rgb:EEEEEE,g_auto,c_fill,w_75,h_75,dpr_2.0/d_qwarx-no-image.png/${image.url} 2x`;
                      const uri_dpr3 = `https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,b_rgb:EEEEEE,g_auto,c_fill,w_75,h_75,dpr_3.0/d_qwarx-no-image.png/${image.url} 3x`;
                      const cpt = idx + 1;
                      return (
                        <Grid
                          item
                          style={{
                            width: "75px",
                            height: "75px",
                            marginBottom: "32px",
                            marginRight: cpt % 5 ? "16px" : null
                          }}
                          key={idx}
                        >
                          <Link
                            href={{
                              pathname: `/${image.objectID}`
                            }}
                          >
                            <a rel="nofollow">
                              <Fragment>
                                <img src={uri} srcset={`${uri_dpr1}, ${uri_dpr2}, ${uri_dpr3}`} height={75} width={75} />
                                <Typography variant="caption" color="secondary">
                                  {`${image.name.substring(
                                    0,
                                    10
                                  )}..`}
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
            </Grid>
          ) : null}
        </Grid>
      );
    };
    return (
      <Fragment>
        {tablet_desktop ? render_tablet_desktop(hits) : render_mobile(hits)}
      </Fragment>
    );
  }
}

export default connectHits(Hits);
