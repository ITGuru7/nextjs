import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tabs from "./mui/tabsAbout";
import Tab from "./mui/tabAbout";
import Divider from "@material-ui/core/Divider";
import Link from "next/link";
import aphrodite from "../utils/aphrodite";
import { css } from "aphrodite";
import { Fragment } from "react";
import Router from "next/router";
import delay from "lodash/delay";
import Butter from "buttercms";
const butter = Butter("7a276594e635272c3672f732b018426c18cb9e7a");
import Display from "../utils/display";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import debounce from "lodash/debounce";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      posts: this.props.posts,
      post: this.props.post,
      leftMenu: false
    };
    this.updateWidth = this.updateWidth.bind(this);
  }

  fetchPosts() {
    butter.post.list({ page: 1, page_size: 20 }).then(resp => {
      if (this.state.post) {
        this.setState({
          posts: resp.data.data
        });
      } else {
        this.setState({
          posts: resp.data.data,
          post: resp.data.data[0]
        });
      }
    });
  }

  updateWidth() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.setState({ width: window.innerWidth });
    window.addEventListener("resize", debounce(this.updateWidth, 150));
    if (!this.state.posts) {
      // not server-side rendered
      this.fetchPosts();
    }
    if (this.props.shallow) {
      const post = this.state.post;
      Router.push(`/blog/${post.slug}`, `/blog/${post.slug}`, {
        shallow: true
      });
    }
  }

  handleChange = (event, value) => {
    switch (value) {
      case 0:
        delay(
          () =>
            Router.push("/mentions-legales", "/mentions-legales", {
              shallow: true
            }),
          300
        );
        break;
      case 1:
        delay(
          () =>
            Router.push("/conditions-generales", "/conditions-generales", {
              shallow: true
            }),
          300
        );
        break;
      case 2:
        delay(
          () => Router.push("/contact", "/contact", { shallow: true }),
          300
        );
        break;
      case 3:
        delay(() => Router.push(`/blog/`, `/blog/`, { shallow: true }), 300);
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
          {`Les présentes Conditions Générales d’Utilisation (CGU) définissent les conditions et modalités d’utilisation de notre site web.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Qwarx.nc fournit à titre gratuit un service de moteur de recherche exclusivement destiné à la Nouvelle-Calédonie, accessible via son site https://qwarx.nc`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`L’utilisation de notre site implique votre acceptation des présentes CGU. Nous nous réservons le droit de modifier lesdites CGU à tout moment afin de les adapter aux évolutions des services de Qwarx.nc. Vous serez informé.e.s par affichage approprié sur les services du site concernés de ces éventuelles modifications.`}
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"accessibility"}
        >
          {`Accessibilité des services du site`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Vous êtes informé.e.s que le site est accessible 24h/24, 7 jours/7, et reconnaissez que cette accessibilité peut être interrompue en cas de force majeure ou de difficultés techniques.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Nous ne saurions être tenus responsables des dysfonctionnements du réseau ou des serveurs ou de tout autre événement échappant à notre contrôle, qui empêcherait ou dégraderait l’accès au site et à ses services. Nous nous réservons la possibilité d’interrompre, de suspendre momentanément ou de modifier sans préavis l’accès aux services, en tout ou partie, afin d’en assurer la maintenance ou le contrôle, ou à des fins de test, sans que l’interruption, la suspension ou la modification n’ouvrent droit à aucune obligation ni indemnisation.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Vous vous engagez par ailleurs à ne pas utiliser les services du site de façon inappropriée (par exemple, en accédant de manière non autorisée aux services, aux serveurs, ordinateurs ou bases de données en lien avec les services, en lançant des attaques par saturation ou en introduisant du matériel malveillant ou nuisible) sous peine de poursuites judiciaires.`}
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
          {`Notre site peut nécessiter l’utilisation d’un logiciel téléchargeable (notre “application mobile” en Progressive Web App). Qwarx.nc vous concède, à titre gratuit, une licence personnelle, non-cessible, non-exclusive et pour le monde entier, d’utilisation du logiciel fourni dans le cadre de nos services.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Cette licence est exclusivement destinée à vous permettre d’utiliser nos services dans le respect des présentes CGU, à l’exclusion de tout droit de copie, modification, distribution, vente, location de tout ou partie du logiciel.`}
        </Typography>

        <Typography
          variant="headline"
          gutterBottom
          style={{ paddingTop: "64px" }}
          id={"informations"}
        >
          {`Informations mises à disposition par le site`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Les informations fournies sur le site sont à vocation purement informative. Nous nous efforçons d’assurer l’exactitude des informations actualisées, diffusées sur le site. Nous ne pouvons toutefois ni garantir que les résultats et les informations obtenus soient exempts de tout défaut ou erreur, ni garantir la complétude, l’actualisation, la précision, l’exhaustivité ou l’absence de modification par un tiers.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Par conséquent, nous déclinons toute responsabilité, de quelque nature que ce soit :`}
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              {`en cas d’imprécision, inexactitude, absence d’actualisation, erreur ou omission portant sur des informations disponibles sur les services du site ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`d’une absence de disponibilité des informations ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`pour tous dommages, directs et/ou indirects, quelles qu’en soient les causes, origines, nature ou conséquences, provoqués à raison de l’accès de quiconque aux services du site ou de l’impossibilité d’y accéder ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`de l’utilisation du site et/ou du crédit accordé à une quelconque information provenant directement ou indirectement du site ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`de décisions prises sur la base d’une information contenue sur le site, et de l’utilisation qui pourrait en être faite par des tiers ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`en cas d’inadéquation entre les informations fournies et vos besoins.`}
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
          {`Nous proposons des liens hypertextes vers d’autres sites web ou d’autres sources d’informations édités et/ou gérés par des tiers. Vous reconnaissez que nous n’assumons aucune responsabilité relative à la mise à disposition de ces ressources, à leur contenu, aux éventuelles collectes et transmissions de données personnelles, installations de cookies ou tout autre procédé tendant aux mêmes fins, effectués par ces sites.`}
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
          {`Les services du site ainsi que les éléments qui les composent (autres que votre contenu, les images, vidéos, textes accessibles via les liens hypertextes, le contenu des autres utilisateurs), tels que les textes, images, logiciels, bases de données, onglets, fonctionnalités sont la propriété exclusive de Qwarx.nc et sont protégés par le droit de la propriété intellectuelle.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Les différents textes, images, photographies, interfaces visuelles, graphiques, marques, logos, sons, extraits musicaux, illustrations et vidéos, accessibles via les services du site à partir de liens hypertextes, peuvent faire l’objet de droits de propriété intellectuelle spécifiques. Nous ne saurions être tenus responsables de toute atteinte, dommage, perte, préjudice, revendication, action en contrefaçon et concurrence déloyale au titre de l’utilisation de nos services, ni de toute utilisation illicite de notre site, exploitation frauduleuse ou tentative d’atteinte à des mesures techniques de protection.`}
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
          {`Qwarx.nc est un simple intermédiaire technique qui vous permet d’accéder à des contenus présents sur le web. Dans le cadre d’une demande de déréférencement d’un contenu sur Qwarx.nc, si vous obtenez une réponse positive de notre part, nous vous rappelons que ce contenu peut rester disponible et accessible par l’intermédiaire ou sur d’autres moteurs de recherche ou en tapant l’adresse URL du site dans la barre de recherches de votre navigateur. Il vous appartient de contacter le responsable de la publication et/ou le prestataire d’hébergement des sites concernés afin de demander la suppression définitive des contenus en cause. Pour les contenus les plus graves, vous avez la possibilité de les signaler sur le portail officiel de signalement des contenus illicites du Ministère français de l’Intérieur.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Conformément aux dispositions légales en vigueur, dans l’hypothèse où vous constaterez la présence d’un contenu du type : apologie de crimes contre l’humanité, encouragement à la commission d’actes de terrorisme ou leur apologie, incitation à la haine raciale, provocation à l’égard des personnes en raison de leur sexe, de leur orientation ou identité sexuelle ou de leur handicap, pornographie enfantine, incitation à la violence, atteintes à la dignité humaine, lors de votre navigation sur les services du site, vous avez la possibilité de nous le signaler en nous contactant à l’adresse contact@clactacom.nc.`}
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
          {`La politique de Qwarx.nc en matière de respect de la vie privée de ses utilisateurs répond à un niveau d’exigence très élevé.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Qwarx.nc ne constitue pas de profil utilisateur à des fins commerciales.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Les données collectées sont exclusivement destinées à l’identification de bugs et l’amélioration de la navigation. Le système utilisé pour se faire s’appelle Fullstory. L’utilisateur est informé qu’il peut empêcher Fullstory de collecter ses données de débogage en cliquant sur le bouton OPT Out of Fullstory sur le lien suivant : https://www.fullstory.com/optout/#`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Les contenus publicitaires qui peuvent vous être présentés pendant vos recherches ne le sont qu’en fonction des mots contenus dans votre recherche en cours, mais en aucun cas en fonction de votre identité ou de vos recherches passées.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Votre identité est et reste inconnue de Qwarx.nc.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Le traitement des demandes d’informations ainsi que l’inscription à certains services du site peuvent toutefois requérir des utilisateurs de communiquer des données à caractère personnel telles que leur nom, prénom, coordonnées, adresse électronique, numéros de carte bancaire. Ces données sont collectées et traitées par Qwarx.nc conformément à la loi n° 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés modifiée, à des fins de :`}
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              {`gestion technique du ou des compte(s) de l’utilisateur et des services du site disponibles ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`gestion des demandes d’informations ;`}
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              {`gestion des demandes de référencement ;`}
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
          {`Ces données ne sont pas associées à vos recherches sur Qwarx.nc.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Vous disposez d’un droit d’opposition au traitement de vos données, d’un droit d’accès, de rectification et de suppression sur les données vous concernant. Vous disposez également du droit de définir des directives permettant l’accès à vos données en cas de décès. Les demandes portant sur ces droits ainsi que sur le droit au déréférencement peuvent être exercées :`}
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              {`soit en écrivant par courrier à ClacTaCom – BP 8741, 98807 Nouméa, Nouvelle-Calédonie.`}
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
          id={"juridiction"}
        >
          {`Clause attributive de juridiction et loi applicable`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Les services du site et leurs CGU sont régis par la loi française, quel que soit le lieu d’utilisation. En cas d’échec des solutions amiables ou dans l’absence de leur recherche, les tribunaux français du ressort de la Cour d’appel de Nouméa sont seuls compétents pour connaître de tout différend né des présentes dispositions.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Qwarx.nc est une marque déposée.`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Tous droits réservés, Qwarx.nc® 2018`}
        </Typography>
      </Fragment>
    );
  };

  contactMenu = () => (
    <Fragment>
      <Typography
        variant="subheading"
        className={css(aphrodite.aboutMenuTitlePadding)}
        onClick={() =>
          document
            .getElementById("email")
            .scrollIntoView({ behavior: "smooth" })
        }
      >
        {`E-mail`}
      </Typography>
      <Typography
        variant="subheading"
        className={css(aphrodite.aboutMenuTitlePadding)}
        onClick={() =>
          document
            .getElementById("telephone")
            .scrollIntoView({ behavior: "smooth" })
        }
      >
        {`Téléphone`}
      </Typography>
      <Typography
        variant="subheading"
        className={css(aphrodite.aboutMenuTitlePadding)}
        onClick={() =>
          document
            .getElementById("adresse")
            .scrollIntoView({ behavior: "smooth" })
        }
      >
        {`Adresse`}
      </Typography>
    </Fragment>
  );

  contactContent = () => (
    <Fragment>
      <Grid
        container
        spacing={24}
        alignItems={"center"}
        style={{ marginBottom: "32px" }}
      >
        <Grid item>
          <Typography variant="headline" gutterBottom id={"email"}>
            {`E-mail`}
          </Typography>
          <a href="mailto:contact@clactacom.nc" target="_top">
            <Typography variant="body2" color={"secondary"} gutterBottom>
              {`contact@clactacom.nc`}
            </Typography>
          </a>
        </Grid>
        <Grid item>
          <Typography variant="headline" gutterBottom id={"data"}>
            {`Téléphone`}
          </Typography>
          <a href="tel:786255">
            <Typography variant="body2" color={"secondary"} gutterBottom>
              {`(+687) 78.62.55`}
            </Typography>
          </a>
        </Grid>
      </Grid>

      <Typography variant="headline" gutterBottom id={"data"}>
        {`Adresse`}
      </Typography>
      <a href="https://goo.gl/maps/FroN9sR5bE22">
        <Typography variant="body2" color={"secondary"} gutterBottom>
          {`20 rue du Général Mangin, Nouméa`}
        </Typography>
      </a>
    </Fragment>
  );

  blogMenu = () => {
    const posts = this.state.posts;
    if (!posts) {
      return null;
    } else {
      return (
        <Fragment>
          {posts.map(post => {
            return (
              <Typography
                variant="body2"
                className={css(aphrodite.aboutMenuTitlePadding)}
                key={post.title}
                onClick={() => {
                  this.setState({ post });
                  delay(
                    () =>
                      Router.push(`/blog`, `/blog/${post.slug}`, {
                        shallow: true
                      }),
                    300
                  );
                }}
              >
                {post.title}
              </Typography>
            );
          })}
        </Fragment>
      );
    }
  };

  blogContent = () => {
    if (!this.state.post) {
      return null;
    }
    const { body, title } = this.state.post;
    const width = this.state.width;
    return (
      <Fragment>
        <div style={{ width: width > 960 ? "720px" : `${width - 40}px` }}>
          <Typography
            variant="display1"
            component={"h1"}
            color={"primary"}
            gutterBottom
            style={{ marginBottom: "64px" }}
          >
            {title}
          </Typography>
          <div
            style={{ color: "#212121" }}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </Fragment>
    );
  };

  toggleDrawer = open => () => {
    this.setState({
      leftMenu: open
    });
  };

  mobileHeader = includeMenu => (
    <Grid container spacing={0} direction={"row"} alignItems={"center"}>
      {includeMenu && (
        <Grid item>
          <IconButton
            style={{
              marginLeft: "8px",
              marginRight: "20px"
            }}
            disableRipple
            onClick={this.toggleDrawer(true)}
          >
            <MenuIcon
              style={{
                color: "#666",
                fontSize: "28"
              }}
            />
          </IconButton>
        </Grid>
      )}
      <Grid
        item
        style={{
          marginRight: "10px",
          marginTop: "4px",
          marginLeft: includeMenu ? "unset" : "10px"
        }}
      >
        <Link prefetch href="/">
          <a>
            <img
              src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,h_50,dpr_1.0/qwarx-logo-3.png`}
              srcSet={`
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,h_50,dpr_1.0/qwarx-logo-3.png,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,h_50,dpr_2.0/qwarx-logo-3.png 2x,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,h_50,dpr_3.0/qwarx-logo-3.png 3x
                `}
              alt={`qwarx logo`}
              style={{
                cursor: this.goBackToHomePage ? "pointer" : "unset"
              }}
            />
          </a>
        </Link>
      </Grid>
      <Grid item>
        <Typography
          variant={"title"}
          color={"primary"}
          component={"span"}
          style={{ color: "#666", fontWeight: "300", marginRight: "20px" }}
        >
          {`A propos`}
        </Typography>
      </Grid>
    </Grid>
  );

  mobile = (value, menu, content) => {
    const mapWidth = this.state.width - 48;
    const posts = this.state.posts;
    return (
      <Display format="mobile" css>
        <Drawer open={this.state.leftMenu} onClose={this.toggleDrawer(false)}>
          <div>
            {this.mobileHeader(false)}
            <Divider />
            <ListItemText
              primary="Mentions Légales"
              inset
              primaryTypographyProps={{ variant: "body2" }}
              style={{ marginTop: "10px", marginBottom: "10px" }}
              onClick={() => {
                this.setState({ value: 0, leftMenu: false });
                delay(
                  () =>
                    Router.push("/mentions-legales", "/mentions-legales", {
                      shallow: true
                    }),
                  300
                );
              }}
            />
            <Divider style={{ marginLeft: "16px" }} />
            <ListItemText
              primary="Conditions Générales"
              inset
              primaryTypographyProps={{ variant: "body2" }}
              style={{ marginTop: "10px", marginBottom: "10px" }}
              onClick={() => {
                this.setState({ value: 1, leftMenu: false });
                delay(
                  () =>
                    Router.push(
                      "/conditions-generales",
                      "/conditions-generales",
                      {
                        shallow: true
                      }
                    ),
                  300
                );
              }}
            />
            <Divider style={{ marginLeft: "16px" }} />
            <ListItemText
              primary="Contact"
              inset
              primaryTypographyProps={{ variant: "body2" }}
              style={{ marginTop: "10px", marginBottom: "10px" }}
              onClick={() => {
                this.setState({ value: 2, leftMenu: false });
                delay(
                  () => Router.push("/contact", "/contact", { shallow: true }),
                  300
                );
              }}
            />
            <Divider style={{ marginLeft: "16px" }} />
            <ListItemText
              primary="Blog"
              inset
              primaryTypographyProps={{ variant: "body2" }}
              style={{ marginTop: "10px", marginBottom: "10px" }}
              onClick={() => {
                this.setState({ value: 3, leftMenu: false });
                delay(
                  () => Router.push(`/blog/`, `/blog/`, { shallow: true }),
                  300
                );
              }}
            />
            <Fragment>
              {posts &&
                posts.map(post => {
                  return (
                    <div key={post.title}>
                      <ListItemText
                        primary={post.title}
                        primaryTypographyProps={{ variant: "caption" }}
                        style={{
                          marginTop: "10px",
                          marginLeft: "8px",
                          marginBottom: "10px",
                          width: "120px"
                        }}
                        inset
                        key={post.title}
                        onClick={() => {
                          this.setState({ post, leftMenu: false });
                          delay(
                            () =>
                              Router.push(`/blog`, `/blog/${post.slug}`, {
                                shallow: true
                              }),
                            300
                          );
                        }}
                      />
                      <Divider style={{ marginLeft: "16px" }} />
                    </div>
                  );
                })}
            </Fragment>
          </div>
        </Drawer>
        <Grid
          container
          direction="column"
          spacing={0}
          style={{ marginLeft: "16px" }}
        />
        <Grid item style={{ position: "fixed", width: "100%" }}>
          {this.mobileHeader(true)}
          <Divider
            style={{
              backgroundColor: "rgba(151,151,151,0.5)",
              marginBottom: "20px",
              marginTop: "10px",
              marginLeft: "-8px",
              marginRight: "-8px"
            }}
          />
        </Grid>
        <Grid
          item
          style={{
            padding: "18px",
            position: "fixed",
            marginTop: "60px",
            overflowY: "auto",
            height: "90%"
          }}
        >
          {content()}
          {value === 2 ? (
            <img
              style={{ marginTop: "32px" }}
              width={`${mapWidth}`}
              height="300"
              src={`https://api.mapbox.com/styles/v1/mapbox/streets-v9/static/pin-l-marker+285A98(166.4399207,-22.271693)/166.4399207,-22.271693,15,333,23/${mapWidth}x300@2x?access_token=pk.eyJ1Ijoicm9tYTk4IiwiYSI6ImNqM3YzdWE4aTAxZ3IzMnRkcjdyYmQ5ajgifQ.GxliePsVeHaJQIAGwD7cjA`}
              alt="ClacTaCom"
            />
          ) : null}
        </Grid>
      </Display>
    );
  };

  desktop = (value, menu, content) => (
    <Display format="tablet-desktop" css>
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
                        src={`https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,h_50,dpr_1.0/qwarx-logo-3.png`}
                        srcSet={`
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,h_50,dpr_1.0/qwarx-logo-3.png,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,h_50,dpr_2.0/qwarx-logo-3.png 2x,
                https://res.cloudinary.com/clactacom/image/upload/f_auto,q_auto,c_scale,h_50,dpr_3.0/qwarx-logo-3.png 3x
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
                  <Typography
                    variant={"title"}
                    color={"primary"}
                    component={"span"}
                    style={{ color: "#666" }}
                  >
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
                <Tab label="Contact" />
                <Tab label="Blog" />
              </Tabs>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ paddingTop: "85px" }}>
          <Grid container direction="row" spacing={0}>
            <Grid
              item
              style={{
                width: "300px",
                borderRight: "1px #e1e1e1 solid",
                marginTop: "12px",
                marginBottom: "12px",
                position: "fixed",
                minHeight: "calc(100vh - 120px)",
                overflowY: "auto",
                height: "calc(100% - 120px)"
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
                minHeight: "calc(100vh - 120px)"
              }}
            >
              <div style={{ width: value === 3 ? "unset" : "720px" }}>
                {content()}
              </div>
              {value === 2 && (
                <img
                  style={{ marginTop: "32px" }}
                  width="600"
                  height="300"
                  src="https://api.mapbox.com/styles/v1/mapbox/streets-v9/static/pin-l-marker+285A98(166.4399207,-22.271693)/166.4399207,-22.271693,16,333,23/600x300@2x?access_token=pk.eyJ1Ijoicm9tYTk4IiwiYSI6ImNqM3YzdWE4aTAxZ3IzMnRkcjdyYmQ5ajgifQ.GxliePsVeHaJQIAGwD7cjA"
                  alt="ClacTaCom"
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Display>
  );

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
        menu = this.contactMenu;
        content = this.contactContent;
        break;
      case 3:
        menu = this.blogMenu;
        content = this.blogContent;
        break;
      default:
        menu = () => null;
        content = () => null;
    }

    return (
      <Fragment>
        {this.mobile(value, menu, content)}
        {this.desktop(value, menu, content)}
      </Fragment>
    );
  }
}
