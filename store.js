import { observable, computed } from "mobx";
import firebaseApp from "./utils/firebaseApp";

let store = null;

class Store {
  @observable user = null;

  @observable redirect_to = "/";

  @observable adminMode = false;

  @computed
  get database() {
    return firebaseApp.database();
  }

  @computed
  get base() {
    return rebase.createClass(this.database);
  }
}

export function initStore(isServer, lastUpdate = Date.now()) {
  if (isServer) {
    return new Store(isServer, lastUpdate);
  } else {
    if (store === null) {
      store = new Store(isServer, lastUpdate);
    }
    return store;
  }
}
