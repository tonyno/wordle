import { Typography } from "@mui/material";
import { timeToNextWord } from "../lib/timeFunctions";
import CountDownTimer from "./counter/CountDownTimer";

const NextWord = () => {
  const hoursMinSecs = timeToNextWord();
  return (
    <Typography variant="body2" display="block" className="white">
      {"Další slovo za "} <CountDownTimer hoursMinSecs={hoursMinSecs} />
    </Typography>
  );
};

export default NextWord;
