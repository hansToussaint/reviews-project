import { useState } from "react";
import { Box, Typography, Menu, MenuItem, styled } from "@mui/material";
import { UnderlineText } from "../styles/Animations";
import { Link, useLocation } from "react-router";
import theme from "../styles/Theme";

const StyledMenuItem = styled(MenuItem)(() => ({
  marginBottom: "0.8rem",
  fontFamily: "inherit",
  fontSize: "1.4rem",
  fontWeight: 350,
  cursor: "default",
}));

const CategoriesMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const location = useLocation();

  // get the current category to add a style on it
  const activeCategory = location.pathname.split("/")[2]?.toLowerCase();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      sx={{ display: "inline-block" }}
    >
      <Typography variant="h4" sx={{ userSelect: "none" }}>
        Categories
      </Typography>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          list: {
            onMouseLeave: handleClose,
          },
          paper: {
            sx: {
              mt: 1,
              padding: "1px 3px",
              borderRadius: 0,
              boxShadow: 1,

              "& .MuiMenuItem-root": {
                py: 0.2,

                "&:hover": {
                  background: "none",
                },

                "&.Mui-focusVisible": {
                  background: "none",
                },
              },
            },
          },
        }}
        disableScrollLock
      >
        <StyledMenuItem disableRipple onClick={handleClose}>
          <UnderlineText>
            <Link
              style={{
                color:
                  activeCategory === "beauty"
                    ? theme.palette.common.greenColor
                    : theme.palette.common.secondaryText,
                textDecoration: "none",
              }}
              to="/categories/Beauty"
            >
              Beauty
            </Link>
          </UnderlineText>
        </StyledMenuItem>

        <StyledMenuItem disableRipple onClick={handleClose}>
          <UnderlineText>
            <Link
              style={{
                color:
                  activeCategory === "cars"
                    ? theme.palette.common.greenColor
                    : theme.palette.common.secondaryText,
                textDecoration: "none",
              }}
              to="/categories/Cars"
            >
              Cars
            </Link>
          </UnderlineText>
        </StyledMenuItem>

        <StyledMenuItem disableRipple onClick={handleClose}>
          <UnderlineText>
            <Link
              style={{
                color:
                  activeCategory === "electronics"
                    ? theme.palette.common.greenColor
                    : theme.palette.common.secondaryText,
                textDecoration: "none",
              }}
              to="/categories/Electronics"
            >
              Electronics
            </Link>
          </UnderlineText>
        </StyledMenuItem>
      </Menu>
    </Box>
  );
};

export default CategoriesMenu;
