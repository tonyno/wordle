import { Box, Dialog, DialogContentText } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { logMyEvent } from "../../lib/settingsFirebase";
import { Cell } from "../grid/Cell";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  if (isOpen) logMyEvent("infoModal");
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>Jak hrát HadejSlova.cz</DialogTitle>
      <DialogContent>
        <DialogContentText variant="body2">
          Uhodni slovo na 6 pokusů. Po každém pokusu se písmenko obarví barvou
          podle toho jak daleko byl Tvůj tip od uhodnutí slova.
        </DialogContentText>

        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: "0.25rem",
              mt: "1rem",
            }}
          >
            <Cell value="K" status="correct" skipAnimation={true} />
            <Cell value="O" skipAnimation={true} />
            <Cell value="Č" skipAnimation={true} />
            <Cell value="K" skipAnimation={true} />
            <Cell value="A" skipAnimation={true} />
          </Box>
          <DialogContentText variant="body2">
            Písmeno <b>K</b> je ve slově a na <b>správném</b> místě.
          </DialogContentText>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: "0.25rem",
              mt: "1rem",
            }}
          >
            <Cell value="P" skipAnimation={true} />
            <Cell value="I" skipAnimation={true} />
            <Cell value="L" status="present" skipAnimation={true} />
            <Cell value="O" skipAnimation={true} />
            <Cell value="T" skipAnimation={true} />
          </Box>
          <DialogContentText variant="body2">
            Písmeno <b>L</b> je v hledaném slově, ale na chybném místě.
          </DialogContentText>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: "0.25rem",
              mt: "1rem",
            }}
          >
            <Cell value="M" skipAnimation={true} />
            <Cell value="E" skipAnimation={true} />
            <Cell value="T" skipAnimation={true} />
            <Cell value="R" status="absent" skipAnimation={true} />
            <Cell value="O" skipAnimation={true} />
          </Box>
          <DialogContentText variant="body2">
            Písmeno <b>R</b> se v hledaném slově nevyskytuje.
          </DialogContentText>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
