import ShareIcon from "@mui/icons-material/Share";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Alert, Box, Dialog, IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { PlayContext } from "../../lib/playContext";
import { canShare, shareStatus } from "../../lib/share";
import { PlayState } from "../../lib/statuses";
import { MiniGrid } from "../mini-grid/MiniGrid";

type Props = {
  playContext: PlayContext;
  isOpen: boolean;
  gameStatus: PlayState;
  handleClose: () => void;
  guesses: string[];
  gameDurationMs?: number;
};

const EndGameModal = ({
  playContext,
  isOpen,
  gameStatus,
  handleClose,
  guesses,
  gameDurationMs,
}: Props) => {
  const [shareNotification, setShareNotification] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>
        {gameStatus === "win" ? "Vyhrál/a jsi!" : "Dnes to nevyšlo!"}
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          {gameStatus === "win" ? (
            <ThumbUpIcon
              sx={{ color: "#059669", fontSize: "2rem" }}
              aria-hidden="true"
            />
          ) : (
            <ThumbDownIcon
              sx={{ color: "#DC2626", fontSize: "2rem" }}
              aria-hidden="true"
            />
          )}
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{ textAlign: "center" }}
          onClick={() => {
            handleClose();
          }}
        >
          {gameStatus === "loose" ? (
            <Typography variant="body2">
              Správné slovo:{" "}
              <b style={{ color: "#DC2626" }}>{playContext.solution}</b>
            </Typography>
          ) : (
            ""
          )}
          <Box sx={{ mt: "0.75rem" }}>
            <MiniGrid playContext={playContext} guesses={guesses} />
            {shareNotification ? (
              <Alert severity="info" sx={{ mt: 3, mb: 3 }}>
                Vaše hra byla úspěšně vložena do schránky.
              </Alert>
            ) : (
              <Typography variant="body2" sx={{ mt: "0.75rem" }}>
                {gameStatus === "win"
                  ? "Skvělá práce."
                  : "Nevadí, vyjde to zítra."}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ mt: "0.75rem", textAlign: "center" }}>
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              width: "100%",
            }}
            onClick={() => {
              shareStatus(
                playContext,
                guesses,
                gameStatus,
                false,
                gameDurationMs
              );
              if (canShare())
                shareStatus(
                  playContext,
                  guesses,
                  gameStatus,
                  true,
                  gameDurationMs
                );
              setShareNotification(true);
            }}
          >
            Sdílet
          </Button>

          <Typography
            sx={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              fontStyle: "italic",
              mt: "0.5rem",
              textAlign: "center",
            }}
          >
            {canShare() ? (
              <>
                Sdílení vloží výsledek do schránky + zobrazí dialog na výběr
                aplikace ke sdílení. <br />
              </>
            ) : (
              ""
            )}
            Okno zavřete kliknutím mimo okno.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EndGameModal;
