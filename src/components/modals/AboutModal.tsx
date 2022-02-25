import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import { logMyEvent } from "../../lib/settingsFirebase";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  if (isOpen) {
    logMyEvent("aboutModal");
    //console.log("aboutModal opened");
  }
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Informace o logické hře "}
        <Link href="https://hadejslova.cz">HádejSlova.cz</Link>.
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" variant="body2">
          Aplikaci přeložil a pro české podmínky upravil{" "}
          <Link href="https://www.linkedin.com/in/tonda/">Tonda</Link>.{" "}
        </DialogContentText>{" "}
        <DialogContentText id="alert-dialog-description" variant="body2">
          Chyby a náměty na zlepšení hlašte:{" "}
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfMHytWem1XZZ6uLG3qP7IdBMKmSZ3LBNnjJPQ6M_LEi7_UVQ/viewform">
            zde
          </Link>
          . Můžete nás též sledovat na Twitteru{" "}
          <Link href="https://twitter.com/HadejSlova">@HadejSlova</Link>.
        </DialogContentText>{" "}
        <DialogContentText id="alert-dialog-description" variant="body2">
          Napsali o nás:{" "}
          <Link href="https://doupe.zive.cz/clanek/wordle-vas-nauci-hrat-si-se-slovy-ted-uz-i-cesky">
            Doupě
          </Link>
          ,{" "}
          <Link href="https://denikn.cz/789690/fenomen-wordle-proc-nas-bavi-divat-se-na-nudnou-stranku-a-cekat-na-nova-slova/">
            DeníkN
          </Link>
          ,{" "}
          <Link href="https://tech.hn.cz/c1-67022700-tyden-s-technologiemi-falesny-inkoust-primo-od-canonu-a-same-dobre-zpravy">
            HN
          </Link>
          ,{" "}
          <Link href="https://www.idnes.cz/hry/magazin/wordle-hra-slovni-viralni-scrabble.A220119_110315_bw-magazin_oma">
            iDNES
          </Link>
          ,{" "}
          <Link href="https://www.lidovky.cz/relax/co-to-ted-vsichni-najednou-hltaji-jednoducha-hra-s-pismeny-vzala-internet-utokem.A220120_091319_ln_magazin_lros">
            Lidovky
          </Link>
          ,{" "}
          <Link href="https://insmart.cz/wordle-hra-fenomen-cesky/">
            inSmart
          </Link>
          ,{" "}
          <Link href="https://www.svetandroida.cz/wordle-cesky-cz-hra/">
            SvětAndroida
          </Link>
          ,{" "}
          <Link href="https://www.expressinfo.cz/recenze/recenze-her/hadej-slova-cz-zahrajte-si-hru-wordle-cesky-zdarma/8420/">
            EI
          </Link>{" "}
          {/* 
          https://www.respekt.cz/tydenik/2022/7/hadej-s-nami?issueId=100552
          */}
          .
        </DialogContentText>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ mt: 3 }}
          variant="body2"
        >
          Zdrojové kódy jsou:{" "}
          <Link href="https://github.com/tonyno/wordle">zde</Link>.
        </DialogContentText>{" "}
        <DialogContentText id="alert-dialog-description" variant="body2">
          Původní autorka zdrojových kódů:{" "}
          <Link href="https://github.com/hannahcode/wordle">hannahcode</Link>.
        </DialogContentText>{" "}
        <DialogContentText id="alert-dialog-description" variant="body2">
          Původní anglická verze hry:{" "}
          <Link href="https://www.powerlanguage.co.uk/wordle/">zde</Link>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Zavřít
        </Button>
      </DialogActions>
    </Dialog>
  );
};
