import { useState } from "react";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import theme from "../styles/Theme";
import ButtonMini from "./ButtonMini";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const AccountMenu: React.FC = () => {
  const { profile, signOutUser } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return profile ? (
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
          {profile.username}
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
          onClick={() => {
            signOutUser();
            handleClose();
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
      onClick={() => navigate("/signin")}
    >
      Log in
    </ButtonMini>
  );
};

export default AccountMenu;
