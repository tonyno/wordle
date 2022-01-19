import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Faq from "./components/faq/Faq";
import TopMenu from "./components/navigation/TopMenu";
import Statistics from "./components/statistics/Statistics";
import { PlayContext } from "./lib/playContext";
import { getWordOfDay } from "./lib/words";
import WordlePlay from "./WordlePlay";

function App() {
  const [playContext] = useState<PlayContext>(getWordOfDay());
  // const changeWord = () => {
  //   setPlayContext({ solution: "PECKA", solutionIndex: 6 });
  // };
  return (
    <BrowserRouter>
      <TopMenu playContext={playContext} />
      <Routes>
        <Route path="/" element={<WordlePlay playContext={playContext} />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/stats" element={<Statistics />} />
      </Routes>

      {/*<button onClick={changeWord}>ds</button>*/}
    </BrowserRouter>
  );
}

export default App;
