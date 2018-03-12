import {createMuiTheme} from 'material-ui/styles';
import createPalette from 'material-ui/styles/createPalette';
import {red} from 'material-ui/colors/common';

export default createMuiTheme({
  palette: createPalette({
    primary: {
      50: '#e8e9e9',
      100: '#c7c8c9',
      200: '#a1a3a5',
      300: '#7b7e80',
      400: '#5f6265',
      500: '#43464a',
      600: '#3d3f43',
      700: '#34373a',
      800: '#2c2f32',
      900: '#1e2022',
      A100: '#74b6f8',
      A200: '#439cf6',
      A400: '#0783ff',
      A700: '#0076ec',
      contrastDefaultColor: 'light',
    },
    accent: {
      50: '#e0f1fa',
      100: '#b3ddf2',
      200: '#80c6e9',
      300: '#4dafe0',
      400: '#269dd9',
      500: '#008cd2',
      600: '#0084cd',
      700: '#0079c7',
      800: '#006fc1',
      900: '#005cb6',
      A100: '#dfedff',
      A200: '#acd0ff',
      A400: '#79b4ff',
      A700: '#5fa6ff',
      contrastDefaultColor: 'light',
    },
    error: red,
  }),
});
