import Grid from "@material-ui/core/Grid";
import React, { Fragment } from "react";
import { css } from "aphrodite";
import Typography from "@material-ui/core/Typography";
import aphrodite from "../utils/aphrodite";
import { connectHighlight } from "react-instantsearch/connectors";
import Wrapper from "../components/wrapper";

function ResultImg(props) {
  const placeholder =
    props.hit.id.domain === "facebook.com"
      ? "d_qwarx-facebook.png"
      : "d_qwarx-no-image.png";
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
              width: "70px",
              height: "70px"
            }}
            src={`https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_70,h_70,dpr_1.0/${placeholder}/${
              props.hit.meta.image
            }`}
            srcSet={`
            https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_70,h_70,dpr_1.0/${placeholder}/${
              props.hit.meta.image
            },
            https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_70,h_70,dpr_2.0/${placeholder}/${
              props.hit.meta.image
            } 2x,
            https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_70,h_70,dpr_3.0/${placeholder}/${
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
  const facebookRender = () => {
    const location =
      (props.hit.rich.location && props.hit.rich.location.street) ||
      props.hit.rich.location.city;
    const phone = !!props.hit.rich.phone;
    const count = location || phone ? 1 : 0;
    let address;
    if (location) {
      if (props.hit.rich.location.street && props.hit.rich.location.city) {
        address = `${props.hit.rich.location.street} , ${
          props.hit.rich.location.city
        }`;
      } else if (
        !props.hit.rich.location.street &&
        props.hit.rich.location.city
      ) {
        address = props.hit.rich.location.city;
      } else {
        address = props.hit.rich.location.street;
      }
    }
    return (
      <Fragment>
        <Fragment>
          {props.hit.meta.description ? (
            <TypographyHighlight
              variant="body1"
              color="primary"
              attribute={"meta.description"}
              hit={props.hit}
              info
              reduce={count}
            />
          ) : <Typography
            variant="body1"
            color="primary"
            style={{
              
            }}
          >
            {`Accéder directement à la page facebook.`}
          </Typography>
          }

          <Grid container direction={"row"} alignItems={"center"} style={{marginTop: '4px'}}>
            {phone ? (
              <Grid item>
                <Grid
                  container
                  direction={"row"}
                  alignItems={"center"}
                  spacing={0}
                >
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="primary"
                      style={{
                        
                        marginRight: "4px"
                      }}
                    >
                      {`Télephone: `}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="primary"
                      style={{
                        
                        marginRight: "8px"
                      }}
                    >
                      {props.hit.rich.phone.replace(/\s+/g, " ").trim()}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
            {location ? (
              <Grid item>
                <Grid
                  container
                  direction={"row"}
                  spacing={0}
                  alignItems={"center"}
                >
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="primary"
                      style={{
                        
                        marginRight: "4px"
                      }}
                    >
                      {`Adresse: `}
                    </Typography>{" "}
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body1"
                      color="primary"
                    >
                      {`${address.replace(/\s+/g, " ").trim()}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Fragment>
      </Fragment>
    );
  };

  const topMarketRender = () => {
    return (
      <Fragment>
        {props.hit.id.domain === "topmarket.nc" &&
        props.hit.content.p[1] &&
        props.hit.content.p[1].length ? (
          <Fragment>
            <Typography
              variant="body2"
              color="primary"
              style={{
                display: "unset",
              }}
            >
              {"Boutique : "}
            </Typography>
            <TypographyHighlight
              variant="body1"
              color="primary"
              attribute={"content.p[1]"}
              hit={props.hit}
              info
            />
            <br />
          </Fragment>
        ) : null}
        {defaultRender()}
      </Fragment>
    );
  };

  const defaultRender = () => {
    return (
      <Fragment>
        {props.hit.meta.description &&
        props.hit.meta.description.length >= 200 ? (
          <Fragment>
            <TypographyHighlight
              variant="body1"
              color="primary"
              attribute={"meta.description"}
              hit={props.hit}
              info
            />
          </Fragment>
        ) : (
          <Fragment>
            {props.hit.content ? (
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
            ) : null}
          </Fragment>
        )}
      </Fragment>
    );
  };

  let Render;

  switch (props.hit.id.domain) {
    case "topmarket.nc":
      Render = topMarketRender;
      break;
    case "facebook.com":
      Render = facebookRender;
      break;
    default:
      Render = defaultRender;
  }

  return <Render />;
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
    url,
    reduce
  }) => {
    const parsedHit = highlight({
      attribute,
      hit,
      highlightProperty: "_highlightResult"
    });
    if (!reduce) {
      reduce = 0;
    }
    const highlightedHits = parsedHit.map((part, key) => {
      if (reduce && part.value.length > 100) {
        part.value =
          part.value.substring(0, part.value.length - reduce * 80) + "...";
      }
      if (part.isHighlighted) {
        return (
          <mark
            key={key}
            style={{
              backgroundColor: "unset",
              fontWeight: 500,
              color: 'inherit'
            }}
          >
            {part.value}
          </mark>
        );
      } else {
        return part.value;
      }
    });
    return (
      <Typography
        component={"span"}
        variant={variant}
        color={color}
        noWrap={!!url}
        style={{
          display: info ? "unset" : "inherit",
          fontWeight:
            variant === "subheading"
              ? "500"
              : variant === "body2" ? "500" : "inherit",
          color: url ? "#0D7B72" : 'default'
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
      variant="body2"
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
                <Grid container spacing={0} direction={"column"}>
                  <Grid item>
                    <ResultInfo hit={hit} />
                  </Grid>
                </Grid>
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
