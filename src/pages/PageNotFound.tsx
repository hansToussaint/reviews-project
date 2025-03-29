import { Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router";

const PageNotFound: React.FC = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "80vh", textAlign: "center", p: 2 }}
    >
      <Typography variant="h3" sx={{ mb: 3 }}>
        This page could not be found :(
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ textTransform: "none" }}
      >
        Go to Home
      </Button>
    </Grid>
  );
};

export default PageNotFound;
