import Grid from "material-ui/Grid";
import React, { Fragment } from "react";
import Link from "next/link";
import { css } from "aphrodite";
import Typography from "material-ui/Typography";
import aphrodite from "../utils/aphrodite";

function ResultLogo(props) {
  const logo = props.hit.logo;
  const width = 300;

  let responsive_logo = `https://res.cloudinary.com/clactacom/image/upload/`;
  let size = 0;

  if (width >= 1920) {
    responsive_logo += "f_auto,q_auto,c_lpad,b_auto,w_70,h_70/";
    size = 70;
  } else if (width >= 961) {
    responsive_logo += "f_auto,q_auto,c_lpad,b_auto,w_70,h_70/";
    size = 70;
  } else if (width >= 601) {
    responsive_logo += "f_auto,q_auto,c_lpad,b_auto,w_70,h_70/";
    size = 70;
  } else {
    responsive_logo += "f_auto,q_auto,c_lpad,b_auto,w_70,h_70/";
    size = 70;
  }
  if (props.hit.type === "address" || props.hit.type === "POI") {
    responsive_logo += "v1518055630/profile_pictures/ik5ud9nqi3emijp2l8bh.png";
  } else {
    responsive_logo +=
      logo && logo.length ? logo : "v1513737486/no_logo_qwcv0d.png";
  }

  const name = props.hit.name.replace(/\s+/g, "-").toLowerCase();

  return (
    <Link
      href={{
        pathname: `/${props.hit.objectID}`
      }}
    >
      <a rel="nofollow">
        <img
          style={{ width: size, height: size }}
          src={responsive_logo}
          alt={name}
        />
      </a>
    </Link>
  );
}

function ResultTitle(props) {
  if (props.hit.type === "website") {
    let url = props.hit.website_url;
    if (url && url.startsWith("www")) {
      url = `https://${url}`;
    }
    return (
      <Typography variant="body2" color="secondary">
        <a
          href={url}
          target="_blank"
          rel="external noopener noreferrer nofollow"
        >
          {props.hit.name}
        </a>
      </Typography>
    );
  } else {
    let name = props.hit.name;
    if (props.hit.type === "address") {
      name = "Adresse";
    }
    return (
      <Typography variant="subheading" color="secondary">
        <Link
          href={{
            pathname: `/${props.hit.objectID}`
          }}
        >
          <a rel="nofollow">{name}</a>
        </Link>
      </Typography>
    );
  }
}

function ResultSubTitle(props) {
  let subtitle = ``;
  if (props.hit.activity_long) {
    subtitle = props.hit.activity_long;
  } else {
    if (props.hit.activity_summary_description) {
      subtitle += `${props.hit.activity_summary_description}. `;
    }
    if (props.hit.slogan) {
      subtitle += `${props.hit.slogan}. `;
    }
    if (props.hit.activity && props.hit.activity.trim().length) {
      subtitle += props.hit.activity;
    }
  }

  if (!subtitle) {
    subtitle = `Visitez notre vitrine`;
  }
  return (
    <Typography
      component={"h3"}
      variant="body1"
      color="primary"
      style={{ marginBottom: "8px" }}
      className={css(aphrodite.searchResultsPercentage)}
    >
      {subtitle}
    </Typography>
  );
}

function ResultAddress(props) {
  let address;
  if (!props.hit.address) {
    return null;
  }
  const city = props.hit.city ? `, ${props.hit.city}` : "";
  address = `${props.hit.address}${city}`;

  return (
    <Link
      href={{
        pathname: `/${props.hit.objectID}`
      }}
    >
      <a rel="nofollow">
        <Typography variant="body1" component="h3" color="primary">
          {address}
        </Typography>
      </a>
    </Link>
  );
}

function ResultCity(props) {
  return (
    <a rel="nofollow" href={""}>
      <Typography variant="body1" component="h3" color="primary">
        {props.hit.city}
      </Typography>
    </a>
  );
}

function ResultPhone(props) {
  if (!props.hit.phone) {
    return null;
  }

  let phone = props.hit.phone;

  return (
    <a rel="nofollow" href={`tel:${phone}`}>
      <Typography variant="body1" component="h3" color="primary">
        {phone}
      </Typography>
    </a>
  );
}

function ResultInfo(props) {
  function RenderBusinessInfo(props) {
    if (props.hit.type === "address") {
      return (
        <Grid container direction={"row"} spacing={0}>
          <ResultTitle hit={props.hit} />
          <ResultSubTitle hit={props.hit} />
          <ResultAddress hit={props.hit} />
        </Grid>
      );
    } else {
      return (
        <div style={{ marginLeft: "8px" }}>
          <ResultSubTitle hit={props.hit} />
          <Grid container direction={"row"} spacing={0} alignItems="center">
            {props.hit.address ? (
              <Fragment>
                <Grid item>
                  <Typography
                    variant="body2"
                    component="h3"
                    style={{ paddingRight: "4px" }}
                  >
                    {`Adresse:`}
                  </Typography>
                </Grid>
                <Grid item style={{ paddingRight: "8px" }}>
                  <ResultAddress hit={props.hit} />
                </Grid>
              </Fragment>
            ) : null}
            {!props.hit.address && props.hit.city ? (
              <Fragment>
                <Grid item>
                  <Typography
                    variant="body2"
                    component="h3"
                    style={{ paddingRight: "4px" }}
                  >
                    {`Ville:`}
                  </Typography>
                </Grid>
                <Grid item style={{ paddingRight: "8px" }}>
                  <ResultCity hit={props.hit} />
                </Grid>
              </Fragment>
            ) : null}
            {props.hit.phone ? (
              <Fragment>
                <Grid item>
                  <Typography
                    variant="body2"
                    component="h3"
                    style={{ paddingRight: "4px" }}
                  >
                    {`Tél:`}
                  </Typography>
                </Grid>
                <Grid item style={{ paddingRight: "8px" }}>
                  <ResultPhone hit={props.hit} />
                </Grid>
              </Fragment>
            ) : null}
          </Grid>
        </div>
      );
    }
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

export default class SearchResult extends React.PureComponent {
  render() {
    const { hit } = this.props;

    return (
      <div
        className={css(
          aphrodite.contentTop,
          aphrodite.contentBottom,
          aphrodite.searchResultsLeft,
          aphrodite.searchResultsWidth,
          aphrodite.rightBorder
        )}
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
      </div>
    );
  }
}
