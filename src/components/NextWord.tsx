import { timeToNextWord } from "../lib/timeFunctions";
import CountDownTimer from "./counter/CountDownTimer";

const NextWord = () => {
  const hoursMinSecs = timeToNextWord();
  return (
    <div className="flex justify-center mb-1">
      <p className="text-sm text-gray-500">
        {"Další slovo za "} <CountDownTimer hoursMinSecs={hoursMinSecs} />
      </p>
    </div>
  );
};

export default NextWord;
