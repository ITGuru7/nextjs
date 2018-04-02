import React from "react";
import { withStyles } from "material-ui/styles";
import { Tab } from "material-ui/Tabs";

const styles = {
  root: {
    backgroundColor: "#f8f8f8"
  }
};

function styledTab(props) {
  return (
    <Tab
      {...props}
      classes={{
        root: props.classes.root
      }}
    />
  );
}

export default withStyles(styles)(styledTab);
