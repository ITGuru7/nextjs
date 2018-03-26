import Grid from "material-ui/Grid";
import React from "react";
import Paper from "material-ui/Paper";
import Link from "next/link";
import { css, StyleSheet } from "aphrodite";
import AddressIcon from "material-ui-icons/Room";
import CityIcon from "material-ui-icons/LocationCity";
import TelIcon from "material-ui-icons/Call";
import Typography from "material-ui/Typography";
import { connectHighlight } from "react-instantsearch/connectors";

function BusinessLogo(props) {
  const logo = props.hit.logo;
  const width = 1600;

  let responsive_logo = `https://res.cloudinary.com/clactacom/image/upload/`;
  let size = 0;

  if (width >= 1920) {
    responsive_logo += "f_auto,q_auto,c_lpad,b_auto,w_110,h_110/";
    size = 110;
  } else if (width >= 961) {
    responsive_logo += "f_auto,q_auto,c_lpad,b_auto,w_110,h_110/";
    size = 110;
  } else if (width >= 601) {
    responsive_logo += "f_auto,q_auto,c_lpad,b_auto,w_110,h_110/";
    size = 110;
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
    <Grid item xs={4} sm={4} md={4} lg={3} xl={3}>
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        justify={"center"}
        spacing={0}
      >
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
      </Grid>
    </Grid>
  );
}

function BusinessLineName(props) {
  if (props.hit.type === "website") {
    let url = props.hit.website_url;
    if (url && url.startsWith("www")) {
      url = `https://${url}`;
    }
    return (
      <Typography
        type="title"
        color="primary"
        style={{ marginBottom: "8px", paddingLeft: "0px" }}
      >
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
      <Typography
        type="title"
        color="primary"
        style={{ marginBottom: "8px", paddingLeft: "0px" }}
      >
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

function BusinessLineKeywords(props) {
  if (!props.hit.keywords) {
    return null;
  }

  const CustomHighlight = connectHighlight(
    ({ highlight, attributeName, hit, highlightProperty }) => {
      const parsedHit = highlight({
        attributeName,
        hit,
        highlightProperty: "_highlightResult"
      });
      const highlightedHits = parsedHit.map((part, i) => {
        let middle = parsedHit[i];
        let suffix = i + 1 !== parsedHit.length ? parsedHit[i + 1] : null;
        let hasPrefix =
          !middle.isHighlighted &&
          suffix &&
          suffix.isHighlighted &&
          middle.value
            .split(";")
            .pop()
            .trim().length;
        let hasSuffix =
          middle.isHighlighted &&
          suffix &&
          !suffix.isHighlighted &&
          suffix.value
            .split(";")
            .shift()
            .trim().length;

        if (hasPrefix) {
          return ` ${middle.value
            .split(";")
            .pop()
            .trim()} `;
        }

        if (part.isHighlighted) {
          return hasSuffix ? `${part.value.trim()}` : `${part.value.trim()} `;
        } else {
          if (part.value !== parsedHit[0].value) {
            return i !== parsedHit.length - 1
              ? `${part.value.split(";")[0]} `
              : `${part.value.split(";")[0]}`;
          } else {
            return null;
          }
        }
      });
      return <span>{highlightedHits}</span>;
    }
  );

  return (
    <Typography type="body2" component="span" color="primary">
      <CustomHighlight attributeName={"keywords"} hit={props.hit} />
    </Typography>
  );
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
  if (!props.hit.address) {
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
        <AddressIcon className={css(styles.svg)} />
      </Grid>
      <Link
        href={{
          pathname: `/${props.hit.objectID}`
        }}

      >
        <a rel="nofollow">
        <Grid item xs style={{ marginBottom: "4px", paddingLeft: "0px" }}>
          <Typography type="body2" component="h3" style={{ color: "#008CD2" }}>
            {props.hit.address}
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
        <CityIcon className={css(styles.svg)} />
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

function BusinessLineTel(props) {
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
        <TelIcon className={css(styles.svg)} />
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
        <div>
          <BusinessLineName hit={props.hit} />
          <BusinessLineActivity hit={props.hit} />
          <BusinessLineAddress hit={props.hit} />
        </div>
      );
    } else {
      return (
        <div>
          <BusinessLineName hit={props.hit} />
          <BusinessLineActivity hit={props.hit} />
          <BusinessLineAddress hit={props.hit} />
          <BusinessLineCity hit={props.hit} />
          <BusinessLineTel hit={props.hit} />
          <BusinessLineKeywords hit={props.hit} />
        </div>
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

export default function searchResult({ hit }) {
  let styles = StyleSheet.create({
    paper: {
      "@media (max-width: 360px)": {
        marginBottom: "16px",
        marginTop: "16px",
        padding: "16px"
      },
      "@media (min-width: 361px) and (max-width: 600px)": {
        marginBottom: "16px",
        marginTop: "16px",
        padding: "16px"
      },
      "@media (min-width: 601px) and (max-width: 960px)": {
        marginBottom: "16px",
        marginTop: "16px",
        padding: "16px"
      },
      "@media (min-width: 961px) and (max-width: 1919px)": {
        marginBottom: "16px",
        marginTop: "16px",
        padding: "16px"
      },
      "@media (min-width: 1920px)": {
        marginBottom: "16px",
        marginTop: "16px",
        padding: "16px"
      },
      "@media all": {
        paddingLeft: "0px"
      }
    }
  });
  return (
    <Paper elevation={2} className={css(styles.paper)}>
      <Grid container>
        <BusinessLogo hit={hit} />
        <BusinessInfo hit={hit} />
      </Grid>
    </Paper>
  );
}
