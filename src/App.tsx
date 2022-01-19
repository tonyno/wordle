import { useState } from "react";
import TopMenu from "./components/navigation/TopMenu";
import { PlayContext } from "./lib/playContext";
import { getWordOfDay } from "./lib/words";
import WordlePlay from "./WordlePlay";

function App() {
  const [playContext] = useState<PlayContext>(getWordOfDay());
  // const changeWord = () => {
  //   setPlayContext({ solution: "PECKA", solutionIndex: 6 });
  // };
  return (
    <>
      {" "}
      <TopMenu playContext={playContext} />
      <WordlePlay playContext={playContext} />
      {/*<button onClick={changeWord}>ds</button>*/}
    </>
  );
}

export default App;
