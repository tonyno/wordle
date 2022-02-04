import {
  createTheme,
  CssBaseline,
  PaletteMode,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DumpLocalStorage from "./components/debugTools/DumpLocalStorage";
import Faq from "./components/faq/Faq";
import HistoryPlay from "./components/HistoryPlay";
import TopMenu from "./components/navigation/TopMenu";
import Settings from "./components/settings/Settings";
import AllUsersStatsDay from "./components/statistics/AllUsersStatsDay";
import History from "./components/statistics/History";
import PersonalStats from "./components/statistics/PersonalStats";
import Welcome from "./components/Welcome";
import WordlePlayWrapper from "./components/WordlePlayWrapper";
import { firstTimeVisit } from "./lib/localStorage";
import { ApplicationContext } from "./lib/playContext";
import { getWordIndex } from "./lib/words";
import { getDesignTheme } from "./theme";

function App() {
  const [firstTime, setFirstTime] = useState(firstTimeVisit());
  const [currentTheme, setCurrentTheme] = useState<PaletteMode>("light");

  const [appContext] = useState<ApplicationContext>({
    solutionIndex: getWordIndex(),
    typeOfGame: "wordle",
  });

  const [differentTopMessage, setDifferentTopMessage] = useState<
    string | undefined
  >(undefined);

  const setNewMessage = (newMessage: string) => {
    //console.log("NEW message ", newMessage);
    setDifferentTopMessage(newMessage);
  };

  const theme = useMemo(
    () => createTheme(getDesignTheme(currentTheme)),
    [currentTheme]
  );

  const themeChange = (theme: PaletteMode, colorBlindMode: boolean) => {
    setCurrentTheme(theme);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <TopMenu
            appContext={appContext}
            differentTopMessage={differentTopMessage}
          />
          <Routes>
            <Route
              path="/"
              element={
                firstTime ? (
                  <Welcome startGame={() => setFirstTime(false)} />
                ) : (
                  <WordlePlayWrapper
                    appContext={appContext}
                    setNewMessage={setNewMessage}
                  />
                )
              }
            />
            <Route
              path="/day/:solutionIndex"
              element={<HistoryPlay setNewMessage={setNewMessage} />}
            />
            <Route
              path="/stats/:solutionIndex"
              element={<AllUsersStatsDay setNewMessage={setNewMessage} />}
            />
            <Route path="/faq" element={<Faq />} />
            <Route path="/mystats" element={<PersonalStats />} />
            <Route path="/history" element={<History />} />
            <Route
              path="/settings"
              element={<Settings onThemeChange={themeChange} />}
            />
            <Route path="/localstorage" element={<DumpLocalStorage />} />
          </Routes>

          {/*<button onClick={changeWord}>ds</button>*/}
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
