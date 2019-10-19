import {createMuiTheme} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import * as commonColors from '@material-ui/core/colors/common';

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#6B7A8F',
    },
    secondary: {
      main: '#FF811d',
    },
    background: {
      default: grey[100],
    },
  },
  overrides: {
    MuiDialog: {
      paperWidthSm: {
        maxWidth: 640,
      },
    },
    MuiListItemText: {
      inset: {
        paddingLeft: '32px',
      },
    },
    MuiButton: {
      containedSecondary: {
        color: commonColors.default.white,
      },
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});
