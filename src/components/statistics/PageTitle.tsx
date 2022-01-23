import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  backUrl?: string;
};

const PageTitle = ({ title, backUrl }: Props) => {
  /*const [faqData, faqLoading, faqError] = useGetFaq();*/
  const navigate = useNavigate();

  // https://stackoverflow.com/questions/45159071/mui-how-to-align-a-component-to-the-center-right
  return (
    <Grid container spacing={0}>
      <Grid item xs={9}>
        <Typography variant="h5" gutterBottom component="div">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Grid container spacing={0} justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() => {
              navigate(backUrl ? backUrl : "/");
            }}
          >
            Zpět
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PageTitle;
