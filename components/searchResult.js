import Grid from "@material-ui/core/Grid";
import React, { Fragment } from "react";
import { css } from "aphrodite";
import Typography from "@material-ui/core/Typography";
import aphrodite from "../utils/aphrodite";
import { connectHighlight } from "react-instantsearch/connectors";
import Wrapper from "../components/wrapper";
import { withRouter } from "next/router";

function ResultImg(props) {
  const tab = props.tab;
  const placeholder =
    props.hit.id.domain === "facebook.com"
      ? "d_qwarx-facebook.png"
      : "d_qwarx-no-image.png";

  const address = props.hit.category === "address";

  const image =
    props.hit.category === "address"
      ? props.hit.meta.image
      : encodeURIComponent(props.hit.meta.image);

  let w, h;
  switch (tab) {
    case 0:
      w = 80;
      h = 90;
      break;
    case 1:
      w = 90;
      h = 120;
      break;
    case 2:
      w = 90;
      h = 120;
      break;
    case 3:
      w = 90;
      h = 120;
      break;
    case 4:
      w = 90;
      h = 120;
      break;
    case 5:
      w = 90;
      h = 120;
      break;
    default:
  }

  const srcSet = address
    ? `
            ${[image.slice(0, 100), "/dpr_1.0", image.slice(100)].join("")},
            ${[image.slice(0, 100), "/dpr_2.0", image.slice(100)].join("")} 2x,
            ${[image.slice(0, 100), "/dpr_3.0", image.slice(100)].join("")} 3x,
    `
    : `
            https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_${w},h_${h},dpr_1.0/${placeholder}/${image},
            https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_${w},h_${h},dpr_2.0/${placeholder}/${image} 2x,
            https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_${w},h_${h},dpr_3.0/${placeholder}/${image} 3x,
    `;

  const src = address
    ? image
    : `https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_${w},h_${h},dpr_1.0/${placeholder}/${image}`;

  return (
    <Fragment>
      {props.hit.meta.image && (
        <a
          rel="noopener"
          href={address ? null : props.hit.objectID}
          target="_blank"
        >
          <img
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#EEEEEE",
              marginRight: "8px",
              width: `${w}px`,
              height: `${h}px`
            }}
            src={src}
            srcSet={srcSet}
            alt={props.hit.id.title}
            id={props.hit.objectID}
          />
        </a>
      )}
    </Fragment>
  );
}

function ResultTitle(props) {
  const { onSearchStateChange } = props;

  if (props.hit.category === "address") {
    return (
      <a rel="noopener">
        <TypographyHighlight
          variant="subheading"
          color="secondary"
          attribute={"id.title"}
          hit={props.hit}
          style={{ textTransform: "lowercase" }}
          address
          onSearchStateChange={onSearchStateChange}
        />
      </a>
    );
  } else {
    return (
      <a href={props.hit.objectID} target="_blank" rel="noopener">
        <TypographyHighlight
          variant="subheading"
          color="secondary"
          attribute={"id.title"}
          hit={props.hit}
          style={{ textTransform: "lowercase" }}
        />
      </a>
    );
  }
}

