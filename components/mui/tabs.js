import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";

const styles = {
  root: {
    backgroundColor: "#f8f8f8",
    minHeight: 0,
    "@media (max-width: 600px)": {
      height: "40px"
    },
    "@media (min-width: 601px)": {
      height: "40px"
    }
  },
  indicator: {
    bottom: "8px",
    backgroundColor: "#1565C0"
  }
};

class StyledTabs extends React.Component {
  render() {
    const props = this.props;
    return (
      <Tabs
        {...props}
        classes={{
          root: props.classes.root,
          indicator: props.classes.indicator
        }}
      >
        {props.children}
      </Tabs>
    );
  }
}

export default withStyles(styles)(StyledTabs);
