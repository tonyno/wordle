import { PaletteMode } from "@mui/material";
import { red } from "@mui/material/colors";

export const getDesignTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    wordle: {
      absent: "#ff0000",
    },

    // primary: {
    //   ...amber,
    //   ...(mode === "dark" && {
    //     main: amber[300],
    //   }),
    // },
    // ...(mode === "dark" && {
    //   background: {
    //     default: deepOrange[900],
    //     paper: deepOrange[900],
    //   },
    // }),
    // text: {
    //   ...(mode === "light"
    //     ? {
    //         primary: grey[900],
    //         secondary: grey[800],
    //       }
    //     : {
    //         primary: "#fff",
    //         secondary: grey[500],
    //       }),
    // },
  },
});

// // A custom theme for this app
// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#556cd6",
//     },
//     secondary: {
//       main: "#19857b",
//     },
//     error: {
//       main: red.A400,
//     },
//   },
// });

// export default theme;
