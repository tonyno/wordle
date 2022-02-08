import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
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

const Settings = ({ onThemeChange }: PropType) => {
  //const navigate = useNavigate();
  const [data, setData] = useState<SettingsItem>(getSettings());
  console.log(data);

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

  return (
    <Container maxWidth="md">
      <Box justifyContent="center" component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <PageTitle title="Nastavení" />

        <Card sx={{ maxWidth: "md", mt: "1rem" }}>
          {" "}
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
      </Box>
    </Container>
  );
};

export default Settings;
