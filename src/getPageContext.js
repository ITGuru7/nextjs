/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from "jss";
import { createMuiTheme, createGenerateClassName } from "@material-ui/core/styles";

// A theme with custom primary and secondary color.
// It's optional.
// https://material-ui.com/style/color/
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#212121',
      main: '#212121',
      dark: '#212121'
    },
    secondary: {
      light: '#1565C0',
      main: '#1565C0',
      dark: '#1565C0'
    }
  }
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
