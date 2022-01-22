import { Box, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import DemoChart from "./DemoChart";
import PieChartStats from "./PieChartStats";
export default function Statistics() {
  /*const [faqData, faqLoading, faqError] = useGetFaq();*/
  const navigate = useNavigate();

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h4" gutterBottom component="div">
            Statistika
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
          >
            Zpět na hru
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DemoChart />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PieChartStats />
        </Grid>
      </Grid>
    </Box>
  );
}
