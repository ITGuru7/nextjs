import React, { Fragment } from "react";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <div
        style={{
          height: "calc(100vh - 50px)"
        }}
      >
        <table
          id="wrapper"
          style={{
            width: "100%",
            height: "400px",
            margin: 0,
            padding: 0,
            border: 0
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  verticalAlign: "middle",
                  textAlign: "center"
                }}
              >
                <img
                  src={`
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_128,dpr_1.0/qwarx-error.png`}
                  srcSet={`
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_128,dpr_1.0/qwarx-error.png,
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_128,dpr_2.0/qwarx-error.png 2x,
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_128,dpr_3.0/qwarx-error.png 3x
                  `}
                  alt={`erreur 404`}
                />
              </td>
              <td>
                <Fragment>
                  <Typography variant={"title"} color={"primary"} gutterBottom>
                    {`Qwarx n'a pas pu trouver la page que vous cherchez`}
                  </Typography>
                  <Typography
                    variant={"body1"}
                    color={"primary"}
                    gutterBottom
                  >
                    {`Erreur ${statusCode}`}
                  </Typography>
                </Fragment>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td
                style={{
                  verticalAlign: "middle",
                  textAlign: "center"
                }}
              >
                <Link prefetch href="/">
                  <a>
                    <Typography
                      variant={"body1"}
                      color={"primary"}
                      gutterBottom
                    >
                      {`retourner sur Qwarx`}
                    </Typography>
                  </a>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
