import EqualizerIcon from "@mui/icons-material/Equalizer";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Cell } from "./grid/Cell";
import styles from "./Welcome.module.css";

type Props = {
  startGame: () => void;
};

// https://mui.com/system/sizing/
const Welcome = ({ startGame }: Props) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" component="h1">
        Česká verze Wordle
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Vítejte v české verzi populární logické hry Wordle. Naše verze je oproti{" "}
        <Link href="https://www.powerlanguage.co.uk/wordle/">
          původní Americké
        </Link>{" "}
        od Joshe Wardla těžší o česká písmenka s diakritikou.
      </Typography>
      <Button
        sx={{ mt: 2, width: 1 }}
        variant="contained"
        onClick={() => {
          startGame();
        }}
      >
        Zahájit hru
      </Button>
      <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
        Jak hrát Wordle
      </Typography>
      <Typography>
        Máte 6 pokusů na uhodnutí slova o délce 5 písmen. Po odeslání každého z
        6 řádků se vám pomocí barviček naznačí jak daleko jste od uhodnutí
        správného slova. Hádá se jen 1 slovo denně. Slovo je vydáváno vždy v
        18:00.
      </Typography>
      <div className="flex mb-1 mt-4">
        <Cell value="K" status="correct" />
        <Cell value="O" />
        <Cell value="Č" />
        <Cell value="K" />
        <Cell value="A" />
      </div>
      <Typography>
        Písmeno <b>K</b> je ve slově a na <b>správném</b> místě.
      </Typography>

      <div className="flex mb-1 mt-4">
        <Cell value="P" />
        <Cell value="I" />
        <Cell value="L" status="present" />
        <Cell value="O" />
        <Cell value="T" />
      </div>
      <Typography>
        Písmeno <b>L</b> je v hledaném slově, ale na chybném místě.
      </Typography>

      <div className="flex mb-1 mt-4">
        <Cell value="M" />
        <Cell value="E" />
        <Cell value="T" />
        <Cell value="R" status="absent" />
        <Cell value="O" />
      </div>
      <Typography>
        Písmeno <b>R</b> se v hledaném slově nevyskytuje.
      </Typography>

      <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
        Tipy
      </Typography>
      <div className={styles.Welcome}>
        <ul>
          <li>Hru spustíte kliknutím na tlačítko výše.</li>
          <li>
            Menu aplikace vyvoláte stiskem{" "}
            <MenuIcon sx={{ color: "#556cd6" }} /> vpravo nahoře. Tam naleznete
            i možnost hrát předchozí slova, zobrazit statistiky či zobrazit
            nápovědu.
          </li>
          <li>
            Kliknutím na <EqualizerIcon sx={{ color: "#556cd6" }} /> zobrazíte
            své statistiky.
          </li>
          <li>
            Doporučujeme hrát v jednom a stále stejném webovém prohlížeči aby
            vaše výsledky zůstaly správně zachovány.
          </li>
          <li>
            Více tipů naleznete ve{" "}
            <Link component={RouterLink} to="/faq">
              FAQ
            </Link>{" "}
          </li>
        </ul>
      </div>
      <Button
        sx={{ mt: 2, width: 1 }}
        variant="contained"
        onClick={() => {
          startGame();
        }}
      >
        Zahájit hru
      </Button>
    </Box>
  );
};

export default Welcome;
