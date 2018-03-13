import Layout from "../components/layout";
import { initStore } from "../store";
import { Provider } from "mobx-react";

class Welcome extends React.Component {
  static async getInitialProps(ctx) {
    const isServer = !!ctx.req;
    const store = initStore(isServer);
    return { lastUpdate: store.lastUpdate, isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.lastUpdate);
  }

  render() {

    return (
      <Provider appStore={this.store}>
        <Layout title={"gougle.nc"} />
      </Provider>
    );
  }
}

export default Welcome;
