import React, { Fragment } from "react";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import aphrodite from "../utils/aphrodite";
import { css } from "aphrodite";
import Divider from "@material-ui/core/Divider";
import Display from "../utils/display";
import Grid from "@material-ui/core/Grid";

export default class Footer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const landingPage = this.props.landingPage;
    return (
      <Fragment>
        <Display format="tablet-desktop">
          {landingPage ? (
            <Fragment>
              <Divider />
              <div
                className={css(aphrodite.mobileGreyBackground)}
                style={{ height: "75px" }}
              >
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify={"center"}
                  alignItems={"center"}
                >
                  <Grid item xs style={{ maxWidth: "1000px" }}>
                    <Grid
                      container
                      spacing={0}
                      direction="row"
                      style={{ height: "100%", paddingTop: "25px" }}
                      justify={"space-around"}
                      alignItems={"center"}
                    >
                      <Grid item xs>
                        <Link prefetch href="/mentions-legales">
                          <Typography variant="caption" align="center">
                            <a
                              style={{ color: "black", opacity: 0.6 }}
                            >{`Mentions légales`}</a>
                          </Typography>
                        </Link>
                      </Grid>

                      <Grid item xs>
                        <Link prefetch href="/conditions-generales">
                          <Typography variant="caption" align="center">
                            <a
                              style={{ color: "black", opacity: 0.6 }}
                            >{`Conditions générales`}</a>
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item xs>
                        <Link prefetch href="/contact">
                          <Typography variant="caption" align="center">
                            <a
                              style={{ color: "black", opacity: 0.6 }}
                            >{`Contact`}</a>
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item xs>
                        <Link prefetch href="/blog">
                          <Typography variant="caption" align="center">
                            <a
                              style={{ color: "black", opacity: 0.6 }}
                            >{`Blog`}</a>
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="caption" align="center">
                          <a
                            href={"https://www.facebook.com/qwarx.nc"}
                            target="_blank"
                            rel="external noopener noreferrer"
                            style={{ color: "black", opacity: 0.6 }}
                          >
                            {` Facebook`}
                          </a>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Fragment>
          ) : (
            <div
              style={{ height: "60px" }}
              className={css(aphrodite.mobileGreyBackground)}
            >
              <Divider />
              <Typography
                variant="caption"
                className={css(aphrodite.searchResultsPaddingLeft)}
                style={{ marginTop: "20px" }}
              >
                <Link prefetch href="/mentions-legales">
                  <a style={{ marginRight: "25px" }}>{`Mentions légales`}</a>
                </Link>

                <Link prefetch href="/conditions-generales">
                  <a
                    style={{ marginRight: "25px" }}
                  >{`Conditions générales`}</a>
                </Link>

                <Link prefetch href="/contact">
                  <a style={{ marginRight: "25px" }}>{`Contact`}</a>
                </Link>

                <Link prefetch href="/blog">
                  <a style={{ marginRight: "25px" }}>{`Blog`}</a>
                </Link>

                <a
                  href={"https://www.facebook.com/qwarx.nc"}
                  target="_blank"
                  rel="external noopener noreferrer"
                  style={{ marginRight: "25px" }}
                >
                  {` Facebook`}
                </a>
                <a
                  href={"https://goo.gl/forms/U1H2fxHpMhiEchAq2"}
                  target="_blank"
                  rel="external noopener noreferrer"
                >
                  {` Votre site n'est pas dans Qwarx.nc?`}
                </a>
              </Typography>
            </div>
          )}
        </Display>
        <Display format="mobile">
          <Divider />
          <div
            style={{ height: "80px" }}
            className={css(aphrodite.mobileGreyBackground)}
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
                    <Link prefetch href="/mentions-legales">
                      <Typography variant="caption" align="center">
                        <a
                          style={{ color: "black", opacity: 0.6 }}
                        >{`Mentions légales`}</a>
                      </Typography>
                    </Link>
                  </Grid>

                  <Grid item xs>
                    <Link prefetch href="/conditions-generales">
                      <Typography variant="caption" align="center">
                        <a
                          style={{ color: "black", opacity: 0.6 }}
                        >{`Conditions générales`}</a>
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs>
                    <Link prefetch href="/contact">
                      <Typography variant="caption" align="center">
                        <a
                          style={{ color: "black", opacity: 0.6 }}
                        >{`Contact`}</a>
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
                    <Link prefetch href="/blog">
                      <Typography variant="caption" align="center">
                        <a style={{ color: "black", opacity: 0.6 }}>{`Blog`}</a>
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="caption" align="center">
                      <a
                        href={"https://www.facebook.com/qwarx"}
                        target="_blank"
                        rel="external noopener noreferrer"
                        style={{ color: "black", opacity: 0.6, opacity: 0.5 }}
                      >
                        {` Facebook`}
                      </a>
                    </Typography>
                  </Grid>
                  {!landingPage && (
                    <Grid item xs>
                      <Typography variant="caption" align="center">
                        <a
                          href={"https://goo.gl/forms/U1H2fxHpMhiEchAq2"}
                          target="_blank"
                          rel="external noopener noreferrer"
                          style={{ color: "black", opacity: 0.6 }}
                        >
                          {` Votre site n'est pas dans Qwarx.nc?`}
                        </a>
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Display>
      </Fragment>
    );
  }
}
