import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default props => {
  const hits = props.hits;

  let facebookHit;
  for (let i = 0; i < hits.length; i++) {
    const hit = hits[i];
    if (hit.id.domain === "facebook.com") {
      facebookHit = hit;
      break;
    }
  }

  if (!facebookHit) {
    return null;
  }

  const cover = `https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,c_fill_pad,g_auto,b_auto,w_400,h_200,dpr_3.0/d_qwarx-facebook-background/${
    facebookHit.rich.cover
  }`;
  const picture = `https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_50,h_50,dpr_1.0/d_qwarx-facebook/${
    facebookHit.rich.picture
  }`;

  const location =
    (facebookHit.rich.location && facebookHit.rich.location.street) ||
    facebookHit.rich.location.city;
  let address;
  if (location) {
    if (facebookHit.rich.location.street && facebookHit.rich.location.city) {
      address = `${facebookHit.rich.location.street} , ${
        facebookHit.rich.location.city
      }`;
    } else if (
      !facebookHit.rich.location.street &&
      facebookHit.rich.location.city
    ) {
      address = facebookHit.rich.location.city;
    } else {
      address = facebookHit.rich.location.street;
    }
  }
  const phone = !!facebookHit.rich.phone;
  const description = facebookHit.meta.description;

  return (
    <Grid container direction={"column"} style={{ width: "400px" }} spacing={0}>
      <Grid item>
        <Grid
          container
          alignItems="flex-end"
          style={{
            backgroundColor: `#616161`,
            backgroundImage: `url(${cover})`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `400px 200px`,
            backgroundPosition: `center center`,
            position: "relative",
            height: "200px"
          }}
          spacing={0}
        >
          {/*<Grid*/}
          {/*item*/}
          {/*style={{*/}
          {/*width: "50px",*/}
          {/*height: "50px"*/}
          {/*}}*/}
          {/*>*/}
          {/*<img*/}
          {/*src={picture}*/}
          {/*style={{*/}
          {/*width: "50px",*/}
          {/*height: "50px",*/}
          {/*padding: "2px"*/}
          {/*}}*/}
          {/*/>*/}
          {/*</Grid>*/}
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="headline" color="secondary">
          {facebookHit.id.title}
        </Typography>
      </Grid>
      {address ? (
        <Grid item>
          <Grid container direction={"row"} spacing={0} alignItems={"center"}>
            <Grid item>
              <Typography
                variant="body2"
                color="primary"
                style={{
                  color: "inherit",
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
                style={{
                  color: "inherit"
                }}
              >
                {`${address.replace(/\s+/g, " ").trim()}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      {phone ? (
        <Grid item>
          <Grid container direction={"row"} alignItems={"center"} spacing={0}>
            <Grid item>
              <Typography
                variant="body2"
                color="primary"
                style={{
                  color: "inherit",
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
                  color: "inherit"
                }}
              >
                {facebookHit.rich.phone.replace(/\s+/g, " ").trim()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      <Grid item>
        <Typography
          variant="body1"
          color="primary"
          style={{
            color: "inherit"
          }}
        >
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};
