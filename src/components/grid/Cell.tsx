import classnames from "classnames";
import { useEffect, useState } from "react";
import { CharStatus } from "../../lib/statuses";

type Props = {
  value?: string;
  status?: CharStatus;
  skipAnimation?: boolean;
};

export const Cell = ({ value, status, skipAnimation }: Props) => {
  const [cellAnimation, setCellAnimation] = useState("");

  useEffect(() => {
    if (value !== undefined && skipAnimation) {
      setCellAnimation("cellAnimation"); // this doesn't matter, it just needs to change the state so the component gets re-rendered
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const classes = classnames(
    "w-12 h-12 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded",
    {
      "bg-white border-slate-200": !status,
      "border-slate-300": value && !status,
      "bg-slate-400 text-white border-slate-400": status === "absent",
      "bg-green-500 text-white border-green-500": status === "correct",
      "bg-yellow-500 text-white border-yellow-500": status === "present",
      "cell-animation": !!value && !skipAnimation,
    }
  );

  return (
    <>
      <div className={`${classes} ${cellAnimation}`}>{value}</div>
    </>
  );
};
