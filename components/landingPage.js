import Grid from "@material-ui/core/Grid";
import Display from "../utils/display";
import SearchPage from "../components/searchPage";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import aphrodite from "../utils/aphrodite";
import { css } from "aphrodite";
import QwarxLogo from "./qwarxLogo";
import Footer from "./footer";
import Typography from "@material-ui/core/Typography";
import { App, findResultsState } from "./index";
import qs from "qs";

if (process.browser) {
  require("../static/react-instantsearch-override.css");
  require("../static/main.css");
  require("../static/algolia-min.css");
}

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "0",
      input: null
    };
    this.updateWidth = this.updateWidth.bind(this);
  }

  updateWidth() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth);
    const searchState = { "/": "" };
    findResultsState(App, { searchState }).then(resultsState => {
      this.setState({ nbHits: resultsState.content.nbHits });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    const { nbHits, input } = this.state;

    const mobile = () => {
      if (input) {
        return (
          <SearchPage
            searchState={{
              query: input,
              page: 1,
              hitsPerPage: 10
            }}
          />
        );
      } else {
        return (
          <Grid
            container
            direction="column"
            spacing={0}
            style={{ marginTop: "10px" }}
          >
            <Grid item style={{ minHeight: "calc(100vh - 91px)" }}>
              <Grid container direction="column" spacing={0}>
                <Grid item style={{ marginTop: "50px", marginBottom: "20px" }}>
                  <Grid container justify={"center"} spacing={0}>
                    <Grid item>
                      <QwarxLogo cn={css(aphrodite.gougleLogoLandingPage)} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ marginLeft: "16px", marginRight: "16px" }}>
                  <Grid container>
                    <Grid item xs>
                      <input
                        aria-label={"recherche"}
                        onChange={e => {
                          this.setState({
                            input: e.target["value"]
                          });
                        }}
                        className="ais-SearchBox-input"
                        autoFocus
                      />
                    </Grid>
                    <Grid
                      item
                      style={{
                        width: "50px",
                        backgroundColor: "#0E8AB0",
                        shadow: "0 2px 0 0 #f1f1f1"
                      }}
                    >
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={0}
                        style={{ height: "100%" }}
                      >
                        <Grid item>
                          <svg
                            style={{
                              width: "22px",
                              height: "22px",
                              paddingTop: "3px"
                            }}
                            viewBox="0 0 258 235"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fill="#FFF" fillRule="nonzero">
                              <path d="M46.83 12.8C65.62 2.04 88.31-1.48 109.53 2.64c15.83 3 30.8 10.37 42.86 21.06 17.77 15.44 29.03 38.06 30.73 61.54 1.59 19.48-3.22 39.37-13.65 55.92 1.25 1.12 2.49 2.26 3.74 3.38.4-.43 1.21-1.31 1.62-1.74.52.43 1.56 1.31 2.08 1.75 3.63-1.56 6.15 1.88 8.55 3.95 22.88 20.46 45.74 40.94 68.64 61.38 4.34 3.6 4.83 10.91.68 14.85-3.67 3.55-6.34 9.05-11.87 9.89-3.71.72-7.31-1.12-9.83-3.73-22.35-20.02-44.72-40.03-67.09-60.03-2.49-2.3-6.25-4.48-5.26-8.47-.44-.41-1.31-1.23-1.74-1.64.41-.7.83-1.4 1.24-2.1-.7-.6-2.1-1.81-2.8-2.41-11.72 12.46-27.31 21.07-43.89 25.13-21.08 5.06-43.99 2.52-63.27-7.5-19.84-10.06-35.7-27.7-43.67-48.48-7.5-19.47-8.08-41.53-1.63-61.38 6.92-21.49 22.17-40.15 41.86-51.21zm42.34 4.41c-24.66.9-48.42 14.66-61.22 35.8-9.49 15.33-13.31 34.15-10.18 51.94 2.87 17.56 12.28 33.98 26 45.31 13.36 11.22 30.73 17.66 48.2 17.43 15.34.19 30.63-4.75 43.17-13.54 14.21-10.01 24.94-24.95 29.48-41.76 5.49-19.64 2.45-41.42-8.16-58.82-13.74-23.07-40.49-37.55-67.29-36.36z" />
                              <path d="M82.53 27.84c14.58-2.14 29.8.82 42.5 8.28 14.08 8.12 24.86 21.67 29.79 37.14 4.85 15.72 3.61 33.25-3.68 48.03-7.91 16.79-23.37 29.78-41.25 34.74-13.68 3.65-28.54 2.96-41.73-2.24-14.15-5.44-26.42-15.82-33.66-29.2-6.8-11.91-9-26.08-7.43-39.61 2.03-16.97 11.05-32.91 24.34-43.6 8.98-7.08 19.75-12.03 31.12-13.54zm1.93 25.87c-11.78 2.3-22.32 10.27-27.67 21.02-5.08 9.6-5.9 21.38-2.03 31.55 4.13 11.21 13.44 20.46 24.83 24.19 15.43 5.49 33.85-.17 43.72-13.18 7.26-9.14 10.12-21.58 7.49-32.97-2.69-11.22-10.11-21.41-20.42-26.76-7.84-4.3-17.18-5.61-25.92-3.85z" />
                            </g>
                          </svg>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item style={{ width: "100%" }}>
                  <Typography
                    component="h1"
                    variant="caption"
                    color="secondary"
                    align="right"
                    style={{
                      marginTop: "5px",
                      marginLeft: "16px",
                      marginRight: "16px",
                      opacity: nbHits ? "1" : "0"
                    }}
                  >
                    {`Déjà ${nbHits} pages référencées !`}
                  </Typography>

                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={0}
                    style={{ marginTop: "60px" }}
                  >
                    <Grid item>
                      <img
                        src={`/static/images/qwarx-man/landing_page_small.png`}
                        useMap="#image-map"
                      />
                      <map name="image-map">
                        <area
                          target="_blank"
                          alt="infos"
                          title="infos"
                          href="/infos"
                          coords="240,93,300,81"
                          shape="rect"
                        />
                      </map>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Footer landingPage />
            </Grid>
          </Grid>
        );
      }
    };

    const desktop = () => {
      if (input) {
        return (
          <SearchPage
            searchState={{
              query: input,
              page: 1,
              hitsPerPage: 10
            }}
          />
        );
      } else {
        return (
          <Grid
            container
            direction="column"
            spacing={0}
            style={{ marginTop: "10px" }}
          >
            <Grid item style={{ minHeight: "calc(100vh - 87px)" }}>
              <Grid container direction="column" spacing={0}>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify={"center"}
                    spacing={0}
                    style={{ marginTop: "100px" }}
                  >
                    <Grid item style={{ marginBottom: "20px" }}>
                      <QwarxLogo cn={css(aphrodite.gougleLogoLandingPage)} />
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid item>
                          <input
                            aria-label={"recherche"}
                            onChange={e => {
                              this.setState({
                                input: e.target["value"]
                              });
                            }}
                            className="ais-SearchBox-input"
                            autoFocus
                          />
                        </Grid>
                        <Grid
                          item
                          style={{
                            width: "50px",
                            backgroundColor: "#0E8AB0",
                            shadow: "0 2px 0 0 #f1f1f1"
                          }}
                        >
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={0}
                            style={{ height: "100%" }}
                          >
                            <Grid item>
                              <svg
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  paddingTop: "3px"
                                }}
                                viewBox="0 0 258 235"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g fill="#FFF" fillRule="nonzero">
                                  <path d="M46.83 12.8C65.62 2.04 88.31-1.48 109.53 2.64c15.83 3 30.8 10.37 42.86 21.06 17.77 15.44 29.03 38.06 30.73 61.54 1.59 19.48-3.22 39.37-13.65 55.92 1.25 1.12 2.49 2.26 3.74 3.38.4-.43 1.21-1.31 1.62-1.74.52.43 1.56 1.31 2.08 1.75 3.63-1.56 6.15 1.88 8.55 3.95 22.88 20.46 45.74 40.94 68.64 61.38 4.34 3.6 4.83 10.91.68 14.85-3.67 3.55-6.34 9.05-11.87 9.89-3.71.72-7.31-1.12-9.83-3.73-22.35-20.02-44.72-40.03-67.09-60.03-2.49-2.3-6.25-4.48-5.26-8.47-.44-.41-1.31-1.23-1.74-1.64.41-.7.83-1.4 1.24-2.1-.7-.6-2.1-1.81-2.8-2.41-11.72 12.46-27.31 21.07-43.89 25.13-21.08 5.06-43.99 2.52-63.27-7.5-19.84-10.06-35.7-27.7-43.67-48.48-7.5-19.47-8.08-41.53-1.63-61.38 6.92-21.49 22.17-40.15 41.86-51.21zm42.34 4.41c-24.66.9-48.42 14.66-61.22 35.8-9.49 15.33-13.31 34.15-10.18 51.94 2.87 17.56 12.28 33.98 26 45.31 13.36 11.22 30.73 17.66 48.2 17.43 15.34.19 30.63-4.75 43.17-13.54 14.21-10.01 24.94-24.95 29.48-41.76 5.49-19.64 2.45-41.42-8.16-58.82-13.74-23.07-40.49-37.55-67.29-36.36z" />
                                  <path d="M82.53 27.84c14.58-2.14 29.8.82 42.5 8.28 14.08 8.12 24.86 21.67 29.79 37.14 4.85 15.72 3.61 33.25-3.68 48.03-7.91 16.79-23.37 29.78-41.25 34.74-13.68 3.65-28.54 2.96-41.73-2.24-14.15-5.44-26.42-15.82-33.66-29.2-6.8-11.91-9-26.08-7.43-39.61 2.03-16.97 11.05-32.91 24.34-43.6 8.98-7.08 19.75-12.03 31.12-13.54zm1.93 25.87c-11.78 2.3-22.32 10.27-27.67 21.02-5.08 9.6-5.9 21.38-2.03 31.55 4.13 11.21 13.44 20.46 24.83 24.19 15.43 5.49 33.85-.17 43.72-13.18 7.26-9.14 10.12-21.58 7.49-32.97-2.69-11.22-10.11-21.41-20.42-26.76-7.84-4.3-17.18-5.61-25.92-3.85z" />
                                </g>
                              </svg>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item style={{ width: "550px" }}>
                      <Typography
                        component="h1"
                        variant="body1"
                        color="secondary"
                        align="right"
                        style={{
                          marginTop: "5px",
                          opacity: nbHits ? "1" : "0"
                        }}
                      >
                        {`Déjà ${nbHits} pages référencées !`}
                      </Typography>

                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={0}
                        style={{ marginTop: "130px" }}
                      >
                        <Grid item>
                          <img
                            src={`/static/images/qwarx-man/landing_page.png`}
                            useMap="#image-map"
                          />
                          <map name="image-map">
                            <area
                              target="_blank"
                              alt="infos"
                              title="infos"
                              href="/infos"
                              coords="388,149,482,130"
                              shape="rect"
                            />
                          </map>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Footer landingPage />
            </Grid>
          </Grid>
        );
      }
    };

    return (
      <Wrapper>
        <Display format="mobile" css>
          {mobile()}
        </Display>
        <Display format="tablet-desktop" css>
          {desktop()}
        </Display>
      </Wrapper>
    );
  }
}

export default LandingPage;
