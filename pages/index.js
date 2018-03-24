import Layout from "../components/layout";
import Fonts from "../utils/fonts";

class Welcome extends React.Component {
  componentDidMount() {
    Fonts();
    if ("serviceWorker" in navigator) {
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
    return <Layout title={"gougle.nc"} />;
  }
}

export default Welcome;
