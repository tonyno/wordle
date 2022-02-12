import { Card, CardContent } from "@mui/material";
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
  return (
    <Card>
      <CardContent>
        <ChartBarOthers
          guessesDistribution={distribution}
          myScore={myScore}
          mode={mode}
        />
      </CardContent>
    </Card>
  );
};
