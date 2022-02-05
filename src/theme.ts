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
  dark: {
    default: {
      color: "#d7dadc",
      bgcolor: "#121213",
      borderColor: "#3a3a3c",
    },
    valueWithoutStatus: {
      color: "#d7dadc",
      bgcolor: "#121213",
      borderColor: "#3a3a3c",
    },
    absent: {
      color: "#d7dadc",
      bgcolor: "#3a3a3c",
      borderColor: "#3a3a3c",
    },
    correct: {
      color: "#d7dadc",
      bgcolor: "#538d4e",
      borderColor: "#538d4e",
    },
    present: {
      color: "#d7dadc",
      bgcolor: "#b59f3b",
      borderColor: "#b59f3b",
    },
  },
};

const cellColorsCB = {
  correct: {
    color: "#ffffff",
    bgcolor: "#f5793a",
    borderColor: "#f5793a",
  },
  present: {
    color: "#ffffff",
    bgcolor: "#85c0f9",
    borderColor: "#85c0f9",
  },
};

// http://www.htmlcsscolor.com/hex/B59F3B
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
      bgcolor: "#818384",
      color: "#d7dadc",
      ":hover": {
        bgcolor: "#67696A",
      },
      ":active": {
        bgcolor: "#525455",
      },
    },
    absent: {
      bgcolor: "#3a3a3c",
      color: "#d7dadc",
      ":hover": {
        bgcolor: "#3a3a3c",
      },
      ":active": {
        bgcolor: "#3a3a3c",
      },
    },
    correct: {
      bgcolor: "#538d4e",
      color: "#d7dadc",
      ":hover": {
        bgcolor: "#42713E",
      },
      ":active": {
        bgcolor: "#355A32",
      },
    },
    present: {
      bgcolor: "#b59f3b",
      color: "#d7dadc",
      ":hover": {
        bgcolor: "#917F2F",
      },
      ":active": {
        bgcolor: "#746626",
      },
    },
  },
};

const keyboardColorsCB = {
  correct: {
    bgcolor: "#f5793a",
    color: "#ffffff",
    ":hover": {
      bgcolor: "#C4612E",
    },
    ":active": {
      bgcolor: "#9D4E25",
    },
  },
  present: {
    bgcolor: "#85c0f9",
    color: "#ffffff",
    ":hover": {
      bgcolor: "#6A9AC7",
    },
    ":active": {
      bgcolor: "#557B9F",
    },
  },
};

export const getDesignTheme = (mode: PaletteMode) => {
  let keyboard: any = keyboardColors[mode];
  keyboard = { ...keyboard, ...keyboardColorsCB };

  let cell: any = cellColors[mode];
  cell = { ...cell, ...cellColorsCB };

  return {
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
      keyboard: keyboard,
      cell: cell,
    },
    typography: {
      body1: {
        fontSize: "1rem",
      },
    },
  };
};
