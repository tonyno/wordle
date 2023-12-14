import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import {
  getAllResultsFromFirebase,
  saveAllResultsToFirebase,
  saveSharedResult,
} from "../../lib/dataAdapter";
import {
  getSettings,
  saveSettings,
  SettingsItem,
} from "../../lib/localStorage";
import { logMyEvent } from "../../lib/settingsFirebase";
import { Cell } from "../grid/Cell";
import PageTitle from "../statistics/PageTitle";

type PropType = {
  onThemeChange: (settings: SettingsItem) => void;
};

type Report = {
  previousIdentifierExists: boolean | undefined;
};

const Settings = ({ onThemeChange }: PropType) => {
  //const navigate = useNavigate();
  const [data, setData] = useState<SettingsItem>(getSettings());
  const [mergeIdentifier, setMergeIdentifier] = useState<string>("");
  const [canBeUploadedToServer, setCanBeUploadedToServer] =
    useState<boolean>(true);
  const [report, setReport] = useState<Report>({
    previousIdentifierExists: undefined,
  });
  //console.log(data);

  React.useEffect(() => {
    logMyEvent("settings");
  }, []);

  const save = (newData: SettingsItem) => {
    onThemeChange(newData);
    saveSettings(newData);
    setData(newData);
  };

  const changeDark = () => {
    save({ ...data, darkMode: !data.darkMode });
  };

  const changeColorBlind = () => {
    save({ ...data, colorBlindMode: !data.colorBlindMode });
  };

  const changeBigFont = () => {
    save({ ...data, bigFont: !data.bigFont });
  };

  const changeNickname = (s: string) => {
    save({ ...data, nickname: s });
  };

  const shareGameResultsToServer = async () => {
    setCanBeUploadedToServer(false);
    saveAllResultsToFirebase();
    await saveSharedResult();
  };

  const loadFromOldIdentifier = async () => {
    const data = await getAllResultsFromFirebase(mergeIdentifier);
    setReport({ ...report, previousIdentifierExists: data.exists() });
    if (!data.exists()) {
      return;
    }
    console.log(data);
  };

  return (
    <Container maxWidth="md">
      <Box justifyContent="center" component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <PageTitle title="Nastavení" />

        <Card sx={{ maxWidth: "md", mt: "1rem" }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom component="div">
                  Vzhled
                </Typography>
              </Grid>
              <Grid item xs={9}>
                Tmavý režim
              </Grid>
              <Grid item xs={3}>
                <Switch
                  checked={data.darkMode}
                  onChange={changeDark}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Grid>
              <Grid item xs={9}>
                Režim pro osoby se sníženou barvocitlivostí
              </Grid>
              <Grid item xs={3}>
                <Switch
                  checked={data.colorBlindMode}
                  onChange={changeColorBlind}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Grid>
              <Grid item xs={9}>
                Větší písmo
              </Grid>
              <Grid item xs={3}>
                <Switch
                  checked={data.bigFont}
                  onChange={changeBigFont}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom component="div">
                  Ukázka
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  <Cell value="K" status="present" skipAnimation={true} />
                  <Cell value="O" status="correct" skipAnimation={true} />
                  <Cell value="Č" status="absent" skipAnimation={true} />
                  <Cell value="K" status="present" skipAnimation={true} />
                  <Cell value="A" skipAnimation={true} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Písmeno <b>K</b> se ve slově vyskytuje. Písmeno <b>O</b> je
                  správně. Písmeno <b>Č</b> ve slově není.
                </Typography>
              </Grid>
            </Grid>{" "}
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: "md", mt: "1rem" }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom component="div">
                  Ukládání výsledků do cloudu
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nickname"
                  label="Přezdívka"
                  value={data.nickname}
                  onChange={(event) => changeNickname(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  disabled={!canBeUploadedToServer}
                  onClick={() => shareGameResultsToServer()}
                >
                  Uložit výsledky do cloudu
                </Button>
              </Grid>
              <Grid item xs={12}>
                {/* <Typography>
                  Pokud chcete nasdílet své výsledky svým kamarádům, požádejte
                  je aby otevřeli následující odkaz. Tento odkaz vás automaticky
                  přidá do jejich sledování. Díky tomu budou moci každý den
                  porovnat své výsledky s vámi.{" "}
                  <Typography>
                    Pokud naopak chcete vy sledovat své kamarády, požádejte je
                    aby vám zaslali svůj odkaz.
                  </Typography>
                </Typography>
                <Typography sx={{ mt: "1rem" }}>Odkaz pro sdílení:</Typography>
                <Typography sx={{ mt: "0.5rem" }}></Typography>
                <code>{"https://hadejslova.cz/follow/" + data.userId}</code> */}
                <Typography>
                  Váš soukromý identifikátor (ponechte v soukromí):
                </Typography>
                <code>{data.userId}</code>{" "}
                <Button
                  size="small"
                  onClick={() => {
                    if (data.userId) navigator.clipboard.writeText(data.userId);
                  }}
                >
                  (kopírovat do schránky)
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: "md", mt: "1rem" }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom component="div">
                  Sloučit s jiným účtem
                </Typography>
                <Typography>
                  Postup pro sloučení účtů z různých zařízení:
                </Typography>
                <List
                  sx={{
                    listStyleType: "disc",
                    pl: 2,
                    "& .MuiListItem-root": {
                      display: "list-item",
                    },
                  }}
                >
                  <ListItem>
                    <b>Původní zařízení:</b> Otevřte HadejSlova ve svém starém
                    zařízení, přejděte tam do "Nastavení".
                  </ListItem>
                  <ListItem>
                    <b>Původní zařízení:</b> Nahrajte své výsledky ze starého
                    zařízení kliknutím na tlačítko "Uložit výsledky do cloudu".
                  </ListItem>
                  <ListItem>
                    <b>Původní zařízení:</b> Ze starého zařízení si zkopírujte
                    identifikátor vašeho účtu (text ve tvaru:{" "}
                    <code>3746-db27-384x-448...23</code>)
                  </ListItem>

                  <ListItem>
                    <b>Přenos:</b> Přeneste tento kód do nového zařízení - např.
                    Whatsappem, emailem, SMSkou. Nikomu svůj kód nesdělujte.
                  </ListItem>
                  <ListItem>
                    <b>Nové zařízení:</b> V novém zařízení vložte tento kód do
                    políčka níže a klikněte na tlačítko "Sloučit účty".
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="newAccount"
                  label="Identifikátor vašeho předchozího účtu"
                  value={mergeIdentifier}
                  onChange={(event) => setMergeIdentifier(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  disabled={!(mergeIdentifier && mergeIdentifier.length === 36)}
                  onClick={loadFromOldIdentifier}
                >
                  Načíst
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ color: "red" }}>
                  Zatim nefunkcni, makam na tom.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Settings;
