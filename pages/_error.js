import React from "react";
import Link from "next/link";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
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
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_300,dpr_1.0/qwarx-404.png`}
                  srcSet={`
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_300,dpr_1.0/qwarx-404.png,
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_300,dpr_2.0/qwarx-404.png 2x,
                  https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_300,dpr_3.0/qwarx-404.png 3x
                  `}
                  alt={`erreur 404`}
                />
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
                    <img
                      src={`
                      https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_200,dpr_1.0/qwarx-back.png`}
                                  srcSet={`
                      https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_200,dpr_1.0/qwarx-back.png,
                      https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_200,dpr_2.0/qwarx-back.png 2x,
                      https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_200,dpr_3.0/qwarx-back.png 3x
                      `}
                      alt={`erreur 404`}
                    />
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
