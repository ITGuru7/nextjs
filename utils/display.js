import Hidden from "material-ui/Hidden";

export default class Display extends React.PureComponent {
  render() {
    const { children, format } = this.props;
    let only;
    switch (format) {
      case "mobile":
        only = ["md", "lg", "xl"];
        break;
      case "tablet":
        only = ["xs", "sm", "lg", "xl"];
        break;
      case "tablet-mobile":
        only = ["lg", "xl"];
        break;
      case "desktop":
        only = ["xs", "sm", "md"];
        break;
      default:
        only = [];
    }
    return <Hidden only={only}>{children}</Hidden>;
  }
}
