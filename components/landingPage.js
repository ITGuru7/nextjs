import Grid from "material-ui/Grid";
import { Fragment } from "react";
import Display from "../utils/display";

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: false
    };
  }
  render() {
    const mobile = () => {
      return (
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item>
            <input onInput={() => (this.state.input = true)} />
          </Grid>
        </Grid>
      );
    };

    const desktop = () => {
      return (
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item>
            <input onInput={() => (this.state.input = true)} />
          </Grid>
        </Grid>
      );
    };

    return (
      <Fragment>
        <Display format="mobile" implementation="css">
          {mobile()}
        </Display>
        <Display format="tablet-desktop" implementation="css">
          {desktop()}
        </Display>
      </Fragment>
    );
  }
}

export default LandingPage;
