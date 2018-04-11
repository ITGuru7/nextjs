import Grid from "material-ui/Grid";
import { Fragment } from "react";
import Display from "../utils/display";
import dynamic from "next/dynamic";
const SearchPage = dynamic(import("../components/searchPage"), {
  loading: () => <div />
});

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: false
    };
  }
  render() {
    const mobile = () => {
      if (this.state.input) {
        return <SearchPage />;
      } else {
        return (
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item>
              <input
                onChange={e => {
                  this.setState({
                    input: true
                  });
                }}
              />
            </Grid>
          </Grid>
        );
      }
    };

    const desktop = () => {
      if (this.state.input) {
        return <SearchPage />;
      } else {
        return (
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item>
              <input
                onChange={e => {
                  this.setState({
                    input: true
                  });
                }}
              />
            </Grid>
          </Grid>
        );
      }
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
