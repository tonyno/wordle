import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

type Props = {
  message: string;
  open?: boolean;
  onClose?: () => void;
  variant?: "success" | "warning" | "error";
  autoHide?: number;
};

const MyAlert = (props: Props) => {
  const [simpleOpen, setSimpleOpen] = useState(true);
  const simpleAlert =
    typeof props.open === "undefined" || !props.onClose ? true : false;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // if (reason === "clickaway") {
    //   return;
    // }

    if (simpleAlert) {
      setSimpleOpen(false);
    } else {
      if (props && props.onClose) {
        props.onClose();
      }
    }
  };

  return (
    <Snackbar
      open={simpleAlert ? simpleOpen : props.open}
      autoHideDuration={props?.autoHide ? props.autoHide : null}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
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
