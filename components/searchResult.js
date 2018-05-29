import Grid from "@material-ui/core/Grid";
import React, { Fragment } from "react";
import Link from "next/link";
import { css } from "aphrodite";
import Typography from "@material-ui/core/Typography";
import aphrodite from "../utils/aphrodite";
import Display from "../utils/display";
import object from "../utils/object";
import { connectHighlight } from "react-instantsearch/connectors";

function ResultImg(props) {
  let img = `https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_70,h_70/`;
  if (props.hit.meta.image) {
    img += props.hit.meta.image;
  } else {
    img = null;
  }

  return (
    <Fragment>
      {img ? (
        <Link
          href={{
            pathname: `/${props.hit.objectID}`
          }}
        >
          <a rel="nofollow">
            <img
              style={{
                width: 70,
                height: 70,
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EEEEEE",
                marginRight: "8px"
              }}
              src={img}
              alt={props.hit.id.title}
              onError={e => (e.target.style.display = "none")}
              onLoad={e => (e.target.style.display = "block")}
            />
          </a>
        </Link>
      ) : null}
    </Fragment>
  );
}

function ResultTitle(props) {
  return (
    <Link
      href={{
        pathname: `${props.hit.objectID}`
      }}
    >
      <a rel="nofollow" target="_blank">
        <TypographyHighlight
          variant="subheading"
          color="secondary"
          attribute={"id.title"}
          hit={props.hit}
        />
      </a>
    </Link>
  );
}

function ResultDescription(props) {
  return (
    <Fragment>
      <TypographyHighlight
        variant="body1"
        color="primary"
        attribute={"meta.description"}
        hit={props.hit}
        info
      />
      {props.hit.meta.description &&
      props.hit.content.p &&
      props.hit.content.p[0]
        ? " "
        : ""}
      <TypographyHighlight
        variant="body1"
        color="primary"
        attribute={"content.p[0]"}
        hit={props.hit}
        info
      />
      {props.hit.content.p &&
      props.hit.content.p[0] &&
      props.hit.content.p[1] &&
      props.hit.content.p[1]
        ? " "
        : ""}
      <TypographyHighlight
        variant="body1"
        color="primary"
        attribute={"content.p[1]"}
        hit={props.hit}
        info
      />
      {props.hit.content.p &&
      props.hit.content.p[1] &&
      props.hit.content.p[2] &&
      props.hit.content.p[2]
        ? " "
        : ""}
      <TypographyHighlight
        variant="body1"
        color="primary"
        attribute={"content.p[2]"}
        hit={props.hit}
        info
      />
    </Fragment>
  );
}

const TypographyHighlight = connectHighlight(
  ({
    highlight,
    attribute,
    hit,
    highlightProperty,
    component,
    variant,
    color,
    info,
    url
  }) => {
    const parsedHit = highlight({
      attribute,
      hit,
      highlightProperty: "_highlightResult"
    });
    const highlightedHits = parsedHit.map((part, key) => {
      if (part.isHighlighted)
        return (
          <mark
            key={key}
            style={{ color: "#BF2885", backgroundColor: "white" }}
          >
            {part.value}
          </mark>
        );
      return part.value;
    });
    return (
      <Typography
        component={"span"}
        variant={variant}
        color={color}
        style={{
          display: info ? "unset" : "inherit",
          fontWeight: variant === "subheading" ? "500" : "inherit",
          color: url ? "#13CCBE" : "inherit"
        }}
      >
        {highlightedHits}
      </Typography>
    );
  }
);

function ResultUrl(props) {
  let url = props.hit.id.url;
  if (url.length > 80) {
    url = `${url.substring(0, 80)}...`;
  }
  return (
    <TypographyHighlight
      component={"span"}
      variant="caption"
      color="secondary"
      attribute={"id.url"}
      hit={props.hit}
      url
    />
  );
}

function ResultInfo(props) {
  return (
    <Grid container direction="column" spacing={0}>
      <Grid item>
        <ResultDescription hit={props.hit} />
      </Grid>
    </Grid>
  );
}

class SearchResult extends React.Component {
  shouldComponentUpdate(nextState, nextProps) {
    return nextState.hit.id.url !== this.props.hit.url;
  }

  render() {
    const { hit, order } = this.props;
    let images = [];

    if (hit && hit.images) {
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
            <ResultUrl hit={hit} />
            <Grid container spacing={0} style={{ marginTop: "4px" }}>
              <Grid item>
                <ResultImg hit={hit} />
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
                <ResultImg hit={hit} />
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
export default SearchResult;
