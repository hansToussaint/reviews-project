import { Outlet } from "react-router";
import { Container, Toolbar } from "@mui/material";

import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      {/* Spacer  */}
      <Toolbar />

      <Container sx={{ mt: 6, mb: 4 }}>
        <Outlet />
      </Container>

      <ScrollToTop />
    </>
  );
};

export default MainLayout;
