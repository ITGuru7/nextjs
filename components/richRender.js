import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Fragment } from "react";
import Divider from "@material-ui/core/Divider";
import Rating from "react-rating";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";

export default props => {
  const hits = props.hits;

  let facebookHit;
  for (let i = 0; i < hits.length; i++) {
    const hit = hits[i];
    if (hit.id.domain === "facebook.com" && hit.rich.cover) {
      facebookHit = hit;
      break;
    }
  }

  if (!facebookHit) {
    return null;
  }

  const cover = `https://res.cloudinary.com/clactacom/image/fetch/f_auto,q_auto,c_fill_pad,g_auto,b_auto,w_439,h_200,dpr_3.0/d_qwarx-facebook-background/${
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
  const overall_star_rating = facebookHit.rich.overall_star_rating;

  return (
    <Fragment>
      <Grid item style={{ marginBottom: "20px", marginTop: "20px" }}>
        <Divider />
      </Grid>
      <Grid
        container
        direction={"column"}
        style={{ width: "439px" }}
        spacing={8}
      >
        <Grid item>
          <Grid
            container
            alignItems="flex-end"
            style={{
              backgroundColor: `#616161`,
              backgroundImage: `url(${cover})`,
              backgroundRepeat: `no-repeat`,
              backgroundSize: `439px 200px`,
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
          <a href={facebookHit.objectID} rel="nofollow">
            <Typography variant="subheading" color="secondary" style={{fontWeight: 500}}>
              {facebookHit.id.title}
            </Typography>
          </a>
        </Grid>
        {overall_star_rating ? (
          <Grid item>
            <Rating
              fractions={2}
              readonly={true}
              initialRating={overall_star_rating}
              fullSymbol={<Star style={{ color: "rgb(14, 138, 176)" }} />}
              emptySymbol={
                <StarBorder style={{ color: "rgb(14, 138, 176)" }} />
              }
            />
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
      </Grid>
    </Fragment>
  );
};
