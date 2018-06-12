export default class ResultImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loaded: false
    };
    this.handleError = this.handleError.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    if (this.img && this.img.complete) {
      if (this.img.width === 0) {
        document.getElementById(this.props.href).outerHTML = "";
      } else {
        this.onLoad();
      }
    }
  }

  onLoad() {
    if (!this.state.loaded) {
      this.setState({ loaded: true });
    }
  }

  handleError() {
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    const { imgStyle, cloudinaryPrefix, imgUrl, title, href } = this.props;
    const display = imgUrl && !error;
    return (
      <React.Fragment
      >
        {display ? (
          <a rel="nofollow" href={href}>
            <img
              ref={img => {
                this.img = img;
              }}
              style={imgStyle}
              src={`${cloudinaryPrefix}/${imgUrl}`}
              alt={title}
              onError={this.handleError}
              onLoad={this.onLoad}
              id={href}
            />
          </a>
        ) : null}
      </React.Fragment>
    );
  }
}
