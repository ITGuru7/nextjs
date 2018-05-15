import Grid from "material-ui/Grid";
import React, { Fragment } from "react";
import Link from "next/link";
import { css } from "aphrodite";
import Typography from "material-ui/Typography";
import aphrodite from "../utils/aphrodite";
import { Highlight } from "react-instantsearch/dom";
import Display from "../utils/display";
import object from "../utils/object";
import withSentry from "../components/withSentry";

function ResultLogo(props) {
  let logo = "https://res.cloudinary.com/clactacom/image/upload/v1513737486/no_logo_qwcv0d.png"

  if (props.hit.meta.image) {
    logo = props.hit.meta.image
  } else if (props.hit.content.img) {
    logo = props.hit.content.img
  }

  return (
    <Link
      href={{
        pathname: `/${props.hit.objectID}`
      }}
    >
      <a rel="nofollow">
        <img
          style={{ width: 40, height: 40 }}
          src={logo}
          alt={props.hit.id.title}
        />
      </a>
    </Link>
  );
}

function ResultTitle(props) {
  return (
    <Typography variant="subheading" color="secondary">
      <Link
        href={{
          pathname: `${props.hit.objectID}`
        }}
      >
        <a rel="nofollow" target="_blank">
          <Highlight attribute={"id.title"} hit={props.hit} />
        </a>
      </Link>
    </Typography>
  );
}

function ResultDescription(props) {
  return (
    <Typography
      component={"span"}
      variant="body1"
      color="primary"
      style={{ marginBottom: "4px" }}
    >
      <Highlight attribute={"id.description"} hit={props.hit} />
    </Typography>
  );
}

function ResultSubTitle(props) {
  let subtitle = "";

  if (props.hit.content.p) {
    subtitle = props.hit.content.p[0];
  }
  return (
    <Typography
      component={"span"}
      variant="body1"
      color="primary"
      style={{ marginBottom: "4px" }}
    >
      {subtitle}
    </Typography>
  );
}

function ResultUrl(props) {
  let url = props.hit.id.url;
  if (url.length > 80) {
    url = `${url.substring(0, 80)}...`;
  }
  return (
    <Typography
      component={"span"}
      variant="caption"
      color="secondary"
      style={{ marginBottom: "8px", color: '#13CCBE' }}
    >
      {url}
    </Typography>
  );
}

function ResultInfo(props) {
  function RenderBusinessInfo(props) {
    return (
      <div style={{ marginLeft: "8px" }}>
        <ResultDescription hit={props.hit} />
        <ResultSubTitle hit={props.hit} />
      </div>
    );
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      justify="flex-start"
      spacing={0}
    >
      <RenderBusinessInfo hit={props.hit} />
    </Grid>
  );
}

class SearchResult extends React.PureComponent {
  render() {
    const { hit, order } = this.props;
    let images = [];

    if (hit.images) {
      images = images.concat(object.values(hit.images));
    }
    return (
      <Fragment>
        <Display format="tablet-desktop">
          <div
            className={css(
              aphrodite.contentTop,
              aphrodite.contentBottom,
              aphrodite.mobileMarginBottom,
              aphrodite.searchResultsWidth
            )}
            style={{ backgroundColor: "white" }}
          >
            <ResultTitle hit={hit} style={{ marginBottom: "4px" }} />
            <ResultUrl hit={hit}/>
            <Grid container spacing={0}>
              <Grid item>
                <ResultLogo hit={hit} />
              </Grid>
              <Grid item xs>
                <ResultInfo hit={hit} />
              </Grid>
            </Grid>
          </div>
        </Display>
        <Display format="mobile">
          <div
            className={css(
              aphrodite.contentTop,
              aphrodite.contentBottom,
              aphrodite.mobileMarginBottom,
              aphrodite.searchResultsWidth,
              aphrodite.searchResultsPaddingLeft,
              aphrodite.searchResultsPaddingRight,
              aphrodite.rightBorder
            )}
            style={{ backgroundColor: "white" }}
          >
            <ResultTitle hit={hit} style={{ marginBottom: "4px" }} />
            <Grid container spacing={0}>
              <Grid item>
                <ResultLogo hit={hit} />
              </Grid>
              <Grid item xs>
                <ResultInfo hit={hit} />
              </Grid>
            </Grid>
            <Grid container spacing={0} style={{ marginLeft: "78px" }}>
              {!order
                ? images.map((image, idx) => {
                    const uri = `https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,w_75,h_75/${image}`;
                    return (
                      <Grid
                        item
                        style={{
                          marginTop: "4px",
                          marginBottom: "4px",
                          width: "70px",
                          height: "70px",
                          marginRight: "4px"
                        }}
                        key={idx}
                      >
                        <img src={uri} height={70} width={70} />
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </div>
        </Display>
      </Fragment>
    );
  }
}
export default withSentry(SearchResult);
