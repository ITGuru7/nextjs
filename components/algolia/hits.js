import React, { Fragment } from "react";
import SearchResult from "../searchResult";
import { connectHits } from "react-instantsearch/connectors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import aphrodite from "../../utils/aphrodite";
import { css } from "aphrodite";
import Divider from "@material-ui/core/Divider";
// import Weather from "../weather";
import RandomDidYouKnowText from "../randomDidYouKnowText";
import RichRender from "../richRender";
import dynamic from "next/dynamic";
const Map = dynamic(import("../map"));

class Hits extends React.Component {
  render() {
    const {
      hits,
      tablet_desktop,
      rndDidYouKnowText,
      map,
      width,
      onSearchStateChange,
      updateSearchBoxTextOverride
    } = this.props;

    const results = (hits, tablet_desktop) => {
      if (!map) {
        if (tablet_desktop) {
          return hits.map(hit => (
            <SearchResult
              tablet_desktop
              key={hit.objectID}
              hit={hit}
              indexName={this.props.indexName}
              onSearchStateChange={onSearchStateChange}
              updateSearchBoxTextOverride={updateSearchBoxTextOverride}
            />
          ));
        } else {
          return hits.map(hit => (
            <SearchResult
              mobile
              key={hit.objectID}
              hit={hit}
              indexName={this.props.indexName}
              onSearchStateChange={onSearchStateChange}
              updateSearchBoxTextOverride={updateSearchBoxTextOverride}
            />
          ));
        }
      } else {
        return <Map width={tablet_desktop ? 0 : width} />;
      }
    };

    const render_mobile = hits => {
      return (
        <div
          className={"search_results"}
          style={{ backgroundColor: "#f1f1f1", height: "110%" }}
        >
          {results(hits, false)}
        </div>
      );
    };
    const render_tablet_desktop = hits => {
      let imagesObj = {};
      let images = [];
      hits.map(hit => {
        if (hit.category === "address") {
          return;
        }
        const image = hit.meta ? hit.meta.image : null;
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
            {results(hits, true)}
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
                  <Grid container direction={"row"} spacing={16}>
                    <Grid item>
                      <Grid
                        container
                        alignItems="center"
                        justify="center"
                        style={{ height: "100%" }}
                      >
                        <Grid item>
                          <img
                            src={`
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_105,dpr_1.0/qwarx-did-you-know.png`}
                            srcSet={`
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_105,dpr_1.0/qwarx-did-you-know.png,
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_105,dpr_2.0/qwarx-did-you-know.png 2x,
                    https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_105,dpr_3.0/qwarx-did-you-know.png 3x
                    `}
                            alt={`Qwarx est un moteur de recherche dédié exclusivement à la Nouvelle Calédonie`}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs>
                      <Typography
                        variant={"subheading"}
                        color={"primary"}
                        gutterBottom
                        style={{ fontWeight: 500 }}
                      >
                        {`Le saviez vous ?`}
                      </Typography>
                      <RandomDidYouKnowText rnd={rndDidYouKnowText} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <RichRender hits={hits} />
                </Grid>
                <Grid item>
                  {images.length ? (
                    <Divider
                      style={{ marginBottom: "20px", marginTop: "20px" }}
                    />
                  ) : null}
                  <Grid container direction="row" spacing={0}>
                    {images.map((image, idx) => {
                      const cpt = idx + 1;
                      const url = encodeURIComponent(image.url);
                      return (
                        <Grid
                          item
                          style={{
                            width: "75px",
                            height: "75px",
                            marginBottom: "40px",
                            marginRight: cpt % 5 ? "16px" : null
                          }}
                          key={idx}
                        >
                          <a href={image.objectID} rel="nofollow">
                            <Fragment>
                              <img
                                src={`https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_75,h_75,dpr_1.0/d_qwarx-no-image.png/${url}`}
                                srcSet={`
                                https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_75,h_75,dpr_1.0/d_qwarx-no-image.png/${url},
                                https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_75,h_75,dpr_2.0/d_qwarx-no-image.png/${url} 2x,
                                https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_75,h_75,dpr_3.0/d_qwarx-no-image.png/${url} 3x
                                `}
                                height={75}
                                width={75}
                                alt={image.name}
                                id={image.objectID}
                              />
                              <Typography variant="caption" color="secondary">
                                {`${image.name.substring(0, 10)}..`}
                              </Typography>
                            </Fragment>
                          </a>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid item style={{ marginBottom: "20px", marginTop: "20px" }}>
                  <Divider />
                </Grid>
                <Grid item>{/*<Weather />*/}</Grid>
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
