import { Box, LinearProgress, Typography } from "@mui/material";

type Props = { title: string };

const MainLoader = ({ title }: Props) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <LinearProgress />
      <Typography>{title}</Typography>
    </Box>
  );
};

export default MainLoader;
