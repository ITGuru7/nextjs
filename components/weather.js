import { Fragment } from "react";
import Head from "next/head";

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
        <Head>
          <script>
            {`!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');`}
          </script>
        </Head>
        <a
          className="weatherwidget-io"
          href="https://forecast7.com/fr/n22d26166d45/noumea/"
          data-label_1="NOUMEA"
          data-label_2="METEO"
          data-font="Roboto"
          data-days="3"
          data-icons="Climacons Animated"
          data-theme="pure"
        >
          NOUMEA METEO
        </a>
      </Fragment>
    );
  }
}
