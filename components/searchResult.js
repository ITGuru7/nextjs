import Grid from "@material-ui/core/Grid";
import React, { Fragment } from "react";
import { css } from "aphrodite";
import Typography from "@material-ui/core/Typography";
import aphrodite from "../utils/aphrodite";
import { connectHighlight } from "react-instantsearch/connectors";
import MyImg from "./MyImg";

function ResultImg(props) {
  return (
    <MyImg
      imgStyle={{
        width: 70,
        height: 70,
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#EEEEEE",
        marginRight: "8px"
      }}
      cloudinaryPrefix={`https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_70,h_70`}
      imgUrl={props.hit.meta.image}
      title={props.hit.id.title}
      href={props.hit.objectID}
    />
  );
}

function ResultTitle(props) {
  return (
    <a href={props.hit.objectID} rel="nofollow" target="_blank">
      <TypographyHighlight
        variant="subheading"
        color="secondary"
        attribute={"id.title"}
        hit={props.hit}
      />
    </a>
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
  render() {
    const { hit, tablet_desktop, mobile } = this.props;
    return (
      <Fragment>
        {tablet_desktop ? (
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
        ) : (
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
            <ResultUrl hit={hit} />
            <Grid container spacing={0}>
              <Grid item>
                <ResultImg hit={hit} />
              </Grid>
              <Grid item xs>
                <ResultInfo hit={hit} />
              </Grid>
            </Grid>
          </div>
        )}
      </Fragment>
    );
  }
}
export default SearchResult;
