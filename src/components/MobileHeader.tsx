import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Container,
  styled,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  BookmarkBorder,
} from "@mui/icons-material";

import Logo from "./Logo";
import theme from "../styles/Theme";
import MobileSearchBar from "./MobileSearchBar";
import { Link, useLocation, useNavigate } from "react-router";
import { UnderlineText } from "../styles/Animations";
import { useAuth } from "../context/AuthContext";
import { useSignOut } from "../hooks/useAuthActions";

const StyledListButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  fontFamily: "inherit",
  fontSize: "1.4rem",
  cursor: "default",
  "&:hover": {
    background: "none",
  },
  //
}));

const MobileHeader: React.FC = () => {
  const location = useLocation();

  // If "profile" is null. user is not authenticated ***

  const { loading: isloadingProfile, profile } = useAuth();
  const { mutateSignOut } = useSignOut();

  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearchToggle = () => {
    setSearchExpanded((prev) => !prev);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: theme.palette.common.white,
          transition: "padding 0.3s ease",
          paddingY: 0.3,
          boxShadow: 0,
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 1,
            }}
          >
            <IconButton
              disableRipple
              onClick={toggleDrawer}
              // sx={{ color: "inherit" }}
            >
              <MenuIcon
                sx={{ fontSize: "1.8rem", color: theme.palette.common.black }}
              />
            </IconButton>

            {!searchExpanded && (
              <Box
                sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
              >
                <Logo />
              </Box>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!searchExpanded ? (
                <IconButton
                  disableRipple
                  onClick={handleSearchToggle}
                  // sx={{ color: "inherit" }}
                >
                  <SearchIcon
                    sx={{
                      fontSize: "1.8rem",
                      color: theme.palette.common.black,
                    }}
                  />
                </IconButton>
              ) : (
                <MobileSearchBar onClose={() => setSearchExpanded(false)} />
              )}

              {profile && (
                <IconButton
                  disableRipple
                  component={Link}
                  to="/bookmarks"
                  // sx={{ color: "inherit" }}
                >
                  <BookmarkBorder
                    sx={{
                      fontSize: "1.8rem",
                      color: theme.palette.common.black,
                    }}
                  />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for menu */}
      <Drawer
        disableScrollLock
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: 250, bgcolor: "background.paper", height: "100%" }}>
          <List>
            {/* Section Categories */}
            <ListItem disablePadding>
              <ListItemText
                primary="Categories"
                slotProps={{
                  primary: {
                    sx: { p: 1 },
                  },
                }}
              />
            </ListItem>

            <StyledListButton disableRipple onClick={toggleDrawer}>
              <UnderlineText>Beauty</UnderlineText>
            </StyledListButton>
            <StyledListButton disableRipple onClick={toggleDrawer}>
              <UnderlineText>Cars</UnderlineText>
            </StyledListButton>
            <StyledListButton disableRipple onClick={toggleDrawer}>
              <UnderlineText>Electronics</UnderlineText>
            </StyledListButton>

            {/* Section Account */}
            <ListItem disablePadding>
              <ListItemText
                primary="Account"
                slotProps={{
                  primary: {
                    sx: { p: 1, pt: 3 },
                  },
                }}
              />
            </ListItem>

            {isloadingProfile ? (
              <Typography variant="body1">Loading...</Typography>
            ) : profile ? (
              <>
                <StyledListButton
                  disableRipple
                  onClick={toggleDrawer}
                  sx={{
                    userSelect: "none",
                    fontSize: "1.5rem",
                    fontWeight: 200,
                  }}
                >
                  {profile.username}
                </StyledListButton>

                <StyledListButton
                  disableRipple
                  onClick={() => {
                    mutateSignOut(location.pathname);
                    toggleDrawer();
                  }}
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: 450,

                    "& span": {
                      cursor: "pointer",
                      borderBottom: `1px solid ${theme.palette.common.black}`,
                      transition: "border-bottom 0.3s ease",
                    },
                  }}
                >
                  <span>Sign out</span>
                </StyledListButton>
              </>
            ) : (
              <StyledListButton
                disableRipple
                onClick={() => {
                  // navigate("/signin");
                  navigate("/signin", { state: { from: location.pathname } });
                  toggleDrawer();
                }}
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: 450,
                  "& span": {
                    cursor: "pointer",
                    borderBottom: `1px solid ${theme.palette.common.black}`,
                    transition: "border-bottom 0.3s ease",
                  },
                }}
              >
                <span>Sign in</span>
              </StyledListButton>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileHeader;
