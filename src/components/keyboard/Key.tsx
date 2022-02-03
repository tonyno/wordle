import { styled } from "@mui/material";
import cx from "classnames";
import { ReactNode } from "react";
import { KeyValue } from "../../lib/keyboard";
import { CharStatus } from "../../lib/statuses";
import styles from "./Key.module.css";

type KeyColor = "red" | "green";

type Props = {
  children?: ReactNode;
  value: KeyValue;
  width?: number;
  status?: CharStatus;
  color?: KeyColor;
  onClick: (value: KeyValue) => void;
};

// https://mui.com/system/styled/
const KeyWithTheme = styled("div")(({ theme }) => ({
  color: theme.wordle.style.color,
  //fontSize: theme.wordle.style.fontSize,
}));

export const Key = ({
  children,
  status,
  width = 40,
  value,
  color,
  onClick,
}: Props) => {
  const classes = cx(styles.Key, {
    [styles.KeyUnselected]: !status,
    [styles.KeyAbsent]: status === "absent",
    [styles.KeyCorrect]: status === "correct",
    [styles.KeyPresent]: status === "present",
    [styles.KeyRed]: color === "red",
    [styles.KeyGreen]: color === "green",
  });

  return (
    <KeyWithTheme
      style={{ width: `${width}px`, height: "50px" }}
      className={classes}
      onClick={() => onClick(value)}
    >
      {children || value}
    </KeyWithTheme>
  );
};
