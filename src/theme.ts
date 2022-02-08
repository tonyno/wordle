import { ThemeOptions } from "@mui/material/styles";
import { SettingsItem } from "./lib/localStorage";

declare module "@mui/material/styles" {
  interface Theme {
    wordle: {
      bigFont: boolean;
      keyboard: any;
      cell: any;
      cellStyle: any;
      keyStyle: any;
      topBarColor: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    wordle?: {
      bigFont?: boolean;
      keyboard?: any;
      cell?: any;
      cellStyle?: any;
      keyStyle?: any;
      topBarColor?: string;
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
      bgcolor: "#22C55E",
      borderColor: "#22C55E",
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

export const getDesignTheme = (settings: SettingsItem): ThemeOptions => {
  const mode = settings.darkMode ? "dark" : "light";

  let keyboard: any = keyboardColors[mode];
  let cell: any = cellColors[mode];

  if (settings.colorBlindMode) {
    keyboard = { ...keyboard, ...keyboardColorsCB };
    cell = { ...cell, ...cellColorsCB };
  }

  return {
    palette: {
      mode,
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: mode === "light" ? "#fafafa" : "#000000",
      },
    },
    wordle: {
      bigFont: settings.bigFont,
      topBarColor: mode === "light" ? "rgb(148 163 184)" : "rgb(71 85 105)",
      keyboard: keyboard,
      cell: cell,
      cellStyle: {
        fontSize: settings.bigFont ? "2.5rem" : "1.125rem",
      },
      keyStyle: {
        fontSize: settings.bigFont ? "2rem" : "0.875rem",
      },
    },
    typography: {
      fontSize: settings.bigFont ? 18 : undefined,
      body1: {
        fontSize: settings.bigFont ? "1.25rem" : "1rem",
      },
    },
  };
};
