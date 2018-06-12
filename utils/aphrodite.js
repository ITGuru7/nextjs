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
  contentTop: {
    // < sm
    "@media (max-width: 600px)": {
      paddingTop: "6px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      paddingTop: "12px"
    },
    //md+
    "@media (min-width: 961px)": {
      paddingTop: "12px"
    }
  },
  contentBottom: {
    // < sm
    "@media (max-width: 600px)": {
      paddingBottom: "6px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      paddingBottom: "12px"
    },
    //md+
    "@media (min-width: 961px)": {
      paddingBottom: "12px"
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
  searchResultsPaddingRight: {
    // < sm
    "@media (max-width: 600px)": {
      paddingRight: "12px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      paddingRight: "12px"
    },
    //md+
    "@media (min-width: 961px) and (max-width: 1279px)": {
      paddingRight: "12px"
    },
    "@media (min-width: 1280px)": {
      paddingRight: "60px"
    }
  },
  searchResultsPaddingLeft: {
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
      marginLeft: "140px"
    }
  },
  searchResultsMarginRight: {
    // < sm
    "@media (max-width: 600px)": {
      marginRight: "12px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      marginRight: "30px"
    },
    //md+
    "@media (min-width: 961px)": {
      marginRight: "12px"
    }
  },
  searchResultsMarginLeft: {
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
  gougleLogoLandingPage: {
    "@media (max-width: 600px)": {
      width: "200px"
    },
    "@media (min-width: 601px)": {
      width: "250px"
    },
  },
  topScreenPadding: {
    marginTop: "3px",
    marginBottom: "3px"
  },
  mobileGreyBackground: {
    backgroundColor: "#f8f8f8"
  },
  mobileMarginBottom: {
    // < sm
    "@media (max-width: 600px)": {
      marginBottom: "4px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      marginBottom: "4px"
    }
  },
  tabsBorderBottom: {
    borderBottom: "1px solid #e6e6e6"
  },
  debug: {
    border: "1px black solid"
  },
  searchResultsWidth: {
    "@media (max-width: 959px)": {
      width: "100%"
    },
    "@media (min-width: 960px) and (max-width: 1399px)": {
      width: "500px"
    },
    "@media (min-width: 1400px)": {
      width: "650px"
    }
  },
  rightBorder: {
    "@media (max-width: 959px)": {
      borderRight: "none"
    },
    "@media (min-width: 960px)": {
      borderRight: "1px #e1e1e1 solid"
    }
  },
  wrapperMinHeight: {
    "@media (max-width: 959px)": {
      minHeight: "calc(100vh - 340px)"
    },
    "@media (min-width: 960px) and (max-width: 1279px)": {
      minHeight: "calc(100vh - 332px)"
    },
    "@media (min-width: 1280px)": {
      minHeight: "calc(100vh)"
    }
  }
});
