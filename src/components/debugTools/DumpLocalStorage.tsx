import { Typography } from "@mui/material";
import { dumpLocalStorage } from "../../lib/localStorage";

const DumpLocalStorage = () => {
  const dump = dumpLocalStorage();
  return <Typography>{dump}</Typography>;
};

export default DumpLocalStorage;
