import React from "react";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <picture
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%"
        }}
      >
        <source
          media={`(min-width: 960px)`}
          srcSet={`
          https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_700,dpr_1.0/qwarx-404.png,
          https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_700,dpr_2.0/qwarx-404.png 2x,
          https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_700,dpr_3.0/qwarx-404.png 3x
          `}
        />
        <source
          media={`(max-width: 959px)`}
          srcSet={`
          https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_300,dpr_1.0/qwarx-404.png,
          https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_300,dpr_2.0/qwarx-404.png 2x,
          https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_300,dpr_3.0/qwarx-404.png 3x
          `}
        />
        <img
          src={`
          https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_700,dpr_1.0/qwarx-404.png`}
          srcSet={`
          https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_700,dpr_1.0/qwarx-404.png,
          https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_700,dpr_2.0/qwarx-404.png 2x,
          https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_700,dpr_3.0/qwarx-404.png 3x
          `}
          alt={`erreur 404`}
        />
      </picture>
    );
  }
}
