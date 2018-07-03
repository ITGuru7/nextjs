import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Wrapper from "../components/wrapper";
import Tabs from "./mui/tabsAbout";
import Tab from "./mui/tabAbout";
import Divider from "@material-ui/core/Divider";
import Link from "next/link";
import aphrodite from "../utils/aphrodite";
import { css } from "aphrodite";
import { Fragment } from "react";
import Router from "next/router";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  handleChange = (event, value) => {
    switch (value) {
      case 0:
        Router.push("/mentions-legales", "/mentions-legales", {
          shallow: true
        });
        break;
      case 1:
        Router.push("/conditions-generales", "/conditions-generales", {
          shallow: true
        });
        break;
      case 2:
        Router.push("/blog", "/blog", { shallow: true });
        break;
      case 3:
        Router.push("/contact", "/contact", { shallow: true });
        break;
    }
    this.setState({ value });
  };

  legalMenu = () => {
    return (
      <Fragment>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("legal")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Mentions légales`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("data")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Données personnelles`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("cnil")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Numéro CNIL`}
        </Typography>
      </Fragment>
    );
  };

  legalContent = () => {
    return (
      <Fragment>
        <Typography variant="headline" gutterBottom id={"legal"}>
          {`Mentions légales`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Qwarx.nc est un site édité par l'agence de communication ClacTaCom SARL.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Le contenu et la forme du site web ne sont pas contractuels. ClacTaCom ne peut être tenu responsable d'éventuelles informations erronées qui seraient présentées sur le site.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`La base de données présentée sur Qwarx.nc a été constituée par ClacTaCom et en est sa propriété. Toute reproduction en est interdite.`}
        </Typography>
        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"data"}
        >
          {`Données personnelles`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Conformément aux dispositions prévues par la loi "Informatique et Liberté" du 06/01/1978, vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent (art. 34). Pour l'exercer, Veuillez nous contacter par mail contact@clactacom.nc.`}
        </Typography>
        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"cnil"}
        >
          {`Numéro CNIL`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`2183090 v 0.`}
        </Typography>
      </Fragment>
    );
  };

  termsOfUseMenu = () => {
    return (
      <Fragment>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("terms")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`CONDITIONS GENERALES D’UTILISATION`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("welcome")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Bienvenue`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("accessibility")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Accessibilité des Services`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("utilisation")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`À propos de l’utilisation de logiciels`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("informations")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Informations mises à disposition par les Services`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("ads")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Liens publicitaires`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("nonads")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Liens non commerciaux`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("property")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Propriété intellectuelle`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("report")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Signalement de contenus`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("account")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Votre Compte Qwarx.nc`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("freedom")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Informatique et Libertés`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("cookies")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Cookies et autres traceurs`}
        </Typography>
        <Typography
          variant="subheading"
          className={css(aphrodite.aboutMenuTitlePadding)}
          onClick={() =>
            document
              .getElementById("juridiction")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          {`Clause attributive de juridiction et loi applicable`}
        </Typography>
      </Fragment>
    );
  };

  termsOfUseContent = () => {
    return (
      <Fragment>
        <Typography variant="body2" gutterBottom id={"terms"}>
          {`CONDITIONS GENERALES D’UTILISATION`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Date de la dernière modification : 14 mai 2018`}
        </Typography>
        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"welcome"}
        >
          {`Bienvenue sur Qwarx.nc`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Les présentes Conditions Générales d’Utilisation (ci-après désignées CGU) définissent les conditions et modalités d’utilisation de nos produits et services`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Qwarx.nc fournit à titre gratuit un service de moteur de recherche exclusivement destiné à la Nouvelle-Calédonie, accessible via son site https://www.qwarx.nc.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`L’utilisation de nos Services implique votre acceptation des présentes CGU. Nous nous réservons le droit de modifier les termes des CGU à tout moment afin de les adapter aux évolutions des Services de Qwarx.nc. Vous serez informé.e par courriel et/ou par tout autre moyen d’affichage approprié sur les Services concernés de ces éventuelles modifications.`}
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"accessibility"}
        >
          {`Accessibilité des Services`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Vous êtes informé.e que les Services sont accessibles 24h / 24 et 7 jours / 7 et reconnaissez que cette accessibilité pourra être interrompue en cas de force majeure ou de difficultés techniques.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Nous ne saurions être tenus responsables des dysfonctionnements du réseau ou des serveurs ou de tout autre événement échappant à notre contrôle, qui ferait obstacle ou dégraderait l’accès aux Services. Nous nous réservons la faculté d’interrompre, de suspendre momentanément ou de modifier sans préavis l’accès à tout ou partie des Services, afin d’en assurer la maintenance et/ou le contrôle, ou à des fins de test, sans que l’interruption, la suspension ou la modification n’ouvrent droit à aucune obligation ni indemnisation.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Nous nous efforcerons de vous en avertir préalablement. Vous vous engagez par ailleurs à ne pas utiliser les Services de façon inappropriée (par exemple, en accédant de manière non autorisée aux Services, aux serveurs, ordinateurs ou bases de données en lien avec les Services, en lançant des attaques par saturation ou en introduisant du matériel malveillant ou nuisible…) sous peine de poursuites judiciaires. Nous nous réservons la faculté de refuser l’accès aux Services à tout utilisateur ne respectant pas les présentes CGU.`}
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"utilisation"}
        >
          {`À propos de l’utilisation de logiciels`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Certains de nos Services peuvent nécessiter l’utilisation d’un logiciel téléchargeable (tels que notre “application mobile” PWA). Qwarx.nc vous concède, à titre gratuit, une licence personnelle, non-cessible, non-exclusive et pour le monde entier, d’utilisation du logiciel fourni dans le cadre de nos Services.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Cette licence est exclusivement destinée à vous permettre d’utiliser et de bénéficier de nos Services dans le respect des présentes CGU, à l’exclusion de tout droit de copie, modification, distribution, vente, location de tout ou partie du logiciel.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Il en va de même pour les droits de décompilation ou d’extraction du code source de ces logiciels, hormis dans les cas où le droit de décompilation est autorisé par la loi et dans les limites édictées par cette loi.`}
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"informations"}
        >
          {`Informations mises à disposition par les Services`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Les informations fournies sur les Services sont à vocation purement informative. Nous nous efforçons d’assurer l’exactitude des informations actualisées, diffusées sur les Services. Nous ne pouvons toutefois ni garantir que les résultats et les informations obtenus soient exempts de toute erreur ou de tout défaut, ni garantir la complétude, l’actualisation, la précision, l’exhaustivité ou l’absence de modification par un tiers.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Par conséquent, nous déclinons toute responsabilité, de quelle que nature que ce soit :`}
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              {`en cas d’imprécision, inexactitude, absence d’actualisation, erreur ou omission portant sur des informations disponibles sur les Services ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`d’une absence de disponibilité des informations ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`pour tous dommages, directs et/ou indirects, quelles qu’en soient les causes, origines, nature ou conséquences, provoqués à raison de l’accès de quiconque aux Services ou de l’impossibilité d’y accéder ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`de l’utilisation des Services et/ou du crédit accordé à une quelconque information provenant directement ou indirectement des Services ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`de décisions prises sur la base d’une information contenue sur les Services, et de l’utilisation qui pourrait en être faite par des tiers ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`en cas d’inadéquation entre les informations fournies, les Services proposés et vos besoins.`}
            </Typography>
          </li>
        </ul>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"ads"}
        >
          {`Liens publicitaires`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Nous proposons des liens hypertextes vers d’autres sites internet ou d’autres sources d’informations édités et/ou gérés par des tiers. Dans la mesure où nous ne pouvons exercer aucun contrôle sur les contenus de ces sources externes, vous reconnaissez que nous n’assumons aucune responsabilité relative à la mise à disposition de ces ressources, à leur contenu, aux éventuelles collectes et transmissions de données personnelles, installations de cookies ou tout autre procédé tendant aux mêmes fins, effectués par ces sites.`}
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"property"}
        >
          {`Propriété intellectuelle`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Tous droits réservés, Qwarx.nc® est une marque déposée de la société ClacTaCom auprès de l’INPI (logo et texte). Toute reproduction totale ou partielle de cette marque et de son logo à quelque titre que ce soit, et notamment à des fins commerciales, sans l’accord préalable et écrit de ClacTaCom est interdite sous peine de poursuites judiciaires.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Les Services ainsi que les éléments qui les composent ou accessibles à partir de ces Services (autres que votre contenu, les images, vidéos, textes accessibles via les liens hypertextes, le contenu des autres utilisateurs), tels que les textes, images, logiciels, bases de données, onglets, fonctionnalités sont la propriété exclusive de Qwarx.nc et sont protégés par le droit de la propriété intellectuelle.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Les différents textes, images, photographies, interfaces visuelles, graphiques, marques, logos, sons, extraits musicaux, illustrations et vidéos, accessibles via les Services à partir de liens hypertextes, peuvent faire l’objet de droits de propriété intellectuelle spécifiques. Nous ne saurions être tenus responsables de toute atteinte, dommage, perte, préjudice, revendication, action en contrefaçon et concurrence déloyale au titre de l’utilisation de nos Services, ni de toute utilisation illicite de nos Services, exploitation frauduleuse ou tentative d’atteinte à des mesures techniques de protection.`}
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"report"}
        >
          {`Signalement de contenus`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Qwarx.nc est un simple intermédiaire technique qui vous permet d’accéder à des contenus présents sur Internet. Dans le cadre d’une demande de déréférencement d’un contenu sur Qwarx.nc, si vous obtenez une réponse positive de notre part, nous vous rappelons que ce contenu peut rester disponible et accessible via d’autres moteurs de recherche ou en tapant l’adresse URL du site dans la barre de recherches de votre navigateur. Il vous appartient de contacter le responsable de la publication et/ou le prestataire d’hébergement des sites concernés afin de demander la suppression définitive du ou des contenu(s) en cause. Pour les contenus les plus graves, vous avez la possibilité de les signaler sur le portail officiel de signalement des contenus illicites du Ministère français de l’Intérieur.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Conformément aux dispositions légales en vigueur, dans l’hypothèse où vous constateriez la présence d’un contenu du type : apologie de crimes contre l’humanité, provocation à la commission d’actes de terrorisme ou leur apologie, incitation à la haine raciale, à l’égard des personnes en raison de leur sexe, de leur orientation ou identité sexuelle ou de leur handicap, pornographie enfantine, incitation à la violence, atteintes à la dignité humaine, lors de votre navigation sur les Services, vous avez la possibilité de nous le signaler en nous contactant à l’adresse contact@clactacom.nc.`}
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"report"}
        >
          {`Votre Compte Qwarx.nc`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Si vous avez créé un compte utilisateur, vous assumez l’entière responsabilité des informations que vous renseignez lors de votre inscription ou lors de toute modification de votre compte. Nous n’accédons pas à votre profil et déclinons toute responsabilité quant à son contenu. Vous vous engagez à prendre toutes les mesures nécessaires afin de préserver la confidentialité de votre mot de passe.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Vous pouvez supprimer votre compte à tout moment à partir de votre profil en cliquant sur la mention « Supprimer mon compte ». `}
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"freedom"}
        >
          {`Informatique et Libertés`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`La politique de Qwarx.nc en matière de respect de la vie privée de ses utilisateurs répond à un niveau d’exigence très élevé. De manière générale, Qwarx.nc ne collecte pas de données lors de l’utilisation habituelle de ses Services. Les contenus publicitaires qui peuvent vous être présentés ne le sont qu’en fonction des mots contenus dans votre recherche en cours, mais en aucun cas en fonction de vos recherches précédentes, qui ne sont d’ailleurs pas archivées, ni de votre navigation sur d’autres sites internet.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Le traitement des demandes d’informations ainsi que l’inscription à certains Services peuvent toutefois requérir des utilisateurs de communiquer des données à caractère personnel telles que leur nom, prénom, coordonnées, adresse électronique, numéros de carte bancaire. Ces données sont collectées et traitées par Qwarx.nc conformément à la loi n° 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés modifiée, à des fins de :`}
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              {`gestion technique du ou des compte(s) de l’utilisateur et des Services disponibles ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`gestion des demandes d’informations ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`gestion des demandes de référencement ; `}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`gestion des demandes de déréférencement et des demandes liées à l’exercice des droits d’accès, de rectification et de suppression portant sur les données personnelles ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`sécurité du système d’information de Qwarx.nc ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`respect de nos obligations légales et réglementaires.`}
            </Typography>
          </li>
        </ul>
        <Typography variant="body1" gutterBottom>
          {`Vous disposez d’un droit d’opposition au traitement de vos données, d’un droit d’accès, de rectification et de suppression sur les données vous concernant. Vous disposez également du droit de définir des directives permettant l’accès à vos données en cas de décès (les modalités d’exercice de ce droit sont actuellement en attente de précisions par décret). Les demandes portant sur ces droits ainsi que sur le droit au déréférencement peuvent être exercées : `}
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              {`soit en écrivant par courrier à ClacTaCom – BP 8741, 98807 Nouméa, Nouvelle-Calédonie. `}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`soit en adressant un courrier électronique à : contact@clactacom.nc`}
            </Typography>
          </li>
        </ul>
        <Typography variant="body1" gutterBottom>
          {`Les données personnelles que vous communiquez sont conservées pour la durée strictement nécessaire à la réalisation des finalités visées ci-dessus. Elles ne font l’objet d’aucune divulgation et/ou cession à des tiers, dans le respect des obligations réglementaires et légales applicables aux moteurs de recherche. Nous nous engageons à mettre en place tous les moyens nécessaires pour garantir la sécurité et la confidentialité des données transmises.`}
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"cookies"}
        >
          {`Cookies et autres traceurs`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Nous n’utilisons aucun cookie ou autre traceur publicitaire lors de votre navigation sur les Services.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`La seule technologie susceptible d’être installée sur votre ordinateur, dénommée « local storage », sert à sauvegarder vos paramètres de navigation.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Vous avez la possibilité de supprimer les données du « local storage » en désactivant les cookies à l’aide de la barre d’outils de votre navigateur. Toutefois, cette désactivation peut vous empêcher d’accéder à certaines fonctionnalités des Services, par exemple la sauvegarde de vos paramètres de navigation.`}
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"juridiction"}
        >
          {`Clause attributive de juridiction et loi applicable`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Les Services et leurs CGU sont régis par la loi française, quel que soit le lieu d’utilisation. En cas d’échec des solutions amiables ou dans l’absence de leur recherche, les tribunaux français du ressort de la Cour d’appel de Paris sont seuls compétents pour connaître de tout différend né des présentes dispositions. `}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Qwarx est une marque déposée.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Tous droits réservés, Qwarx.nc® 2018`}
        </Typography>
      </Fragment>
    );
  };

  render() {
    const { value } = this.state;
    let menu, content;
    switch (value) {
      case 0:
        menu = this.legalMenu;
        content = this.legalContent;
        break;
      case 1:
        menu = this.termsOfUseMenu;
        content = this.termsOfUseContent;
        break;
      case 2:
        menu = () => null;
        content = () => null;
        break;
      case 3:
        menu = () => null;
        content = () => null;
        break;
      default:
        menu = () => null;
        content = () => null;
    }
    return (
      <Wrapper>
        <Grid
          container
          direction="column"
          spacing={0}
          style={{ marginLeft: "16px" }}
        >
          <Grid
            item
            style={{
              position: "fixed",
              width: "100%",
              top: 0,
              backgroundColor: "white"
            }}
          >
            <Grid container direction="column" spacing={0}>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  spacing={0}
                  style={{ marginTop: "5px" }}
                  alignItems={"center"}
                >
                  <Grid item style={{ marginRight: "8px" }}>
                    <Link prefetch href="/">
                      <a>
                        <img
                          src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo.png`}
                          srcSet={`
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_1.0/qwarx-logo.png,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_2.0/qwarx-logo.png 2x,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,w_130,dpr_3.0/qwarx-logo.png 3x
                `}
                          alt={`qwarx logo`}
                          style={{
                            cursor: this.goBackToHomePage ? "pointer" : "unset"
                          }}
                        />
                      </a>
                    </Link>
                  </Grid>
                  <Grid item xs>
                    <Typography variant={"title"} color={"primary"}>
                      {`A propos`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Tabs
                  indicatorColor="secondary"
                  textColor="secondary"
                  onChange={this.handleChange}
                  value={value}
                >
                  <Tab label="Mentions légales" />
                  <Tab label="Conditions Générales" />
                  <Tab label="Blog" />
                  <Tab label="Contact" />
                </Tabs>
                <Divider />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ paddingTop: "85px" }}>
            <Grid
              container
              direction="row"
              spacing={0}
              style={{ minHeight: "calc(100vh - 120px)" }}
            >
              <Grid
                item
                style={{
                  width: "300px",
                  borderRight: "1px #e1e1e1 solid",
                  marginTop: "12px",
                  marginBottom: "12px",
                  position: "fixed"
                }}
              >
                {menu()}
              </Grid>
              <Grid
                item
                style={{
                  marginLeft: "300px",
                  paddingLeft: "48px",
                  paddingRight: "48px",
                  paddingTop: "72px",
                  paddingBottom: "72px",
                  width: "720px"
                }}
              >
                {content()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
}
