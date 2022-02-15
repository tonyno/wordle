import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSharedResults } from "../../lib/dataAdapter";
import { getFollowers } from "../../lib/localStorage";
import { logMyEvent } from "../../lib/settingsFirebase";
import PageTitle from "../statistics/PageTitle";

const Followers = () => {
  const navigate = useNavigate();
  const [followers, loading] = useGetSharedResults(getFollowers());
  const followersx = useMemo(() => getFollowers(), []);
  console.log(followers, loading);

  useEffect(() => {
    logMyEvent("followers");
  }, []);

  return (
    <Container maxWidth="md">
      <Box justifyContent="center" component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <PageTitle title="Kamarádi" />

        <Card sx={{ maxWidth: "md", mt: "1rem" }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom component="div">
                  Sdílení výsledků
                </Typography>
                <Typography>
                  Váš známý vám umožnil začít sledovat jeho výsledky ve hře
                  HadejSlova. Přejete si ho začít sledovat?
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Followers;
