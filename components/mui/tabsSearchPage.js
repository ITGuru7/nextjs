import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";

const styles = {
  indicator: {
    display: "none"
  },
  root: {
    marginTop: '5px'
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
