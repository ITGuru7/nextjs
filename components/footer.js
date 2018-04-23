import React, { Fragment } from "react";
import Link from "next/link";
import Typography from "material-ui/Typography";
import aphrodite from "../utils/aphrodite";
import { css } from "aphrodite";
import Divider from "material-ui/Divider";
import Display from "../utils/display";
import Grid from "material-ui/Grid";

export default class Footer extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Display format="tablet-desktop">
          <div
            style={{ height: "60px" }}
            className={css(aphrodite.mobileGreyBackground, aphrodite.footer)}
          >
            <Divider />
            <Typography
              variant="caption"
              className={css(aphrodite.searchResultsPaddingLeft)}
              style={{ marginTop: "20px" }}
            >
              <Link href="/mentions-legales">
                <a style={{ marginRight: "25px" }}>{`Mentions légales`}</a>
              </Link>

              <Link href="/conditions-generales">
                <a style={{ marginRight: "25px" }}>{`Conditions générales`}</a>
              </Link>

              <Link href="/contact">
                <a style={{ marginRight: "25px" }}>{`Contact`}</a>
              </Link>

              <Link href="/blog">
                <a style={{ marginRight: "25px" }}>{`Blog`}</a>
              </Link>

              <a
                href={"https://www.facebook.com/gougle.nc"}
                target="_blank"
                rel="external noopener noreferrer"
              >
                {` Facebook`}
              </a>
            </Typography>
          </div>
        </Display>
        <Display format="mobile">
          <Divider />
          <div
            style={{ height: "100px" }}
            className={css(aphrodite.mobileGreyBackground, aphrodite.footer)}
          >
            <Grid
              container
              spacing={0}
              direction="column"
              style={{ height: "100%" }}
            >
              <Grid item xs>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  style={{ height: "100%" }}
                  alignItems={"center"}
                >
                  <Grid item xs>
                    <Link href="/mentions-legales">
                      <Typography variant="caption" align="center">
                        <a>{`Mentions légales`}</a>
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs>
                    <Link href="/contact">
                      <Typography variant="caption" align="center">
                        <a>{`Contact`}</a>
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs>
                    <Link href="/conditions-generales">
                      <Typography variant="caption" align="center">
                        <a>{`Conditions générales`}</a>
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  style={{ height: "100%" }}
                  alignItems={"center"}
                >
                  <Grid item xs>
                    <Link href="/blog">
                      <Typography variant="caption" align="center">
                        <a>{`Blog`}</a>
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="caption" align="center">
                      <a
                        href={"https://www.facebook.com/gougle.nc"}
                        target="_blank"
                        rel="external noopener noreferrer"
                      >
                        {` Facebook`}
                      </a>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Display>
      </Fragment>
    );
  }
}
