import { Box, useTheme } from "@mui/material";
import cx from "classnames";
import { useEffect, useState } from "react";
import { CharStatus } from "../../lib/statuses";
import styles from "./Cell.module.css";

type Props = {
  value?: string;
  status?: CharStatus;
  skipAnimation?: boolean;
};

export const Cell = ({ value, status, skipAnimation }: Props) => {
  const theme = useTheme();
  const [cellAnimation, setCellAnimation] = useState("");

  useEffect(() => {
    if (value !== undefined && skipAnimation) {
      setCellAnimation("cellAnimation"); // this doesn't matter, it just needs to change the state so the component gets re-rendered
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const classes = cx(styles.Cell, {
    // "bg-white border-slate-200": !status,
    // "border-slate-300": value && !status,
    // "bg-slate-400 text-white border-slate-400": status === "absent",
    // "bg-green-500 text-white border-green-500": status === "correct",
    // "bg-yellow-500 text-white border-yellow-500": status === "present",
    "cell-animation": !!value && !skipAnimation,
  });
  let themeKey: string;
  if (!status) {
    if (value) {
      themeKey = "valueWithoutStatus";
    } else {
      themeKey = "default";
    }
  } else {
    themeKey = status;
  }

  return (
    <Box
      className={`${classes} ${cellAnimation}`}
      sx={{ ...theme.wordle.cell[themeKey], ...theme.wordle.cellStyle }}
    >
      {value}
    </Box>
  );
};
