import LandingPage from "../components/landingPage";

class Index extends React.PureComponent {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    let botPattern =
      "(googlebot/|Googlebot-Mobile|Googlebot-Image|Google favicon|Google Page Speed Insights)";
    let re = new RegExp(botPattern, "i");
    const isCrawler = re.test(userAgent);

    return { isCrawler };
  }



  render() {
    return (
        <LandingPage isCrawler={this.props.isCrawler} />
    );
  }
}

export default Index;
