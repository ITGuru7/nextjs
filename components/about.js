import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Wrapper from "../components/wrapper";
import Tabs from "./mui/tabsAbout";
import Tab from "./mui/tabAbout";
import Divider from "@material-ui/core/Divider";
import Link from "next/link";
import aphrodite from "../utils/aphrodite";
import { css } from "aphrodite";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Wrapper>
        <Grid
          container
          direction="column"
          spacing={0}
          style={{ marginLeft: "16px" }}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              spacing={0}
              style={{ marginTop: "5px" }}
              alignItems={"center"}
            >
              <Grid item style={{ marginRight: "8px" }}>
                <Link prefetch href="/">
                  <a>
                    <img
                      src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo.png`}
                      srcSet={`
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo.png,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_2.0/qwarx-logo.png 2x,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_3.0/qwarx-logo.png 3x
                `}
                      alt={`qwarx logo`}
                      style={{
                        cursor: this.goBackToHomePage ? "pointer" : "unset"
                      }}
                    />
                  </a>
                </Link>
              </Grid>
              <Grid item xs>
                <Typography variant={"title"} color={"primary"}>
                  {`A propos`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Tabs
              indicatorColor="secondary"
              textColor="secondary"
              onChange={this.handleChange}
              value={value}
            >
              <Tab label="Mentions légales" />
              <Tab label="Conditions Générales" />
              <Tab label="Plus d'infos" />
              <Tab label="Blog" />
              <Tab label="Contact" />
            </Tabs>
            <Divider />
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              spacing={0}
              style={{ minHeight: "calc(100vh - 120px)" }}
            >
              <Grid
                item
                style={{
                  width: "300px",
                  borderRight: "1px #e1e1e1 solid"
                }}
              >
                <Grid container direction="column" spacing={0} style={{marginTop: '12px', marginBottom: '12px'}}>
                  <Grid item>
                    <Typography variant="subheading" className={css(aphrodite.aboutMenuTitlePadding)}>
                      {`Mentions légales`}
                    </Typography>
                    <Typography variant="subheading" className={css(aphrodite.aboutMenuTitlePadding)}>
                      {`Données personnelles`}
                    </Typography>
                  </Grid>
                  <Grid item />
                </Grid>
              </Grid>
              <Grid
                item
                style={{
                  paddingLeft: "48px",
                  paddingRight: "48px",
                  paddingTop: "72px",
                  paddingBottom: "72px",
                  width: "720px"
                }}
              >
                <Typography variant="headline" gutterBottom>
                  {`Mentions légales`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {`Qwarx.nc est un site édité par l'agence de communication ClacTaCom SARL.`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {`Le contenu et la forme du site web ne sont pas contractuels. ClacTaCom ne peut être tenu responsable d'éventuelles informations erronées qui seraient présentées sur le site.`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {`La base de données présentée sur Qwarx.nc a été constituée par ClacTaCom et en est sa propriété. Toute reproduction en est interdite.`}
                </Typography>
                <Typography
                  variant="headline"
                  gutterBottom
                  style={{ paddingTop: "64px" }}
                >
                  {`Données personnelles`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {`Conformément aux dispositions prévues par la loi "Informatique et Liberté" du 06/01/1978, vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent (art. 34). Pour l'exercer, Veuillez nous contacter par mail contact@clactacom.nc.`}
                </Typography>
                <Typography
                  variant="headline"
                  gutterBottom
                  style={{ paddingTop: "64px" }}
                >
                  {`Numéro CNIL`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {`2183090 v 0.`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
}
