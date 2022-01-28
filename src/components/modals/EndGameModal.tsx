import ShareIcon from "@mui/icons-material/Share";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Dialog, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
  handleShare: () => void;
  gameDurationMs?: number;
};

const EndGameModal = ({
  playContext,
  isOpen,
  gameStatus,
  handleClose,
  guesses,
  handleShare,
  gameDurationMs,
}: Props) => {
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
        <div
          className="text-center"
          onClick={() => {
            handleClose();
          }}
        >
          {gameStatus === "loose" ? (
            <p className="text-gray-500">
              Správné slovo:{" "}
              <b className="text-red-600">{playContext.solution}</b>
            </p>
          ) : (
            ""
          )}
          <div className="mt-3 sm:mt-6">
            <MiniGrid playContext={playContext} guesses={guesses} />
            <p className="text-sm text-gray-500 mt-3 sm:mt-6">
              {gameStatus === "win"
                ? "Skvělá práce."
                : "Nevadí, vyjde to zítra."}
            </p>
          </div>
        </div>
        <div className="mt-3 sm:mt-6">
          {/* {canShare() && (
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<ShareIcon />}
                className="inline-flex justify-center w-full"
                onClick={() => {
                  shareStatus(playContext, guesses, gameStatus, true);
                }}
              >
                Sdílet
              </Button>
              <p className="text-xs text-gray-500 italic">
                *) Pro FB použijte kopírování do schránky.
              </p>
            </Box>
            )} */}
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            className="inline-flex justify-center w-full"
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
              handleShare();
            }}
          >
            Sdílet
          </Button>
          <p className="text-xs text-gray-500 italic text-center mt-2">
            Okno zavřete kliknutím mimo okno.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EndGameModal;
