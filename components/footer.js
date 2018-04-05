import React, { Fragment } from "react";
import Link from "next/link";
import Typography from "material-ui/Typography";
import aphrodite from "../utils/aphrodite";
import { css } from "aphrodite";
import Divider from "material-ui/Divider";

export default class Footer extends React.PureComponent {
  render() {
    return (
      <div
        style={{ height: "60px" }}
        className={css(aphrodite.mobileGreyBackground)}
      >
        <Divider />
        <Typography
          variant="caption"
          className={css(aphrodite.searchResultsLeft)}
          style={{ marginTop: "20px" }}
        >
          <Link href="/mentions-legales">
            <a style={{ marginRight: "25px" }}>{`Mentions légales`}</a>
          </Link>

          <Link href="/conditions-generales">
            <a
              style={{ marginRight: "25px" }}
            >{`Conditions générales d'utilisation`}</a>
          </Link>

          <Link href="/contact">
            <a style={{ marginRight: "25px" }}>{`Contact`}</a>
          </Link>

          <Link href="/blog">
            <a style={{ marginRight: "25px" }}>{`Blog`}</a>
          </Link>

          <a
            href={"https://www.facebook.com/gougle.nc"}
            target="_blank"
            rel="external noopener noreferrer"
          >
            {` Facebook`}
          </a>
        </Typography>
      </div>
    );
  }
}
