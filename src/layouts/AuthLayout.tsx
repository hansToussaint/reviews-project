import { Outlet } from "react-router";
import { Box, Container } from "@mui/material";

import theme from "../styles/Theme";

const AuthLayout: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.common.mainBackground,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: " 2rem",
      }}
    >
      <Container maxWidth="sm" disableGutters>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
