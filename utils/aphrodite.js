import { StyleSheet } from "aphrodite";

// <= sm : phone
// > sm < md : tablet
// >= md : desktop

export default StyleSheet.create({
  contentTop: {
    // < sm
    "@media (max-width: 600px)": {
      paddingTop: "18px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      paddingTop: "18px"
    },
    //md+
    "@media (min-width: 961px)": {
      paddingTop: "18px"
    }
  },
  contentBottom: {
    // < sm
    "@media (max-width: 600px)": {
      paddingBottom: "18px"
    },
    //sm-md
    "@media (min-width: 601px) and (max-width: 960px)": {
      paddingBottom: "18px"
    },
    //md+
    "@media (min-width: 961px)": {
      paddingBottom: "18px"
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
      paddingLeft: "120px"
    }
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
  mobileGreyBackground: {
    backgroundColor: "#f8f8f8"
  }
});
