import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function SpinnerMini() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.3rem 0.8rem",
      }}
    >
      <CircularProgress size={20} color="inherit" />
    </Box>
  );
}
