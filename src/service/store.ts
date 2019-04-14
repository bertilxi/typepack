import { loadUserConfig } from "./utils";

class Store {
  private state = {};
  public setState(partialState) {
    Object.entries(partialState).forEach(([key, value]) => {
      this.state[key] = value;
    });
  }
  public getState() {
    return this.state as any;
  }
}

export const store = new Store();

export const bootstrap = (command: (...args: any[]) => void) => (
  ...args: any[]
) => {
  args.forEach(arg => {
    if (typeof arg === "object") {
      store.setState(arg);
    } else {
      store.setState({ arg });
    }
  });
  loadUserConfig();
  console.log(store.getState());
  command(...args);
};
