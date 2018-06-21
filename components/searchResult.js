import Grid from "@material-ui/core/Grid";
import React, { Fragment } from "react";
import { css } from "aphrodite";
import Typography from "@material-ui/core/Typography";
import aphrodite from "../utils/aphrodite";
import { connectHighlight } from "react-instantsearch/connectors";
import Wrapper from "../components/wrapper";

function ResultImg(props) {
  return (
    <Fragment>
      {props.hit.meta.image ? (
        <a rel="nofollow" href={props.hit.objectID}>
          <img
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#EEEEEE",
              marginRight: "8px",
              width: '70px',
              height: '70px'
            }}
            src={`https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_70,h_70,dpr_1.0/d_qwarx-no-image.png/${
              props.hit.meta.image
            }`}
            srcSet={`
            https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_70,h_70,dpr_1.0/d_qwarx-no-image.png/${
              props.hit.meta.image
            },
            https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_70,h_70,dpr_2.0/d_qwarx-no-image.png/${
              props.hit.meta.image
            } 2x,
            https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_70,h_70,dpr_3.0/d_qwarx-no-image.png/${
              props.hit.meta.image
            } 3x,
            `}
            alt={props.hit.id.title}
            id={props.hit.objectID}
          />
        </a>
      ) : null}
    </Fragment>
  );
}

function ResultTitle(props) {
  return (
    <a href={props.hit.objectID} rel="nofollow">
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
      {props.hit.meta.description &&
      props.hit.meta.description.length >= 200 ? (
        <TypographyHighlight
          variant="body1"
          color="primary"
          attribute={"meta.description"}
          hit={props.hit}
          info
        />
      ) : (
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
          {props.hit.content.p &&
          props.hit.content.p[2] &&
          props.hit.content.p[3] &&
          props.hit.content.p[3]
            ? " "
            : ""}
          <TypographyHighlight
            variant="body1"
            color="primary"
            attribute={"content.p[3]"}
            hit={props.hit}
            info
          />
        </Fragment>
      )}
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
          color: url ? "darkslategrey" : "inherit"
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
      variant="body1"
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
    const { hit, tablet_desktop } = this.props;
    return (
      <Wrapper>
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
      </Wrapper>
    );
  }
}
export default SearchResult;
