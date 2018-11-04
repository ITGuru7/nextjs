import Grid from "@material-ui/core/Grid";
import React, { Fragment } from "react";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Wrapper from "../components/wrapper";
class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <Wrapper>
        <Grid
          container
          direction={'column'}
          alignItems="center"
          justify="center"
          spacing={24}
          style={{
            height: "calc(100vh - 50px)"
          }}
        >
          <Grid item>
            <Grid container spacing={24} direction={'row'}
                  alignItems="center">
              <Grid item>
                <img
                  src={`
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_128,dpr_1.0/qwarx-error.png`}
                  srcSet={`
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_128,dpr_1.0/qwarx-error.png,
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_128,dpr_2.0/qwarx-error.png 2x,
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_128,dpr_3.0/qwarx-error.png 3x
                  `}
                  alt={`erreur 404`}
                />
              </Grid>
              <Grid item xs>
                <Typography variant={"title"} color={"primary"} gutterBottom>
                  {`Désolé, je n'ai trouvé la page que vous recherchez`}
                </Typography>
                <Typography variant={"body1"} color={"primary"} gutterBottom>
                  {`Erreur ${statusCode}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Link prefetch href="/">
              <a>
                <Typography variant={"body1"} color={"secondary"} gutterBottom>
                  {`retourner sur Qwarx`}
                </Typography>
              </a>
            </Link>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
}

export default Error;
