import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";

const styles = {
  root: {
    minWidth: 0,
    marginRight: "42px",
  },
  selected: {
    color: "#1565C0"
  },
  disabled: {
    color: "#666"
  },
  labelContainer: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 0,
    paddingRight: 0
  },
  label: {
    fontSize: '1rem',
    textTransform: 'capitalize'
  }
};

class StyledTab extends React.Component {
  render() {
    const props = this.props;
    return (
      <Tab
        disableRipple
        {...props}
        classes={{
          selected: props.classes.selected,
          disabled: props.classes.disabled,
          labelContainer: props.classes.labelContainer,
          label: props.classes.label,
          root: props.classes.root
        }}
      />
    );
  }
}

export default withStyles(styles)(StyledTab);
