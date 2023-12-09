
// ----------------------------------------------------------------------

// import { alpha } from "@mui/system";

// eslint-disable-next-line no-unused-vars
export default function Backdrop(theme) {
  // const varLow = alpha(theme.palette.grey[900], 0.48);
  // const varHigh = alpha(theme.palette.grey[900], 1);

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: [
            `rgba(22,28,36, .7)`
          ],
          '&.MuiBackdrop-invisible': {
            background: 'transparent'
          }
        }
      }
    }
  };
}
