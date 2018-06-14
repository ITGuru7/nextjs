import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Fragment>
        {process.browser ? <Grid
          container
          justify="center"
          alignItems="center"
          spacing={0}
          style={{ minHeight: "100vh" }}
        >
          <Grid item>
            <picture>
              <source
                media="(min-width: 960px)"
                sizes="100vw"
                srcSet="https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,dpr_auto,c_scale,w_700/qwarx-404.png 700w"
              />
              <source
                media="(max-width: 959px)"
                sizes="100vw"
                srcSet="https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,dpr_auto,c_scale,w_300/qwarx-404.png 300w"
              />
              <img
                src="https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,dpr_auto,c_scale,w_300/qwarx-404.png"
                srcSet="https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,dpr_auto,c_scale,w_300/qwarx-404.png 300w"
                alt="erreur 404"
              />
            </picture>
          </Grid>
        </Grid> : null}
      </Fragment>
    );
  }
}
