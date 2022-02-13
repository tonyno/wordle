import { Box, useTheme } from "@mui/material";
import { CharStatus } from "../../lib/statuses";
import styles from "./MiniCell.module.css";

type Props = {
  status: CharStatus;
};

export const MiniCell = ({ status }: Props) => {
  const theme = useTheme();

  let bgColor = theme.wordle.cell.default.bgcolor;
  if (status === "correct") bgColor = theme.wordle.cell.correct.bgcolor;
  else if (status === "present") bgColor = theme.wordle.cell.present.bgcolor;

  return <Box className={styles.MiniCell} sx={{ bgcolor: bgColor }}></Box>;
};
