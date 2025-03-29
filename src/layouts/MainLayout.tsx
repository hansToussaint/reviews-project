import React from "react";
import { Outlet } from "react-router";
import { Box, Container } from "@mui/material";

import Header from "../components/Header";

const MainLayout: React.FC = () => {
  return (
    <>
      <Box
        component="header"
        sx={{
          width: "100%",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Header />
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
