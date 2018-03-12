import Layout from "../components/layout";
import { initStore } from "../store";
import { Provider } from "mobx-react";

export default class Welcome extends React.Component {
  static getInitialProps({ req }) {
    const isServer = !!req;
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
      <Layout title={'gougle.nc'}>
      </Layout>
      </Provider>
    );
  }
}
