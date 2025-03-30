import { useState } from "react";
import { Box, Typography, Menu, MenuItem, styled } from "@mui/material";
import { UnderlineText } from "../styles/Animations";

const StyledMenuItem = styled(MenuItem)(() => ({
  marginBottom: "0.8rem",
  fontFamily: "inherit",
  fontSize: "1.4rem",
  fontWeight: 350,
  cursor: "default",
}));

const CategoriesMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
          <UnderlineText>Beauty</UnderlineText>
        </StyledMenuItem>
        <StyledMenuItem disableRipple onClick={handleClose}>
          <UnderlineText>Cars</UnderlineText>
        </StyledMenuItem>
        <StyledMenuItem disableRipple onClick={handleClose}>
          <UnderlineText>Electronics</UnderlineText>
        </StyledMenuItem>
      </Menu>
    </Box>
  );
};

export default CategoriesMenu;
