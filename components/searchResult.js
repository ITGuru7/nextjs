import Grid from "material-ui/Grid";
import React, { Fragment } from "react";
import Link from "next/link";
import { css, StyleSheet } from "aphrodite";
import AddressIcon from "material-ui-icons/Room";
import CityIcon from "material-ui-icons/LocationCity";
import TelIcon from "material-ui-icons/Call";
import Typography from "material-ui/Typography";

function BusinessLogo(props) {
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
          style={{ width: size, height: size, marginRight: "24px" }}
          src={responsive_logo}
          alt={name}
        />
      </a>
    </Link>
  );
}

function BusinessLineName(props) {
  if (props.hit.type === "website") {
    let url = props.hit.website_url;
    if (url && url.startsWith("www")) {
      url = `https://${url}`;
    }
    return (
      <Typography type="title" color="primary">
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
      <Typography type="title" color="primary">
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

function BusinessLineActivity(props) {
  let activity;
  if (props.hit.activity_summary_description) {
    activity = props.hit.activity_summary_description;
  } else if (props.hit.slogan) {
    activity = props.hit.slogan;
  } else if (props.hit.activity && props.hit.activity.trim().length) {
    activity = props.hit.activity;
  }

  if (!activity) {
    return <h3 style={{ fontSize: "0px", margin: "0px" }}>{`Activité`}</h3>;
  }
  return (
    <Typography
      component={"h3"}
      type="subheading"
      color="primary"
      style={{ marginBottom: "8px", paddingLeft: "0px" }}
    >
      {activity}
    </Typography>
  );
}

function BusinessLineAddress(props) {
  let address;
  if (!props.hit.address) {
    return null;
  }
  const city = props.hit.city ? `, ${props.hit.city}` : '';
  address = `${props.hit.address}${city}`

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={0}
    >
      <Grid item>
        <AddressIcon style={{ color: "#7B7E80", width: "20px" }} />
      </Grid>
      <Link
        href={{
          pathname: `/${props.hit.objectID}`
        }}
      >
        <a rel="nofollow">
          <Grid item xs style={{ marginBottom: "4px", paddingLeft: "0px" }}>
            <Typography
              type="body2"
              component="h3"
              style={{ color: "#008CD2" }}
            >
              {address}
            </Typography>
          </Grid>
        </a>
      </Link>
    </Grid>
  );
}

function BusinessLineCity(props) {
  if (props.hit.address || !props.hit.city) {
    return null;
  }

  const styles = StyleSheet.create({
    svg: {
      color: "#7B7E80",
      marginBottom: "4px",
      "@media (max-width: 360px)": {
        width: "16px",
        height: "16px",
        paddingRight: "10px"
      },
      "@media (min-width: 361px) and (max-width: 600px)": {
        width: "18px",
        height: "18px",
        paddingRight: "12px"
      },
      "@media (min-width: 601px) and (max-width: 960px)": {
        width: "20px",
        height: "20px",
        paddingRight: "16px"
      },
      "@media (min-width: 961px) and (max-width: 1919px)": {
        width: "20px",
        height: "20px",
        paddingRight: "16px"
      },
      "@media (min-width: 1920px)": {
        width: "20px",
        height: "20px",
        paddingRight: "16px"
      }
    }
  });

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={0}
    >
      <Grid item>
        <CityIcon style={{ color: "#7B7E80", width: "20px" }} />
      </Grid>
      <Grid item style={{ marginBottom: "4px", paddingLeft: "0px" }}>
        <Typography type="body2" component="h3" color="primary">
          <a rel="nofollow" href={""}>
            {props.hit.city}
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
}

function BusinessLinePhone(props) {
  const styles = StyleSheet.create({
    svg: {
      color: "#7B7E80",
      marginBottom: "4px",
      "@media (max-width: 360px)": {
        width: "16px",
        height: "16px",
        paddingRight: "10px"
      },
      "@media (min-width: 361px) and (max-width: 600px)": {
        width: "18px",
        height: "18px",
        paddingRight: "12px"
      },
      "@media (min-width: 601px) and (max-width: 960px)": {
        width: "20px",
        height: "20px",
        paddingRight: "16px"
      },
      "@media (min-width: 961px) and (max-width: 1919px)": {
        width: "20px",
        height: "20px",
        paddingRight: "16px"
      },
      "@media (min-width: 1920px)": {
        width: "20px",
        height: "20px",
        paddingRight: "16px"
      }
    }
  });

  if (!props.hit.phone) {
    return null;
  }

  let phone = props.hit.phone;

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={0}
    >
      <Grid item>
        <TelIcon style={{ color: "#7B7E80", width: "20px" }} />
      </Grid>
      <Grid item style={{ marginBottom: "4px", paddingLeft: "0px" }}>
        <Typography type="body2" component="h3" color="primary">
          <a rel="nofollow" href={`tel:${phone}`}>
            {phone}
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
}

function BusinessInfo(props) {
  function RenderBusinessInfo(props) {
    if (props.hit.type === "address") {
      return (
        <Grid container direction={"row"}>
          <BusinessLineName hit={props.hit} />
          <BusinessLineActivity hit={props.hit} />
          <BusinessLineAddress hit={props.hit} />
        </Grid>
      );
    } else {
      return (
        <Fragment>
          <BusinessLineName hit={props.hit} />
          <BusinessLineActivity hit={props.hit} />
          <Grid container direction={"row"} spacing={8}>
            {props.hit.address ? <Grid item>
              <BusinessLineAddress hit={props.hit} />
            </Grid> : null}
            {props.hit.city ? <Grid item>
              <BusinessLineCity hit={props.hit} />
            </Grid> : null}
            {props.hit.phone ? <Grid item>
              <BusinessLinePhone hit={props.hit} />
            </Grid> : null}
          </Grid>
        </Fragment>
      );
    }
  }

  return (
    <Grid
      item
      xs={8}
      sm={8}
      md={8}
      lg={9}
      xl={9}
      style={{ paddingLeft: "4px" }}
    >
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justify="flex-start"
        spacing={0}
      >
        <RenderBusinessInfo hit={props.hit} />
      </Grid>
    </Grid>
  );
}

export default class SearchResult extends React.PureComponent {
  render() {
    const hit = this.props.hit;
    return (
      <div>
        <Grid container>
          <BusinessLogo hit={hit}/>
          <BusinessInfo hit={hit}/>
        </Grid>
      </div>
    );
  }
}
