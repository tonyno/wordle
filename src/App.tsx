import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Faq from "./components/faq/Faq";
import TopMenu from "./components/navigation/TopMenu";
import Statistics from "./components/statistics/Statistics";
import WordlePlayWrapper from "./components/WordlePlayWrapper";
import { ApplicationContext } from "./lib/playContext";
import { getWordIndex } from "./lib/words";

function App() {
  const [appContext] = useState<ApplicationContext>({
    solutionIndex: getWordIndex(),
    typeOfGame: "wordle",
  });
  //const [playContext] = useState<PlayContext>(getWordOfDay());

  // const changeWord = () => {
  //   setPlayContext({ solution: "PECKA", solutionIndex: 6 });
  // };
  return (
    <BrowserRouter>
      <TopMenu appContext={appContext} />
      <Routes>
        <Route
          path="/"
          element={<WordlePlayWrapper appContext={appContext} />}
        />
        <Route path="/faq" element={<Faq />} />
        <Route path="/stats" element={<Statistics />} />
      </Routes>

      {/*<button onClick={changeWord}>ds</button>*/}
    </BrowserRouter>
  );
}

export default App;
