import React from "react";
import { withStyles } from "material-ui/styles";
import { Tab } from "material-ui/Tabs";

const styles = {
  root: {
    minWidth: 0,
    marginRight: "8px"
  },
  textColorSecondarySelected: {
    color: "#38f"
  },
  textColorSecondaryDisabled: {
    color: "#666"
  },
  labelContainer: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6
    // [theme.breakpoints.up('md')]: {
    //   paddingLeft: theme.spacing.unit * 3,
    //   paddingRight: theme.spacing.unit * 3,
  }
};

function styledTab(props) {
  return (
    <Tab
      {...props}
      classes={{
        textColorSecondarySelected: props.classes.textColorSecondarySelected,
        textColorSecondaryDisabled: props.classes.textColorSecondaryDisabled,
        labelContainer: props.classes.labelContainer,
        root: props.classes.root
      }}
    />
  );
}

export default withStyles(styles)(styledTab);
