import { Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { ApplicationContext } from "../../lib/playContext";
import { msToTime, pad, timeToNextWord } from "../../lib/timeFunctions";

/**
 *
 * @returns String to display to user with remaining time. Or null if we run out of the time.
 */
const getDurationMsg = (
  solutionIndex: number | undefined,
  shortVersion: boolean = false
): string | null => {
  if (!solutionIndex) return "";
  let remaining = timeToNextWord();
  if (remaining > 23 * (1000 * 60 * 60) + 59 * (1000 * 60) + 57 * 1000)
    return null;
  let timeObj = msToTime(remaining);
  return (
    (shortVersion ? "č. " : "Slovo č.") +
    solutionIndex +
    (shortVersion ? " / " : ", další za ") +
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
  differentTopMessage?: string;
};

const CountDownTimer = ({ appContext, differentTopMessage }: Props) => {
  const theme = useTheme();
  const bigFont = theme.wordle.bigFont;
  const [timeStr, setTimeStr] = useState(
    getDurationMsg(appContext?.solutionIndex, bigFont)
  );
  const [stop, setStop] = useState(false);

  //console.log("UVNITR countdownu hlasim " + differentTopMessage);

  const tick = () => {
    if (stop || differentTopMessage) return;
    let timeStr = getDurationMsg(appContext?.solutionIndex, bigFont);
    if (!timeStr) {
      setStop(true);
      setTimeStr(bigFont ? "Nové slovo" : "Nové slovo. Obnovte stránku.");
    } else {
      setTimeStr(timeStr);
    }
  };

  useEffect(() => {
    if (!differentTopMessage) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
  });

  useEffect(() => {
    tick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext]);

  return (
    <Typography display="block" variant="body2">
      {differentTopMessage ? differentTopMessage : timeStr}
    </Typography>
  );
};

export default CountDownTimer;
