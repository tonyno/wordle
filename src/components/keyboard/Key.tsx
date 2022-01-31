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

export const Key = ({
  children,
  status,
  width = 40,
  value,
  color,
  onClick,
}: Props) => {
  // const classes = classnames(
  //   "flex items-center justify-center rounded mx-0.5 text-sm font-bold cursor-pointer",
  //   {
  //     "bg-slate-200 hover:bg-slate-300 active:bg-slate-400": !status,
  //     "bg-slate-400 text-white": status === "absent",
  //     "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white":
  //       status === "correct",
  //     "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white":
  //       status === "present",
  //     "text-red-600": color === "red",
  //     "text-green-600": color === "green",
  //   }
  // );
  const classes = cx(styles.Key, {
    [styles.KeyUnselected]: !status,
    [styles.KeyAbsent]: status === "absent",
    [styles.KeyCorrect]: status === "correct",
    [styles.KeyPresent]: status === "present",
    [styles.KeyRed]: color === "red",
    [styles.KeyGreen]: color === "green",
  });

  return (
    <div
      style={{ width: `${width}px`, height: "50px"}}
      className={classes}
      onClick={() => onClick(value)}
    >
      {children || value}
    </div>
  );
};
