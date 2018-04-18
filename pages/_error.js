import React from "react";

export default class Error extends React.Component {
  static getInitialProps({ res, err, jsonPageRes }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    let body;
    let statusCodeClient;
    if (!statusCode) {
      body = jsonPageRes.status;
      statusCodeClient = jsonPageRes.status
    }
    return { statusCode, body, statusCodeClient };
  }

  render() {
    if (this.props.statusCode) {
      return (
        <p>
          {`An error ${this.props.statusCode} occurred on the server`}
        </p>
      );
    } else {
      return (
        <p>
          {`An error ${navigator.userAgent} occurred on the client`}
        </p>
      );
    }

  }
}
