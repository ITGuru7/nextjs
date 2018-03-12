import React, { Fragment } from "react";
import Link from "next/link";
import Typography from "material-ui/Typography";

export default () => (
  <Fragment>
    <Typography type="caption" color="primary" align="center" gutterBottom>
      {`Tous droits réservés ClacTaCom SARL - reproduction interdite`}
    </Typography>
    <Typography type="caption" color="secondary" align="center" gutterBottom>
      <Link href="/mentions-legales">
        <a>{`Mentions légales `}</a>
      </Link>
      /
      <Link href="/conditions-generales">
        <a>{` Conditions générales d'utilisation `}</a>
      </Link>
      /
      <Link href="/contact">
        <a>{` Contact `}</a>
      </Link>
      /
      <Link href="/blog">
        <a>{` Blog `}</a>
      </Link>
      /
      <a
        href={"https://www.facebook.com/gougle.nc"}
        target="_blank"
        rel="external noopener noreferrer"
      >
        {` Facebook`}
      </a>
    </Typography>
  </Fragment>
);
