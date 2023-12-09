// ----------------------------------------------------------------------

import { alpha } from "@mui/system";

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}
// primary: {
//   main: "#0E73F6",
//   light: "#d7edff",
// },
// error: {
//   main: "#f76659",
//   light: "#ffefea",
// },
// success: {
//   main: "#119c2b",
//   light: "#bbfbd0",
// },
// warning: {
//   main: "#D97706",
//   light: "#FEF3C7",
// },
// SETUP COLORS
const PRIMARY = {
  lighter: "#aac4ff",
  light: "#d7edff",
  main: "#007AFF",
  dark: "#005fc4",
  darker: "#00339b",
};
const SECONDARY = {
  lighter: "#FFAB91",
  light: "#F4511E",
  main: "#6e8bb7",
  dark: "#D84315",
  darker: "#BF360C",
};
const DARK_SECONDARY = {
  lighter: "#ffffff",
  light: "#F9FAFB",
  main: "#F4F6F8",
  dark: "#DFE3E8",
  darker: "#C4CDD5",
};
const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#bbfbd0",
  main: "#119c2b",
  dark: "#229A16",
  darker: "#08660D",
};
const WARNING = {
  lighter: "#FFE16A",
  light: "#FFF7CD",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
};
const ERROR = {
  lighter: "#FFE7D9",
  light: "#ffefea",
  main: "#FF4842",
  dark: "#B72136",
  darker: "#7A0C2E",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: { ...PRIMARY, contrastText: "#fff" },
  secondary: { ...SECONDARY, contrastText: "#fff" },
  info: { ...INFO, contrastText: "#fff" },
  success: { ...SUCCESS, contrastText: "#fff" },
  warning: { ...WARNING, contrastText: "#fff" },
  error: { ...ERROR, contrastText: "#fff" },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: {
      page: "#E0EEFF",
      paper: "#fff",
      default: "#fff",
      neutral: GREY[200],
      darkText: "#3d4e67",
      contrastText: "#1a2024",
    },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    secondary: { ...DARK_SECONDARY, contrastText: "#fff" },
    text: { primary: "#fff", secondary: GREY[500], disabled: GREY[600] },
    background: {
      page: "#E0EEFF",
      paper: GREY[800],
      default: GREY[900],
      neutral: GREY[500_16],
      darkText: "#E0EEFF",
      contrastText: "#fff",
    },
    action: { active: GREY[500], ...COMMON.action },
  },
};

export default palette;
