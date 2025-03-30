import { useState } from "react";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import theme from "../styles/Theme";
import ButtonMini from "./ButtonMini";

interface AccountMenuProps {
  isAuthenticated: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return isAuthenticated ? (
    <>
      <Box
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: 1,
          "&:hover": { bgcolor: theme.palette.common.mainBackground },
        }}
      >
        <Typography variant="h5">Account</Typography>
        {anchorEl ? <ExpandLess /> : <ExpandMore />}
      </Box>

      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              padding: "1px 3px",
              borderRadius: 0,
              boxShadow: 2,
              "& .MuiMenuItem-root": {
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
      >
        <MenuItem
          disableRipple
          sx={{
            userSelect: "none",
            fontSize: "1.5rem",
            fontWeight: 200,
            cursor: "default",
          }}
        >
          user@example.com
        </MenuItem>
        <MenuItem
          disableRipple
          sx={{
            fontSize: "1.4rem",
            fontWeight: 450,
            cursor: "default",

            "& span": {
              borderBottom: `1px solid ${theme.palette.common.black}`,
              transition: "border-bottom 0.3s ease",
              cursor: "pointer",
            },
          }}
        >
          <span>Log out</span>
        </MenuItem>
      </Menu>
    </>
  ) : (
    <ButtonMini
      bgColor="transparent"
      BgHover={theme.palette.common.mainBackground}
    >
      Log in
    </ButtonMini>
  );
};

export default AccountMenu;
