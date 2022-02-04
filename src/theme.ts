import { PaletteMode } from "@mui/material";
import { red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    wordle: {
      keyboard: any;
      cell: any;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    wordle?: {
      keyboard?: any;
      cell?: any;
    };
  }
}

const cellColors = {
  light: {
    default: {
      bgColor: "#ffffff",
      borderColor: "rgb(226 232 240)",
    },
    valueWithoutStatus: {
      bgColor: "#ffffff",
      borderColor: "rgb(203 213 225)",
    },
    absent: {
      color: "#ffffff",
      bgcolor: "rgb(148 163 184)",
      borderColor: "rgb(148 163 184)",
    },
    correct: {
      color: "#ffffff",
      bgcolor: "rgb(34 197 94)",
      borderColor: "rgb(34 197 94)",
    },
    present: {
      color: "#ffffff",
      bgcolor: "rgb(234 179 8)",
      borderColor: "rgb(234 179 8)",
    },
  },
  dark: {
    default: {
      bgcolor: "#ffffff",
      borderColor: "rgb(226 232 240)",
    },
    valueWithoutStatus: {
      bgcolor: "#ffffff",
      borderColor: "rgb(203 213 225)",
    },
    absent: {
      color: "#ffffff",
      bgcolor: "rgb(148 163 184)",
      borderColor: "rgb(148 163 184)",
    },
    correct: {
      color: "#ffffff",
      bgcolor: "rgb(34 197 94)",
      borderColor: "rgb(34 197 94)",
    },
    present: {
      color: "#ffffff",
      bgcolor: "rgb(234 179 8)",
      borderColor: "rgb(234 179 8)",
    },
  },
};

const keyboardColors = {
  light: {
    default: {
      bgcolor: "rgb(226 232 240)",
      ":hover": {
        bgcolor: "rgb(203 213 225)",
      },
      ":active": {
        bgcolor: "rgb(148 163 184)",
      },
    },
    absent: {
      bgcolor: "rgb(148 163 184)",
      color: "#ffffff",
      ":hover": {
        bgcolor: "rgb(148 163 184)",
      },
      ":active": {
        bgcolor: "rgb(148 163 184)",
      },
    },
    correct: {
      bgcolor: "rgb(34 197 94)",
      color: "#ffffff",
      ":hover": {
        bgcolor: "rgb(22 163 74)",
      },
      ":active": {
        bgcolor: "rgb(21 128 61)",
      },
    },
    present: {
      bgcolor: "rgb(234 179 8)",
      color: "#ffffff",
      ":hover": {
        bgcolor: "rgb(202 138 4)",
      },
      ":active": {
        bgcolor: "rgb(161 98 7)",
      },
    },
  },
  dark: {
    default: {
      bgcolor: "rgb(226 232 240)",
      ":hover": {
        bgcolor: "rgb(203 213 225)",
      },
      ":active": {
        bgcolor: "rgb(148 163 184)",
      },
    },
    absent: {
      bgcolor: "rgb(148 163 184)",
      color: "#ffffff",
      ":hover": {
        bgcolor: "rgb(148 163 184)",
      },
      ":active": {
        bgcolor: "rgb(148 163 184)",
      },
    },
    correct: {
      bgcolor: "rgb(34 197 94)",
      color: "#ffffff",
      ":hover": {
        bgcolor: "rgb(22 163 74)",
      },
      ":active": {
        bgcolor: "rgb(21 128 61)",
      },
    },
    present: {
      bgcolor: "rgb(234 179 8)",
      color: "#ffffff",
      ":hover": {
        bgcolor: "rgb(202 138 4)",
      },
      ":active": {
        bgcolor: "rgb(161 98 7)",
      },
    },
  },
};

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
  },
  wordle: {
    keyboard: keyboardColors[mode],
    cell: cellColors[mode],
  },
  typography: {
    body1: {
      fontSize: "1rem",
    },
  },
});
