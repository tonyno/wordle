import { Card, CardContent, Typography } from "@mui/material";
import ChartBarOthers from "./ChartBarOthers";

export type HistoryDayProps = {
  distribution: number[];
  myScore?: number | null;
  mode: "personal" | "others";
};

export const HistoryDayCard = ({
  distribution,
  myScore,
  mode,
}: HistoryDayProps) => {
  const sum = distribution ? distribution.reduce((acc, d) => acc + d, 0) : 0;

  return (
    <Card>
      <CardContent>
        {sum > 0 ? (
          <ChartBarOthers
            guessesDistribution={distribution}
            myScore={myScore}
            mode={mode}
          />
        ) : (
          <Typography variant="body2" color="text.disabled">
            Žádná data nejsou k dispozici k vykreslení grafu.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
