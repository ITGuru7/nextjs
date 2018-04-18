import React from "react";
import { withStyles } from "material-ui/styles";
import { Tab } from "material-ui/Tabs";

const styles = {
  root: {
    minWidth: 0,
    marginRight: "8px"
  },
  selected: {
    color: "#38f"
  },
  disabled: {
    color: "#666"
  },
  labelContainer: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6
  }
};

function styledTab(props) {
  return (
    <Tab
      {...props}
      classes={{
        selected: props.classes.selected,
        disabled: props.classes.disabled,
        labelContainer: props.classes.labelContainer,
        root: props.classes.root
      }}
    />
  );
}

export default withStyles(styles)(styledTab);
