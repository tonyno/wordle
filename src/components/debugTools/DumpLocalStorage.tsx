import { Button, Typography } from "@mui/material";
import { dumpLocalStorage } from "../../lib/localStorage";

const DumpLocalStorage = () => {
  const dump = dumpLocalStorage();

  return (
    <>
      <Typography>{dump}</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigator.clipboard.writeText(dump);
        }}
      >
        Zkopírovat do schránky
      </Button>
    </>
  );
};

export default DumpLocalStorage;
