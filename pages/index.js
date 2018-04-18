import LandingPage from "../components/landingPage";
import SearchPage from "../components/searchPage";

class Index extends React.PureComponent {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    let isCrawler = false;
    let botPattern =
      "(googlebot/|Googlebot-Mobile|Googlebot-Image|Google favicon|Google Page Speed Insights)";
    let re = new RegExp(botPattern, "i");
    if (re.test(userAgent)) {
      isCrawler = true;
    }
    return { userAgent, isCrawler };
  }

  componentDidMount() {
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
    return (
      <SearchPage
        userAgent={this.props.userAgent}
        isCrawler={this.props.isCrawler}
      />
    );
  }
}

export default Index;
