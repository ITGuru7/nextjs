import { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

export default props => {
  const rnd = props.rnd;
  let text;
  switch (rnd) {
    case 0:
      text = () => (
        <Fragment>
          <Typography variant={"body1"} color={"primary"} gutterBottom>
            {`Qwarx est un moteur de recherche dédié exclusivement à la Nouvelle-Calédonie.`}
          </Typography>
          <Typography variant={"body1"} color={"primary"} gutterBottom>
            {`Il vous permettra de trouver des informations qui seraient difficiles à trouver sur les autres moteurs de recherche.`}
          </Typography>
        </Fragment>
      );
      break;

    case 1:
      text = () => (
        <Fragment>
          <Typography variant={"body1"} color={"primary"} gutterBottom>
            {`Il existe presque 90 sites d'annonces (petites annonces et annonces immobilières) en Nouvelle-Calédonie.`}
          </Typography>
          <Typography variant={"body1"} color={"primary"}>
            {`Sur Qwarx, vous pouvez voir toutes ces petites annonces. Pratique!`}
          </Typography>
        </Fragment>
      );
      break;

    case 2:
      text = () => (
        <Fragment>
          <Typography variant={"body1"} color={"primary"} gutterBottom>
            {`Au 20 juin 2018, il existait 138 sites de e-commerce en Nouvelle-Calédonie. `}
          </Typography>
          <Typography variant={"body1"} color={"primary"} gutterBottom>
            {`De quoi facilement trouver son bonheur !`}
          </Typography>
        </Fragment>
      );
      break;

    case 3:
      text = () => (
        <Fragment>
          <Typography variant={"body1"} color={"primary"} gutterBottom>
            {`En Nouvelle-Calédonie, environ 2700 sites web existent. Ils cumulent plus de 350.000 pages.`}
          </Typography>
          <Typography variant={"body1"} color={"primary"}>
            {`Qui a dit que le web calédonien était petit ?`}
          </Typography>
        </Fragment>
      );
      break;

    case 4:
      text = () => (
        <Fragment>
          <Typography variant={"body1"} color={"primary"}>
            {`Votre site web n'apparaît pas dans Qwarx ?`}
          </Typography>
          <Typography variant={"body1"} color={"primary"} gutterBottom>
            {`Ce n'est pas normal.`}
          </Typography>
          <Link prefetch href="/contact">
            <a>
              <Typography variant={"body1"} color={"secondary"}>
                {`Contactez-nous.`}
              </Typography>
            </a>
          </Link>
        </Fragment>
      );
      break;

    case 5:
      text = () => (
        <Fragment>
          <Typography variant={"body1"} color={"primary"}>
            {`Vous souhaitez voir apparaître votre site web plus haut dans le classement ?`}
          </Typography>
          <Typography variant={"body1"} color={"primary"} gutterBottom>
            {`Vous avez envie de voir votre site web présenté de façon plus visible dans les résultats de recherche ?`}
          </Typography>
          <Link prefetch href="/contact">
            <a>
              <Typography variant={"body1"} color={"secondary"}>
                {`Contactez-nous.`}
              </Typography>
            </a>
          </Link>
        </Fragment>
      );
      break;

    default:
      text = () => (
        <Fragment>
          <Typography variant={"body1"} color={"primary"} gutterBottom>
            {`Qwarx est un moteur de recherche dédié exclusivement à la Nouvelle-Calédonie.`}
          </Typography>
          <Typography variant={"body1"} color={"primary"} gutterBottom>
            {`Il vous permettra de trouver des informations qui seraient difficiles à trouver sur les autres moteurs de recherche.`}
          </Typography>
        </Fragment>
      );
  }

  return text();
};
