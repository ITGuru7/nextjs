import { StyleSheet } from "aphrodite";

// <= sm : phone
// > sm < md : tablet
// >= md : desktop

export default StyleSheet.create({
  marginTop: {
    // < sm
    "@media (max-width: 600px)": {
      marginTop: "7px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      marginTop: "7px"
    },
    //md+
    "@media (min-width: 961px)": {
      marginTop: "7px"
    }
  },
  contentBottom: {
    // < sm
    "@media (max-width: 600px)": {
      paddingBottom: "8px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      paddingBottom: "8px"
    },
    //md+
    "@media (min-width: 961px)": {
      paddingBottom: "8px"
    }
  },
  contentLeft: {
    // < sm
    "@media (max-width: 600px)": {
      paddingLeft: "12px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      paddingLeft: "30px"
    },
    //md+
    "@media (min-width: 961px)": {
      paddingLeft: "140px"
    }
  },
  searchResultsLeft: {
    // < sm
    "@media (max-width: 600px)": {
      marginLeft: "12px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      marginLeft: "30px"
    },
    //md+
    "@media (min-width: 961px)": {
      marginLeft: "140px"
    }
  },
  gougleLogoMarginDesktop: {
    marginLeft: "5px",
    marginRight: "5px"
  },

  tabs: {
    fontSize: "6px"
  },
  contentRight: {
    // < sm
    "@media (max-width: 600px)": {
      paddingRight: "12px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      paddingRight: "30px"
    },
    //md+
    "@media (min-width: 961px)": {
      paddingRight: "120px"
    }
  },
  gougleLogo: {
    width: "130px"
  },
  topScreenPadding: {
    marginTop: "3px",
    marginBottom: "3px"
  },
  mobileGreyBackground: {
    backgroundColor: "#f8f8f8"
  },
  tabsBorderBottom: {
    borderBottom: "1px solid #e6e6e6"
  },
  debug: {
    border: "1px black solid"
  },
  searchIcon: {
    width: "24px",
    height: "24px"
  },
  searchResultsWidth: {
    "@media (max-width: 959px)": {
      width: "95%"
    },
    "@media (min-width: 960px) and (max-width: 1279px)": {
      width: "600px"
    },
    "@media (min-width: 1280px)": {
      width: "700px"
    }
  },
  searchResultsPercentage: {
    "@media (min-width: 960px) and (max-width: 1279px)": {
      width: "98%"
    },
    "@media (min-width: 1280px)": {
      width: "90%"
    }
  },
  rightBorder: {
    "@media (max-width: 959px)": {
      borderRight: "none"
    },
    "@media (min-width: 960px)": {
      borderRight: "1px grey solid"
    }
  }
});