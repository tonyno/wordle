import { Box, Grid, PaletteMode, Switch } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { logMyEvent } from "../../lib/settingsFirebase";
import PageTitle from "../statistics/PageTitle";

type PropType = {
  onThemeChange: (theme: PaletteMode, colorBlindMode: boolean) => void;
};

const Settings = ({ onThemeChange }: PropType) => {
  //const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    logMyEvent("settings");
  }, []);

  const handleDarkModeChange = () => {
    const newStatus = !darkMode;
    onThemeChange(newStatus ? "dark" : "light", false);
    setDarkMode(newStatus);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <PageTitle title="Nastavení" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Tmavý režim
          <Switch
            checked={darkMode}
            onChange={handleDarkModeChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
