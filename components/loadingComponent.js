import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Fade from 'material-ui/transitions/Fade';

class LoadingComponent extends React.PureComponent {
  styles = StyleSheet.create({
    paper: {
      '@media (max-width: 360px)': {
        marginBottom: '16px',
        padding: '16px',
      },
      '@media (min-width: 361px) and (max-width: 600px)': {
        marginBottom: '16px',
        padding: '16px',
      },
      '@media (min-width: 601px) and (max-width: 960px)': {
        marginBottom: '24px',
        padding: '24px',
      },
      '@media (min-width: 961px) and (max-width: 1919px)': {
        marginBottom: '12px',
        padding: '12px',
      },
      '@media (min-width: 1920px)': {
        marginBottom: '12px',
        padding: '12px',
      },
    },
    container: {
      '@media (max-width: 360px)': {
        marginBottom: '12px',
      },
      '@media (min-width: 361px) and (max-width: 600px)': {
        marginBottom: '12px',
      },
      '@media (min-width: 601px) and (max-width: 960px)': {
        marginBottom: '24px',
      },
      '@media (min-width: 961px) and (max-width: 1919px)': {
        marginBottom: '24px',
      },
      '@media (min-width: 1920px)': {
        marginBottom: '24px',
      },
    },
  });

  responsiveLeftForHeaderRight(width) {
    return 70 / 100 * width;
  }

  responsiveLeftForSubHeaderRight(width) {
    return 50 / 100 * width;
  }

  responsiveLeftForFirstEnd(width) {
    return 80 / 100 * width;
  }

  responsiveLeftForSecondEnd(width) {
    return 85 / 100 * width;
  }

  responsiveLeftForThirdEnd(width) {
    return 70 / 100 * width;
  }

  render(props) {
    return (
      <Fade timeout={{enter: 500, exit: 500}} in={true}>
        <Paper elevation={2} className={css(this.styles.paper)}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            spacing={0}
            className={css(this.styles.responsiveMarginBottom)}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div style={{minHeight: this.props.minHeight}}>
                <div className="animated-background">
                  <div className="background-masker header-top" />
                  <div className="background-masker header-left" />
                  <div
                    style={{
                      left: this.responsiveLeftForHeaderRight(this.props.width),
                    }}
                    className="background-masker header-right"
                  />
                  <div className="background-masker header-bottom" />
                  <div className="background-masker subheader-left" />
                  <div
                    style={{
                      left: this.responsiveLeftForSubHeaderRight(
                        this.props.width,
                      ),
                    }}
                  />
                  <div className="background-masker subheader-bottom" />
                  <div className="background-masker content-top" />
                  <div
                    style={{
                      left: this.responsiveLeftForFirstEnd(this.props.width),
                    }}
                    className="background-masker content-first-end"
                  />
                  <div className="background-masker content-second-line" />
                  <div
                    style={{
                      left: this.responsiveLeftForSecondEnd(this.props.width),
                    }}
                    className="background-masker content-second-end"
                  />
                  <div className="background-masker content-third-line" />
                  <div
                    style={{
                      left: this.responsiveLeftForThirdEnd(this.props.width),
                    }}
                    className="background-masker content-third-end"
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    );
  }
}

export default LoadingComponent;