function ResultDescription(props) {
  const domain = props.hit.id.domain;
  const category = props.hit.category;
  let date = null;
  if (props.hit.meta.date) {
    const jsDate = new Date(props.hit.meta.date * 1000);
    const day =
      jsDate.getDate() < 10 ? `0${jsDate.getDate()}` : jsDate.getDate();
    const month =
      jsDate.getMonth() < 10 ? `0${jsDate.getMonth()}` : jsDate.getMonth();
    date = `${day}/${month}/${jsDate.getFullYear()}`;
  }

  let price = props.hit.rich ? props.hit.rich.price : null;
  if (price) {
    price = price.trim();
    price = price.replace(".0000", "");
    if (price.match(/cfp|CFP|xpf|XPF|f|F/g)) {
      price = price.replace(/cfp|CFP|xpf|XPF|f|F/g, "XPF");
      price  = price.replace(/XPF/gi, "");
    }
    price += " XPF";

  }
  const facebookRender = () => {
    const location =
      (props.hit.rich.location && props.hit.rich.location.street) ||
      (props.hit.rich.location && props.hit.rich.location.city);
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
        {props.hit.meta.description ? (
          <TypographyHighlight
            variant="body1"
            color="primary"
            attribute={"meta.description"}
            hit={props.hit}
            info
            reduce={count}
          />
        ) : (
          <Typography variant="body1" color="primary" style={{}}>
            {`Accéder directement à la page facebook.`}
          </Typography>
        )}

        <Grid
          container
          direction={"row"}
          alignItems={"center"}
          style={{ marginTop: "4px" }}
        >
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
                    {`Téléphone : `}
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
                    {`Adresse : `}
                  </Typography>{" "}
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="primary">
                    {`${address.replace(/\s+/g, " ").trim()}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Fragment>
    );
  };

  const RichContent = () => {
    let content = null;
    let source;
    switch (domain) {
      case "lnc.nc":
        source = "Les Nouvelles Calédoniennes";
        break;
      case "actu.nc":
        source = "Actu.nc";
        break;
      case "caledosphere.com":
        source = "Caledosphere";
        break;
      case "lecriducagou.org":
        source = "Le Cri du Cagou";
        break;
      case "ladepeche.nc":
        source = "La Depeche";
        break;
      case "congres.nc":
        source = "Le Congrès de la NC";
        break;
      default:
        content = null;
        source = null;
        break;
    }

    const richComponent = (label, value) => {
      return (
        <Fragment>
          {value && (
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
                    {label}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="primary"
                    style={{
                      marginRight: "4px"
                    }}
                  >
                    {value}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Fragment>
      );
    };

    switch (category) {
      case "infos":
        content = (
          <Fragment>
            {richComponent(`Source : `, source)}
            {richComponent(`| Date : `, date)}
          </Fragment>
        );
        break;
      case "classifieds":
        content = (
          <Fragment>
            {richComponent(`Prix : `, price)}
            {richComponent(`| Date : `, date)}
          </Fragment>
        );
        break;
      case "ecommerce":
        content = (
          <Fragment>
            {richComponent(`Prix : `, price)}
            <Typography
              variant="body2"
              color="primary"
              style={{
                marginLeft: "4px",
                marginRight: "4px"
              }}
            >
              {"|"}
            </Typography>
            <a rel="noopener" href={props.hit.objectID} target="_blank">
              <Typography
                variant="body2"
                color="primary"
                style={{
                  marginLeft: "4px",
                  color: "#1565C0"
                }}
              >
                {">>>> Achetez ici"}
              </Typography>
            </a>
          </Fragment>
        );
        break;
      case "realestate":
        content = (
          <Fragment>
            {richComponent(`Prix : `, price)}
            {richComponent(`| Date : `, date)}
          </Fragment>
        );
        break;
      default:
    }
    return content;
  };

  const defaultRender = () => {
    return (
      <Fragment>
        {props.hit.meta.description ? (
          <TypographyHighlight
            variant="body1"
            color="primary"
            attribute={"meta.description"}
            hit={props.hit}
            info
          />
        ) : (
          <Typography variant="body1" color="primary">
            {props.hit.category !== "address"
              ? `Cette page ne dispose pas de description, veuillez nous en excuser.`
              : `Cliquez sur l'adresse pour accéder à la carte interactive.`}
          </Typography>
        )}
        <Grid
          container
          direction={"row"}
          alignItems={"center"}
          style={{ marginTop: "4px" }}
        >
          <RichContent />
        </Grid>
      </Fragment>
    );
  };

  let Render;

  switch (props.hit.id.domain) {
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
    reduce,
    address,
    onSearchStateChange
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
      if (
        (hit.category === "classifieds" || hit.category === "realestate") &&
        !url
      ) {
        part.value = part.value.replace(
          /\d{2}[. -/]*\d{2}[. -/]*\d{2}/g,
          "******"
        );
        part.value = part.value.replace(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/gi,
          "****"
        );
      }
      if  (
        (hit.category === "directory") &&
        !url
      ) {
        part.value = part.value.replace(
          /\d+.{1}\s[A-z]+\s[A-z]+/gi,
          "****"
        );
      }
      if (part.isHighlighted) {
        return (
          <mark
            key={key}
            style={{
              backgroundColor: "unset",
              fontWeight: 500,
              color: "inherit"
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
          color: url ? "#0D7B72" : "default"
        }}
        onClick={
          address
            ? () => {
                onSearchStateChange(
                  {
                    query: hit.rich.address,
                    page: 1,
                    hitsPerPage: 10
                  },
                  6
                );
                document.getElementsByClassName(
                  "ais-SearchBox-input"
                )[0].value =
                  hit.rich.address;
              }
            : () => null
        }
      >
        {highlightedHits}
      </Typography>
    );
  }
);

