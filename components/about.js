import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Wrapper from "../components/wrapper";
import Tabs from "./mui/tabsAbout";
import Tab from "./mui/tabAbout";
import Divider from "@material-ui/core/Divider";
import Link from "next/link";

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
            <Grid container direction="row" spacing={0}>
              <Grid item>Content</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
}
