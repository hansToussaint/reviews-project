import { useState, useEffect } from "react";
import { Link } from "react-router";
import { AppBar, Toolbar, Box, IconButton, Container } from "@mui/material";
import { BookmarkBorder } from "@mui/icons-material";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CategoriesMenu from "./CategoriesMenu";
import AccountMenu from "./AccountMenu";

const DesktopHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 0.5 : 0}
      sx={{
        bgcolor: "white",
        transition: "padding 0.3s ease",
        paddingY: scrolled ? 0 : 2,
        boxShadow: scrolled ? 1 : 0,
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: 0,
          }}
        >
          {/*Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Logo />
          </Box>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, mx: 2 }}>
            <SearchBar />
          </Box>

          {/*  Categories, Bookmark & Account */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CategoriesMenu />

            <IconButton
              disableRipple
              component={Link}
              to="/bookmarks"
              sx={{ color: "inherit" }}
            >
              <BookmarkBorder sx={{ fontSize: "2rem" }} />
            </IconButton>

            <AccountMenu isAuthenticated={true} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DesktopHeader;
