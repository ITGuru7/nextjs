import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";

const styles = {
  root: {
    minWidth: 0,
    marginRight: "8px",
  },
  selected: {
    color: "#0E8AB0"
  },
  disabled: {
    color: "#666"
  },
  labelContainer: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6
  },
  label: {
    fontSize: '0.875rem',
    'text-transform': 'capitalize'
  }
};

class StyledTab extends React.Component {
  render() {
    const props = this.props;
    return (
      <Tab
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
