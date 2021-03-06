import Grid from "@material-ui/core/Grid";
import Display from "../utils/display";
import SearchPage from "../components/searchPage";
import Footer from "./footer";
import Typography from "@material-ui/core/Typography";
import { findResultsState } from "./instantsearch";
import ssrLandingPageSearch from "./ssrLandingPageSearch";
import FontFaceObserver from "fontfaceobserver";
import Link from "next/link";
import { Fragment } from "react";
import Head from "next/head";
import Router from "next/router";

const Roboto300 = new FontFaceObserver("Roboto", {
  weight: 300
});
const Roboto400 = new FontFaceObserver("Roboto", {
  weight: 400
});
const Roboto500 = new FontFaceObserver("Roboto", {
  weight: 500
});

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
      input: null,
      nbHits: this.props.nbHits
    };
    this.updateWidth = this.updateWidth.bind(this);
  }

  updateWidth() {
    // this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth);
    const searchState = { "/": "" };
    // Router.push("/", "/", { shallow: true });
    findResultsState(ssrLandingPageSearch, { searchState }).then(
      resultsState => {
        // this.setState({ nbHits: resultsState.content.nbHits });
      }
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    console.log('landing render')
    const { nbHits, input } = this.state;

    const mobile = () => {
      if (input) {
        return (
          <SearchPage
            searchState={{
              query: input,
              page: 1,
              tab: 0
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
                      <img
                        src={`
                        https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_200,dpr_1.0/qwarx-logo-3.png`}
                        srcSet={`
                        https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_200,dpr_1.0/qwarx-logo-3.png,
                        https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_200,dpr_2.0/qwarx-logo-3.png 2x,
                        https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_200,dpr_3.0/qwarx-logo-3.png 3x
                        `}
                        alt={`qwarx logo`}
                      />
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
                        placeholder="Formulez votre requête"
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_40,h_40,dpr_1.0/qwarx-search-2.png`}
                        srcSet={`
                                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_40,h_40,dpr_1.0/qwarx-search-2.png,
                                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_40,h_40,dpr_2.0/qwarx-search-2.png 2x,
                                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_40,h_40,dpr_3.0/qwarx-search-2.png 3x,

                               `}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  style={{
                    marginTop: "5px",
                    marginLeft: "16px",
                    marginRight: "16px"
                  }}
                >
                  <Typography
                    component="h1"
                    variant="body2"
                    color="primary"
                    align="right"
                    style={{
                      opacity: nbHits ? "1" : "0"
                    }}
                  >
                    {`Déjà ${
                      nbHits
                        ? nbHits
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        : null
                    } pages référencées !`}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    marginTop: "60px",
                    marginLeft: "16px",
                    marginRight: "16px"
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item>
                      <Grid container spacing={16}>
                        <Grid item>
                          <img
                            src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_80,dpr_1.0/qwarx_landing_page.png`}
                            srcSet={`
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_80,dpr_1.0/qwarx_landing_page.png,
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_80,dpr_2.0/qwarx_landing_page.png 2x,
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_80,dpr_3.0/qwarx_landing_page.png 3x
                            `}
                          />
                        </Grid>
                        <Grid item xs>
                          <Typography
                            variant={"title"}
                            color={"primary"}
                            gutterBottom
                          >
                            {`Bienvenue sur Qwarx.nc !`}
                          </Typography>
                          <Typography
                            variant={"subheading"}
                            color={"primary"}
                            gutterBottom
                          >
                            {`Qwarx.nc est un moteur de recherche exclusivement dédié à la Nouvelle-Calédonie.`}
                          </Typography>
                          <Link href="/blog/ajouter-qwarx-sur-son-smartphone">
                            <a>
                              <Typography
                                variant={"body2"}
                                component={"p"}
                                color={"secondary"}
                              >
                                {`Installer l'application mobile`}
                              </Typography>
                            </a>
                          </Link>
                          <a
                            href={"https://goo.gl/forms/U1H2fxHpMhiEchAq2"}
                            target="_blank"
                            rel="external noopener noreferrer"
                          >
                            <Typography
                              variant={"body2"}
                              align={"left"}
                              component={"p"}
                              color={"secondary"}
                            >
                              {`Un besoin en référencement ?`}
                            </Typography>
                          </a>
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

    const desktop = () => {
      if (input) {
        return (
          <SearchPage
            searchState={{
              query: input,
              page: 1,
              tab: 0
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
                      <img
                        src={`
                        https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_250,dpr_1.0/qwarx-logo-3.png`}
                        srcSet={`
                        https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_250,dpr_1.0/qwarx-logo-3.png,
                        https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_250,dpr_2.0/qwarx-logo-3.png 2x,
                        https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_250,dpr_3.0/qwarx-logo-3.png 3x
                        `}
                        alt={`qwarx logo`}
                      />
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
                              // let str = '/?query='+e.target['value']+'&page=1&tab=0';
                              // Router.push(str, str, { shallow: false });
                            }}
                            className="ais-SearchBox-input"
                            placeholder="Formulez votre requête comme dans Google"
                            autoFocus
                          />
                        </Grid>
                        <Grid item>
                          <img
                            src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_1.0/qwarx-search-2.png`}
                            srcSet={`
                                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_1.0/qwarx-search-2.png,
                                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_2.0/qwarx-search-2.png 2x,
                                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,g_auto,c_fill,b_rgb:EEEEEE,w_34,h_34,dpr_3.0/qwarx-search-2.png 3x,

                               `}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item style={{ width: "534px" }}>
                      <Typography
                        component="h1"
                        variant="body2"
                        color="primary"
                        align="right"
                        style={{
                          marginTop: "5px",
                          opacity: nbHits ? "1" : "0"
                        }}
                      >
                        {`Déjà ${
                          nbHits
                            ? nbHits
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                            : null
                        } pages référencées !`}
                      </Typography>

                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={0}
                        style={{ marginTop: "130px" }}
                      >
                        <Grid item>
                          <Grid
                            container
                            justify="center"
                            style={{ height: "100%" }}
                            spacing={40}
                          >
                            <Grid item>
                              <img
                                src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_115,dpr_1.0/qwarx_landing_page.png`}
                                srcSet={`
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_115,dpr_1.0/qwarx_landing_page.png,
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_115,dpr_2.0/qwarx_landing_page.png 2x,
                            https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_115,dpr_3.0/qwarx_landing_page.png 3x
                            `}
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <Typography
                                variant={"headline"}
                                component={"h1"}
                                color={"primary"}
                                gutterBottom
                              >
                                {`Bienvenue sur Qwarx.nc !`}
                              </Typography>
                              <Typography
                                variant={"subheading"}
                                component={"p"}
                                color={"primary"}
                                gutterBottom
                              >
                                {`Qwarx.nc est un moteur de recherche exclusivement dédié à la Nouvelle-Calédonie.`}
                              </Typography>
                              <Link href="/blog/ajouter-qwarx-sur-son-smartphone">
                                <a>
                                  <Typography
                                    variant={"body2"}
                                    component={"p"}
                                    align={"left"}
                                    color={"secondary"}
                                  >
                                    {`Installer l'application mobile`}
                                  </Typography>
                                </a>
                              </Link>
                              <a
                                href={"https://goo.gl/forms/U1H2fxHpMhiEchAq2"}
                                target="_blank"
                                rel="external noopener noreferrer"
                              >
                                <Typography
                                  variant={"body2"}
                                  component={"p"}
                                  align={"left"}
                                  color={"secondary"}
                                >
                                  {`Un besoin en référencement ?`}
                                </Typography>
                              </a>
                            </Grid>
                          </Grid>
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
      <Fragment>
        <Head>
          <meta
            name="description"
            content="Qwarx.nc : le moteur de recherche de tous les calédoniens"
            key="description"
          />
          <meta property="og:url" content="https://qwarx.nc" />
          <link rel="canonical" href="https://qwarx.nc" />

          <meta
            name="og:description"
            content="Qwarx.nc : le moteur de recherche de tous les calédoniens"
            key="og:description"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/clactacom/image/upload/c_scale,f_auto,q_auto,w_1200/v1540854581/og-image-qwarx-3.png"
          />
        </Head>
        <Display format="mobile" css>
          {mobile()}
        </Display>
        <Display format="tablet-desktop" css>
          {desktop()}
        </Display>
      </Fragment>
    );
  }
}

export default LandingPage;