function ResultUrl(props) {
  if (props.hit.category === "address") {
    const asPath = props.router.asPath;
    const endStr =
      asPath.indexOf("&tab") !== -1 ? asPath.indexOf("&tab") : asPath.length;
    const path = asPath.substring(0, endStr);

    let url = `https://qwarx.nc${path}&tab=6`;
    url = url.length > 80 ? `${url.substring(0, 80)}...` : url;
    return (
      <Typography variant="body2" color="primary" style={{ color: "#0D7B72" }}>
        {url}
      </Typography>
    );
  }
  let url = props.hit.id.url;
  if (url.length > 70) {
    url = `${url.substring(0, 70)}...`;
  }
  return (
    <Grid container direction={"row"} spacing={0} alignItems={"center"}>
      <Grid item style={{ marginRight: "4px" }}>
        <img
          src={`https://www.google.com/s2/favicons?domain=${
            props.hit.id.domain
          }`}
          alt={'favicon'}
          id={props.hit.objectID}
        />
      </Grid>
      <Grid item style={{ width: "90%" }}>
        <TypographyHighlight
          component={"span"}
          variant="body2"
          color="secondary"
          attribute={"id.url"}
          hit={props.hit}
          reduce={1}
          url
        />
      </Grid>
    </Grid>
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

const DesktopRender = () => {
  return (
    <div
      className={css(
        aphrodite.contentTop,
        aphrodite.contentBottom,
        aphrodite.mobileMarginBottom,
        aphrodite.searchResultsWidth
      )}
      style={{ backgroundColor: "white" }}
    >
      <ResultTitle hit={hit} onSearchStateChange={onSearchStateChange} />
      <ResultUrl hit={hit} router={router} />
      <Grid container spacing={0}>
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
  );
};

class SearchResult extends React.Component {
  render() {
    const {
      hit,
      tablet_desktop,
      router,
      onSearchStateChange,
      tab
    } = this.props;
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
            {tab === 0 ? (
              <Fragment>
                <ResultTitle
                  hit={hit}
                  onSearchStateChange={onSearchStateChange}
                />
                <ResultUrl hit={hit} router={router} />
                <Grid container spacing={0}>
                  <Grid item>
                    <ResultImg hit={hit} tab={tab} />
                  </Grid>
                  <Grid item xs>
                    <Grid container spacing={0} direction={"column"}>
                      <Grid item>
                        <ResultInfo hit={hit} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Fragment>
            ) : (
              <Fragment>
                <Grid container direction={"row"} spacing={0}>
                  <Grid item>
                    <ResultImg hit={hit} tab={tab} />
                  </Grid>
                  <Grid item xs style={{ maxWidth: "83%" }}>
                    <Grid container direction={"column"} spacing={0}>
                      <Grid item>
                        <ResultTitle
                          hit={hit}
                          onSearchStateChange={onSearchStateChange}
                        />
                      </Grid>
                      <Grid item>
                        <ResultUrl hit={hit} router={router} />
                      </Grid>
                      <Grid item>
                        <ResultInfo hit={hit} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Fragment>
            )}
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
            <ResultTitle hit={hit} onSearchStateChange={onSearchStateChange} />
            <ResultUrl hit={hit} router={router} />
            <Grid container spacing={0}>
              <Grid item>
                <ResultImg hit={hit} tab={tab} />
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
export default withRouter(SearchResult);
