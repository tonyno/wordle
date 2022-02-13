import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChartBarMini from "./ChartBarMini";
import { HistoryData } from "./statisticsLib";

export type HistoryProps = {
  data: HistoryData;
};

const HistoryCard = ({ data }: HistoryProps) => {
  //  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="body2" color="text.disabled">
              {data.dateStr + " (den " + data.solutionIndex + ".)"}
            </Typography>
            {data.myScoreStr ? (
              <Box sx={{ mt: 1 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {data.solution}
                </Typography>
                <Typography>{data.myScoreStr}</Typography>
                <Typography>
                  {data.percentil
                    ? "Lepší než " + data.percentil + "% hráčů"
                    : ""}
                </Typography>
              </Box>
            ) : (
              <Typography sx={{ mt: 1 }}>
                Toto slovo jste ještě nehrál/a. Hru spustíte kliknutím na
                tlačítko "HRÁT".
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
            {data.guessesDistribution ? (
              <ChartBarMini
                guessesDistribution={data.guessesDistribution}
                myScore={data.myScore}
              />
            ) : (
              <Typography
                variant="body2"
                color="text.disabled"
                sx={{ height: 100 }}
              >
                {
                  "Statistika pro tento den není zatím k dispozici. Výpočet probíhá v cca 18:15."
                }
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          size="small"
          onClick={() => navigate("/day/" + data.solutionIndex)}
        >
          Hrát
        </Button>
        <Button
          size="small"
          onClick={() => navigate("/stats/" + data.solutionIndex)}
          disabled={data.guessesDistribution ? false : true}
        >
          Graf
        </Button>

        <Box sx={{ marginLeft: "auto", justifyContent: "center" }}>
          <Typography
            variant="body2"
            color="text.disabled"
            sx={{ justifyContent: "center" }}
          >
            {data.playsCount ? (
              <>
                <PersonIcon /> {data.playsCount}
              </>
            ) : (
              ""
            )}
            {data.successRate ? (
              <>
                <ThumbUpIcon sx={{ ml: 2 }} />
                {"" + data.successRate + "%"}
              </>
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default HistoryCard;

// 514.32 kB (+126.34 kB)  build\static\js\main.4daab5e1.js
// 1.73 kB                 build\static\js\27.5dbfd2fb.chunk.js
// 794 B                   build\static\css\main.51cc142e.css
