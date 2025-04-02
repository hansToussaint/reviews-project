import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Spinner() {
  return (
    <Box
      sx={{
        margin: "5rem auto",
      }}
    >
      <CircularProgress color="success" />
    </Box>
  );
}
