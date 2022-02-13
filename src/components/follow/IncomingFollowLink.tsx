import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addFollower, getUserId } from "../../lib/localStorage";
import { logMyEvent } from "../../lib/settingsFirebase";
import MyAlert from "../alerts/MyAlert";
import PageTitle from "../statistics/PageTitle";

const IncomingFollowLink = () => {
  const navigate = useNavigate();
  let { followLink } = useParams();
  console.log(followLink);

  React.useEffect(() => {
    logMyEvent("followLink");
  }, []);

  const startFollowing = () => {
    if (followLink) {
      addFollower(followLink);
    }
    navigate("/");
  };

  if (followLink === getUserId()) {
    return (
      <MyAlert
        open={true}
        onClose={() => {}}
        message={
          "Tento odkaz odkazuje na váš účet. Nemůžete sledovat sám sebe. Tento odkaz nasdílejte svým známým, kteří vás chtějí sledovat."
        }
        variant="error"
      />
    );
  }

  return (
    <Container maxWidth="md">
      <Box justifyContent="center" component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <PageTitle title="Sdílení" />

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
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => startFollowing()}>
                  Ano
                </Button>
                <Button
                  variant="outlined"
                  sx={{ ml: "0.5rem" }}
                  onClick={() => navigate("/")}
                >
                  Ne
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default IncomingFollowLink;
