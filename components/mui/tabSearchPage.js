import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";

let styles = {
  root: {
    marginRight: "4px",
    borderRadius: "5px 5px 0px 0px",
    minWidth: "120px"
    // opacity: 1,
    // minHeight: "32px"
  },
  selected: {
    // color: "white"
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
    fontSize: "0.875rem",
    textTransform: "capitalize"
  }
};

class StyledTab extends React.Component {
  render() {
    const props = this.props;
    return (
      <Fragment>
        <Grid
          container
          direction={"column"}
          spacing={0}
          style={{ width: "unset" }}
        >
          <Grid item>
            <Tab
              style={{
                backgroundColor: props.tab_color,
                color: props.tab_text_color,
                minHeight: props.selected ? "38px" : "33px"
              }}
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
          </Grid>
          <Grid
            item
            style={{
              height: "10px",
              width: "120px",
              backgroundColor: props.tab_color,
              opacity: props.selected ? 1 : 0.7
            }}
          />
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(StyledTab);
