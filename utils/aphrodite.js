import { StyleSheet } from "aphrodite";

// <= sm : phone
// > sm < md : tablet
// >= md : desktop

export default StyleSheet.create({
  contentLeft: {
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
      marginLeft: "120px"
    }
  },
  contentRight: {
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
      marginRight: "120px"
    }
  },
  gougleLogo: {
    width: "120px"
  }
});
