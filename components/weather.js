import { Fragment } from "react";

export default class Weather extends React.Component {
  componentDidMount() {
    __weatherwidget_init();
  }

  componentDidUpdate() {
    return false;
  }

  render() {
    return (
      <Fragment>
        <a
          className="weatherwidget-io"
          href="https://forecast7.com/fr/n22d26166d45/noumea/"
          data-label_1="Nouméa"
          data-label_2="Météo"
          data-font="Roboto"
          data-days="3"
          data-icons="Climacons Animated"
          data-theme="pure"
          data-textcolor="#212121"
          data-lowcolor="#1565C0"
          data-raincolor="#1565C0"
        >
          NOUMEA METEO
        </a>
      </Fragment>
    );
  }
}
