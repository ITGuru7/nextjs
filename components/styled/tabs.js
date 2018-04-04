import React from "react";
import { withStyles } from "material-ui/styles";
import Tabs from "material-ui/Tabs";

const styles = {
  root: {
    backgroundColor: "#f8f8f8",
    // height: "65px",
    // border: "1px solid #e6e6e6"
  }
};

function styledTabs(props) {
  return (
    <Tabs
      {...props}
      classes={{
        root: props.classes.root
      }}
    >
      {props.children}
    </Tabs>
  );
}

export default withStyles(styles)(styledTabs);
