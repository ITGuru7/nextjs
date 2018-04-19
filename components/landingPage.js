import Grid from "material-ui/Grid";
import { Fragment } from "react";
import Display from "../utils/display";
import dynamic from "next/dynamic";
import Fonts from "../utils/fonts";
const SearchPage = dynamic(import("../components/searchPage"), {
  loading: () => <div />
});

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: null
    };
  }
  componentDidMount() {
    Fonts();
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful");
        })
        .catch(err => {
          console.warn("service worker registration failed", err.message);
        });
    }
  }

  render() {
    const mobile = () => {
      if (this.state.input) {
        return <SearchPage isCrawler={this.props.isCrawler} firstLetter={this.state.input} />;
      } else {
        return (
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item>
              <input
                onChange={e => {
                  this.setState({
                    input: e.target["value"]
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
        return <SearchPage isCrawler={this.props.isCrawler} firstLetter={this.state.input} />;
      } else {
        return (
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item>
              <input
                onChange={e => {
                  this.setState({
                    input: e.target["value"]
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
