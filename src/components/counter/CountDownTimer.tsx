import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ApplicationContext } from "../../lib/playContext";
import { msToTime, pad, timeToNextWord } from "../../lib/timeFunctions";

/**
 *
 * @returns String to display to user with remaining time. Or null if we run out of the time.
 */
const getDurationMsg = (solutionIndex: number | undefined): string | null => {
  if (!solutionIndex) return "";
  let remaining = timeToNextWord();
  if (remaining > 23 * (1000 * 60 * 60) + 59 * (1000 * 60) + 57 * 1000)
    return null;
  let timeObj = msToTime(remaining);
  return (
    "Slovo č." +
    solutionIndex +
    ", další za " +
    pad(timeObj.hours, 2) +
    ":" +
    pad(timeObj.minutes, 2) +
    ":" +
    pad(timeObj.seconds, 2)
  );
};

// {`${hrs.toString().padStart(2, "0")}:${mins
//   .toString()
//   .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}

type Props = {
  appContext: ApplicationContext;
};

const CountDownTimer = ({ appContext }: Props) => {
  const [timeStr, setTimeStr] = useState(
    getDurationMsg(appContext?.solutionIndex)
  );
  const [stop, setStop] = useState(false);

  const tick = () => {
    if (stop) return;
    let timeStr = getDurationMsg(appContext?.solutionIndex);
    if (!timeStr) {
      setStop(true);
      setTimeStr("Nové slovo. Obnovte stránku.");
    } else {
      setTimeStr(timeStr);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  useEffect(() => {
    tick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext]);

  return (
    <Typography variant="body2" display="block" className="white">
      {timeStr}
    </Typography>
  );
};

export default CountDownTimer;
