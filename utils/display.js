import Hidden from '@material-ui/core/Hidden';

export default class Display extends React.PureComponent {
  render() {
    const { children, format } = this.props;
    let only;
    switch (format) {
      case "mobile":
        only = ["md", "lg", "xl"];
        break;
      case "mobile-tablet":
        only = ["lg", "xl"];
        break;
      case "tablet":
        only = ["xs", "sm", "lg", "xl"];
        break;
      case "tablet-desktop":
        only = ["xs", "sm"];
        break;
      case "desktop":
        only = ["xs", "sm", "md"];
        break;
      default:
        only = [];
    }
    return <Hidden implementation={'css'} only={only}>{children}</Hidden>;
  }
}
