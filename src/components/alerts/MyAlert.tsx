import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

type Props = {
  message: string;
  variant?: "success" | "warning" | "error";
  autoHide?: number;
};

const MyAlert = (props: Props) => {
  const [open, setOpen] = useState(props.message ? true : false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={props?.autoHide ? props.autoHide : null}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "left", vertical: "top" }}
    >
      <Alert
        onClose={handleClose}
        severity={props.variant ? props.variant : "success"}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
